import { Typography } from "@mui/material";
import { PaymentType } from "../../constants/enums";
type Props = {
  paymentType: PaymentType;
};
const PaymentTypeText = ({ paymentType }: Props) => {
  return (
    <>
      {paymentType === PaymentType.Syr && (
        <Typography sx={{ color: "rgb(220 0 0)" }}>Syriatel</Typography>
      )}
      {paymentType === PaymentType.Mtn && (
        <Typography sx={{ color: "rgb(231 182 0)" }}>MTN</Typography>
      )}
      {paymentType === PaymentType.Fatora && (
        <Typography sx={{ color: "blue" }}>فاتورة</Typography>
      )}
      {(paymentType === PaymentType.Office ||
        paymentType === PaymentType.App) && (
        <Typography sx={{ color: "#1c5256" }}>نقدي</Typography>
      )}
    </>
  );
};
export default PaymentTypeText;
