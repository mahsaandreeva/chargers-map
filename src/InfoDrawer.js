import { Box, Typography } from "@material-ui/core";

export default function InfoDrawer({ selectedItem }) {
  return (
    <Box
      dispaly="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography>Address: {selectedItem?.AddressInfo.AddressLine1}</Typography>
      <Box
        dispaly="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>Connections: {selectedItem?.Connections.length}</Typography>
        <Box dispaly="flex">
          {selectedItem?.Connections.map((c) => {
            return (
              <Box>
                <Typography>Voltage: {c.Voltage}</Typography>
                <Typography>Power: {c.PowerKW}kw</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
