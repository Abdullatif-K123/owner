import { Accounting } from "@/API/accounting/types";
import IconButton from "@/components/buttons/IconButton";
import ShowIconButton from "@/components/buttons/ShowIconButton";
import ButtonsStack from "@/components/layout/ButtonsStack";
import { useNavigate } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const AccountingRowAction = ({ row }: { row: Accounting }) => {
  const navigate = useNavigate();
  return (
    <ButtonsStack>
      <ShowIconButton
        title="تفاصيل الرحلة"
        onClick={() => navigate(`/accounting/${row.tourId}`)}
      />
      <IconButton
        title="تفاصيل مصاريف الرحلة"
        onClick={() => navigate(`/accounting-details/${row.tourId}`)}
      >
        <AttachMoneyIcon />
      </IconButton>
    </ButtonsStack>
  );
};

export default AccountingRowAction;
