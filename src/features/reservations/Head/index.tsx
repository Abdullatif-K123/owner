import { Button, Grid } from "@mui/material";
import FilterRow from "../../../components/layout/FilterRow";
import TableExport from "./TableExportButton";
import CancelReservationButton from "./CancelReservationButton";
import SearchInput from "../../../components/inputs/SearchInput";
import ShowReservationButton from "./ShowReservationButton";
import RefundModal from "../Refund";
import { useRoleContext } from "@/contexts/RoleContext";
 
import TourActions from "@/features/tours/Actions";
import { useParams, useSearchParams } from "react-router-dom";
import SecurityListExportButton from "@/features/reservations/Head/SecurityListExportButton";
import useEventSearchParams from "@/hooks/useEventSearchParams";
const Head = () => {
  const {custom} = useEventSearchParams({
    customKey: "editTime",
  });
  const { id = '' } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isFinishedString = searchParams.get("finished");
  
  const isFinishe = (value) => {
    return value === 'true' || value === '1' || value?.toLowerCase() === 'yes';
  };

  const isFinished = isFinishe(isFinishedString);

  const { isOwner } = useRoleContext();
  if (isOwner) {
    return (
      <FilterRow py={1} alignItems="center">
        <Grid item xs={6} lg={2}>
          <TableExport />
        </Grid>
        <Grid item xs={6} lg={2}>
          <SecurityListExportButton />
        </Grid>
        <Grid item xs={6} lg={2}>
          <ShowReservationButton />
        </Grid>
        <Grid item xs={6} lg={4}>
          <SearchInput />
        </Grid>
        <Grid item xs={6} lg={2}>
    
    <Button
      type="button"
      variant="contained"
      sx={{
        fontSize: { xs: 10, sm: 15 },
        minWidth: 140,
      }}
      onClick={() => custom(id)}
      disabled={isFinished}
    >
      تعديل الوقت
    </Button>
    </Grid>
      </FilterRow>
    );
  }
  return (
    <FilterRow py={1} alignItems="center">
      <Grid item xs={6} lg={2}>
        <TableExport />
      </Grid>
      <Grid item xs={6} lg={2}>
        <SecurityListExportButton />
      </Grid>
      <Grid item xs={6} lg={2}>
        <CancelReservationButton />
      </Grid>
      <Grid item xs={6} lg={2}>
        <ShowReservationButton />
      </Grid>
      <Grid item xs={6} lg={4}>
        <SearchInput />
      </Grid>
      <Grid item xs={6} lg={2}>
    
      <Button
        type="button"
        variant="contained"
        sx={{
          fontSize: { xs: 10, sm: 15 },
          minWidth: 140,
        }}
        onClick={() => custom(id)}
        disabled={isFinished}
      >
        تعديل الوقت
      </Button>
      </Grid>
      <RefundModal />
      <TourActions/>
    </FilterRow>
  );
};

export default Head;
