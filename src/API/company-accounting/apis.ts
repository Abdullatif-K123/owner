import { Pagination } from "@/types/api";
import API_ROUTES from "../../constants/apiRoutes";
import axios from "../../lib/axios";
import {
  CompanyAccountingBody,
  CompanyAccountingDetails,
  CompanyAccountingDetailsParams,
  CompanyAccounting,
  CompanyAccountingParams,
} from "./types";

const getAll = async (
  params: CompanyAccountingParams,
  body: CompanyAccountingBody
) => {
  const { data } = await axios.put<Pagination<CompanyAccounting>>(
    API_ROUTES.ACCOUNTING.COMPANY_ALL,
    body,
    { params }
  );
  return data;
};
const getAllCash = async(
   params:  CompanyAccountingParams,
   body: CompanyAccountingBody
)=>{
   const {data} = await axios.put<Pagination<CompanyAccounting>>(
    API_ROUTES.ACCOUNTING.COMPANY_ALL_CASH,
    body,
    {params}
   );
   return data; 
}
const getDetails = async (params: CompanyAccountingDetailsParams) => {
  const { data } = await axios.get<Pagination<CompanyAccountingDetails>>(
    API_ROUTES.ACCOUNTING.COMPANY_DETAILS,
    { params }
  );
  return data;
};

const action = async (ids: string[]) => {
  const { data } = await axios.put(API_ROUTES.ACCOUNTING.COMPANY_ACTION, ids);
  return data;
};
export const companyAccountingAPI = { getAll, getAllCash, getDetails, action };
