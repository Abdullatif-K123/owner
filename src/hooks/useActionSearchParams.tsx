import { useSearchParams } from "react-router-dom";

const useActionSearchParams = ({
  idKey = "id",
  addKey = "add",
  editKey = "edit",
  detailsKey = "details",
  removeKey = "remove",
  virtualKey = "virtual",
  customKey = "custom",
  customBusKey = "customBus"
} = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isActive = [addKey, editKey, detailsKey, removeKey, customKey, customBusKey].includes(
    searchParams.get("mode") ?? ""
  );
  const isEdit = searchParams.get("mode") === editKey;
  const isDetails = searchParams.get("mode") === detailsKey;
  const isAdd = searchParams.get("mode") === addKey;
  const isRemove = searchParams.get("mode") === removeKey;
  const isVirtual = searchParams.get("mode") === virtualKey;
  const isCustom = searchParams.get("mode") === customKey;
  const isCustomBus = searchParams.get("mode") === customBusKey;
  const id =
    isEdit || isRemove || isDetails || virtualKey
      ? searchParams.get(idKey)
      : "";
  const clearActionParams = () => {
    searchParams.delete(idKey);
    searchParams.delete("mode");
    setSearchParams(searchParams, { replace: true });
  };
  return {
    id: id ? id : "",
    isActive,
    isEdit,
    isDetails,
    isRemove,
    isAdd,
    isVirtual,
    isCustom,
    isCustomBus,
    clearActionParams,
  };
};
export default useActionSearchParams;
