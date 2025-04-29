import { useState } from "react";
import { Stack } from "@mui/material";

import AddFab from "@/components/buttons/AddFab";
import AccountingBoxesTable from "@/features/accountingBoxes/Table";
import AccountingModal from "@/features/accountingBoxes/Modal";
import { pageTitle } from "@/utils/pageTitle";
import { useRoleContext } from "@/contexts/RoleContext";
import AccpuntingDeleteModal from "@/features/accountingBoxes/DeleteModal";

const AccountingBoxes = () => {
  pageTitle("الصناديق - مصاريف الرحلة");
  const [openModal, setOpenModal] = useState(false);
  const { isOwner } = useRoleContext();
  return (
    <Stack spacing={2}>
      <AccountingBoxesTable />
      {!isOwner && (
        <>
          <AccountingModal
            onClose={() => setOpenModal(false)}
            open={openModal}
          />
          <AddFab onClick={() => setOpenModal(true)} />
          <AccpuntingDeleteModal />
        </>
      )}
    </Stack>
  );
};

export default AccountingBoxes;
