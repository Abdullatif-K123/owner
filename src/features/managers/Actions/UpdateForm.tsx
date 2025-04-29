import Error from "../../../components/feedback/Error";
import Loading from "../../../components/feedback/Loading";
import employeesQuery from "../../../API/managers/queries";
import { ManagerPayload } from "../../../API/managers/types";
import ManagerForm from "./ManagerForm";

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
  } as ManagerPayload;

  return (
    <>
      {isLoading && <Loading />}
      {isError && <Error error={error} retry={refetch} />}
      {data && (
        <ManagerForm defaultValues={defaults} defaultBranch={data?.branch} />
      )}
    </>
  );
};

export default UpdateForm;
