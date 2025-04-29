import { Chip } from "@mui/material";
import { TourStatus } from "../../../constants/enums";
import { FC } from "react";
import { enumTourTranslate } from "../../../constants/enumsValues";
type Props = { tourStatus: TourStatus };
const TourStatusColored: FC<Props> = ({ tourStatus }) => {
  let color = "primary.main";
  let bgcolor = "";
  switch (tourStatus) {
    case TourStatus.Finished:
      color = "white";
      bgcolor = "success.main";
      break;
    case TourStatus.Ongoing:
      bgcolor = "info.main";
      color = "white";

      break;
    case TourStatus.UpComing:
    default:
      color = "white";
      bgcolor = "warning.main";
  }

  return (
    <Chip
      label={enumTourTranslate.TourStatus[tourStatus]}
      sx={{ color, bgcolor }}
    />
  );
};
export default TourStatusColored;
