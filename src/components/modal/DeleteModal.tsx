import { Button, Stack, Typography } from "@mui/material";
import Loading from "../feedback/Loading";

type Props = {
  name: string;
  onDelete: () => void;
  onCancel: () => void;
  isLoading: boolean;
};

const DeleteModal = ({ name, onDelete, onCancel, isLoading }: Props) => {
  return (
    <>
      <Typography variant="subtitle1">هل أنت متأكد من حذف {name}؟</Typography>
      <Stack direction="row" gap={2} sx={{ mt: 5 }} justifyContent="center">
        <Button
          disabled={isLoading}
          onClick={() => onDelete()}
          variant="contained"
          color="error"
        >
          {isLoading ? <Loading size={15} /> : "حذف"}
        </Button>
        <Button onClick={() => onCancel()} variant="outlined">
          إلغاء
        </Button>
      </Stack>
    </>
  );
};

export default DeleteModal;
