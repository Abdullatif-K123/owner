import React from "react";
import { Stack } from "@mui/material";
import BranchesTable from "./BranchesTable";
import BranchFilter from "./BranchFilter";
import AddBranch from "./AddBranch";
import BranchDelete from "./BranchRemove";
import { useRoleContext } from "../../contexts/RoleContext";

const BranchesContent = () => {
  // For openning and closing the dialog
  const [addOpen, setAddOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const { isOwner } = useRoleContext();
  return (
    <>
      <Stack sx={{ display: "relative" }} spacing={2}>
        <BranchFilter />
        <BranchesTable setAddOpen={setAddOpen} setDeleteOpen={setDeleteOpen} />
        {isOwner && (
          <>
            <AddBranch addOpen={addOpen} setAddOpen={setAddOpen} />
            <BranchDelete
              deleteOpen={deleteOpen}
              setDeleteOpen={setDeleteOpen}
            />
          </>
        )}
      </Stack>
    </>
  );
};

export default BranchesContent;
