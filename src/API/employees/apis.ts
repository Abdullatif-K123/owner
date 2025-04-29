import axios from "../../lib/axios";
import API_ROUTES from "../../constants/apiRoutes";
import { API_BASE_URL } from "../../constants/domain";
import { Pagination } from "../../types/api";
import {
  Employee,
  EmployeeDetailes,
  EmployeePayload,
  EmployeesGetAllParams,
} from "./types";
import { SelectType } from "@/types/utils";

const getAll = async (params: EmployeesGetAllParams) => {
  const { data } = await axios.get<Pagination<Employee>>(
    `${API_BASE_URL}/${API_ROUTES.OwnerStaff.GET_ALL}`,
    { params }
  );
  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<EmployeeDetailes>(
    API_ROUTES.OwnerStaff.GET,
    {
      params: { id },
    }
  );
  return data;
};

const getSelect = async (branchId: string | null) => {
  const { data } = await axios.get<SelectType[]>(
    `${API_BASE_URL}/${API_ROUTES.OwnerStaff.GET_SELECT}`,
    { params: { branchId } }
  );
  return data;
};

const post = async (body: EmployeePayload) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/${API_ROUTES.OwnerStaff.ACTION}`,
    body
  );
  return data;
};

const remove = async (id: string) => {
  await axios.delete(API_ROUTES.OwnerStaff.REMOVE, { params: { id } });
};

const employeesAPI = {
  getAll,
  get,
  post,
  remove,
  getSelect,
};
export default employeesAPI;
