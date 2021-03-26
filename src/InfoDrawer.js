import { Box, Typography } from "@material-ui/core";

export default function InfoDrawer({ selectedItem }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin={3}
    >
      <Typography>
        Address: {selectedItem?.AddressInfo.Town},{" "}
        {selectedItem?.AddressInfo.AddressLine1}
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={2}
      >
        <Typography>
          This charger has {selectedItem?.Connections.length} connection type
          {selectedItem?.Connections.length > 1 && "s"}:
        </Typography>
        <Box display="flex" alignItems="space-between">
          {selectedItem?.Connections.map((c) => {
            return (
              <Box
                mr={2}
                mt={1}
                color="primary"
                style={{ border: "solid 1px black", borderRadius: "5%" }}
                p={1}
              >
                {c.Voltage && <Typography>Voltage: {c.Voltage}</Typography>}
                <Typography>Power: {c.PowerKW}kw</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
