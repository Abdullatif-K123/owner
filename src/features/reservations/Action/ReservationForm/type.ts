import { TourCustomerListAction } from "@/API/tour/types";
import { Gender } from "../../../../constants/enums";

export type TourCustomerForm = {
  firstName: string;
  lastName: string;
  fatherName?: string;
  motherName?: string;
  birthDate?: string;
  city?: string;
  nationalNumber?: string;
  phoneNumber?: string;
  isPaid?: boolean;
  chairNumber: number;
  gender: Gender;
  amount: number;
};

export type TourCustomerListForm = TourCustomerListAction;
