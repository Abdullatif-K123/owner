import { UserKind } from "../constants/enums";

export type JWTPayload = {
  UserKind: UserKind;
  Amir: "NoAmir" | "Amir";
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
};

const decodeJWT = (jwt: string) => {
  try {
    const tokens = jwt.split(".");
    // HEADER:ALGORITHM & TOKEN TYPE
    const header = JSON.parse(atob(tokens[0]));
    // PAYLOAD:DATA
    const payload: JWTPayload = JSON.parse(atob(tokens[1]));
    return { header, payload };
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default decodeJWT;
