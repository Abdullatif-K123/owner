import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { CompanyAccounting } from "@/API/company-accounting/types";
import ShowIconButton from "@/components/buttons/ShowIconButton";
import ButtonsStack from "@/components/layout/ButtonsStack";
import { useCompanyAccountingContext } from "@/features/company-accounting/context/CompanyAccountingContext";

type Props = {
  row: CompanyAccounting;
};

const CompanyAccountingRowActions = ({ row }: Props) => {
  const { setTours, setModalOpened } = useCompanyAccountingContext();
  const navigate = useNavigate();

  return (
    <ButtonsStack alignItems="center">
      <ShowIconButton
        onClick={() => {
          navigate(`/company-accounting/${row.tourId}`);
        }}
      />
      {row.isOwnerConfirm && (
        <Typography sx={{ color: "gray" }} variant="subtitle2">
          تم الاستلام
        </Typography>
      )}
      {!row.isOwnerConfirm && (
        <Button
          disabled={row.isOwnerConfirm}
          onClick={() => {
            setTours([row.tourId]);
            setModalOpened(true);
          }}
        >
          استلام
        </Button>
      )}
    </ButtonsStack>
  );
};

export default CompanyAccountingRowActions;
