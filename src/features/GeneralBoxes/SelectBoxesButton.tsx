import ButtonsStack from "@/components/layout/ButtonsStack";
import { useGeneralBoxesContext } from "@/features/GeneralBoxes/context/GeneralBoxesContext";
import { Button } from "@mui/material";
import { accountingQueries } from "@/API/accounting/queries";
import { saveAs } from "file-saver";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
const SelectBoxesButton = ({ isReceived }: { isReceived?: boolean }) => {
  const { setIsSelectionEnabeld, isSelectionEnabeld, boxes, setModalOpened } =
    useGeneralBoxesContext();
  const errSnack = useAxiosErrorSnackbar();
  const download = accountingQueries.useDownloadGeneralSandook();
  const handleClick = () => {
    if (isSelectionEnabeld) {
      if (boxes.length !== 0) setModalOpened(true);
      else setIsSelectionEnabeld(false);
    } else {
      setIsSelectionEnabeld(true);
    }
  };
  //Exporting as excel
  const handleClickDownload = () => {
    download.mutate(undefined, {
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

        newName = ` تقرير المصاريف العامة ${newName}`;
        saveAs(blob, newName);
      },
      onError: (err) => errSnack(err),
    });
  };

  const action =
    isReceived === undefined
      ? "تحديد للتسليم"
      : isReceived === true
      ? "تحديد للاستلام"
      : "إنهاء المصاريف";

  return (
    <ButtonsStack sx={{ width: "fit-content" }}>
      <Button variant="contained" size="small" onClick={handleClick}>
        {isSelectionEnabeld && boxes.length !== 0 && "تأكيد"}
        {isSelectionEnabeld && boxes.length === 0 && "إلغاء"}
        {!isSelectionEnabeld && action}
      </Button>
      <Button
        type="button"
        variant="contained"
        size="small"
        onClick={handleClickDownload}
      >
        تصدير كملف
      </Button>
    </ButtonsStack>
  );
};

export default SelectBoxesButton;
