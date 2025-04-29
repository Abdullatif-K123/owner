import { Button, CircularProgress } from "@mui/material";

type Props = {
  isLoading: boolean;
};

const SaveButton = ({ isLoading }: Props) => {
  return (
    <>
      {isLoading ? (
        <CircularProgress sx={{ mx: 2 }} size={28} />
      ) : (
        <Button type="submit" disabled={isLoading}>
          حفظ
        </Button>
      )}
    </>
  );
};

export default SaveButton;
