import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {  Chip, Stack, Tooltip } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { storage } from "../../utils/storage";
import { drawerWidth } from ".";
import usePageTitle from "../../hooks/usePageTitle";
import Notifications from "../notifications/NotificationsModal";
import { useRoleContext } from "@/contexts/RoleContext";
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
type Props = {
  open: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
};
const AppBar = ({ open, onDrawerOpen, onDrawerClose }: Props) => {
  const pageTitle = usePageTitle();
  const navigate = useNavigate();

  const handleLogout = () => {
    storage.clearToken();
    navigate("/login");
  };

  const {tokenPayload} = useRoleContext()
  let userName :string| undefined = undefined
  if(tokenPayload) userName =  tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? undefined

  return (
    <AppBarStyled position="fixed" open={open} key={pageTitle}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <IconButton
            color="inherit"
            onClick={open ? onDrawerClose : onDrawerOpen}
            edge="start"
            aria-label="Menu"
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pageTitle}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          {userName && <Chip  sx={{background:'white'}} label={ userName}/>}
          <Notifications />
          <Tooltip title="تسجيل الخروج">
            <IconButton aria-label="Logout" onClick={handleLogout}>
              <LogoutIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBarStyled>
  );
};

export default AppBar;
