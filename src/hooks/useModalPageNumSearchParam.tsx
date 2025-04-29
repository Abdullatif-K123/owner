import { useSearchParams } from "react-router-dom";

function useModalPageNumSearchParam(key = "mp") {
  const [searchParams] = useSearchParams();
  try {
    const pageNumber = Number(searchParams.get(key) ?? 0);
    return pageNumber;
  } catch (err) {
    return 0;
  }
}
export default useModalPageNumSearchParam;
