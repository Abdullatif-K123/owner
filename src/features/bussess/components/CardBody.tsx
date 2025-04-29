import { CardContent, Stack, Typography } from "@mui/material";
import "../index.css";

type Props = {
  item: {
    branchName: string;
    number: string;
    BusPhotoUrl: string;
    model: {
      name: string;
      chairCount: string;
    };
  };
};

const CardBody = ({ item }: Props) => {
  return (
    <>
      <CardContent>
        <Stack spacing={2} direction="row" sx={{ justifyContent: "start" }}>
          <Typography variant="subtitle2" color="secondary.main">
            الفرع :
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            {item.branchName}
          </Typography>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ justifyContent: "start" }}>
          <Typography variant="subtitle2" color="secondary.main">
            الرقم :
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            {item.number}
          </Typography>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ justifyContent: "start" }}>
          <Typography variant="subtitle2" color="secondary.main">
            {" "}
            النوع :
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            {item.model.name}
          </Typography>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ justifyContent: "start" }}>
          <Typography variant="subtitle2" color="secondary.main">
            رقم الباص :
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            {item.number}
          </Typography>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ justifyContent: "start" }}>
          <Typography variant="subtitle2" color="secondary.main">
            عدد المقاعد :
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            {item.model.chairCount}
          </Typography>
        </Stack>
      </CardContent>
    </>
  );
};

export default CardBody;
