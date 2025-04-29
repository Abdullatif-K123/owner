import { ToursGetAll } from "../API/tour/types";
import { useSearchParams } from "react-router-dom";

const useTourStatusFilter = (data: ToursGetAll["data"]) => {
  const [searchParams] = useSearchParams();
  const tourStatus = searchParams.get("tourStatusHome");

  const res = data.filter((item) => item.tourStatus === Number(tourStatus));
  return res;
};

export default useTourStatusFilter;
