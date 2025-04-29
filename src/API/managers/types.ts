import { BranchSelect } from "../branches/type";

export type ManagersGetAllParams = {
  pageNumber?: number;
  query?: string;
  branchId: string | null;
};

export type Manager = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  branch: string;
  isPrimary: boolean;
};

export type ManagerDetailes = Omit<Manager, "branch"> & {
  branch: BranchSelect;
  password: string;
};

export type ManagerPayload = Omit<Manager, "branch"> & {
  branchId: string;
  password?: string;
};
