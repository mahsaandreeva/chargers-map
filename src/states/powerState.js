import { atom } from "recoil";

const powerState = atom({
  key: "powerState",
  default: 0,
});

export default powerState;
