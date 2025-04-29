import { Stack, Typography } from "@mui/material";

type Props = {
  label: string;
  value: string | number;
};
const Info = ({ label, value }: Props) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{ my: 1, borderBottom: "1px solid #f9f9f9" }}
    >
      <Typography
        variant="body1"
        color="secondary"
        sx={{ minWidth: { md: 200, sm: 100 } }}
      >
        {label}:
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Stack>
  );
};

export default Info;
