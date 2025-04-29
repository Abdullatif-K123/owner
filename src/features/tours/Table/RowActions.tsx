import EditIconButton from "../../../components/buttons/EditIconButton";
import RemoveIconButton from "../../../components/buttons/RemoveIconButton";
import ShowIconButton from "../../../components/buttons/ShowIconButton";
import ButtonsStack from "../../../components/layout/ButtonsStack";
import useEventSearchParams from "../../../hooks/useEventSearchParams";
import ShowReservationButton from "@/features/tours/Table/ShowReservationButton";
import IconButton from "@/components/buttons/IconButton";
import BusButton from "@/components/buttons/BusButton";
 
import { TimeIcon } from "@mui/x-date-pickers";
import { BusAlert } from "@mui/icons-material";
 
import AccountDetails from "./AccountDetails";
type Props = {
  canEdit: boolean;
  name: string;
  id: string;
  isFinished?: boolean;
  branch: string;
  date: string;
  busName: string;
  branchId: string;
  dateofLeave: string
};
const RowActions = ({ name, id, isFinished, branch, date, busName, branchId, dateofLeave }: Props) => {
   
  const { remove, edit, details, custom, customBues } = useEventSearchParams({
    customKey: "editTime",
  });
  return (
    <ButtonsStack>
      <IconButton
        title="تعديل الوقت"
        sx={!isFinished ? {} : { opacity: 0.5 }}
        disabled={isFinished}
        onClick={() => custom(id)}
      >
        <TimeIcon />
      </IconButton>
      <BusButton
      title="تعديل الحافلة"
      sx={!isFinished ? {} : { opacity: 0.5 }}
        disabled={isFinished}
        onClick={() => customBues(id)}
       >
        <BusAlert />
      </BusButton>
      <EditIconButton
        sx={!isFinished ? {} : { opacity: 0.5 }}
        disabled={isFinished}
        onClick={() => edit(id)}
      />
      <RemoveIconButton
        sx={!isFinished ? {} : { opacity: 0.5 }}
        disabled={isFinished}
        onClick={() => remove(id)}
      />
      <ShowIconButton title="عرض تفاصيل الرحلة" onClick={() => details(id)} />
      <ShowReservationButton isFinished={isFinished} id={id} name={name} branch={branch} date={date} busName={busName} branchId={branchId} dateofLeave={dateofLeave} />
       <AccountDetails id={id}/>
    </ButtonsStack>
  );
};

export default RowActions;
