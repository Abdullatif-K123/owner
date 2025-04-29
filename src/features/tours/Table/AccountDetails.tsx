import { IconButton, Tooltip } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import RouterLink from "@/components/links/RouterLink"; // Ensure this is your link component

type Props = {
  id: string;
};

const AccountDetails = ({ id }: Props) => {
  return (
    <Tooltip title="عرض تفاصيل مصاريف الرحلة">
      <RouterLink href={`/accounting/${id}`} noDecoration>
        <IconButton sx={{ ":hover": { color: "primary.main" } }}>
          <MonetizationOnIcon />
        </IconButton>
      </RouterLink>
    </Tooltip>
  );
};

export default AccountDetails;
