import { useSearchParams } from "react-router-dom";

const useEventSearchParams = ({
  detailsKey = "details",
  editKey = "edit",
  removeKey = "remove",
  customKey = "custom",
  customBus = "customBus"
} = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const edit = (id: string) => {
    searchParams.set("id", id);
    searchParams.set("mode", editKey);
    setSearchParams(searchParams);
    return true;
  };
  const details = (id: string) => {
 
    searchParams.set("id", id);
    console.log("id", id)
    searchParams.set("branch", "nothing");
    searchParams.set("mode", detailsKey);
    setSearchParams(searchParams);
  };
  const remove = (id: string) => {
    searchParams.set("DelId", id);
    searchParams.set("mode", removeKey);
    setSearchParams(searchParams);
    return true;
  };

  const custom = (id: string) => {
    searchParams.set("id", id);
    searchParams.set("mode", customKey);
    setSearchParams(searchParams);
    return true;
  };
  
  const customBues = (id: string) => {
    searchParams.set("id", id);
    searchParams.set("mode", customBus);
    setSearchParams(searchParams);
    return true;
  };
  
   
  return { edit, details, remove, custom, customBues };
};
export default useEventSearchParams;
