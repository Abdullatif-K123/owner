import { TourCitiesObj } from "../tour/types";

export type VirtualGetAllParams = {
  pageNumber?: number;
  query?: string;
  tourStatus?: number | null;
};

export type VirtualGetAll = {
  pageNumber: number;
  totalPages: number;
  totalDataCount: number;
  data: [
    {
      id: string;
      branchId: string;
      tourStatus: number;
      name: string;
      branchName: string;
      leaveDate: string;
      arriveDate: string;
      rate: number;
      ratedCustomerCount: number;
      cities: string[];
      chairsCount: number;
      chairsBlockedCount: number;
      chairsFreeCount: number;
      canEdit: boolean;
      canCancel: boolean;
    }
  ];
};

export type AddVirtualBody = {
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

export type GetVirtualDetails = {
  id: string;
  name: string;
  branchId: string;
  branchName: string;
  busId: string;
  busName: string;
  chairPrice: 0;
  companyRatio: 0;
  leaveDate: string;
  arriveDate: string;
  tourCities: [
    {
      id: string;
      cityId: string;
      cityName: string;
      time: string;
      breakTime: 0;
    }
  ];
  driverName: string;
  driverphoneNumber: string;
  anotherDriverphoneNumber: string;
  coDriverName: string;
  coDriverPhoneNumber: string;
  anotherCoDriverPhoneNumber: string;
  busImageUrl: string;
  plateImageUrl: string;
  tourStatus: 0;
  chairsCount: 0;
  chairsBlockedCount: 0;
  chairsFreeCount: 0;
  model: {
    id: string;
    name: string;
    module: string;
    chairCount: 0;
    columnCount: 0;
  };
  genderDiscrimination: true;
};
