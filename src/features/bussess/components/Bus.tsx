import { Grid, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { Model } from "../../../API/busses/types";
import hornAudio from "../../../assets/audio/horn.wav";
import BusInteriorIcon from "../../../components/icons/BusInteriorIcon";
import { FC } from "react";
const horn = new Audio(hornAudio);
function parseModelArray(str: string): (number | null)[] {
  try {
    return JSON.parse(str) as (number | null)[];
  } catch {
    return [];
  }
}
export type BusProps =
  | { model: Omit<Model, "busCount">; skeleton?: undefined }
  | { skeleton: boolean; model?: undefined };
export const Bus: FC<BusProps> = ({ model, skeleton }) => {
  const { module, columnCount } =
    skeleton !== undefined
      ? { ...skeletonModels[Math.floor(skeletonModels.length * Math.random())] }
      : { ...model, module: parseModelArray(model.module) };
  const rowsCount =
    module.length / columnCount + (module.length % columnCount === 0 ? 0 : 1);
  const rowHeight = (1 / rowsCount) * 100;
  const handleHonk = () => {
    horn.play();
    horn.currentTime = 0;
  };
  return (
    <Box
      sx={{
        mx: "auto",
        mt: 1,
        height: { xs: 200, sm: 290 },
        position: "relative",
        aspectRatio: "134/335",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          svg: { width: "100%", height: "100%" },
        }}
      >
        <BusInteriorIcon />
      </Box>
      <Box
        sx={{
          position: "absolute",
          zIndex: 3,
          borderRadius: "50%",
          top: "2%",
          cursor: "pointer",
          right: "6%",
          width: "23%",
          aspectRatio: "1",
          svg: { width: "100%", height: "100%" },
        }}
        onClick={handleHonk}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          mx: 2,
          height: "80%",
          top: "15%",
        }}
      >
        <Grid
          container
          height="100%"
          spacing={1}
          sx={{ ".MuiTypography-root": { display: "none" } }}
        >
          {module.map((seat, index) => (
            <Grid
              key={index}
              item
              xs={12 / columnCount}
              component={"div"}
              sx={{
                height: `${rowHeight}%`,
              }}
            >
              {seat !== null &&
                (!skeleton ? (
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      color: "#fff",
                      borderRadius: 0.7,
                      aspectRatio: 1.05 / 1,
                      maxHeight: 1,
                      position: "relative",
                      fontSize: 8,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {seat}
                  </Box>
                ) : (
                  <Skeleton
                    sx={{
                      bgcolor: grey[100],
                      borderRadius: 0.7,
                      aspectRatio: 1.05 / 1,
                      maxHeight: 1,
                      position: "relative",
                    }}
                  />
                ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
const skeletonModels = [
  {
    columnCount: 4,
    module: [
      1,
      2,
      null,
      3,
      4,
      5,
      null,
      6,
      7,
      8,
      null,
      9,
      10,
      11,
      null,
      12,
      13,
      14,
      null,
      15,
      16,
      17,
      null,
      30,
      18,
      19,
      null,
      20,
      21,
      22,
      null,
      23,
      24,
      25,
      null,
      26,
      27,
      28,
      null,
      29,
    ],
  },
  {
    columnCount: 5,
    module: [
      1,
      2,
      null,
      3,
      4,
      5,
      6,
      null,
      7,
      8,
      9,
      10,
      null,
      11,
      12,
      13,
      14,
      null,
      15,
      16,
      17,
      18,
      null,
      19,
      20,
      21,
      22,
      null,
      23,
      24,
      25,
      26,
      null,
      null,
      null,
      27,
      28,
      null,
      null,
      null,
      29,
      30,
      null,
      31,
      32,
      33,
      34,
      null,
      35,
      36,
      37,
      38,
      null,
      39,
      40,
      41,
      42,
      null,
      43,
      44,
      45,
      46,
      null,
      47,
      48,
    ],
  },
  {
    columnCount: 4,
    module: [
      1,
      2,
      null,
      3,
      4,
      5,
      null,
      6,
      7,
      8,
      null,
      9,
      10,
      11,
      null,
      12,
      13,
      14,
      null,
      15,
      16,
      17,
      null,
      null,
      18,
      19,
      null,
      null,
      20,
      21,
      null,
      22,
      23,
      24,
      null,
      25,
      26,
      27,
      28,
      29,
    ],
  },
];
