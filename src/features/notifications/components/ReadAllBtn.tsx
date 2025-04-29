import { Button, Stack } from "@mui/material";
import NotifyQueries from "../api/queries";
import { useQueryClient } from "@tanstack/react-query";
import controllers from "../../../constants/controllers";
import useAxiosErrorSnackbar from "../../../hooks/useAxiosErrorSnackBar";
import Loading from "@/components/feedback/Loading";

type Props = {
  isGeneral: boolean;
  handleClose: () => void;
};

const ReadAllBtn = ({ isGeneral, handleClose }: Props) => {
  const mutation = NotifyQueries.useSetAsRead();
  const queryClient = useQueryClient();

  const errSnackbar = useAxiosErrorSnackbar();

  const onClick = () => {
    const params = {
      isGeneral: isGeneral,
      isAll: true as true,
    };
    mutation.mutate(params, {
      onSuccess: () => {
        queryClient.invalidateQueries([controllers.NOTIFICATION, "all"]);
        handleClose();
      },
      onError: (err) => errSnackbar(err),
    });
  };

  return (
    <Stack alignItems="flex-end">
      <Button
        onClick={onClick}
        color="secondary"
        sx={{ width: "6rem", mb: "5px" }}
        disabled={mutation.isLoading}
      >
        <>
          قراءة الكل
          {mutation.isLoading ?? <Loading size={10} sx={{ ml: "5px" }} />}
        </>
      </Button>
    </Stack>
  );
};

export default ReadAllBtn;
