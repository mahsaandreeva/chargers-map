import "./App.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Box, Button, SwipeableDrawer } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import filtersState from "./states/filtersState";
import voltageState from "./states/voltageState";
import powerState from "./states/powerState";
import MyDrawer from "./Drawer";
import InfoDrawer from "./InfoDrawer";
import useData from "./hooks/useData";
function App({ google }) {
  const data = useData();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const selectedFilters = useRecoilValue(filtersState);
  const voltageFilteringValue = useRecoilValue(voltageState);
  const powerFliteringValue = useRecoilValue(powerState);

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
        <ClipLoader color="blue" loading size={100} margin="auto" />
      </Box>
    );
  }
  if (data.error) {
    return "something went wrong";
  }

  const selectedItem = data.find((i) => i.ID === selectedId);

  const arrayIsNotEmpty = (arr) => arr.length > 0;

  const filtersCollection = [
    {
      name: "power",
      value: powerFliteringValue,
      function: (item, value) =>
        arrayIsNotEmpty(item.Connections.filter((c) => c.PowerKW === value)),
    },
    {
      name: "voltage",
      value: voltageFilteringValue,
      function: (item, value) =>
        arrayIsNotEmpty(item.Connections.filter((c) => c.Voltage === value)),
    },
  ];

  const filter = (item, value, filterName, func) =>
    selectedFilters.find((i) => i === filterName) && value > 0
      ? func(item, value)
      : true;

  const isEveryTestPassed = (item) =>
    !filtersCollection
      .map((f) => filter(item, f.value, f.name, f.function))
      .find((i) => i === false);

  const filteredData =
    selectedFilters.length === 0
      ? data
      : data.filter((item) => isEveryTestPassed(item));

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
        width="100%"
        zIndex="1"
        my={1}
      >
        <Button
          borderRadius="3%"
          width="100px"
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
