import { Box, Stack } from "@mui/material";
import { Suspense } from "react";
import { BusIcon, LoginBackgroundIcon } from "./Icons";
import logo from "../../assets/logo.svg";
import { Outlet } from "react-router-dom";
import { TopBarProgress } from "../../components/feedback/TopBarProgress";
import { busIconSx, logoSx } from "./style";

const AuthLayout = () => {
  return (
    <Box width="100vw" height="100vh" overflow="hidden">
      <Box component="img" src={logo} sx={logoSx} />
      <LoginBackgroundIcon />
      <Stack alignItems="center" justifyContent="center" height="100%">
        <Suspense fallback={<TopBarProgress />}>
          <Outlet />
        </Suspense>
      </Stack>
      <Box sx={busIconSx}>
        <BusIcon />
      </Box>
    </Box>
  );
};

export default AuthLayout;
