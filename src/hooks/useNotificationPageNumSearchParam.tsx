import { useSearchParams } from "react-router-dom";

function useNotificationPageNumSearchParam(key = "np") {
  const [searchParams] = useSearchParams();
  try {
    const pageNumber = Number(searchParams.get(key) ?? 0);
    return pageNumber;
  } catch (err) {
    return 0;
  }
}
export default useNotificationPageNumSearchParam;
