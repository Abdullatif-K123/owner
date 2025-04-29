import { useSearchParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Fab, FabProps, Tooltip } from "@mui/material";

type Props = FabProps;
const AddFab = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = () => {
    searchParams.set("mode", "add");
    setSearchParams(searchParams);
  };
  return (
    <Tooltip title="إضافة">
      <Fab
        color="primary"
        onClick={handleClick}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        {...props}
      >
        <AddIcon sx={{ color: "white" }} />
      </Fab>
    </Tooltip>
  );
};
export default AddFab;
