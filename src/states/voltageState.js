import { atom } from "recoil";

const voltageState = atom({
  key: "voltageState",
  default: 0,
});

export default voltageState;
