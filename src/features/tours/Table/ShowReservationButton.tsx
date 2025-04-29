import { IconButton, Tooltip } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RouterLink from "@/components/links/RouterLink";

type Props = {
  disabled?: boolean;
  id: string;
  name: string;
  branch: string;
  date: string;
  busName: string;
  branchId: string;
  dateofLeave: string
  isFinished?: boolean
};

const ShowReservationButton = ({isFinished, disabled, name, id, branch, date, busName, branchId, dateofLeave }: Props) => {
  if (disabled) {
    return (
      <IconButton
        disabled={disabled}
        href={`${id}/reservations?name=${name}&branch=${branch}&date=${date}&busName=${busName}&branchId=${branchId}`}
        sx={{ ":hover": { color: "primary.main" }, opacity: 0.5 }}
        LinkComponent={RouterLink}
      >
        <PeopleAltIcon />
      </IconButton>
    );
  }
  return (
    <Tooltip title="عرض الحجوزات">
      <IconButton
        href={`${id}/reservations?name=${name}&branch=${branch}&date=${date}&busName=${busName}&branchId=${branchId}&date=${dateofLeave}&finished=${isFinished}`}
        sx={{ ":hover": { color: "primary.main" } }}
        LinkComponent={RouterLink}
      >
        <PeopleAltIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ShowReservationButton;
