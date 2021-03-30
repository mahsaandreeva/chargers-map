import { Box, Checkbox, Typography } from "@material-ui/core";
import { useRecoilState } from "recoil";
import filtersStateState from "./states/filtersState";
import filtersConfiguration from "./filtersConfiguration";

export default function FilterBox({ filterName }) {
  const filterTitle = `Filter by ${filterName}`;
  const [filtersState, setFiltersState] = useRecoilState(filtersStateState);
  console.log(filtersState);
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
      {filtersConfiguration[filterName].options.map((value) => {
        const values = filtersState[filterName];
        const { ...clone } = filtersState;
        values?.length === 1 && delete clone[filterName];
        return (
          <Box display="flex">
            <Checkbox
              color="primary"
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
              label={value}
              value={value}
              checked={values?.includes(value)}
            />
            <Box display="flex" alignItems="center" mr={1}>
              {value} {filtersConfiguration[filterName].unit}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
