import ToursFilter from "./ToursFilter";
import { Stack } from "@mui/material";
import TourActions from "./Actions";
import AddFab from "../../components/buttons/AddFab";
import ToursTable from "./Table";
import "./index.css";

const ToursPage = () => {
  return (
    <>
      <Stack sx={{ display: "relative" }} spacing={2}>
        <ToursFilter />
        <ToursTable />
        <TourActions />
        <AddFab />
      </Stack>
    </>
  );
};

export default ToursPage;
