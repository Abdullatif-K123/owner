export type RegisterationPhoneNumber = {
  mobileNumber: string;
  isRegister: boolean;
};

export type RegisterVerificationBody = {
  mobileNumber: string;
  code: string;
  fcmToken: string;
  isUpdated: boolean;
};

export type RegisterVerification = {
  id: string;
  token: string;
  step: number;
};

export type Createaccount1 = {
  firstName: string;
  lastName: string;
  gender?: number;
  mobileNumber?: string | undefined;
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
