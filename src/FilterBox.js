import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { Box, Typography } from "@material-ui/core";

export default function FilterBox({ name, onClick }) {
  const filterTitle = `Filter by ${name}`;
  return (
    <Box
      width={100}
      height={100}
      display="flex"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      // css={css`
      //   color: black;
      //   background-color: gray;
      //   border-radius: 4%;
      // `}
      my={2}
      onClick={onClick}
    >
      <Typography>{filterTitle}</Typography>
    </Box>
  );
}
