import { useSearchParams } from "react-router-dom";
function useShrink() {
  const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode");
    let object = {}
    if(mode === "edit"){
        object = {...object, shrink: true}
    }
    return object;

}
export default useShrink;
