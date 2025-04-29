import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Badge,
  Collapse,
  List,
  SxProps,
  Typography,
  darken,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Stack } from "@mui/system";
import OptionalLink from "../../../components/links/OptionalLink";
import { NavLink } from "../../../constants/navLinks";
import { FC, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { ActiveItem } from ".";
import { useRoleContext } from "../../../contexts/RoleContext";
const LinkSx: SxProps = {
  display: "block",
  color: "#000",
  "&:hover": { color: "primary.main" },
  "& .MuiListItemButton-root": {
    "&.Mui-selected": {
      backgroundColor: "primary.100",
    },
  },
};
export type SideBarListItemProps = {
  data: NavLink;
  sideBarIsOpen: boolean;
  activeItem: ActiveItem;
  setActiveItem: React.Dispatch<React.SetStateAction<[boolean, string]>>;
  level: number;
  onClick: (haveChildren: boolean) => void;
};
export const SideBarListItem: FC<SideBarListItemProps> = ({
  data,
  sideBarIsOpen,
  activeItem,
  setActiveItem,
  level,
  onClick,
}) => {
  const pathname = useLocation().pathname.slice(1);
  const indent = 2.5;
  const bgcolor = darken("#fff6", level * 0.1);
  const isActive = activeItem[1] === data.href && activeItem[0];
  const isOpen = isActive || childActive(activeItem[1], data.children);

  const handleClick = () => {
    setActiveItem([!isOpen, data.href]);
    onClick(!!data.children);
  };

  const { isStaff, isManager, isOwner } = useRoleContext();
  if (
    (isStaff && data.hideFromStaff) ||
    (isManager && data.hideFromManager) ||
    (isOwner && data.hideFromOwner)
  ) {
    return null;
  }
  return (
    <Fragment key={data.href}>
      <ListItem key={data.href} disablePadding sx={{ ...LinkSx, bgcolor }}>
        <OptionalLink
          withLink={!data.children}
          sx={{
            textDecoration: "none !important",
            color: "#000",
            "&:hover": { color: "primary.main" },
          }}
          href={data.href}
        >
          <ListItemButton
            selected={
              ((pathname.startsWith(data.href) && data.href !== "") ||
                pathname === data.href) &&
              !data.children
            }
            className="fade"
            sx={{
              minHeight: 48,
              justifyContent: sideBarIsOpen ? "initial" : "center",
              px: 2.5,
              pl: indent,
            }}
            onClick={handleClick}
          >
            <Badge
              color="secondary"
              sx={{ ".MuiBadge-badge": { fontSize: 9 } }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: { xs: 1, sm: sideBarIsOpen ? 3 : 0 },
                  justifyContent: "center",
                }}
              >
                {data.icon}
              </ListItemIcon>
            </Badge>
            <ListItemText>
              <Stack
                direction={"row"}
                justifyContent="space-between"
                sx={{
                  opacity: sideBarIsOpen ? 1 : 0,
                  ...(!data.href && {
                    color: "primary.main",
                    fontWeight: "550",
                  }),
                }}
              >
                <Typography>{data.name}</Typography>
                {data.children && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                <Badge
                  sx={{ mt: 1, ".MuiBadge-badge": { pt: 0.1 } }}
                  color="secondary"
                />
              </Stack>
            </ListItemText>
          </ListItemButton>
        </OptionalLink>
      </ListItem>
      <Collapse in={isOpen}>
        <List component="div" disablePadding>
          {data.children?.map((sideBarItem) => (
            <SideBarListItem
              onClick={onClick}
              level={level + 1}
              key={sideBarItem.href}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              data={sideBarItem}
              sideBarIsOpen={sideBarIsOpen}
            />
          ))}
        </List>
      </Collapse>
    </Fragment>
  );
};
function childActive(activeHref: string, children: NavLink[] | undefined = []) {
  return children.flat(Infinity).some((item) => item.href === activeHref);
}
export default SideBarListItem;
