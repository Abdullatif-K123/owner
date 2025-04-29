import Error from "../../../../components/feedback/Error";
import Loading from "../../../../components/feedback/Loading";
import { toursQueries } from "../../../../API/tour/queries";
import Details from "./Details";

const TourDetails = ({ id }: { id: string }) => {
  const { data, isLoading, isError, error, refetch } =
    toursQueries.useDetailsQuery(id);
  return (
    <>
      {isLoading && <Loading />}
      {isError && <Error error={error} retry={refetch} />}
      {data && <Details data={data} />}
    </>
  );
};

export default TourDetails;
