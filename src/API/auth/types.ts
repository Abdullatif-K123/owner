import { UserKind } from "@/constants/enums";

export type RegisterationPhoneNumber = {
  mobileNumber: string;
  isRegister: boolean;
};

export type RegisterVerificationBody = {
  phoneNumber: string;
  verificationCode: string;
  fcmToken: string;
  isUpdated: boolean;
  dialCode: string;
};

export type RegisterVerification = {
  data: {
    id: string;
    token: string;
    step: number;
    userkind: UserKind;
  };
};

export type Createaccount1 = {
  firstName: string;
  lastName: string;
  gender?: number;
  // mobileNumber?: string | undefined;
};

export type Createaccount2 = {
  id: string;
  name: string;
  address: string;
  city: string;
  regionId: string;
  phoneNumber: string;
  anotherPhoneNumber?: string;
  landLineNumber?: string;
  anotherLandLineNumber?: string;
  genderDiscrimination: boolean;
  ownerMobileNumber: string;
};

export type Cities = { name: string; id: string }[];

export type LoginUsernamePasswordBody = {
  userName: string;
  password: string;
  fcmToken?: string;
};
