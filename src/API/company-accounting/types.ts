import { PaymentType } from "../../constants/enums";
import { PaginationParams } from "../../types/api";

export type CompanyAccounting = {
  tourId: string;
  tourName: string;
  branchName: string;
  tourArriveDate: string;
  tourLeaveDate: string;
  companyPrice: number;
  ownerPrice: number;
  isCompanyConfirm: boolean;
  isOwnerConfirm: boolean;
};

export type CompanyAccountingParams = PaginationParams;

export type CompanyAccountingDetailsParams = PaginationParams & {
  tourId: string;
};

export type CompanyAccountingBody = {
  branchIds: string[] | null;
  from: string | null;
  to: string | null;
  isCompanyConfirm: boolean | null;
  isOwnerConfirm: boolean | null;
};

export type CompanyAccountingDetails = {
  tourName: string;
  customerName: string;
  branchName: string;
  companyPrice: number;
  ownerPrice: number;
  paymentType: PaymentType;
};
