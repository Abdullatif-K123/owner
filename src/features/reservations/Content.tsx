import { useParams, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";

import ReservationsProvider from "./context/ReservationsProvider";
import Head from "./Head";
import ReservationsTable from "@/features/reservations/Table";
import BusDrawer from "./BusDrawer";
import Action from "./Action";
import ActionButton from "./Action/ActionButton";
import useRealTimeRevalidation from "@/hooks/useRealTimeRevalidations";
import { useRoleContext } from "@/contexts/RoleContext";
import useIsoToArabicDate from "@/hooks/useIsoToArabicDate";

const ReservationsContent = () => {
  const [params] = useSearchParams();
  const { id } = useParams();
  useRealTimeRevalidation(id ?? "");
  const { isOwner } = useRoleContext();

  const date = params.get("date");
  return (
    <ReservationsProvider>
      <Typography variant="h6" sx={{ mb: 3 }} color="primary">
        رحلة :{params.get("name") ?? ""} | {params.get("branch")}،{" "} الحافلة: {params.get("busName") ?? ""} {" ,"}
        {date && <>تاريخ المغادرة: {useIsoToArabicDate(date)}</>}
      </Typography>
      <Head />
      <ReservationsTable />
      <BusDrawer />
      {!isOwner && <ActionButton />}
      <Action />
    </ReservationsProvider>
  );
};

export default ReservationsContent;
