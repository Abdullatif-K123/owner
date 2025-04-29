import * as yup from "yup";
import {
  RegisterVerificationBody,
  Createaccount1,
  Createaccount2,
} from "../../API/auth/types";

export const mobileNumberRegex = /(^(9([0-9]{8}))$)|(^$)/;
export const secondPhone = /(^(([0-9]{10}))$)|(^$)/;

export const landLineRegex = /(^(0([0-9]{9}))$)|(^$)/;
export const userNameRegex = /^[a-z0-9_-]*$/i;

export const registerMobileNumberSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .trim()
    .required("الحقل مطلوب")
    .matches(mobileNumberRegex, "يجب أن يكون رقم موبايل"),
  isRegister: yup.bool().required("الحقل مطلوب").oneOf([true, false]),
});

export const registerVerificationSchema = yup.object().shape({
  code: yup.string(),
});

export const registerVerificationDefault: RegisterVerificationBody = {
  mobileNumber: "",
  code: "",
  fcmToken: "",
  isUpdated: false,
};

export const createAccount1Schema = yup.object().shape({
  firstName: yup.string().required("الحقل مطلوب"),
  lastName: yup.string().required("الحقل مطلوب"),
  gender: yup.number().required("الحقل مطلوب"),
  mobileNumber: yup
    .string()
    .trim()
    .matches(mobileNumberRegex, "يجب أن يكون رقم موبايل"),
});

export const createAccount1: Createaccount1 = {
  firstName: "",
  lastName: "",
  // gender: 0,
  mobileNumber: "",
};

export const createAccount2Schema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required("الحقل مطلوب"),
  address: yup.string().required("الحقل مطلوب"),
  city: yup.string().required("الحقل مطلوب"),
  regionId: yup.string().required("الحقل مطلوب"),
  phoneNumber: yup
    .string()
    .trim()
    .required("الحقل مطلوب")
    .matches(secondPhone, "يجب أن يكون رقم موبايل"),
  anotherPhoneNumber: yup
    .string()
    .trim()
    .matches(secondPhone, "يجب أن يكون رقم موبايل"),
  landLineNumber: yup
    .string()
    .trim()
    .matches(landLineRegex, "يجب أن يكون رقم هاتف أرضي"),
  anotherLandLineNumber: yup
    .string()
    .trim()
    .matches(landLineRegex, "يجب أن يكون رقم هاتف أرضي"),
  genderDiscrimination: yup.bool().required("الحقل مطلوب").oneOf([true, false]),
  ownerMobileNumber: yup.string().required(),
});

export const createAccount2: Createaccount2 = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "",
  address: "",
  phoneNumber: "",
  anotherPhoneNumber: "",
  landLineNumber: "",
  anotherLandLineNumber: "",
  regionId: "",
  city: "",
  genderDiscrimination: true,
  ownerMobileNumber: "",
};

export const citiesDefault = [
  {
    id: "",
    name: "",
  },
];
