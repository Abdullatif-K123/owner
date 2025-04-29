import { useCompanyAccountingContext } from "@/features/company-accounting/context/CompanyAccountingContext";
import { Checkbox, TableCell, Tooltip } from "@mui/material";

const ToggleTourSelectionButton = ({
  id,
  disabled,
}: {
  id: string;
  disabled?: boolean;
}) => {
  const { isSelectionEnabeld, tours, toggleTour } =
    useCompanyAccountingContext();
  if (!isSelectionEnabeld) return <TableCell></TableCell>;

  const isChecked = tours.includes(id);

  return (
    <TableCell width={50} sx={{ p: 0 }}>
      {isSelectionEnabeld && (
        <Tooltip
          title={
            disabled ? "تم استلام هذه الرحلة مسبقا" : "تحديد الرحلة للاستلام"
          }
        >
          <div>
            <Checkbox
              disabled={disabled}
              color="error"
              sx={{ svg: { color: disabled ? "#777" : "error.main" } }}
              checked={isChecked}
              onClick={() => toggleTour(id)}
            />
          </div>
        </Tooltip>
      )}
    </TableCell>
  );
};

export default ToggleTourSelectionButton;
