import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { FinishedTourIcon } from "./icons";
import { useSearchParams } from "react-router-dom";

export type Tabs = "0" | "1" | "2";

const ToursFilter = () => {
  const [activeTab, setActiveTab] = useState<Tabs>();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentState = (searchParams.get("tourStatusHome") as Tabs) ?? "2";
    setActiveTab(currentState);
  }, []);

  const onClick = (status: Tabs) => {
    setActiveTab(status);
    searchParams.set("tourStatusHome", status);
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
        className={activeTab === "2" ? "active" : ""}
        onClick={() => onClick("2")}
        startIcon={<FinishedTourIcon />}
      >
        قادمة
      </Button>
      <Button
        className={activeTab == "1" ? "active" : ""}
        onClick={() => onClick("1")}
        startIcon={<FinishedTourIcon />}
      >
        جارية
      </Button>
      <Button
        className={activeTab == "0" ? "active" : ""}
        onClick={() => onClick("0")}
        startIcon={<FinishedTourIcon />}
      >
        منتهية
      </Button>
    </Stack>
  );
};

export default ToursFilter;
