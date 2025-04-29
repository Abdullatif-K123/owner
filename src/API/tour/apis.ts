import API_ROUTES from "../../constants/apiRoutes";
import { API_BASE_URL } from "../../constants/domain";
import axios from "../../lib/axios";
import { Pagination } from "../../types/api";
import {
  AddTourBody,
  BookedChair,
  EditTourTimePayload,
  EditBusNumberPayload,
  RefundParams,
  TourBookBody,
  TourCustomer,
  TourCustomerAction,
  TourCustomerListAction,
  TourCustomersList,
  TourDetails,
  TourDetailsForCustomer,
  TourGetCustomersParams,
  ToursGetAll,
  ToursGetAllParams,
} from "./types";

const getAllCities = async () => {
  const { data } = await axios.get(
    `${API_BASE_URL}/${API_ROUTES.CITY.GET_ALL}`
  );
  return data;
};

const getBussesSelect = async (branchId: string) => {
  const body = branchId.length > 0 ? [branchId] : [];
  console.log(body);
  const { data } = await axios.put(
    `${API_BASE_URL}/${API_ROUTES.BUS.BUSSES_SELECT}`,
    body
  );
  return data;
};

const tourAction = async (body: AddTourBody) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/${API_ROUTES.TOUR.ACTION}`,
    body
  );
  return data;
};

const toursGetAll = async (
  params: ToursGetAllParams,
  branchId: string
): Promise<ToursGetAll> => {
  // 7969e157-72ae-4db3-8a10-08dc18434f06
  const body = branchId.length > 0 ? [branchId] : [];
  const { data } = await axios.put<ToursGetAll>(
    `${API_BASE_URL}/${API_ROUTES.TOUR.GET_ALL}`,
    body,
    { params }
  );
  return data;
};

const getDetails = async (id: string) => {
  const { data } = await axios.get<TourDetails>(API_ROUTES.TOUR.GET_DETAILS, {
    params: { tourId: id },
  });
  return data;
};

const remove = async (tourId: string) => {
  const { data } = await axios.delete(API_ROUTES.TOUR.REMOVE, {
    params: { tourId },
  });
  return data;
};

// ================= RESERVATIONS API FUNCTIONS ===================

const getCustomers = async (params: TourGetCustomersParams) => {
  const { data } = await axios.get<Pagination<TourCustomer>>(
    API_ROUTES.CUSTOMER_TOUR.GET_CUSTOMERS,
    { params }
  );
  return data;
};

const getCustomersList = async (id: string) => {
  const { data } = await axios.get<TourCustomersList[]>(
    API_ROUTES.CUSTOMER_TOUR.GET_CUSTOMERS_LIST,
    { params: { tourId: id } }
  );
  return data;
};

const unbook = async ({ body }: { body: TourBookBody }) => {
  const { data } = await axios.delete<true>(
    API_ROUTES.CUSTOMER_TOUR.REMOVE_CUSTOMER,
    {
      data: body,
    }
  );
  return data;
};

const getForCustomer = async (params: { tourId: string }) => {
  const { data } = await axios.get<TourDetailsForCustomer>(
    API_ROUTES.CUSTOMER_TOUR.GET,
    {
      params,
    }
  );
  data.model.module = parseModelArray(data.model.module as unknown as string);
  return data;
};

const customerAction = async (body: TourCustomerAction) => {
  const { data } = await axios.post<string>(
    API_ROUTES.CUSTOMER_TOUR.ACTION_CUSTOMER,
    body
  );
  return data;
};

const customerListAction = async (body: TourCustomerListAction) => {
  const { data } = await axios.post<boolean>(
    API_ROUTES.CUSTOMER_TOUR.ACTION_CUSTOMER_LIST,
    body
  );
  return data;
};

const getBusBookedChairs = async (tourId: string) => {
  // await new Promise((res) => setTimeout(res, 10000));
  const { data } = await axios.get<BookedChair[]>(
    API_ROUTES.CUSTOMER_TOUR.GET_CUSTOMER_CHAIRS_REALTIME,
    {
      params: { tourId },
    }
  );
  return data;
};

const getDownload = async (param: string) => {
  const res = await axios.put(API_ROUTES.TOUR.Downloadfile, null, {
    params: { tourId: param },
    responseType: "blob",
  });

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

const refund = async (params: RefundParams) => {
  const { data } = await axios.put<true>(
    API_ROUTES.CUSTOMER_TOUR.REFUND,
    null,
    { params }
  );
  return data;
};

const editTourTime = async (body: EditTourTimePayload) => {
  const { data } = await axios.post<true>(API_ROUTES.TOUR.ChangeTime, body);
  return data;
};

const editBusName = async (body: EditBusNumberPayload) =>{
  const { tourId, busName } = body;

  // Use query parameters instead of sending body
  const { data } = await axios.put<true>(`${API_ROUTES.TOUR.ChangeBusName}?tourId=${tourId}&busName=${encodeURIComponent(busName)}`);
  
  return data;
}
export const API = {
  getAllCities,
  getBussesSelect,
  tourAction,
  toursGetAll,
  getDetails,
  remove,
  getCustomers,
  getCustomersList,
  unbook,
  getForCustomer,
  customerAction,
  customerListAction,
  getBusBookedChairs,
  getDownload,
  refund,
  editTourTime,
  editBusName
};

export function parseModelArray(str: string): (number | null)[] {
  try {
    return JSON.parse(str) as (number | null)[];
  } catch {
    return [];
  }
}
