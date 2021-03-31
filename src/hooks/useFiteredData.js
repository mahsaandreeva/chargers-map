import useData from "./useData";
import filtersStateState from "../states/filtersState";
import { useRecoilValue } from "recoil";
import filtersConfiguration from "../filtersConfiguration";

export default function useFilteredData() {
  const { data } = useData();
  const filtersState = useRecoilValue(filtersStateState);
  const isEveryTestPassed = (item) =>
    Object.keys(filtersState).every((filterKey) =>
      filtersConfiguration[filterKey].matches(item, filtersState[filterKey])
    );
  const filteredData =
    Object.keys(filtersState).length > 0
      ? data?.filter((item) => isEveryTestPassed(item))
      : data;
  return filteredData;
}
