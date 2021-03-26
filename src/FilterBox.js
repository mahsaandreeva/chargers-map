import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
  Button,
} from "@material-ui/core";
import powerState from "./states/powerState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import filtersState from "./states/filtersState";
import voltageState from "./states/voltageState";

export default function FilterBox({ name, onClick }) {
  const filterTitle = `Filter by ${name}`;
  const setPowerFliteringValue = useSetRecoilState(powerState);
  const setVoltageFilteringvalue = useSetRecoilState(voltageState);
  const selectedFilters = useRecoilValue(filtersState);
  const values =
    name === "power" ? [11, 22] : name === "voltage" ? [230, 400] : null;
  const setFilterState = (name, value) => {
    if (name === "power") {
      setPowerFliteringValue(value);
    }
    if (name === "voltage") {
      setVoltageFilteringvalue(value);
    }
  };
  return (
    <Box>
      <Box>
        <Button onClick={onClick} variant="outlined">
          {filterTitle}
        </Button>
      </Box>
      {selectedFilters.includes(name) && (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="space-around"
        >
          <FormControl>
            <RadioGroup>
              {values?.map((value) => {
                return (
                  <FormControlLabel
                    onClick={(e) => {
                      e.stopPropagation();
                      setFilterState(name, value);
                    }}
                    value={value}
                    control={<Radio color="primary" />}
                    label={value}
                  ></FormControlLabel>
                );
              })}
            </RadioGroup>
          </FormControl>
        </Box>
      )}
    </Box>
  );
}
