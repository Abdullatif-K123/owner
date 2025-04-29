import { ReactNode, useEffect, useState } from "react";
import { RoleProvider as Provider } from "../contexts/RoleContext";
import { storage } from "../utils/storage";
import decodeJWT, { JWTPayload } from "../utils/JWTDecoder";
import { UserKind } from "../constants/enums";

type Props = {
  children: ReactNode;
};

const RoleProvider = ({ children }: Props) => {
  const [isStaff, setIsStaff] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const token = storage.getToken();
  const decodedJWT = decodeJWT(token ?? "");
  const [tokenPayload] = useState<JWTPayload | null>(
    decodedJWT ? decodedJWT.payload : null
  );

  // Now I don't know why I used useEffect to set the data 🤔༼ つ ◕_◕ ༽つ
  // stupid me! just set it directly with state's initial value
  // And why am I using states anyway 🤦‍♀️
  // OMG! WHY DID I USE CONTEXT IN THE FIRST PLACE!!

  useEffect(() => {
    setIsStaff(checkRole(UserKind.OwnerStaff));
    setIsOwner(checkRole(UserKind.Owner));
    setIsManager(checkRole(UserKind.BranchManager));
  }, []);

  function checkRole(role: UserKind) {
    const token = storage.getToken();
    const decodedJWT = decodeJWT(token ?? "");
    return decodedJWT && decodedJWT.payload.UserKind === role;
  }

  return (
    <Provider value={{ isStaff, isOwner, isManager, tokenPayload }}>
      {children}
    </Provider>
  );
};

export default RoleProvider;
