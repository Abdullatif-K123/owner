import { AddTourBody } from "@/API/tour/types";
import { virtualQueries } from "@/API/virtualTours/queries";
import Loading from "@/components/feedback/Loading";
import SomethingWentWrong from "@/components/feedback/SomethingWentWrong";
import AddForm from "@/features/tours/Actions/AddForm";

type Props = { id: string };

const VirtualTour = ({ id }: Props) => {
  const { data, isError, isLoading, isSuccess } =
    virtualQueries.useDetailsQuery(id);
  if (isLoading) return <Loading />;
  if (isError) return <SomethingWentWrong />;
  if (isSuccess) {
    const defaultValues = {
      id: "00000000-0000-0000-0000-000000000000",
      name: data?.name,
      branchId: data?.branchId,
      busId: data?.busId,
      chairPrice: data?.chairPrice,
      leaveDate: getCurrentDate(data.leaveDate),
      arriveDate: getCurrentDate(data.arriveDate),
      tourCities: data?.tourCities,
      driverName: data?.driverName,
      driverphoneNumber: data?.driverphoneNumber,
      anotherDriverphoneNumber: data?.anotherDriverphoneNumber,
      coDriverName: data?.coDriverName,
      coDriverPhoneNumber: data?.coDriverPhoneNumber,
      anotherCoDriverPhoneNumber: data?.anotherCoDriverPhoneNumber,
    } as AddTourBody;

    return <AddForm defaultValues={defaultValues} />;
  }

  return <></>;
};

export default VirtualTour;

function getCurrentDate(dateString: string | undefined) {
  if (!dateString) return "";
  const [, , , time] = dateString.split(/[-T]/);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentDay = String(currentDate.getDate()).padStart(2, "0");
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");

  const updatedDateString = `${currentYear}-${currentMonth}-${currentDay}T${time}`;
  return updatedDateString;
}
