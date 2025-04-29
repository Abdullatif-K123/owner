import { Box, Stack, Tab, Tabs } from "@mui/material";
import { Notification } from "../api/types";
import NotificationLine from "./NotificationLine";
import NoData from "../../../components/feedback/NoData";
import SomethingWentWrong from "../../../components/feedback/SomethingWentWrong";
import NotificationsSkeleton from "./NotificationsSkeleton";
import ReadAllBtn from "./ReadAllBtn";
import { useState } from "react";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type Props = {
  setIsGeneral: (val: boolean) => void;
  data: Notification[];
  handleClose: () => void;
  isLoading: boolean;
  isError: boolean;
};

const NotifyTabs = ({
  setIsGeneral,
  data,
  handleClose,
  isLoading,
  isError,
}: Props) => {
  const [value, setValue] = useState(1);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setIsGeneral(newValue === 0);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: { xs: 220, sm: "auto" }, mx: "auto" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ width: "fit-content", mx: "auto " }}
          >
            <Tab label="عام" {...a11yProps(0)} />
            <Tab label="إشعاراتي" {...a11yProps(1)} />
          </Tabs>
          {data.length > 0 ? (
            <ReadAllBtn isGeneral={value === 0} handleClose={handleClose} />
          ) : null}
          <Stack
            spacing={1}
            sx={{
              mx: "auto",
              width: "100%",
              maxHeight: "75vh",
            }}
          >
            {data.map((item, index) => (
              <NotificationLine
                key={index}
                data={item}
                isGeneral={value === 0}
              />
            ))}
            {data.length === 0 && !isLoading && (
              <NoData
                sx={{
                  textAlign: "center",
                  width: "70%",
                  mx: "auto !important",
                }}
              />
            )}
            {isLoading && <NotificationsSkeleton />}
            {isError && <SomethingWentWrong />}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default NotifyTabs;
