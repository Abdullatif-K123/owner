import { useEffect, useMemo, useRef, useState } from "react";
import "../index.css";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import useTableHeader from "./useTableHeader";
import DraggableRow from "./DraggableRow";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableCell,
} from "@mui/material";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { TourCitiesObj, timeChangeParams } from "../../../API/tour/types";

type Props = {
  value: (TourCitiesObj & { name: string })[] | undefined;
  onChange: (selected: TourCitiesObj[]) => void;
};

const SortableTable = ({ value, onChange }: Props) => {
  const [_refresh, setRefresh] = useState(true);
  const [activeId, setActiveId] = useState<
    (TourCitiesObj & { name: string }) | null
  >(null);
  const data = useRef(value);
  const items = useMemo(
    () => data.current?.map(({ cityId }) => cityId),
    [data.current]
  );

  useEffect(() => {
    data.current = value;
    setRefresh((prev) => !prev);
  }, [value]);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragStart(event: any) {
    data.current &&
      data.current.forEach((item) => {
        if (item.cityId === event.active.id) {
          setActiveId(item);
        }
      });
    // setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (
      active.id !== over.id &&
      data.current !== undefined &&
      items !== undefined
    ) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newData = arrayMove(data.current, oldIndex, newIndex);
      data.current = newData;
      setRefresh((prev) => !prev);
      onChange(newData);
    }
    // setActiveId(null);
  }

  function handleDragCancel() {
    // setActiveId(null);
  }

  const onTimesChange = (val: timeChangeParams, index: number) => {
    if (val !== undefined) {
      const key: string = Object.keys(val)[0];
      const value: string | number | undefined = val[key];
      if (data.current) {
        const prevState = data.current[index];
        data.current[index] = { ...prevState, [key]: value };
        onChange(data.current);
      }
    }
  };

  const tableHeaders = useTableHeader();

  return (
    <>
      <TableContainer component={Paper}>
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
        >
          <Table
            sx={{ minWidth: 320, maxWidth: 400, mx: "auto" }}
            aria-label="simple table"
          >
            <TableHead
              sx={{
                backgroundColor: "white !important",
                color: "red",
              }}
            >
              <TableRow>
                {tableHeaders.map((item, index) => (
                  <TableCell
                    sx={{ color: "#111111 !important", textAlign: "center" }}
                    key={index}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items !== undefined ? (
                <SortableContext
                  items={items}
                  strategy={verticalListSortingStrategy}
                >
                  {data.current?.map((row, i) => {
                    return (
                      <DraggableRow
                        key={i}
                        index={i}
                        row={row}
                        onTimesChange={(val: timeChangeParams) =>
                          onTimesChange(val, i)
                        }
                      />
                    );
                  })}
                </SortableContext>
              ) : null}
            </TableBody>
          </Table>
          <DragOverlay style={{}} wrapperElement="table">
            <tbody>
              {activeId ? (
                <DraggableRow
                  index={-1}
                  row={activeId}
                  onTimesChange={(val: timeChangeParams) =>
                    onTimesChange(val, 1)
                  }
                />
              ) : null}
            </tbody>
          </DragOverlay>
        </DndContext>
      </TableContainer>
    </>
  );
};

export default SortableTable;
