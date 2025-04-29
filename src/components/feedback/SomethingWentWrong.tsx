import { Box, Button, Stack, StackProps, Typography } from "@mui/material";
import ErrorPersonIcon from "../icons/ErrorPersonIcon";

type Props = { retry?: () => void } & StackProps;

const SomethingWentWrong = ({ retry, ...props }: Props) => {
  return (
    <Stack alignItems={"center"} py={2} gap={1} {...props}>
      <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
        <ErrorPersonIcon />
      </Box>
      <Typography color="primary" variant="h4" textAlign={"center"}>
        نعتذر
      </Typography>
      <Typography color="primary" variant="body1" textAlign={"center"}>
        حدث خطأ ما
      </Typography>
      {retry && (
        <Button
          onClick={retry}
          variant="contained"
          sx={{ mt: 2, px: "30px !important" }}
        >
          حاول مرة أخرى
        </Button>
      )}
    </Stack>
  );
};
export default SomethingWentWrong;
