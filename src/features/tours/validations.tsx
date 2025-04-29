import * as yup from "yup";
import { AddTourBody } from "../../API/tour/types";

export const mobileNumberRegex = /(^(([0-9]{10}))$)|(^$)/;

export const addTourSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required("الحقل مطلوب"),
  branchId: yup.string().required("الحقل مطلوب"),
  busId: yup.string().required("الحقل مطلوب"),
  chairPrice: yup
    .number()
    .typeError("أرقام فقط")
    .required("الحقل مطلوب")
    .test("required", "الحقل مطلوب", (val: number) => val !== 0),
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
  tourCities: yup
    .array()
    .of(
      yup.object().shape({
        cityId: yup.string().required("الحقل مطلوب"),
        breakTime: yup.number().required("الحقل مطلوب"),
      })
    )
    .required("shit")
    .min(1, "الرجاء اختيار مدينة واحدة على الأقل"),
  driverName: yup.string().required("الحقل مطلوب"),
  driverphoneNumber: yup
    .string()
    .required("الحقل مطلوب")
    .matches(mobileNumberRegex, "يجب أن يكون رقم موبايل"),
  anotherDriverphoneNumber: yup
    .string()
    .test("regex", "يجب أن يكون رقم موبايل", (val) => {
      if (val && val.length > 0) {
        return mobileNumberRegex.test(val);
      }
      return true;
    }),
  // .matches(mobileNumberRegex, "يجب أن يكون رقم موبايل"),
  coDriverName: yup.string(),
  coDriverPhoneNumber: yup
    .string()
    .test("regex", "يجب أن يكون رقم موبايل", (val) => {
      if (val && val.length > 0) {
        return mobileNumberRegex.test(val);
      }
      return true;
    }),
  anotherCoDriverPhoneNumber: yup
    .string()
    .test("regex", "يجب أن يكون رقم موبايل", (val) => {
      if (val && val.length > 0) {
        return mobileNumberRegex.test(val);
      }
      return true;
    }),
});

export const addTour: AddTourBody = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "",
  branchId: "",
  busId: "",
  chairPrice: 0,
  leaveDate: "",
  arriveDate: "",
  tourCities: [],
  driverName: "",
  driverphoneNumber: "",
  anotherDriverphoneNumber: "",
  coDriverName: "",
  coDriverPhoneNumber: "",
  anotherCoDriverPhoneNumber: "",
};
