import { atom } from "recoil";

const infoDrawerIsOpenState = atom({
  key: "infoDrawerIsOpenState",
  default: false,
});
export default infoDrawerIsOpenState;
