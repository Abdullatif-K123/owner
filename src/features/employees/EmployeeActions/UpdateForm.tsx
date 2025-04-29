import Error from "../../../components/feedback/Error";
import Loading from "../../../components/feedback/Loading";
import employeesQuery from "../../../API/employees/queries";
import { EmployeePayload } from "../../../API/employees/types";
import EmployeeForm from "./EmployeeForm";

type Props = {
  id: string;
};
const UpdateForm = ({ id }: Props) => {
  const { data, isLoading, isError, error, refetch } =
    employeesQuery.useDetailsQuery(id);

  const defaults = {
    id: data?.id,
    firstName: data?.firstName,
    lastName: data?.lastName,
    username: data?.username,
    password: data?.password,
    branchId: data?.branch.id,
    phoneNumber: data?.phoneNumber,
    isPrimary: data?.isPrimary,
  } as EmployeePayload;

  return (
    <>
      {isLoading && <Loading />}
      {isError && <Error error={error} retry={refetch} />}
      {data && (
        <EmployeeForm defaultValues={defaults} defaultBranch={data?.branch} />
      )}
    </>
  );
};

export default UpdateForm;
