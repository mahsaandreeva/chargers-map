import { Box, Typography, Button } from "@material-ui/core";
import { useRecoilState } from "recoil";
import powerState from "./states/powerState";
import { useRecoilValue } from "recoil";
import filtersState from "./states/filtersState";
export default function FilterBox({ name, onClick, style }) {
  const filterTitle = `Filter by ${name}`;
  const [powerFliteringValue, setPowerFliteringValue] = useRecoilState(
    powerState
  );
  const selectedFilters = useRecoilValue(filtersState);
  const powerValues = [11, 22];
  return (
    <Box>
      <Box
        width={100}
        height={50}
        display="flex"
        flexDirection="column"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        style={style}
        my={2}
        onClick={onClick}
      >
        <Typography>{filterTitle}</Typography>
      </Box>
      {name === "power" && selectedFilters.find((i) => i === "power") && (
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="space-around"
        >
          {powerValues.map((value) => {
            return (
              <Button
                style={{ border: "solid 2px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPowerFliteringValue(value);
                }}
              >
                {value} volt
              </Button>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
