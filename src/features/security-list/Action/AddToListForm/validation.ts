import { CustomerBody } from "@/features/security-list/Action/AddToListForm/type";
import * as yup from "yup";

export const CustomerBodySchema: yup.ObjectSchema<CustomerBody> = yup
  .object()
  .shape({
    firstName: yup.string().trim().required("الحقل مطلوب"),
    lastName: yup.string().trim().required("الحقل مطلوب"),
    fatherName: yup.string(),
    motherName: yup.string(),
    birthDate: yup.string(),
    city: yup.string(),
    nationalNumber: yup.string().trim(),
    chairNumber: yup
      .number()
      .typeError("أرقام فقط")
      .required("الحقل مطلوب")
      .min(1, "يجب أن يكون رقم المقعد أكبر من 0"),
  });

export const CustomerBodyDefault: CustomerBody = {
  firstName: "",
  lastName: "",
  fatherName: "",
  motherName: "",
  city: "",
  nationalNumber: "",
};
