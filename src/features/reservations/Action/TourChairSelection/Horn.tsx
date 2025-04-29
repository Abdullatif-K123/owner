import { ChairSelectionSX } from "@/features/reservations/Action/TourChairSelection/style.sx";
import { Box } from "@mui/material";

import hornAudio from "../../../../assets/audio/horn.wav";

const horn = new Audio(hornAudio);

const Horn = () => {
  const handleHonk = () => {
    horn.play();
    horn.currentTime = 0;
  };
  return <Box sx={ChairSelectionSX.honk} onClick={handleHonk} />;
};

export default Horn;
