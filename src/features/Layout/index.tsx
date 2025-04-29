import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { TopBarProgress } from "../../components/feedback/TopBarProgress";
import { FC, Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import Main from "./Main";
import Sidebar from "./SideBar";
export const drawerWidth = 250;

type Props = {};
const Layout: FC<Props> = ({}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = useState(isLargeScreen);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <AppBar
        open={open}
        onDrawerOpen={handleDrawerOpen}
        onDrawerClose={handleDrawerClose}
      />
      <Sidebar open={open} setOpen={setOpen} />
      <Toolbar />
      <Main open={open} sx={{ px: { xs: 1, sm: 5 }, py: 3, minHeight: "90vh" }}>
        <Suspense fallback={<TopBarProgress />}>
          <Outlet />
        </Suspense>
      </Main>
    </Box>
  );
};
export default Layout;
