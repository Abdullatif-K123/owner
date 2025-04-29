import * as yup from "yup";
import { AddBranchType } from "../../API/branches/type";

export const mobileNumberRegex = /(^(([0-9]{10}))$)|(^$)/;
export const landLineRegex = /(^(0([0-9]{9}))$)|(^$)/;
export const userNameRegex = /^[a-z0-9_-]*$/i;

export const addBranchSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required("الحقل مطلوب"),
  cityId: yup.string().required("الحقل مطلوب"),
  regionId: yup.string().required("الحقل مطلوب"),
  phoneNumber: yup
    .string()
    .trim()
    .required("الحقل مطلوب")
    .matches(mobileNumberRegex, "يجب أن يكون رقم موبايل"),
  anotherPhoneNumber: yup
    .string()
    .trim()
    .matches(mobileNumberRegex, "يجب أن يكون رقم موبايل"),
  landLineNumber: yup
    .string()
    .trim()
    .matches(landLineRegex, "يجب أن يكون رقم هاتف أرضي"),
  anotherLandLineNumber: yup
    .string()
    .trim()
    .matches(landLineRegex, "يجب أن يكون رقم هاتف أرضي"),
  address: yup.string().required("الحقل مطلوب"),
  fileToRemoveIds: yup.array().of(yup.string().default("")),
  logoId: yup.string() ,
  genderDiscrimination: yup.boolean().required("الحقل مطلوب").oneOf([true, false]),
});

export const addBranch: AddBranchType = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "",
  address: "",
  phoneNumber: "",
  anotherPhoneNumber: "",
  landLineNumber: "",
  anotherLandLineNumber: "",
  regionId: "",
  cityId: "",
  logoId: "",
  fileToRemoveIds: [],
  genderDiscrimination: true,
};
