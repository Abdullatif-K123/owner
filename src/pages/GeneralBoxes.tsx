import { useState } from "react";
import { Stack, Tab, Tabs } from "@mui/material";

import AddFab from "@/components/buttons/AddFab";

import { pageTitle } from "@/utils/pageTitle";
import { useRoleContext } from "@/contexts/RoleContext";
import GeneralBoxesTable from "@/features/GeneralBoxes/Table";
import GeneralBoxesDeleteModal from "@/features/GeneralBoxes/DeleteModal";
import GeneralBoxesModal from "@/features/GeneralBoxes/Modal";
import GeneralBoxesProvider from "@/features/GeneralBoxes/context/GeneralBoxesProvider";
import SelectBoxesButton from "@/features/GeneralBoxes/SelectBoxesButton";
import ReciveDialog from "@/features/GeneralBoxes/ReciveDialog";

const GeneralBoxes = () => {
  pageTitle("المصاريف العامة");
  const [isReceived, setIsReceived] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { isOwner } = useRoleContext();
  return (
    <GeneralBoxesProvider>
      <Stack spacing={2}>
        {isOwner && (
          <Tabs
            sx={{ borderBottom: "1px solid", borderColor: "primary.main" }}
            value={isReceived || -1}
            onChange={(_, val) => {
              setIsReceived(val !== -1);
            }}
          >
            <Tab label="المصاريف المستلمة" value={-1} />
            <Tab label="المصاريف الجارية" value={true} />
          </Tabs>
        )}
        <SelectBoxesButton isReceived={isOwner ? isReceived : undefined} />
        <ReciveDialog isReceived={isOwner ? isReceived : undefined} />
        {!isOwner && (
          <>
            <GeneralBoxesModal
              onClose={() => setOpenModal(false)}
              open={openModal}
            />
            <AddFab onClick={() => setOpenModal(true)} />
            <GeneralBoxesDeleteModal />
          </>
        )}
        <GeneralBoxesTable isReceived={isReceived} />
      </Stack>
    </GeneralBoxesProvider>
  );
};

export default GeneralBoxes;
