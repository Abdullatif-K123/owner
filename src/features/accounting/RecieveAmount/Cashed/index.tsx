import { accountingQueries } from "@/API/accounting/queries";
import Error from "@/components/feedback/Error";
import ChashedAction from "@/features/accounting/RecieveAmount/Cashed/ChashedAction";
import { moneyFormatter } from "@/utils/transforms";
import { Skeleton, Stack, Typography } from "@mui/material";

const Cahsed = ({ onClose }: { onClose: () => void }) => {
  const { data, isLoading, isError, error, isSuccess } =
    accountingQueries.useCashedQuery();
  return (
    <Stack gap={2}>
      {isError && <Error error={error} />}
      {!isError && (
        <>
          <Typography variant="h6">
            هل أنت متأكد من تسليم المبلغ التالي:
          </Typography>
          <Typography
            sx={{
              padding: "15px 9px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              color: "#777",
            }}
          >
            {isLoading && <Skeleton sx={{ fontSize: 15 }} />}
            {isSuccess && moneyFormatter.format(data)}
          </Typography>
          <ChashedAction disabled={isLoading} onClose={onClose} />
        </>
      )}
    </Stack>
  );
};

export default Cahsed;
