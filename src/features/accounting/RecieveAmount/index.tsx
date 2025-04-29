import { useRoleContext } from "@/contexts/RoleContext";
import RecieveAmountModal from "@/features/accounting/RecieveAmount/Modal";
import RecieveAmountWidget from "@/features/accounting/RecieveAmount/Widget";
import { useState } from "react";

export enum ModalType {
  Closed = -1,
  Cash = 1,
  Recieved = 2,
}

const RecieveAmount = () => {
  const [modal, setModal] = useState<ModalType>(ModalType.Closed);
  const closeMoadl = () => setModal(ModalType.Closed);
  const { isOwner } = useRoleContext();
  return (
    <>
      <RecieveAmountWidget openModal={setModal} />
      {!isOwner && <RecieveAmountModal type={modal} onClose={closeMoadl} />}
    </>
  );
};

export default RecieveAmount;
