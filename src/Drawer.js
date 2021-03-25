import { css } from "@emotion/react";
import { Box, Typography, Button } from "@material-ui/core";
import { useState } from "react";
import FilterBox from "../src/FilterBox";
import { useRecoilState } from "recoil";
import filtersState from "./states/filtersState";

export default function MyDrawer({ selectedItem, isMenuOpen }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useRecoilState(filtersState);
  const filters = ["power", "voltage", "distance"];
  console.log(selectedFilters);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      flexDirection="column"
      style={{
        bottom: "100px",
        top: "100px",
        borderRadius: "2%",
        backgroundColor: "white",
      }}
      p={2}
    >
      <Box
        onClick={() => {
          setFiltersOpen(!filtersOpen);
        }}
      >
        <Typography variant="h5">Filters</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="space-around"
        justifyContent="space-around"
        width="100%"
      >
        {filters.map((name, index) => {
          return (
            <FilterBox
              onClick={(e) => {
                !selectedFilters.includes(name)
                  ? setSelectedFilters([name, ...selectedFilters])
                  : setSelectedFilters([
                      ...selectedFilters.filter((item) => item !== name),
                    ]);
                e.stopPropagation();
              }}
              name={name}
              key={index}
              style={
                selectedFilters.includes(name)
                  ? {
                      backgroundColor: "gray",
                      borderRadius: "40%",
                    }
                  : {
                      backgroundColor: "gray",
                      borderRadius: "40%",
                      opacity: "0.5",
                    }
              }
            ></FilterBox>
          );
        })}
      </Box>

      <Button
        onClick={() => {
          setSelectedFilters([]);
        }}
        disabled={!selectedFilters.length > 0}
        width="auto"
        color="primary"
        variant="contained"
        margin={2}
      >
        Reset
      </Button>
    </Box>
  );
}
