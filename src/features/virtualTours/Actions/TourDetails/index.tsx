import Error from "../../../../components/feedback/Error";
import Loading from "../../../../components/feedback/Loading";
import Details from "./Details";
import { virtualQueries } from "@/API/virtualTours/queries";

const TourDetails = ({ id }: { id: string }) => {
  const { data, isLoading, isError, error, refetch } =
    virtualQueries.useDetailsQuery(id);
  return (
    <>
      {isLoading && <Loading />}
      {isError && <Error error={error} retry={refetch} />}
      {data && <Details data={data} />}
    </>
  );
};

export default TourDetails;
