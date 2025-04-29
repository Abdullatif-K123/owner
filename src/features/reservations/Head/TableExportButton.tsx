import { useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";

import { toursQueries } from "../../../API/tour/queries";
import useAxiosErrorSnackbar from "../../../hooks/useAxiosErrorSnackBar";
import { useReservationsContext } from "../context/ReservationsContext";

const TableExportButton = () => {
  const { tourId } = useReservationsContext();
  const [searchParams] = useSearchParams();
  const download = toursQueries.useDownload();

  const errSnack = useAxiosErrorSnackbar();

  const handleClick = () => {
    download.mutate(tourId, {
      onSuccess: (val) => {
        const blob = new Blob([val.data], {
          type: "application/vnd.ms-excel",
        });
        const contentDisposition = val.headers["content-disposition"];
        const filenameMatch = contentDisposition.match(/filename="(.*?)"/);
        const filename: string | undefined = filenameMatch
          ? filenameMatch[1]
          : undefined;

        let newName =
          filename !== undefined ? filename.slice(filename.length - 16) : null;

        const tourName = searchParams.get("name");
        newName = ` تقرير زبائن رحلة ${tourName} ${newName}`;
        saveAs(blob, newName);
      },
      onError: (err) => errSnack(err),
    });
  };

  return (
    <>
      <Button
        type="button"
        variant="contained"
        sx={{
          fontSize: { xs: 10, sm: 15 },
          minWidth: 140,
        }}
        onClick={handleClick}
      >
        تصدير
      </Button>
    </>
  );
};

export default TableExportButton;
