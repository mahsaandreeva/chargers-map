import { Box, SwipeableDrawer } from "@material-ui/core";
import { useRecoilState } from "recoil";
import FilterBox from "./FilterBox";
import filtersConfiguration from "./filtersConfiguration";
import filtersDrawerIsOpenState from "./states/filtersDrawerIsOpenState";
export default function FiltersDrawer() {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useRecoilState(
    filtersDrawerIsOpenState
  );
  return (
    <SwipeableDrawer
      transitionDuration={500}
      open={isFilterDrawerOpen}
      onClose={() => {
        setIsFilterDrawerOpen(false);
      }}
      onOpen={() => {
        setIsFilterDrawerOpen(true);
      }}
      anchor="bottom"
    >
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        p={{ xs: 4, sm: 6, lg: 8 }}
      >
        {Object.keys(filtersConfiguration).map((name) => {
          return <FilterBox filterName={name} key={name} />;
        })}
      </Box>
    </SwipeableDrawer>
  );
}
