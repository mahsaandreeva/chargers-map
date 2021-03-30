import { Box, Typography } from "@material-ui/core";

export default function InfoDrawer({ selectedItem }) {
  return (
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
          {" "}
          {selectedItem?.AddressInfo.Town},{" "}
          {selectedItem?.AddressInfo.AddressLine1}
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
          {selectedItem?.Connections.map((c) => {
            return (
              <Box
                mr={2}
                mt={1}
                style={{ border: "solid 1px black", borderRadius: "5%" }}
                p={1}
              >
                {c.Voltage && <Typography>Voltage: {c.Voltage}</Typography>}
                <Typography>Power: {c.PowerKW}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
