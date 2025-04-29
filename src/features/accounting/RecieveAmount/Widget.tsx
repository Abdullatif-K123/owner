import ButtonsStack from "@/components/layout/ButtonsStack";
import { useRoleContext } from "@/contexts/RoleContext";
import { ModalType } from "@/features/accounting/RecieveAmount";
import RecieveToursButton from "@/features/accounting/RecieveToursButton";
import { Button } from "@mui/material";
import { accountingQueries } from "@/API/accounting/queries";
import { saveAs } from "file-saver";
import usePageParams from "@/features/accounting/usePageParams";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
const RecieveAmountWidget = ({
  openModal,
}: {
  openModal: React.Dispatch<React.SetStateAction<ModalType>>;
}) => {
  const { isOwner } = useRoleContext();
  const params = usePageParams();
  const errSnack = useAxiosErrorSnackbar();
  const download = accountingQueries.useDownloadTourFinance();
  const handleClick = () => {
    download.mutate(
      { userId: params.userId ?? "", branchId: params.branchId ?? "" },
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

          newName = ` تقرير مالية الرحلات ${newName}`;
          saveAs(blob, newName);
        },
        onError: (err) => errSnack(err),
      }
    );
  };
  return (
    <ButtonsStack sx={{ justifyContent: "left" }}>
      {!isOwner && (
        <>
          <Button
            variant="contained"
            onClick={() => openModal(ModalType.Recieved)}
          >
            تسليم مبلغ الرحلات المنتهية
          </Button>
          <Button variant="contained" onClick={() => openModal(ModalType.Cash)}>
            تسليم مبلغ الرحلات القادمة
          </Button>
        </>
      )}
      {isOwner && <RecieveToursButton />}
      <Button
        type="button"
        variant="contained"
        sx={{
          maxWidth: 140,
        }}
        onClick={handleClick}
      >
        تصدير كملف
      </Button>
    </ButtonsStack>
  );
};

export default RecieveAmountWidget;
