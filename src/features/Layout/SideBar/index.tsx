import { Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import { navLinks } from "../../../constants/navLinks";
import { FC, Fragment, ReactNode, useState } from "react";
import { drawerWidth } from "..";
import SideBarListItem from "./SideBarListItem";
// import { usePendingCountNotificationSound } from "features/Home/usePendingCountNotificationSound";
// import usePendingCountSubscription from "../../../API/home/usePendingCountSubscription";

type Props = { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> };
export type ActiveItem = [active: boolean, href: string];
const Sidebar: FC<Props> = ({ open, setOpen }) => {
  const location = window.location.pathname.slice(1);
  const [activeItem, setActiveItem] = useState<ActiveItem>([false, location]);
  const small = useMediaQuery(useTheme().breakpoints.down("sm"));

  // usePendingCountNotificationSound();
  // usePendingCountSubscription();
  return (
    <ResponsiveDrawer open={open}>
      <Toolbar />
      {navLinks.map((section, index) => (
        <Fragment key={index}>
          <Divider />
          <List disablePadding>
            {section.map((sideBarItem) => (
              <SideBarListItem
                onClick={(haveChildren) => small && !haveChildren && setOpen(false)}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                data={sideBarItem}
                sideBarIsOpen={open}
                key={sideBarItem.href}
                level={0}
              />
            ))}
          </List>
        </Fragment>
      ))}
    </ResponsiveDrawer>
  );
};
const sharedMixin = (): CSSObject => ({
  ".MuiDrawer-paper::-webkit-scrollbar": {
    width: 6,
  },
});
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  overflowX: "hidden",
  "&, .fade, .fade *": {
    transition: theme.transitions.create(["width", "opacity", "margin", "padding"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
});

const closedMixin = (theme: Theme, iconOnly: boolean): CSSObject => ({
  overflowX: "hidden",
  "&, .fade, .fade *": {
    transition: theme.transitions.create(["width", "opacity", "margin", "padding"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  ...(iconOnly && {
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  }),
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerPermanent = styled(MuiDrawer)(({ theme, open }) => ({
  minWidth: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...sharedMixin(),
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme, true),
    "& .MuiDrawer-paper": closedMixin(theme, true),
  }),
}));
const DrawerTemporary = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...sharedMixin(),
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme, false),
    "& .MuiDrawer-paper": closedMixin(theme, false),
  }),
}));

type ResponsiveDrawerProps = {
  open: boolean;
  children: ReactNode;
};
const ResponsiveDrawer: FC<ResponsiveDrawerProps> = ({ open, children }) => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const ltr = useTheme().direction === "ltr";
  return (
    <>
      {small ? (
        <DrawerTemporary
          variant="temporary"
          anchor="left"
          SlideProps={{ direction: ltr ? "right" : "left" }}
          open={open}
        >
          {children}
        </DrawerTemporary>
      ) : (
        <DrawerPermanent variant="permanent" open={open}>
          {children}
        </DrawerPermanent>
      )}
    </>
  );
};
export default Sidebar;
