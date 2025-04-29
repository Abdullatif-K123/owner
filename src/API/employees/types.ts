import { BranchSelect } from "../branches/type";

export type EmployeesGetAllParams = {
  pageNumber?: number;
  query?: string;
  branchId: string | null;
};

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  branch: string;
  canEdit: boolean;
  isPrimary: boolean;
};

export type EmployeeDetailes = Omit<Employee, "branch"> & {
  branch: BranchSelect;
  password: string;
};

export type EmployeePayload = Omit<Employee, "branch" | "canEdit"> & {
  branchId: string;
  password?: string;
};
