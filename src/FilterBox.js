import { Box, Checkbox, Typography, FormControlLabel } from "@material-ui/core";
import { useRecoilState } from "recoil";
import filtersStateState from "./states/filtersState";
import filtersConfiguration from "./filtersConfiguration";

export default function FilterBox({ filterName }) {
  const filterTitle = `Filter by ${filterName}`;
  const [filtersState, setFiltersState] = useRecoilState(filtersStateState);
  console.log(filtersState);
  const values = filtersState[filterName];
  const { ...clone } = filtersState;
  delete clone[filterName];
  const actualFilter = filtersConfiguration[filterName];
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Box margin={1}>
        <Typography variant="h6">{filterTitle}</Typography>
      </Box>

      {actualFilter.options.map((value) => {
        console.log("this one checked:", values?.includes(value));
        return (
          <FormControlLabel
            labelPlacement="right"
            label={`${value} ${actualFilter.unit}`}
            checked={values?.includes(value)}
            onChange={() => {
              filtersState.hasOwnProperty([filterName])
                ? values.includes(value)
                  ? values?.length === 1
                    ? setFiltersState(clone)
                    : setFiltersState({
                        ...filtersState,
                        [filterName]: [...values.filter((i) => i !== value)],
                      })
                  : setFiltersState({
                      ...filtersState,
                      [filterName]: [...values, value],
                    })
                : setFiltersState({
                    ...filtersState,
                    [filterName]: [value],
                  });
            }}
            control={<Checkbox color="primary" />}
          />
        );
      })}
      <Checkbox
        onChange={() => {
          values === actualFilter.options
            ? setFiltersState(clone)
            : setFiltersState({
                ...filtersState,
                [filterName]: actualFilter.options,
              });
        }}
        checked={values === actualFilter.options}
        lable="all"
        color="primary"
      />
    </Box>
  );
}
