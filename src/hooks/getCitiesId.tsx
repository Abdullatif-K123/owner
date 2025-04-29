import { TourCitiesObj } from "../API/tour/types";

const getCitiesId = (arr: (TourCitiesObj & { name?: string })[]) => {
  let res: TourCitiesObj[] = [];
  arr.forEach((item: any) => {
    let val = item;
    delete val.name;
    res.push(val);
  });
  return res;
};

export default getCitiesId;
