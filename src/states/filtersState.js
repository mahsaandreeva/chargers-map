import { atom } from "recoil";

const filtersState = atom({
  key: "filtersState",
  default: [],
});

export default filtersState;
