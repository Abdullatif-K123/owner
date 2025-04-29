import { Button } from "@mui/material";

import RouterLink from "@/components/links/RouterLink";
import { useReservationsContext } from "../context/ReservationsContext";
import { useSearchParams } from "react-router-dom";
const SecurityListExportButton = () => {
  const { tourId } = useReservationsContext();
  
  const [searchParams] = useSearchParams();
  const branchId = searchParams.get("branchId");
  const name = searchParams.get("name"); 
  const date = searchParams.get("date"); 
  const busName = searchParams.get("busName");
  return (
    <>
      <Button
        LinkComponent={RouterLink}
        type="button"
        variant="contained"
        sx={{
          fontSize: { xs: 10, sm: 15 },
          minWidth: 140,
        }}
        href={`/security-list/${tourId}?branchId=${branchId}&date=${date}&name=${name}&bus=${busName}`}
        target="_blank"
      >
        الأمنية
      </Button>
    </>
  );
};

export default SecurityListExportButton;
