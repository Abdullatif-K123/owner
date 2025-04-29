import { Gender } from "../../../../constants/enums";
import * as yup from "yup";
import { TourCustomerForm, TourCustomerListForm } from "./type";
import { ChairType } from "@/API/tour/types";

export const mobileNumberRegex = /(^(([0-9]{10}))$)|(^$)/;
export const nationalNumberRegex = /(^([0-9]{11})$)/;

export const tourCustomerActionDefault: TourCustomerForm = {
  chairNumber: 0,
  firstName: "",
  fatherName: "",
  motherName: "",
  city: "",
  isPaid: false,
  gender: Gender.Male,
  lastName: "",
  nationalNumber: "",
  phoneNumber: "",
  amount: 0,
};

const tourCustomerActionSchema: yup.ObjectSchema<TourCustomerForm> = yup
  .object()
  .shape({
    firstName: yup.string().trim().required("الحقل مطلوب"),
    lastName: yup.string().trim().required("الحقل مطلوب"),
    fatherName: yup.string(),
    motherName: yup.string(),
    birthDate: yup.string(),
    city: yup.string(),
    gender: yup.number().required("الحقل مطلوب"),
    nationalNumber: yup.string().trim(),
    phoneNumber: yup
      .string()
      .trim()
      .matches(mobileNumberRegex, "يجب ان يكون رقم هاتف سوري"),
    isPaid: yup.bool(),
    chairNumber: yup
      .number()
      .transform((value) => (value !== 0 ? value : undefined))
      .required("الحقل مطلوب"),
    amount: yup
      .number()
      .required("الحقل مطلوب")
      .typeError("أرقام فقط")
      .min(0, "قيم موجبة فقط"),
  });

export const tourCustomerListActionSchema: yup.ObjectSchema<TourCustomerListForm> =
  yup.object().shape({
    tourId: yup.string().required(""),
    customerFirstName: yup.string().trim().required("الحقل مطلوب"),
    customerLastName: yup.string().trim().required("الحقل مطلوب"),
    fatherName: yup.string(),
    motherName: yup.string(),
    birthDate: yup.string(),
    city: yup.string(),
    customerNationalNumber: yup.string().trim(),
    customerPhoneNumber: yup
      .string()
      .trim()
      .matches(mobileNumberRegex, "يجب ان يكون رقم هاتف سوري"),
    isPaid: yup.bool(),
    chairs: yup
      .array()
      .of(yup.mixed<ChairType>().required())
      .min(1, "يرجى تحديد مقعد على الأقل")
      .required("الحقل مطلوب"),
    amount: yup
      .number()
      .required("الحقل مطلوب")
      .typeError("أرقام فقط")
      .min(0, "قيم موجبة فقط"),
  });

export const tourCustomerListActionDefault: TourCustomerListForm = {
  tourId: "",
  customerFirstName: "",
  customerLastName: "",
  fatherName: "",
  motherName: "",
  city: "",
  customerNationalNumber: "",
  customerPhoneNumber: "",
  isPaid: false,
  chairs: [],
  amount: 0,
};

export default tourCustomerActionSchema;
