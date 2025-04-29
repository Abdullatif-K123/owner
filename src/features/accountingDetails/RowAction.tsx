import ShowIconButton from "@/components/buttons/ShowIconButton";
import ButtonsStack from "@/components/layout/ButtonsStack";
import { useNavigate } from "react-router-dom";

const AccountingDetailsRowAction = ({ staffId }: { staffId: string }) => {
  const navigate = useNavigate();

  return (
    <ButtonsStack alignItems="center">
      <ShowIconButton
        onClick={() => {
          navigate(`${staffId}`);
        }}
      />
    </ButtonsStack>
  );
};

export default AccountingDetailsRowAction;
