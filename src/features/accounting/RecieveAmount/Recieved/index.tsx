import { accountingQueries } from "@/API/accounting/queries";
import Error from "@/components/feedback/Error";
import RecievedAction from "@/features/accounting/RecieveAmount/Recieved/RecievedAction";
import { moneyFormatter } from "@/utils/transforms";
import { Skeleton, Stack, Typography } from "@mui/material";

const Recieved = ({ onClose }: { onClose: () => void }) => {
  const { data, isLoading, isError, error, isSuccess } =
    accountingQueries.useRecievedQuery();
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
          <RecievedAction disabled={isLoading} onClose={onClose} />
        </>
      )}
    </Stack>
  );
};

export default Recieved;
