import { Box, Typography } from "@material-ui/core";

export default function ConnectionTypeBox({ connection }) {
  return (
    <Box
      mr={2}
      mt={1}
      style={{ border: "solid 1px black", borderRadius: "5%" }}
      p={2}
      key={connection.ID}
    >
      {connection.Voltage && (
        <Box display="flex" alignItems="center">
          <Typography
            style={{
              fontWeight: "600",
              marginRight: "8px",
              marginLeft: "8px",
            }}
          >
            Voltage:
          </Typography>
          {connection.Voltage}
        </Box>
      )}
      <Box display="flex" alignItems="center">
        <Typography
          style={{
            fontWeight: "600",
            marginRight: "8px",
            marginLeft: "8px",
          }}
        >
          Power:
        </Typography>
        {connection.PowerKW}
      </Box>
    </Box>
  );
}
