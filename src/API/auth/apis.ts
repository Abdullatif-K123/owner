import axios from "../../lib/axios";
import { encryptor } from "../../utils/encryptor";
import {
  Createaccount1,
  Createaccount2,
  RegisterVerificationBody,
  RegisterationPhoneNumber,
  LoginUsernamePasswordBody,
} from "./types";
import API_ROUTES from "../../constants/apiRoutes";

export const API = {
  registerMobileNumber: async (body: RegisterationPhoneNumber) => {
    // TODO: what to do with this

    const finalBody = {
      ...body,
      dialCode: "963",
      userKind: 1,
    };

    const { data } = await axios.post(
      `${API_ROUTES.REGISTRATION.REGISTER}`,
      finalBody
    );
    return data;
  },
  verification: async (body: RegisterVerificationBody) => {
    // const encrypted = encryptor(`+963${body.mobileNumber}`);
    // if (!encrypted) throw new Error("Encryption failed!!");

    const finalBody = {
      ...body,
      dialCode: "963",
      // mobileNumber: encrypted,
    };

    const { data } = await axios.post<RegisterVerificationBody>(
      `${API_ROUTES.REGISTRATION.VERIFICATION}`,
      finalBody
    );

    console.log("data createAccount1", data);
    return data;
  },

  createAccount1: async (body: Createaccount1) => {
    const finalBody = {
      ...body,
      // mobileNumber: `0${body.mobileNumber}`,
    };

    const { data } = await axios.post<RegisterVerificationBody>(
      `${API_ROUTES.OWNER.FIRST_STEP_REGISTRATION}`,
      finalBody
    );
    return data;
  },

  createAccount2: async (body: Createaccount2) => {
    const encrypted = encryptor(`+963${body.ownerMobileNumber}`);
    if (!encrypted) throw new Error("Encryption failed!!");
    let finalBody = { ...body, ownerMobileNumber: encrypted };

    const { data } = await axios.post<RegisterVerificationBody>(
      `${API_ROUTES.OWNER.SECOND_STEP_REGISTRATION}`,
      finalBody
    );
    return data;
  },
  getCity: async () => {
    const { data } = await axios.get(`${API_ROUTES.CITY.GET_ALL}`);
    return data;
  },
  getRegion: async (body: string) => {
    const { data } = await axios.get(
      `${API_ROUTES.REGION.GET_REGION}?cityId=${body}`
    );
    return data;
  },
  loginUsernamePassword: async (body: LoginUsernamePasswordBody) => {
    const { data } = await axios.post(`${API_ROUTES.OwnerStaff.LOGIN}`, body);
    return data;
  },
};
