import React from "react";
import BussesGrid from "./BussesGrid";
import AddBusses from "./AddBusses";
import RemoveBus from "./RemoveBus";
import BusFilter from "./BusFilter";
import { Stack } from "@mui/material";
import "./index.css";
import { useRoleContext } from "../../contexts/RoleContext";

const BussesContent = () => {
  const [addOpen, setAddOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const { isOwner, isManager } = useRoleContext();

  return (
    <Stack spacing={2}>
      <BusFilter />
      <BussesGrid
        setDeleteOpen={(val) => setDeleteOpen(val)}
        setAddOpen={(val) => setAddOpen(val)}
      />
      {(isOwner || isManager) && (
        <>
          <AddBusses addOpen={addOpen} setAddOpen={(val) => setAddOpen(val)} />
          <RemoveBus
            deleteOpen={deleteOpen}
            setDeleteOpen={(val: boolean) => setDeleteOpen(val)}
          />
        </>
      )}
    </Stack>
  );
};

export default BussesContent;
