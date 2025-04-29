import { TableCell } from "@mui/material";
import { DragHandle } from "@mui/icons-material";
import { UniqueIdentifier } from "@dnd-kit/core";
import TimePickerComp from "../components/TimePickerComp";

type Props = {
  row: {
    cityId: UniqueIdentifier;
    name: string;
    time: string;
    breakTime: number;
    [key: string]: any;
  };
  index: number;
};

const DraggingRow = ({ row, index }: Props) => {
  return (
    <>
      <TableCell sx={{ cursor: "move" }}>
        <DragHandle sx={{ color: "secondary.main" }} />
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{row.name}</TableCell>
      {/* <TableCell>
        <DatePickerComp value={row.time} onChange={(val) => {}} label="Time" />
      </TableCell> */}
      <TableCell>
        <TimePickerComp value={0} onChange={() => {}} />
      </TableCell>
    </>
  );
};

export default DraggingRow;
