import { toursQueries } from '@/API/tour/queries';
import { AddTourBody } from '@/API/tour/types';
import Loading from '@/components/feedback/Loading';
import SomethingWentWrong from '@/components/feedback/SomethingWentWrong';
import AddForm from '@/features/tours/Actions/AddForm';

type Props = { id: string };

export const EditTour = ({ id }: Props) => {
  const { data, isError, isLoading, isSuccess } = toursQueries.useDetailsQuery(id);
  if (isLoading) return <Loading />;
  if (isError) return <SomethingWentWrong />;
  if (isSuccess) {
    const defaultValues = {
      id,
      name: data?.name,
      branchId: data?.branchId,
      busId: data?.busId,
      chairPrice: data?.chairPrice,
      leaveDate: data?.leaveDate,
      arriveDate: data?.arriveDate,
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
