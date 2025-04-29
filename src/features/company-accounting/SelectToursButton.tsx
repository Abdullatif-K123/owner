import ButtonsStack from "@/components/layout/ButtonsStack";
import { useCompanyAccountingContext } from "@/features/company-accounting/context/CompanyAccountingContext";
import { Button } from "@mui/material";

const SelectToursButton = () => {
  const { setIsSelectionEnabeld, isSelectionEnabeld, tours, setModalOpened } =
    useCompanyAccountingContext();

  const handleClick = () => {
    if (isSelectionEnabeld) {
      if (tours.length !== 0) setModalOpened(true);
      else setIsSelectionEnabeld(false);
    } else {
      setIsSelectionEnabeld(true);
    }
  };

  return (
    <ButtonsStack sx={{ width: "fit-content" }}>
      <Button variant="contained" size="small" onClick={handleClick}>
        {isSelectionEnabeld && tours.length !== 0 && "تأكيد الاستلام"}
        {isSelectionEnabeld && tours.length === 0 && "إلغاء"}
        {!isSelectionEnabeld && "تحديد للاستلام"}
      </Button>
    </ButtonsStack>
  );
};

export default SelectToursButton;
