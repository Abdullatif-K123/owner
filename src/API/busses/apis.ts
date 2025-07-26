import axios from "../../lib/axios";
import API_ROUTES from "../../constants/apiRoutes";
import {
  AddBussesType,
  GetAllBussesParams,
  Model,
  ModelGetAllParams,
  getBusDetails,
  uploadImageParams,
} from "./types";
import { API_BASE_URL } from "../../constants/domain";
import { Pagination } from "../../types/api";

const getAllModels = async (params: ModelGetAllParams) => {
  //   const { data } = await axios.get(`${API_BASE_URL}/${API_ROUTES.MODEL.GET_ALL}`, { params });
  const { data } = await axios.get<Pagination<Model>>(
    `${API_BASE_URL}/${API_ROUTES.MODEL.GET_ALL}`,
    { params }
  );

  return data;
};

const uploadImage = async ({ formData, params }: uploadImageParams) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/File/upload?fileSourceType=${params.fileSourceType}&fileSectionType=${params.fileSectionType}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

const getAllBusses = async ({ params, body }: GetAllBussesParams) => {
  const { data } = await axios.put(
    `${API_BASE_URL}/${API_ROUTES.BUS.GET_ALL}`,
    body,
    { params }
  );
  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<getBusDetails>(API_ROUTES.BUS.GET, {
    params: { busId: id },
  });
  return data;
};

const busAction = async (body: AddBussesType) => {
  const { data } = await axios.put(
    `${API_BASE_URL}/${API_ROUTES.BUS.ACTION}`,
    body
  );
  return data;
};

const getBranchSelect = async () => {
  const { data } = await axios.get(
    `${API_BASE_URL}/${API_ROUTES.BRANCH.GET_SELECT}`
  );
  return data;
};

const remove = async (busId: string) => {
  await axios.delete(API_ROUTES.BUS.REMOVE, { params: { busId } });
};

const bussesAPI = {
  getAllModels,
  get,
  uploadImage,
  getAllBusses,
  getBranchSelect,
  busAction,
  remove,
};
export default bussesAPI;
