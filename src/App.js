import "./App.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { Box, Button, SwipeableDrawer } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import filtersState from "./states/filtersState";
import { useRecoilState } from "recoil";
import powerState from "./states/powerState";
import MyDrawer from "./Drawer";
import InfoDrawer from "./InfoDrawer";
function App({ google }) {
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const selectedFilters = useRecoilValue(filtersState);
  const [powerFliteringValue, setPowerFliteringValue] = useRecoilState(
    powerState
  );
  useEffect(() => {
    fetch("https://api.mocki.io/v1/51ba4fc2")
      .then((r) => r.json())
      .then((r) => {
        if (r.error) {
          setIsError(true);
        } else {
          setData(r);
        }
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

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
        <ClipLoader color="black" loading size={100} margin="auto" />
      </Box>
    );
  }
  if (isError) {
    return "something went wrong";
  }

  const selectedItem = data.find((i) => i.ID === selectedId);

  const voltageFilter = (item) =>
    selectedFilters.find((i) => i === "voltage")
      ? item.Connections.filter((c) => c.Voltage === 400).length > 0
      : true;
  console.log(data);
  const connectionIdFilter = (item) =>
    selectedFilters.find((i) => i === "power")
      ? item.Connections.filter((c) => c.PowerKW !== powerFliteringValue)
          .length > 0
      : true;

  const filteredData =
    selectedFilters.length === 0
      ? data
      : data.filter((item) => connectionIdFilter(item) && voltageFilter(item));

  const changeInfoState = () => {
    setInfoIsOpen(!infoIsOpen);
  };
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
        css={css`
          align-items: center;
          position: absolute;
          z-index: 1;
          left: 300px;
          top: 10px;
          width: 300px;
        `}
        height={40}
      >
        <Button
          css={css`
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 300px;
            top: 10px;
            border-radius: 3%;
            width: 300px;
            height: 100%;
          `}
          onClick={(e) => {
            e.stopPropagation();
            setMenuIsOpen(!menuIsOpen);
          }}
          color="primary"
          variant="contained"
        >
          Menu
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
        onOpen={changeInfoState}
        onClose={changeInfoState}
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
