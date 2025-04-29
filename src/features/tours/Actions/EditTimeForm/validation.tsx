import * as yup from "yup";
import { EditTourTimePayload } from "@/API/tour/types";

export const editTourTimeSchema = yup.object().shape({
  id: yup.string().required(),
  leaveDate: yup
    .string()
    .required("الحقل مطلوب")
    .test(
      "Required",
      "الحقل مطلوب",
      (value: string) => value !== "2024-01-01T07:00:00.334Z"
    ),
  arriveDate: yup
    .string()
    .required("الحقل مطلوب")
    .test(
      "Required",
      "الحقل مطلوب",
      (value: string) => value !== "2024-01-01T07:00:00.334Z"
    ),
});

export const editTourTimeDefaultValues: EditTourTimePayload = {
  id: "00000000-0000-0000-0000-000000000000",
  leaveDate: "",
  arriveDate: "",
};
