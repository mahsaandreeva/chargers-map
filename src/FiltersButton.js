import { Box, Button } from "@material-ui/core";
import { useRecoilState } from "recoil";
import filtersDrawerIsOpenState from "./states/filtersDrawerIsOpenState";

export default function FiltersButton() {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useRecoilState(
    filtersDrawerIsOpenState
  );
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={168}
      zIndex="1"
      position="absolute"
      top="50px"
      margin="10px"
    >
      <Button
        fullWidth
        onClick={(e) => {
          e.stopPropagation();
          setIsFilterDrawerOpen(!isFilterDrawerOpen);
        }}
        color="primary"
        variant="contained"
      >
        Filters
      </Button>
    </Box>
  );
}
