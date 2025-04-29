import usePrevious from "../../hooks/usePrevious";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useObjectSearchParam from "../../hooks/useObjectSearchParam";
import TextField from "../inputs/TextField";
import Loading from "../feedback/Loading";
import { SelectType } from "@/types/utils";
import StaffAutocomplete from "@/components/selects/StaffAutocomplete";

type Props = {
  label?: string;
  required?: boolean;
};

const StaffFilterAutocomplete = ({ label = "الموظف", required }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const staff = useObjectSearchParam<SelectType>("staff") || null;
  const branchId = useObjectSearchParam<SelectType>("branch")?.id ?? null;
  const prevbranchId = usePrevious(branchId);

  const handleChange = (staff: SelectType | null) => {
    if (staff) {
      searchParams.set("staff", JSON.stringify(staff));
      searchParams.set("p", "0");
    } else {
      searchParams.delete("staff");
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (branchId !== prevbranchId && prevbranchId !== undefined) {
      setSearchParams((searchParams) => {
        searchParams.delete("staff");
        return searchParams;
      });
    }
  }, [branchId, prevbranchId, setSearchParams]);

  return (
    <StaffAutocomplete
      value={staff}
      branchId={branchId}
      size="small"
      fullWidth
      loadingText={<Loading />}
      onChange={(_, value) => handleChange(value)}
      renderInput={(params) => (
        <TextField required={required} {...params} label={label} />
      )}
    />
  );
};
export default StaffFilterAutocomplete;
