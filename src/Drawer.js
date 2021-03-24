import { css } from "@emotion/react";
import { Box, Typography, Button } from "@material-ui/core";
import { useState } from "react";
import FilterBox from "../src/FilterBox";
import { useRecoilState } from "recoil";
import filterIndexState from "./states/filterIndexState";

export default function MyDrawer({ filterNames, title, comment }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterIndex, setFilterIndex] = useRecoilState(filterIndexState);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      flexDirection="column"
      css={css`
        bottom: 100px;
        top: 100px;
        border-radius: 2%;
        background-color: white;
        position: absolute;
      `}
      width={300}
      height={500}
      p={2}
    >
      <Box
        onClick={() => {
          setFiltersOpen(!filtersOpen);
        }}
      >
        <Typography variant="h5">Filters</Typography>
      </Box>
      <Box display="flex" alignItems="space-around">
        {filterNames.map((name, index) => {
          return (
            <FilterBox
              onClick={(e) => {
                e.stopPropagation();
                setFilterIndex(index);
              }}
              name={name}
              key={index}
            ></FilterBox>
          );
        })}
      </Box>

      <Button
        onClick={() => {
          setFilterIndex(null);
        }}
        disabled={!filterIndex && filterIndex !== 0}
        width="auto"
        color="primary"
        variant="contained"
        margin={2}
      >
        Reset
      </Button>

      <Box display="flex" flexDirection="column" margin={4}>
        <Typography>{title}</Typography>
        {comment ? (
          <Typography>Comment: {comment}</Typography>
        ) : (
          <Typography>there're no comments</Typography>
        )}
      </Box>
    </Box>
  );
}
