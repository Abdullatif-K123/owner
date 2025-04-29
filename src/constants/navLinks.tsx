import { ReactNode } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CashMoneyIcon from "@/components/icons/CashMoneyIcon";
import RecevedMoney from "@/components/icons/RecevedMoney";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ExploreIcon from "@mui/icons-material/Explore";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export type NavLink = {
  href: string;
  name: string;
  icon: ReactNode;
  children?: NavLink[];
  hideFromStaff?: boolean;
  hideFromManager?: boolean;
  hideFromOwner?: boolean;
};

export const navLinks: NavLink[][] = [
  [
    {
      href: "/?tourStatusHome=2&timestamp=Weekly",
      name: "الرئيسية",
      icon: <AppsIcon />,
    },
  ],
  [
    {
      href: "branches",
      name: "الفروع",
      icon: <CorporateFareIcon />,
    },
    {
      href: "busses",
      name: "الحافلات",
      icon: <DirectionsBusIcon />,
    },
    {
      href: "tours",
      name: "الرحلات",
      icon: <ExploreIcon />,
    },
    {
      href: "virtualTours",
      name: "الرحلات المجردة",
      icon: <ExploreIcon />,
      hideFromStaff: true,
    },
  ],
  [
    {
      href: "company-accounting",
      name: "المالية",
      icon: <AttachMoneyIcon />,
      hideFromManager: true,
      hideFromStaff: true,
      children: [
        {
          href: "company-accounting-cash",
          name: "مالية الكاش",
          icon: <CashMoneyIcon />,
        },
        {
          href: "company-accounting-online",
          name: "مالية الدفع الإلكتروني",
          icon: <RecevedMoney />,
        },
      ],
    },
    {
      href: "accounting",
      name: "الصناديق",
      icon: <AttachMoneyIcon />,
    },
    {
      href: "sandook-general",
      name: "المصاريف العامة",
      icon: <AttachMoneyIcon />,
    },
  ],
  [
    {
      href: "employees",
      name: "الموظفين",
      icon: <Diversity3Icon />,
      hideFromStaff: true,
    },
    {
      href: "managers",
      name: "المدراء",
      icon: <SupervisorAccountIcon />,
      hideFromManager: true,
      hideFromStaff: true,
    },
  ],
];
