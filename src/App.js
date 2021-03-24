import "./App.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { Box, Button } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import filterIndexState from "./states/filterIndexState";
import MyDrawer from "./Drawer";
function App({ google }) {
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [title, setChargerTitle] = useState(null);
  const [comment, setChargerComments] = useState(null);
  const filterIndex = useRecoilValue(filterIndexState);
  const mapStyles = {
    display: "flex",
    position: "relative",
    width: "100%",
    height: "100%",
  };
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
  const filterNames = ["Distance", "Street"];
  const effectivefilterName = filterNames[filterIndex];
  console.log(data);
  if (!data) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        css={css`
          width: 100%;
          height: 100%;
          position: fixed;
        `}
      >
        <ClipLoader
          color="black"
          loading
          size={100}
          margin="auto"
          css={css`
            border-color: blue;
          `}
        />
      </Box>
    );
  }
  if (isError) {
    return "something went wrong";
  }
  return (
    <Box
      css={css`
        display: flex;
      `}
      width="100%"
      height="100%"
    >
      <Map
        google={google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: 52.52, lng: 13.405 }}
      >
        {effectivefilterName === "Distance"
          ? data
              .filter((item) => item.AddressInfo.Distance <= 0.1)
              .map((item, index) => {
                const latitude = item.AddressInfo.Latitude;
                const longitude = item.AddressInfo.Longitude;

                const { Title, AccessComments } = item.AddressInfo;
                return (
                  <Marker
                    key={index}
                    position={{ lat: latitude, lng: longitude }}
                    onClick={() => {
                      setMenuIsOpen(true);
                      setChargerTitle(Title);
                      setChargerComments(AccessComments);
                    }}
                  />
                );
              })
          : effectivefilterName === "Street"
          ? data
              .filter(
                (item) =>
                  item.AddressInfo.AddressLine1 === "Französische Straße 33"
              )
              .map((item, index) => {
                const latitude = item.AddressInfo.Latitude;
                const longitude = item.AddressInfo.Longitude;

                const { Title, AccessComments } = item.AddressInfo;
                return (
                  <Marker
                    key={index}
                    position={{ lat: latitude, lng: longitude }}
                    onClick={() => {
                      setMenuIsOpen(true);

                      setChargerTitle(Title);
                      setChargerComments(AccessComments);
                    }}
                  />
                );
              })
          : data.map((item, index) => {
              const latitude = item.AddressInfo.Latitude;
              const longitude = item.AddressInfo.Longitude;
              const { Title, AccessComments } = item.AddressInfo;

              return (
                <Marker
                  key={index}
                  position={{ lat: latitude, lng: longitude }}
                  onClick={() => {
                    setMenuIsOpen(true);
                    setChargerTitle(Title);
                    setChargerComments(AccessComments);
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
          onClick={() => {
            setMenuIsOpen(!menuIsOpen);
          }}
          color="primary"
          variant="contained"
        >
          Menu
        </Button>
      </Box>
      {menuIsOpen && (
        <MyDrawer
          filterNames={filterNames}
          comment={comment}
          title={title}
        ></MyDrawer>
      )}
    </Box>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD6T8zNeCCXnR0NhbSplOFvaHG6Jfa6X70",
})(App);
