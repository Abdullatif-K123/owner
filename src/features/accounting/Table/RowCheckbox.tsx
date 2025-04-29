import { useAccountingContext } from "@/features/accounting/context/AccountingContext";
import { Checkbox, TableCell, Tooltip } from "@mui/material";

const RowCheckbox = ({
  tourId,
  disabled,
}: {
  tourId: string;
  disabled: boolean;
}) => {
  const { tours, isSelectionEnabeld, toggleTour } = useAccountingContext();

  if (!isSelectionEnabeld) return <TableCell></TableCell>;

  const isChecked = tours.includes(tourId);

  return (
    <TableCell width={50} sx={{ p: 0 }}>
      {isSelectionEnabeld && (
        <Tooltip
          title={
            disabled ? "لا يمكن تحديد رحلة تحوي كاش" : "تحديد الرحلة للاستلام"
          }
        >
          <div>
            <Checkbox
              disabled={disabled}
              color="error"
              sx={{ svg: { color: disabled ? "#777" : "error.main" } }}
              checked={isChecked}
              onClick={() => toggleTour(tourId)}
            />
          </div>
        </Tooltip>
      )}
    </TableCell>
  );
};

export default RowCheckbox;
