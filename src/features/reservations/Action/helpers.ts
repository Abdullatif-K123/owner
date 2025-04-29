import { TourCustomer, TourCustomerAction } from "../../../API/tour/types";
import { BookingType } from "../../../constants/enums";
import { TourCustomerForm } from "./ReservationForm/type";

export function tourCustomerFormToBody(
  form: TourCustomerForm,
  data: TourCustomer | null,
  tourId: string
): TourCustomerAction {
  return {
    bookingType: BookingType.Office,
    ...data,
    gender: form.gender,
    chairNumber: form.chairNumber ?? 1,
    tourId,
    customerFirstName: form.firstName,
    customerLastName: form.lastName,
    customerPhoneNumber: form.phoneNumber,
    isPaid: form.isPaid,
    customerNationalNumber: form.nationalNumber,
    fatherName: form.fatherName,
    motherName: form.motherName,
    city: form.city,
    birthDate: form.birthDate,
    amount: form.amount,
  };
}

export function tourCustomerDetailsToForm(
  data: TourCustomer
): TourCustomerForm {
  return {
    gender: data.gender ?? 0,
    chairNumber: data.chairNumber,
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    fatherName: data.fatherName ?? "",
    motherName: data.motherName ?? "",
    city: data.city ?? "",
    birthDate: data.birthDate ?? "",
    isPaid: data.isPaid ?? false,
    nationalNumber: data.nationalNumber ?? "",
    phoneNumber: data.phomeNumber ?? "",
    amount: data.amount,
  };
}

export const stringToIso = (val: string) => {
  const date = val.split("-");
  const finalDate = new Date(
    Number(date[2]),
    Number(date[1]) - 1,
    Number(date[0]) + 1
  );
  return finalDate.toISOString();
};
