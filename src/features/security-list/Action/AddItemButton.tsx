import { useSearchParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Tooltip } from "@mui/material";
import { TourCustomer } from "@/API/tour/types";
import { useSnackbarContext } from "@/contexts/snackBarContext";

const AddItemButton = ({
  list,
  setList,
}: {
  list: TourCustomer[];
  setList: React.Dispatch<React.SetStateAction<TourCustomer[]>>;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const Snackbar = useSnackbarContext();

  const handleClick = () => {
    if (list.length === 45) {
      const emptyItemIndex = list.findIndex(
        (el) => !el.firstName || el.firstName === ""
      );
      if (emptyItemIndex > -1) {
        setList((prev) => {
          const newArr = [...prev];
          newArr.splice(emptyItemIndex, 1);
          return newArr;
        });
      } else {
        Snackbar({
          message: "لا يمكن إضافة أكثر من 45 سجل",
          severity: "error",
        });
        return;
      }
    }
    searchParams.set("mode", "add");
    setSearchParams(searchParams);
  };
  return (
    <Tooltip title="إضافة">
      <Fab
        color="primary"
        onClick={handleClick}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon sx={{ color: "white" }} />
      </Fab>
    </Tooltip>
  );
};
export default AddItemButton;
