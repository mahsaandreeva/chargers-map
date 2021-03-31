import "./App.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Box } from "@material-ui/core";
import { useRecoilState, useSetRecoilState } from "recoil";
import filtersDrawerIsOpenState from "./states/filtersDrawerIsOpenState";
import infoDrawerIsOpenState from "./states/infoDrawerIsOpenState";
import FiltersDrawer from "./filtersDrawer";
import InfoDrawer from "./InfoDrawer";
import useData from "./hooks/useData";
import useFilteredData from "./hooks/useFiteredData";
import FiltersButton from "./FiltersButton";

function App({ google }) {
  const { data, error, isLoading } = useData();
  const filteredData = useFilteredData();
  const [selectedId, setSelectedId] = useState(null);
  const setIsInfoDrawerOpen = useSetRecoilState(infoDrawerIsOpenState);

  if (isLoading) {
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
  if (error) {
    return "something went wrong";
  }

  const selectedItem = data.find((i) => i.ID === selectedId);

  return (
    <Box display="flex" width="100%" height="100%">
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
              onClick={() => {
                setIsInfoDrawerOpen(true);
                setSelectedId(id);
              }}
            />
          );
        })}
      </Map>
      <FiltersButton />
      <FiltersDrawer />
      <InfoDrawer selectedItem={selectedItem} />
    </Box>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD6T8zNeCCXnR0NhbSplOFvaHG6Jfa6X70",
})(App);
