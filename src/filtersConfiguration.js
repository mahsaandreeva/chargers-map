const filtersConfiguration = {
  power: {
    matches: (item, value) =>
      value.some((v) => item.Connections.some((c) => c.PowerKW === v)),
    options: [11, 22, 50],
    unit: "kw",
  },
  voltage: {
    matches: (item, value) =>
      value.some((v) => item.Connections.some((c) => c.Voltage === v)),
    options: [230, 400],
    unit: "volt",
  },
};
export default filtersConfiguration;
