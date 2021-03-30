import "./App.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Box, Button, SwipeableDrawer } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import filtersStateState from "./states/filtersState";
import MyDrawer from "./Drawer";
import InfoDrawer from "./InfoDrawer";
import useData from "./hooks/useData";
import filtersConfiguration from "./filtersConfiguration";
function App({ google }) {
  const data = useData();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const filtersState = useRecoilValue(filtersStateState);

  if (!data) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
        position="absolute"
      >
        <ClipLoader color="blue" loading size={150} margin="auto" />
      </Box>
    );
  }
  if (data.error) {
    return "something went wrong";
  }

  const selectedItem = data.find((i) => i.ID === selectedId);

  const isEveryTestPassed = (item) =>
    Object.keys(filtersState).every((filterKey) =>
      filtersConfiguration[filterKey].matches(item, filtersState[filterKey])
    );

  const filteredData =
    Object.keys(filtersState).length > 0
      ? data.filter((item) => isEveryTestPassed(item))
      : data;

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      onClick={() => {
        setMenuIsOpen(false);
        setInfoIsOpen(false);
      }}
    >
      <Map
        google={google}
        zoom={14}
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: "1",
        }}
        initialCenter={{ lat: 52.52, lng: 13.405 }}
      >
        {filteredData?.map((item, index) => {
          const latitude = item.AddressInfo.Latitude;
          const longitude = item.AddressInfo.Longitude;
          const id = item.ID;

          return (
            <Marker
              key={index}
              position={{ lat: latitude, lng: longitude }}
              onClick={(e) => {
                setInfoIsOpen(true);
                setSelectedId(id);
              }}
            />
          );
        })}
      </Map>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={168}
        zIndex="1"
        position="absolute"
        top="50px"
        margin="10px"
      >
        <Button
          borderRadius="3%"
          fullWidth
          height="40px"
          onClick={(e) => {
            e.stopPropagation();
            setMenuIsOpen(!menuIsOpen);
          }}
          color="primary"
          variant="contained"
        >
          Filters
        </Button>
      </Box>
      <SwipeableDrawer
        transitionDuration={500}
        open={menuIsOpen}
        onClose={() => {
          setMenuIsOpen(false);
        }}
        onOpen={() => {
          setMenuIsOpen(true);
        }}
        anchor="bottom"
      >
        <MyDrawer
          selectedItem={selectedItem}
          isMenuOpen={menuIsOpen}
        ></MyDrawer>
      </SwipeableDrawer>
      <SwipeableDrawer
        transitionDuration={500}
        open={infoIsOpen}
        onOpen={() => setInfoIsOpen(!infoIsOpen)}
        onClose={() => setInfoIsOpen(!infoIsOpen)}
        anchor="top"
      >
        <InfoDrawer selectedItem={selectedItem} />
      </SwipeableDrawer>
    </Box>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD6T8zNeCCXnR0NhbSplOFvaHG6Jfa6X70",
})(App);
