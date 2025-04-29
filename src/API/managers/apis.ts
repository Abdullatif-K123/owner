import axios from "../../lib/axios";
import API_ROUTES from "../../constants/apiRoutes";
import { API_BASE_URL } from "../../constants/domain";
import { Pagination } from "../../types/api";
import {
  Manager,
  ManagerDetailes,
  ManagerPayload,
  ManagersGetAllParams,
} from "@/API/managers/types";

const getAll = async (params: ManagersGetAllParams) => {
  const { data } = await axios.get<Pagination<Manager>>(
    `${API_BASE_URL}/${API_ROUTES.Managers.GET_ALL}`,
    { params }
  );
  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<ManagerDetailes>(API_ROUTES.Managers.GET, {
    params: { id },
  });
  return data;
};

const post = async (body: ManagerPayload) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/${API_ROUTES.Managers.ACTION}`,
    body
  );
  return data;
};

const remove = async (id: string) => {
  await axios.delete(API_ROUTES.Managers.REMOVE, { params: { id } });
};

const managersAPI = {
  getAll,
  get,
  post,
  remove,
};
export default managersAPI;
