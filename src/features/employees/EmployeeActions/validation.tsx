import * as yup from "yup";

import { EmployeePayload } from "@/API/employees/types";

const userNameRegex = /^[a-z0-9_-]*$/i;
const phoneNumberRegex = /^(0?9([0-9]{8}))$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?[\]\\|])\S{8,}$/;

const passwordValidationMsg =
  "يجب أن تحوي على الأقل على حرف كبير، حرف صغير، حرف خاص، رقم";
const usernameValidationMsg =
  "يجب ان يكون بالانجليزية او ارقام او _ - وبدون فراغات";
const minValidationMsg = "كلمة المرور يجب ان تكون على الاقل 8 حرف";

export const employeeSchema: yup.ObjectSchema<EmployeePayload> = yup.object({
  id: yup.string().required(),
  firstName: yup.string().required("الحقل مطلوب"),
  lastName: yup.string().required("الحقل مطلوب"),
  username: yup
    .string()
    .required("الحقل مطلوب")
    .matches(userNameRegex, usernameValidationMsg),
  password: yup
    .string()
    .min(8, minValidationMsg)
    .when("id", {
      is: (id: string) => id === "00000000-0000-0000-0000-000000000000",
      then: (schema) =>
        schema
          .required("الحقل مطلوب")
          .matches(passwordRegex, passwordValidationMsg),
    }),
  phoneNumber: yup
    .string()
    .required("الحقل مطلوب")
    .matches(phoneNumberRegex, "يجب ان يكون رقم هاتف سوري"),
  branchId: yup.string().required("الحقل مطلوب"),
  isPrimary: yup.bool().required(),
});

export const EmployeeDefualts = {
  id: "00000000-0000-0000-0000-000000000000",
  firstName: "",
  lastName: "",
  username: "",
  phoneNumber: "",
  branchId: "",
  isPrimary: false,
} as EmployeePayload;
