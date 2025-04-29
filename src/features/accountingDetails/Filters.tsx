import FilterRow from "../../components/layout/FilterRow";
import { Button, Grid } from "@mui/material";
import SearchInput from "../../components/inputs/SearchInput";
import { accountingQueries } from "@/API/accounting/queries";
import { saveAs } from "file-saver";
import usePageParams from "@/features/accountingDetails/usePageParams";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
const Filters = () => {
  const download = accountingQueries.useDownloadOnwerStaff();
  const params = usePageParams();
  const errSnack = useAxiosErrorSnackbar();
  const handleClick = () => {
    download.mutate(params.tourId ?? "", {
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
          filename !== undefined ? filename.slice(filename.length - 16) : null;

        newName = ` تقرير موظفين المالك ${newName}`;
        saveAs(blob, newName);
      },
      onError: (err) => errSnack(err),
    });
  };
  return (
    <FilterRow sx={{ justifyContent: "rigth", width: "100%" }}>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <SearchInput />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={3}>
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
      </Grid>
    </FilterRow>
  );
};

export default Filters;
