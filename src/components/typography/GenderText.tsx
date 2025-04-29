import { Typography } from "@mui/material";
import { FC } from "react";
import { Gender } from "../../constants/enums";
type Props = {
  gender: Gender;
};
const GenderText: FC<Props> = ({ gender }) => {
  return (
    <>
      {gender === Gender.Male && (
        <Typography sx={{ color: "#029EF6" }}>ذكر</Typography>
      )}
      {gender === Gender.Female && (
        <Typography sx={{ color: "#E547A1" }}>أنثى</Typography>
      )}
    </>
  );
};
export default GenderText;
