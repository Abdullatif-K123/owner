import { UniqueIdentifier } from "@dnd-kit/core";
import { Gender, PaymentType, TourStatus } from "../../constants/enums";
import { PaginationParams } from "../../types/api";

export type cityObj = { id: UniqueIdentifier; name: string };

export type AddTourBody = {
  id: string;
  name: string;
  branchId: string;
  busId: string;
  chairPrice: number;
  leaveDate: string;
  arriveDate: string;
  tourCities: TourCitiesObj[];
  driverName: string;
  driverphoneNumber: string;
  anotherDriverphoneNumber?: string;
  coDriverName?: string;
  coDriverPhoneNumber?: string;
  anotherCoDriverPhoneNumber?: string;
};

export type TourCitiesObj = {
  cityId: UniqueIdentifier;
  breakTime: number;
  // time: string;
};

export type TimeValues = {
  breakTime: number;
  time: string;
};

export type timeChangeParams = {
  time?: string;
  breakTime?: number;
  readonly [key: string]: string | number | undefined; // Add this line
};

export type ToursGetAll = {
  pageNumber: number;
  totalPages: number;
  totalDataCount: number;
  data: {
    id: string;
    name: string;
    busName: string;
    branchName: string;
    canEdit: boolean;
    leaveDate: string;
    arriveDate: string;
    rate: number;
    ratedCustomerCount: number;
    cities: [string];
    chairsCount: number;
    chairsBlockedCount: number;
    chairsFreeCount: number;
    tourStatus: number;
    branchId: string;
  }[];
};

export type ToursGetAllParams = {
  pageNumber?: number;
  query?: string;
  tourStatus?: number | null;
  from: string | null;
  to: string | null;
};

export type TourDetails = {
  id: string;
  name: string;
  branchId: string;
  branchName: string;
  busId: string;
  busName: string;
  chairPrice: number;
  leaveDate: string;
  arriveDate: string;
  tourCities: TourCity[];
  driverName: string;
  driverphoneNumber: string;
  anotherDriverphoneNumber: string;
  coDriverName: string;
  coDriverPhoneNumber: string;
  anotherCoDriverPhoneNumber: string;
  busImageUrl: string;
  plateImageUrl: string;
  tourStatus: number;
  chairsCount: number;
  chairsBlockedCount: number;
  chairsFreeCount: number;
  model: {
    id: string;
    name: string;
    module: string;
    chairCount: number;
    columnCount: number;
  };
  genderDiscrimination: true;
};

export type TourCity = {
  id: string;
  cityId: string;
  cityName: string;
  time: string;
  breakTime: number;
};
// =============== RESERVATIONS TYPES ====================

export type TourGetCustomersParams = PaginationParams & { tourId: string };
export type TourCustomer = {
  id: string;
  amount: number;
  tourCustomerChairId: string;
  tourCustomerId: string;
  tourName: string;
  code: string;
  tourId: string;
  chairNumber: number;
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  city: string;
  birthDate: string;
  phomeNumber: string;
  nationalNumber: string;
  bookingType: number;
  gender: number;
  isPaid: boolean;
  paymentType: PaymentType;
  customerName: string;
  customerPhoneNumber: string;
  boockingDate: string;
  canCancel: boolean;
  employeeName: string;
  mustColor: boolean;
};

export type TourCustomersList = TourCustomer;

export type TourCustomerAction = {
  tourCustomerChairId?: string;
  tourId: string;
  tourCustomerId?: string;
  customerFirstName: string;
  customerLastName: string;
  fatherName?: string;
  motherName?: string;
  city?: string;
  birthDate?: string;
  customerNationalNumber?: string;
  customerPhoneNumber?: string;
  isPaid?: boolean;
  bookingType: number;
  gender: number;
  chairNumber: number;
  amount: number;
};

export type TourCustomerListAction = Omit<
  TourCustomerAction,
  | "chairNumber"
  | "gender"
  | "tourCustomerChairId"
  | "tourCustomerId"
  | "bookingType"
> & {
  chairs: ChairType[];
};

export type ChairType = {
  chairNumber: number;
  gender: Gender;
};

export type TourBookBody = string[];
export type BookedChair = {
  chairNumber: number;
  customerId: string;
  gender: Gender;
  isPrimary: boolean;
  isSecondary: boolean;
  isCompleted?: boolean;
};

export type TourDetailsForCustomerParams = {
  tourId: string;
};

export type TourDetailsForCustomer = {
  id: string;
  rate: number;
  tourStatus: TourStatus;
  name: string;
  branchName: string;
  chairPrice: number;
  leaveDate: string;
  arriveDate: string;
  chairsCount: number;
  chairsBlockedCount: number;
  chairsFreeCount: number;
  tourCities: TourDetailsCity[];
  busImageUrl: string;
  customerHasChairs: boolean;
  model: BusModel;
  genderDiscrimination: boolean;
};

export type BusModel = {
  id: string;
  name: string;
  module: (number | null)[];
  chairCount: number;
  columnCount: number;
};

export type TourDetailsCity = {
  id: string;
  cityId: string;
  cityName: string;
  time: string;
  breakTime: number;
};

export type RefundParams = {
  tourId: string;
  tourCustomerChairId: string;
  amount: number;
};

export type EditTourTimePayload = {
  id: string;
  leaveDate: string;
  arriveDate: string;
};

export type EditBusNumberPayload = {
  tourId: string; 
   busName: string;
}