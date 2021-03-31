import { Box, Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { useRecoilState } from "recoil";
import filtersStateState from "./states/filtersState";
import filtersConfiguration from "./filtersConfiguration";

export default function FilterBox({ filterName }) {
  const filterTitle = `Filter by ${filterName}`;
  const [filtersState, setFiltersState] = useRecoilState(filtersStateState);
  const actualFilter = filtersConfiguration[filterName];
  const selectedValues = filtersState[filterName];
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box margin={1} textAlign="center">
        <Typography variant="h6">{filterTitle}</Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        {actualFilter.options.map((value) => {
          const checked = selectedValues?.includes(value) || false;
          return (
            <FormControlLabel
              control={<Checkbox color="primary" />}
              onChange={() => {
                selectedValues.includes(value)
                  ? setFiltersState({
                      ...filtersState,
                      [filterName]: selectedValues.filter((i) => i !== value),
                    })
                  : setFiltersState({
                      ...filtersState,
                      [filterName]: [...selectedValues, value],
                    });
              }}
              checked={checked}
              label={`${value} ${actualFilter.unit}`}
            />
          );
        })}
      </Box>
    </Box>
  );
}
