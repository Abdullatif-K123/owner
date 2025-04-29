import { toursQueries } from "@/API/tour/queries";
import { EditBusNumberPayload } from "@/API/tour/types";
import Loading from "@/components/feedback/Loading";
import SomethingWentWrong from "@/components/feedback/SomethingWentWrong";
import EditBusNumberForm from "./EditBusNumberForm";

type Props = { tourId: string };

export const EditBusForm = ({ tourId }: Props) => {
  const { data, isError, isLoading, isSuccess } =
    toursQueries.useDetailsQuery(tourId);
  if (isLoading) return <Loading />;
  if (isError) return <SomethingWentWrong />;
  if (isSuccess) {
    const defaultValues: EditBusNumberPayload = {
      tourId,
      busName: data?.busName
    };

    return <EditBusNumberForm defaultValues={defaultValues} />;
  }

  return <></>;
};
