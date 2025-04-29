import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { FinishedTourIcon } from "./icons";
import { useSearchParams } from "react-router-dom";

export type Timestamps = "Weekly" | "Monthly" | "Year";

const ChartFilter = () => {
  const [activeTab, setActiveTab] = useState<Timestamps>();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentState =
      (searchParams.get("timestamp") as Timestamps) ?? "Weekly";
    setActiveTab(currentState);
  }, []);

  const onClick = (status: Timestamps) => {
    setActiveTab(status);
    searchParams.set("timestamp", status);
    setSearchParams(searchParams);
  };

  return (
    <Stack
      direction="row"
      justifyContent={"center"}
      flexWrap="wrap"
      my={1}
      sx={{
        gap: 4,
        ".MuiButton-root": {
          px: 1,
          py: 0.5,
          ".MuiTouchRipple-root": { color: "secondary.main" },
          borderRadius: 3,
          border: "2px dashed #4B465C2c",
          "&.active": {
            border: (th) => `2px solid ${th.palette.secondary.main}`,
            ".fill": { fill: (th) => th.palette.secondary.main },
            ".stroke": { stroke: (th) => th.palette.secondary.main },
          },
        },
      }}
    >
      <Button
        className={activeTab === "Weekly" ? "active" : ""}
        onClick={() => onClick("Weekly")}
        startIcon={<FinishedTourIcon />}
      >
        أسبوع
      </Button>
      <Button
        className={activeTab == "Monthly" ? "active" : ""}
        onClick={() => onClick("Monthly")}
        startIcon={<FinishedTourIcon />}
      >
        شهر
      </Button>
      <Button
        className={activeTab == "Year" ? "active" : ""}
        onClick={() => onClick("Year")}
        startIcon={<FinishedTourIcon />}
      >
        سنة
      </Button>
    </Stack>
  );
};

export default ChartFilter;
