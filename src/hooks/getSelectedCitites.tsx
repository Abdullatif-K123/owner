import { TourCitiesObj, cityObj } from "../API/tour/types";

const getSelectedCities = (
  selected: TourCitiesObj[],
  cities: cityObj[],
  isFetched: boolean
) => {
  // use the ids array and convert it into array of objects
  let res: (TourCitiesObj & { name: string })[] = [];
  if (isFetched) {
    selected.forEach((item) => {
      const index = cities.findIndex(
        (city: cityObj) => city.id === item.cityId
      );
      if (index !== -1) {
        res.push({
          cityId: item.cityId,
          name: cities[index].name,
          breakTime: item.breakTime,
        });
      }
    });
    return res;
  }
};

export default getSelectedCities;
