import { atom } from "recoil";

const filtersDrawerIsOpenState = atom({
  key: "filtersDrawerIsOpenState",
  default: false,
});
export default filtersDrawerIsOpenState;
