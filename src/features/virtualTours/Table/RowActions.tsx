import EditIconButton from "../../../components/buttons/EditIconButton";
import RemoveIconButton from "../../../components/buttons/RemoveIconButton";
import ShowIconButton from "../../../components/buttons/ShowIconButton";
import ButtonsStack from "../../../components/layout/ButtonsStack";
import useEventSearchParams from "../../../hooks/useEventSearchParams";
import { useRoleContext } from "@/contexts/RoleContext";
import PlayIconButton from "@/components/buttons/PlayIconButton";
import { useNavigate } from "react-router-dom";

type Props = {
  canEdit: boolean;
  name: string;
  id: string;
};
const RowActions = ({ canEdit, id }: Props) => {
  const { remove, edit, details } = useEventSearchParams();
  const { isOwner } = useRoleContext();
  canEdit = canEdit || isOwner;

  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/tours?id=${id}&mode=virtual`);
  };

  return (
    <ButtonsStack>
      <PlayIconButton onClick={() => handleClick(id)} />
      <EditIconButton
        sx={canEdit ? {} : { opacity: 0.5 }}
        disabled={!canEdit}
        onClick={() => edit(id)}
      />
      <RemoveIconButton
        sx={canEdit ? {} : { opacity: 0.5 }}
        disabled={!canEdit}
        onClick={() => remove(id)}
      />
      <ShowIconButton title="عرض تفاصيل الرحلة" onClick={() => details(id)} />
    </ButtonsStack>
  );
};

export default RowActions;
