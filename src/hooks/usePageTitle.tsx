import { useLocation } from "react-router-dom";

function usePageTitle() {
  let pageTitle = useLocation().pathname.split("/")[1];
  switch (pageTitle) {
    case "branches":
      pageTitle = "فروع";
      break;
    case "busses":
      pageTitle = "الحافلات";
      break;
    case "accounting":
      pageTitle = "المالية";
      break;
    case "tours":
      pageTitle = "الرحلات";
      break;
    case "virtualTours":
      pageTitle = "الرحلات المجردة";
      break;
    case "staff-accounting":
      pageTitle = "مالية الموظفين";
      break;
    case "manager-accounting":
      pageTitle = "مالية المدراء";
      break;
    case "employees":
      pageTitle = "الموظفين";
      break;
    case "managers":
      pageTitle = "المدراء";
      break;
    case "security-list":
      pageTitle = "الأمنية";
      break;
    default:
      pageTitle = "الرئيسية";
      break;
  }
  return pageTitle;
}

export default usePageTitle;
