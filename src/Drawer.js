import { Box } from "@material-ui/core";
import FilterBox from "../src/FilterBox";
import filtersConfiguration from "./filtersConfiguration";
export default function MyDrawer() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      onClick={(e) => e.stopPropagation()}
      p={8}
    >
      <Box display="flex" width="100%" justifyContent="space-around" margin={2}>
        {Object.keys(filtersConfiguration).map((name, index) => {
          return <FilterBox filterName={name} key={index} />;
        })}
      </Box>
    </Box>
  );
}
