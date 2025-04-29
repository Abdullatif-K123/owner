import API_ROUTES from "../../../constants/apiRoutes";
import axios from "../../../lib/axios";
import { Pagination } from "../../../types/api";
import {
  Notification,
  NotificationGetALlParams,
  NotificationReadParams,
} from "./types";

const getAll = async (params: NotificationGetALlParams) => {
  const { data } = await axios.get<Pagination<Notification>>(
    API_ROUTES.NOTIFICATION.GET_ALL,
    {
      params,
    }
  );
  return data;
};

const readNotification = async (params: NotificationReadParams) => {
  const { data } = await axios.post(API_ROUTES.NOTIFICATION.READ, null, {
    params,
  });
  return data;
};

const getNotificationNumber = async ()=>{
   const {data} = await axios.get(API_ROUTES.NOTIFICATION.GET_COUNT);
   return data; 
}
export const NotifyApi = { getAll, readNotification, getNotificationNumber};
