import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { TableCell, TableRow } from "@mui/material";
import { DragHandle } from "@mui/icons-material";
import { UniqueIdentifier } from "@dnd-kit/core";
import TimePickerComp from "../components/TimePickerComp";
import { timeChangeParams } from "../../../API/tour/types";

type Props = {
  row: {
    cityId: UniqueIdentifier;
    name: string;
    // time: string;
    breakTime: number;
    [key: string]: any;
  };
  index: number;
  onTimesChange: (val: timeChangeParams) => void;
};

const DraggableRow = ({ row, index, onTimesChange }: Props) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id: row.cityId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };

  // let keys: string[] = Object.keys(row);

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        color: "primary.main",
        opacity: isDragging && index !== -1 ? 0.2 : 1,
      }}
      style={style}
      ref={setNodeRef}
      key={isDragging ? index : index + 10}
    >
      <>
        <TableCell sx={{ cursor: "move" }}>
          <DragHandle
            sx={{ color: "secondary.main" }}
            {...attributes}
            {...listeners}
          />
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row.name}</TableCell>
        {/* <TableCell>
          <DatePickerComp
            value={row.time}
            onChange={(val: string) => {
              onTimesChange({ time: val });
            }}
            label=""
          />
        </TableCell> */}
        <TableCell>
          <TimePickerComp
            value={row.breakTime}
            onChange={(val: number) => onTimesChange({ breakTime: val })}
          />
        </TableCell>
      </>
    </TableRow>
  );
};

export default DraggableRow;
