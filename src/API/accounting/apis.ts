import { Pagination, PaginationParams } from "@/types/api";
import API_ROUTES from "../../constants/apiRoutes";
import axios from "../../lib/axios";
import {
  AccountingBody,
  AccountingDetails,
  AccountingDetailsParams,
  Accounting,
  AccountingParams,
  AccountingTourDetailsParams,
  AccountingTourDetails,
  AccountingBoxesDetailsParams,
  AccountingBoxesDetails,
  AccountingAnalytics,
  AccountingAnalyticsParams,
  AccountingRecieveActionBody,
  DownloadGeneralStaff,
  DownlaodTourFinance,
} from "./types";

const getAll = async (params: AccountingParams) => {
  const { data } = await axios.put<Pagination<Accounting>>(
    API_ROUTES.ACCOUNTING.GET_ALL,
    null,
    { params }
  );
  return data;
};

const getAnalytics = async (params: AccountingAnalyticsParams) => {
  const { data } = await axios.put<AccountingAnalytics>(
    API_ROUTES.ACCOUNTING.GET_ANALYTICS,
    null,
    { params }
  );
  return data;
};

const getDetails = async (params: AccountingDetailsParams) => {
  const { data } = await axios.put<Pagination<AccountingDetails>>(
    API_ROUTES.ACCOUNTING.GET,
    null,
    { params }
  );
  return data;
};

const getTourDetails = async (params: AccountingTourDetailsParams) => {
  const { data } = await axios.put<Pagination<AccountingTourDetails>>(
    API_ROUTES.ACCOUNTING.GET_TOUR,
    null,
    { params }
  );
  return data;
};

const getBoxesDetails = async (params: AccountingBoxesDetailsParams) => {
  const { data } = await axios.put<AccountingBoxesDetails[]>(
    API_ROUTES.ACCOUNTING.GET_BOXES_DETAILS,
    null,
    { params }
  );
  return data;
};

const getGeneralBoxes = async (params: PaginationParams) => {
  const { data } = await axios.get<Pagination<AccountingBoxesDetails>>(
    API_ROUTES.ACCOUNTING.GET_GENERAL_BOXES,
    { params }
  );
  return data;
};

const action = async (body: AccountingBody) => {
  const { data } = await axios.post(API_ROUTES.ACCOUNTING.ACTION, body);
  return data;
};

const getCashed = async () => {
  const { data } = await axios.get<number>(API_ROUTES.ACCOUNTING.GET_CASHED);
  return data;
};

const getRecieved = async () => {
  const { data } = await axios.get<number>(API_ROUTES.ACCOUNTING.GET_RECIEVED);
  return data;
};

const recievedAction = async (body: AccountingRecieveActionBody) => {
  await axios.put(API_ROUTES.ACCOUNTING.RECIEVED_ACTION, null, {
    params: body,
  });
};

const cashedAction = async (body: AccountingRecieveActionBody) => {
  await axios.put(API_ROUTES.ACCOUNTING.CASHED_ACTION, null, { params: body });
};

const recieveToursAction = async (body: string[]) => {
  await axios.put(API_ROUTES.ACCOUNTING.RECIEVE_TOURS, body);
};

const removeSandookTour = async (id: string) => {
  await axios.delete(API_ROUTES.ACCOUNTING.REMOVE_SANDOOK_TOOR, {
    params: { id },
  });
};

const generalBoxesRecieve = async ({
  ids,
  ownerStaffId,
}: {
  ids: string[];
  ownerStaffId: string;
}) => {
  const { data } = await axios.put(
    API_ROUTES.ACCOUNTING.RECIVE_GENERAL_BOXES,
    ids,
    { params: { ownerStaffId } }
  );
  return data;
};

const ownerRecievedAction = async (body: string[]) => {
  await axios.put(API_ROUTES.ACCOUNTING.OWNER_RECIEVED_ACTION, body);
};

const ownerFinishedAction = async (body: string[]) => {
  await axios.put(API_ROUTES.ACCOUNTING.OWNER_FINISHED_ACTION, body);
};

const getDownloadSandookGeneral = async () => {
  const res = await axios.put(
    API_ROUTES.ACCOUNTING.GET_GENERAL_SANDOOK_ASEXCEL,
    null,
    {
      responseType: "blob",
    }
  );

  if (res !== undefined && res !== null) {
    if (res.headers !== null && res.headers !== undefined) {
      console.log(
        res.headers,
        res.headers["content-disposition"],
        res.headers["content-type"]
      );
    }
  }
  return res;
};
const getDownloadOnwerStaff = async (param: string) => {
  const res = await axios.put(
    API_ROUTES.ACCOUNTING.GET_TOUR_OWNER_STAFFS_ASEXCEL,
    null,
    {
      params: { tourId: param },
      responseType: "blob",
    }
  );

  if (res !== undefined && res !== null) {
    if (res.headers !== null && res.headers !== undefined) {
      console.log(
        res.headers,
        res.headers["content-disposition"],
        res.headers["content-type"]
      );
    }
  }
  return res;
};
const getDownloadAccountingDetails = async (param: string) => {
  const res = await axios.put(
    API_ROUTES.ACCOUNTING.GET_TOUR_SANDOOK_DETAILS_ASEXCEL,
    null,
    {
      params: { tourId: param },
      responseType: "blob",
    }
  );

  if (res !== undefined && res !== null) {
    if (res.headers !== null && res.headers !== undefined) {
      console.log(
        res.headers,
        res.headers["content-disposition"],
        res.headers["content-type"]
      );
    }
  }
  return res;
};
const getDownloadownerStaffDetails = async (params: DownloadGeneralStaff) => {
  const res = await axios.put(
    API_ROUTES.ACCOUNTING.GET_TOUR_OWNER_STAFF_DETAILS_ASEXCEL,
    null,
    {
      params: { tourId: params.tourId, ownerStaffId: params.ownerStaffId },
      responseType: "blob",
    }
  );

  if (res !== undefined && res !== null) {
    if (res.headers !== null && res.headers !== undefined) {
      console.log(
        res.headers,
        res.headers["content-disposition"],
        res.headers["content-type"]
      );
    }
  }
  return res;
};
const getDownloadTourFinance = async (params: DownlaodTourFinance) => {
  const res = await axios.put(
    API_ROUTES.ACCOUNTING.GET_TOUR_FINANCE_ASEXCEL,
    null,
    {
      params: { branchId: params.branchId, userId: params.userId },
      responseType: "blob",
    }
  );

  if (res !== undefined && res !== null) {
    if (res.headers !== null && res.headers !== undefined) {
      console.log(
        res.headers,
        res.headers["content-disposition"],
        res.headers["content-type"]
      );
    }
  }
  return res;
};

export const accountingAPI = {
  getAll,
  getDetails,
  action,
  getTourDetails,
  getBoxesDetails,
  getAnalytics,
  recievedAction,
  cashedAction,
  getCashed,
  getRecieved,
  recieveToursAction,
  removeSandookTour,
  getGeneralBoxes,
  generalBoxesRecieve,
  ownerRecievedAction,
  ownerFinishedAction,
  getDownloadSandookGeneral,
  getDownloadAccountingDetails,
  getDownloadOnwerStaff,
  getDownloadownerStaffDetails,
  getDownloadTourFinance,
};
