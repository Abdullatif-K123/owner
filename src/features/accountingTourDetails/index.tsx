import { Button, Stack } from "@mui/material";
import AccountingTourDetailsTable from "@/features/accountingTourDetails/AccountingTourDetailsTable";
import usePageParams from "@/features/accountingTourDetails/usePageParams";
import { accountingQueries } from "@/API/accounting/queries";
import { saveAs } from "file-saver";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
const AccountingTourDetailsPage = () => {
  const download = accountingQueries.useDownloadOwnerStaffDetails();
  const errSnack = useAxiosErrorSnackbar();
  const params = usePageParams();
  const handleClick = () => {
    download.mutate(
      { tourId: params.tourId, ownerStaffId: params.ownerStaffId },
      {
        onSuccess: (val) => {
          console.log(val);
          const blob = new Blob([val.data], {
            type: "application/vnd.ms-excel",
          });
          const contentDisposition = val.headers["content-disposition"];
          const filenameMatch = contentDisposition.match(/filename="(.*?)"/);
          const filename: string | undefined = filenameMatch
            ? filenameMatch[1]
            : undefined;

          let newName =
            filename !== undefined
              ? filename.slice(filename.length - 16)
              : null;

          newName = ` تقرير تفاصيل موظفين المالك ${newName}`;
          saveAs(blob, newName);
        },
        onError: (err) => errSnack(err),
      }
    );
  };
  return (
    <Stack spacing={2}>
      <Button
        type="button"
        variant="contained"
        sx={{
          fontSize: { xs: 10, sm: 15 },
          maxWidth: 140,
        }}
        onClick={handleClick}
      >
        تصدير كملف
      </Button>
      <AccountingTourDetailsTable />
    </Stack>
  );
};

export default AccountingTourDetailsPage;
