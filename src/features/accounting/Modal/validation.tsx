import { AccountingBody } from "@/API/accounting/types";
import { dateToIso } from "@/utils/transforms";
import * as yup from "yup";

export const accountignSchema: yup.ObjectSchema<AccountingBody> = yup.object({
  id: yup.string().required(),
  name: yup.string().required("الحقل مطلوب"),
  description: yup.string(),
  date: yup.string().required("الحقل مطلوب"),
  amount: yup.number().required("الحقل مطلوب"),
  recievedUserId: yup.string().nullable(),
  tourId: yup.string().nullable(),
});

export const accountignDefualts = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "",
  description: "",
  amount: 0,
  date: dateToIso(new Date().toString()),
  recievedUserId: null,
  tourId: null,
} as AccountingBody;
