import { Box, Paper, Stack, Typography } from "@mui/material";
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
// import BranchFilterAutocomplete from "components/filters/BranchFilterAutocomplete";
// import DateFilter from "components/filters/DateFilter";
import themeConstants from "../../../constants/themeConstants";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { PropsType } from "../../../types/utils";
import { ToursChart } from "../api/types";
import ChartFilter from "../components/ChartFilter";
import useTimestampSearchParam from "../../../hooks/useTimestampSearchParam";
import useGetLabels from "../../../hooks/useGetLabels";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);
export type TourStatsProps = { data: ToursChart | null; isLoading: boolean };
export const TourStats = ({ data, isLoading }: TourStatsProps) => {
  return <Chart dataset={data} isLoading={isLoading} />;
};
type ChartProps = { dataset: ToursChart | null; isLoading: boolean };

const Chart = ({ dataset, isLoading }: ChartProps) => {
  const filtered = useTimestampSearchParam(dataset);
  const labels = useGetLabels(filtered);

  const { data, options } = useMemo(() => {
    const data: PropsType<typeof Line>["data"] = {
      labels: dataset ? labels : [],
      datasets: [
        {
          tension: 0.25,
          pointRadius: 1,
          label: "",
          data: dataset ? filtered.map((data) => data) : [],
          borderColor: themeConstants.primary,
          backgroundColor: themeConstants.primary9,
        },
      ],
    };
    // let min = dataset[0]?.tourCount ?? 1;
    // let max = dataset[0]?.tourCount ?? 0;
    // for (let i = 0; i < dataset.length; i++) {
    //   if (dataset[i].tourCount > max) max = dataset[i].tourCount;
    //   if (dataset[i].tourCount < min) min = dataset[i].tourCount;
    // }
    const options: PropsType<typeof Line>["options"] = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 },
        },
      },
      // scales: {
      //   x: {
      //     type: "category",
      //   },
      //   y: {
      //     min: Math.max(0, min - 1),
      //     max: max + 1,
      //     ticks: {
      //       callback: function (value) {
      //         if (typeof value === "number" && Math.floor(value) === value) {
      //           return value.toString();
      //         }
      //       },
      //     },
      //   },
      // },
      plugins: {
        tooltip: {
          intersect: false,
          mode: "index",
        },
        legend: {
          display: false,
        },
      },
    };
    return { data, options };
  }, [filtered]);
  return (
    <Paper sx={{ py: 3, px: 2 }}>
      <Stack>
        <Typography
          variant="h5"
          sx={{
            color: "primary.900",
            width: "25%",
            display: "flex",
            alignItems: "center",
            pt: 1,
          }}
        >
          الرحلات
        </Typography>
        <Box sx={{ minWidth: { xs: 200, md: 400 } }}>
          <ChartFilter />
        </Box>

        <Box height={400} sx={{ opacity: isLoading ? 0.5 : 1 }}>
          <Line options={options} data={data} />
        </Box>
      </Stack>
    </Paper>
  );
};
