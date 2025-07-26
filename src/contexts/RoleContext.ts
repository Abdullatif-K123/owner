import { JWTPayload } from "@/utils/JWTDecoder";
import { createContext, useContext } from "react";

type RoleContextValue = {
  isStaff: boolean;
  isOwner: boolean;
  isManager: boolean;
  tokenPayload: JWTPayload | null;
};

const RoleContext = createContext<RoleContextValue>({
  isStaff: false,
  isOwner: true,
  isManager: false,
  tokenPayload: null,
});

export const useRoleContext = () => useContext(RoleContext);

export const RoleProvider = RoleContext.Provider;
