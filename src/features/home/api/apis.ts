import API_ROUTES from "../../../constants/apiRoutes";
import axios from "../../../lib/axios";
import { HomeGet } from "./types";

const getAll = async () => {
  const { data } = await axios.get<HomeGet>(API_ROUTES.Home.GET_HOME_DATA);
  return data;
};

export const homeAPI = { getAll };
