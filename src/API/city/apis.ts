import API_ROUTES from "../../constants/apiRoutes";
import { Pagination } from "../../types/api";
import axios from "../../lib/axios";
import { City, CityActionBody, CityDetails, CityGetAllParams } from "./types";

const getAll = async (params: CityGetAllParams) => {
  const { data } = await axios.get<Pagination<City>>(API_ROUTES.CITY.GET_ALL, {
    params,
  });
  return data;
};

const get = async (cityId: string) => {
  const { data } = await axios.get<CityDetails>(API_ROUTES.CITY.GET, {
    params: { cityId },
  });
  return data;
};
const getAllNp = async (countryId: string | null) => {
  const { data } = await axios.get<City[]>(API_ROUTES.CITY.GET_SELECT, {
    params: { countryId },
  });
  return data;
};
const action = async (body: CityActionBody) => {
  await axios.post(API_ROUTES.CITY.ACTION, body);
};
const remove = async (cityId: string) => {
  await axios.delete(API_ROUTES.CITY.REMOVE, { params: { cityId } });
};
const cityAPI = {
  getAll,
  get,
  getAllNp,
  action,
  remove,
};

export default cityAPI;
