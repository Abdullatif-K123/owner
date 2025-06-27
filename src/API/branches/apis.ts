import API_ROUTES from "../../constants/apiRoutes";
import { Pagination } from "../../types/api";
import axios from "../../lib/axios";

import {
  AddBranchType,
  Branch,
  BranchChangeRecordParams,
  BranchDetailsRes,
  BranchGetAllParams,
  BranchSelect,
  BranchSelectParams,
} from "./type";

const getAll = async (params: BranchGetAllParams) => {
  const { data } = await axios.get<Pagination<Branch>>(
    API_ROUTES.BRANCH.GET_ALL,
    {
      params,
    }
  );
  return data;
};
const getSelect = async (params: BranchSelectParams) => {
  const { data } = await axios.put<BranchSelect[]>(
    API_ROUTES.BRANCH.GET_SELECT,
    null,
    {
      params,
    }
  );
  return data;
};
const get = async (id: string) => {
  const { data } = await axios.get<BranchDetailsRes>(API_ROUTES.BRANCH.GET, {
    params: { branchId: id },
  });
  return data;
};
const changeRecord = async (params: BranchChangeRecordParams) => {
  await axios.post(API_ROUTES.BRANCH.CHANCE_RECORD_TYPE, null, { params });
};
const remove = async (branchId: string) => {
  await axios.delete(API_ROUTES.BRANCH.REMOVE, { params: { branchId } });
};

const action = async (body: AddBranchType) => { 
  const { data } = await axios.post(`${API_ROUTES.BRANCH.ACTION}`, body);
  return data;
};
const getLogo = async(branchId: string)=>{ 
   const {data} = await axios.get<string>(API_ROUTES.BRANCH.GET_LOGO, {
    params: { branchId: branchId },
  });
  return data
}
const branchAPI = { get, getAll, getLogo, getSelect, changeRecord, remove, action };

export default branchAPI;
