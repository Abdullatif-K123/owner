import { accountingQueries } from "@/API/accounting/queries";
import { AccountingBoxesDetails } from "@/API/accounting/types";
import RemoveIconButton from "@/components/buttons/RemoveIconButton";
import NormalPaginationTable from "@/components/tables/NormalPaginationTable";
import TableRowStriped from "@/components/tables/PaginationTable/TableRowStriped";
import useNormalPaginationPage from "@/hooks/useNormalPaginationPage";
import { moneyFormatter } from "@/utils/transforms";
import { saveAs } from "file-saver";
import {
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";

const tableHeaders = ["الاسم", "الوصف", "المبلغ", "خيارات"];

const AccountingBoxesTable = () => {
  const { id } = useParams();
  const download = accountingQueries.useDownloadAccountDetails();
  const [searchParams, setSearchParams] = useSearchParams();
  const Query = accountingQueries.useBoxesDetilsQuery({ tourId: id ?? "" });
  const { page, pageNumber, setPageNumber } =
    useNormalPaginationPage<AccountingBoxesDetails>(Query.data);
  const errSnack = useAxiosErrorSnackbar();
  const handleClick = () => {
    download.mutate(id ?? "", {
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

        newName = ` تقرير تفاصيل الصندوق ${newName}`;
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
          maxWidth: 140,
        }}
        onClick={handleClick}
      >
        تصدير كملف
      </Button>
      <NormalPaginationTable
        skeleton={true}
        setPage={setPageNumber}
        cellCount={tableHeaders.length}
        tableHead={
          <TableHead>
            <TableRow>
              {tableHeaders.map((cellHeader) => (
                <TableCell key={cellHeader}>{cellHeader}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        }
        page={pageNumber}
        query={Query}
      >
        <TableBody>
          {page.map((row, index) => (
            <TableRowStriped key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description ?? "لا يوجد"}</TableCell>
              <TableCell>{moneyFormatter.format(row.amount)}</TableCell>
              <TableCell>
                <RemoveIconButton
                  sx={
                    row.id !== "00000000-0000-0000-0000-000000000000"
                      ? {}
                      : { opacity: 0.5 }
                  }
                  disabled={row.id === "00000000-0000-0000-0000-000000000000"}
                  onClick={() => {
                    searchParams.set("id", `${row.id}`);
                    searchParams.set("amount", `${row.amount}`);
                    setSearchParams(searchParams, { replace: true });
                  }}
                />
              </TableCell>
            </TableRowStriped>
          ))}
        </TableBody>
      </NormalPaginationTable>
    </>
  );
};

export default AccountingBoxesTable;
