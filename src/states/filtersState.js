import { atom } from "recoil";
import filtersConfiguration from "../filtersConfiguration";

const defaultState = Object.keys(filtersConfiguration).reduce(
  (acc, filterName) => {
    acc[filterName] = filtersConfiguration[filterName].options;
    return acc;
  },
  {}
);
const filtersStateState = atom({
  key: "filtersState",
  default: defaultState,
});
export default filtersStateState;
