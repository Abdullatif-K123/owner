import { useGeneralBoxesContext } from "@/features/GeneralBoxes/context/GeneralBoxesContext";
import { Checkbox, TableCell, Tooltip } from "@mui/material";

const GeneralBoxesRowCheckbox = ({ boxId }: { boxId: string }) => {
  const { boxes, isSelectionEnabeld, toggleBox } = useGeneralBoxesContext();

  if (!isSelectionEnabeld) return <TableCell></TableCell>;

  const isChecked = boxes.includes(boxId);
  return (
    <TableCell width={50} sx={{ p: 0 }}>
      {isSelectionEnabeld && (
        <Tooltip title={"تحديد الرحلة للاستلام"}>
          <div>
            <Checkbox
              color="error"
              checked={isChecked}
              onClick={() => toggleBox(boxId)}
            />
          </div>
        </Tooltip>
      )}
    </TableCell>
  );
};

export default GeneralBoxesRowCheckbox;
