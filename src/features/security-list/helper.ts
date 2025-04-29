import { TourCustomer } from "@/API/tour/types";
import { CustomerBody } from "@/features/security-list/Action/AddToListForm/type";

export const getCustomerAsTourCustomer = (
  customer: CustomerBody
): TourCustomer => {
  return {
    chairNumber: customer.chairNumber ?? 0,
    birthDate: customer.birthDate ?? "",
    nationalNumber: customer.nationalNumber ?? "",
    fatherName: customer.fatherName ?? "",
    motherName: customer.motherName ?? "",
    city: customer.city ?? "",
    firstName: customer.firstName ?? "",
    lastName: customer.lastName ?? "",
    // dummy data
    id: "",
    amount: 0,
    tourCustomerChairId: "string",
    tourCustomerId: "string",
    tourName: "string",
    code: "string",
    tourId: "string",
    phomeNumber: "string",
    bookingType: 0,
    gender: 0,
    isPaid: false,
    paymentType: 0,
    customerName: "string",
    customerPhoneNumber: "string",
    boockingDate: "string",
    canCancel: false,
    employeeName: "string",
    mustColor: false,
  };
};
