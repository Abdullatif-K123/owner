import API_ROUTES from "@/constants/apiRoutes";
import { API_BASE_URL } from "@/constants/domain";
import axios from "@/lib/axios";
import {
  AddVirtualBody,
  GetVirtualDetails,
  VirtualGetAll,
  VirtualGetAllParams,
} from "./types";

const GetAll = async (
  params: VirtualGetAllParams,
  branchId: string
): Promise<VirtualGetAll> => {
  const body = branchId.length > 0 ? [branchId] : [];
  const { data } = await axios.put<VirtualGetAll>(
    `${API_BASE_URL}/${API_ROUTES.VIRTUAL_TOUR.GET_ALL}`,
    body,
    { params }
  );
  return data;
};

const Action = async (body: AddVirtualBody) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/${API_ROUTES.VIRTUAL_TOUR.ACTION}`,
    body
  );
  return data;
};

const getDetails = async (id: string) => {
  const { data } = await axios.get<GetVirtualDetails>(
    API_ROUTES.VIRTUAL_TOUR.GET_DETAILS,
    { params: { tourId: id } }
  );
  return data;
};

const remove = async (tourId: string) => {
  const { data } = await axios.delete(API_ROUTES.VIRTUAL_TOUR.REMOVE, {
    params: { tourId },
  });
  return data;
};

export const API = {
  GetAll,
  Action,
  getDetails,
  remove,
};
