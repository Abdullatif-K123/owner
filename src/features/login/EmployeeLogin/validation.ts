import * as yup from "yup";
import { ObjectSchema } from "yup";
import { LoginUsernamePasswordBody } from "../../../API/auth/types";

export const loginDefault: LoginUsernamePasswordBody = {
  userName: "",
  password: "",
  fcmToken: ""
};

export const userNameRegex = /^[a-z0-9_-]*$/i;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?[\]\\|])\S{8,}$/;

const loginSchema: ObjectSchema<LoginUsernamePasswordBody> = yup.object({
  userName: yup
    .string()
    .trim()
    .required("الحقل مطلوب")
    .matches(
      userNameRegex,
      "يجب ان يكون بالانجليزية او ارقام او _ - وبدون فراغات"
    ),
  password: yup
    .string()
    .required("الحقل مطلوب")
    .min(8)
    .matches(
      passwordRegex,
      "يجب أن تحوي على الأقل على حرف كبير، حرف صغير، حرف خاص، رقم"
    ),
    fcmToken: yup
    .string()
});
export default loginSchema;
