import { toursQueries } from "@/API/tour/queries";
import { EditTourTimePayload } from "@/API/tour/types";
import Loading from "@/components/feedback/Loading";
import SomethingWentWrong from "@/components/feedback/SomethingWentWrong";
import EditTimeForm from "@/features/tours/Actions/EditTimeForm/Form";

type Props = { id: string };

export const EditTourTime = ({ id }: Props) => {
  const { data, isError, isLoading, isSuccess } =
    toursQueries.useDetailsQuery(id);
  if (isLoading) return <Loading />;
  if (isError) return <SomethingWentWrong />;
  if (isSuccess) {
    const defaultValues: EditTourTimePayload = {
      id,
      leaveDate: data?.leaveDate,
      arriveDate: data?.arriveDate,
    };

    return <EditTimeForm defaultValues={defaultValues} />;
  }

  return <></>;
};
