import { Gender } from "@/constants/enums";
import { PaginationParams } from "../../types/api";

// main accounting page types
export type AccountingParams = PaginationParams & {
  // from: string;
  // to: string;
  userId: string | null;
  branchId: string | null;
};

export type Accounting = {
  tourId: string;
  leaveDate: string;
  tourName: string;
  busName: string;
  branchName: string;
  recievedAmount: number;
  cashedAmount: number;
};

// accounting analytics types
export type AccountingAnalyticsParams = {
  // from: string;
  // to: string;
  userId: string | null;
  branchId: string | null;
};

export type AccountingAnalytics = {
  generalSandook: number;
  tourSandook: number;
  recievedTour: number;
  cashTour: number;
  total: number;
};

// accounting - second page types - staffs
export type AccountingDetailsParams = PaginationParams & { tourId: string };

export type AccountingDetails = {
  ownerStaffId: string;
  fullName: string;
  recievedAmount: number;
  cashedAmount: number;
};

// accounting - third page types - tours
export type AccountingTourDetailsParams = PaginationParams & {
  tourId: string;
  ownerStaffId: string;
};

export type AccountingTourDetails = {
  id: string;
  customerName: string;
  chairNumber: string;
  tourName: string;
  date: string;
  gender: Gender;
  amount: number;
};

// accounting - boxes types
export type AccountingBoxesDetailsParams = {
  tourId: string;
};

export type AccountingBoxesDetails = {
  name: string;
  amount: number;
  description?: string;
  id: string;
};

// accounting - action body types
export type AccountingBody = {
  id: string;
  name: string;
  description?: string;
  amount: number;
  date: string;
  recievedUserId?: string | null;
  tourId?: string | null;
};

// accounting - recieved & cashed action types
export type AccountingRecieveActionBody = {
  recievedOwnerStaffId: string;
};

// general boxess
export type GeneralBoxesRecieveBody = {
  ownerStaffId: string;
};

// owner staff download excel type
export type DownloadGeneralStaff = {
   tourId: string; 
   ownerStaffId: string;
}
export type DownlaodTourFinance = {
   branchId: string; 
   userId: string; 
}