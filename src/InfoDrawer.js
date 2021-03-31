import { Box, SwipeableDrawer, Typography } from "@material-ui/core";
import ConnectionTypeBox from "./ConnectionTypeBox";
import infoDrawerIsOpenState from "./states/infoDrawerIsOpenState";
import { useRecoilState } from "recoil";

export default function InfoDrawer({ selectedItem }) {
  const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useRecoilState(
    infoDrawerIsOpenState
  );
  return (
    <SwipeableDrawer
      transitionDuration={500}
      open={isInfoDrawerOpen}
      onOpen={() => setIsInfoDrawerOpen(!isInfoDrawerOpen)}
      onClose={() => setIsInfoDrawerOpen(!isInfoDrawerOpen)}
      anchor="top"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin={4}
      >
        <Box display="flex">
          <Typography style={{ fontWeight: "600" }}>Address:</Typography>
          <Typography>
            {`${selectedItem?.AddressInfo.Town} ${selectedItem?.AddressInfo.AddressLine1}`}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt={1}
        >
          <Typography style={{ fontWeight: "600" }}>
            This charger has {selectedItem?.Connections.length} connection type
            {selectedItem?.Connections.length > 1 && "s"}:
          </Typography>
          <Box display="flex" alignItems="space-between">
            {selectedItem?.Connections.map((connection) => {
              return <ConnectionTypeBox connection={connection} />;
            })}
          </Box>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
