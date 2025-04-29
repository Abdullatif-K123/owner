import { TourCustomer } from "@/API/tour/types";
import GenderText from "@/components/typography/GenderText";
import PaymentTypeText from "@/components/typography/PaymentTypeText";
import Info from "@/features/reservations/Action/Details/Info";
import useIsoToArabicDate from "@/hooks/useIsoToArabicDate";
import { creationDateFormat } from "@/utils/transforms";
import { Box, Paper, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  data: TourCustomer | null;
};
const Details = ({ data }: Props) => {
  if (!data) {
    return <Typography>المقعد غير محجوز</Typography>;
  }

  return (
    <Stack gap={3}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Info
          label="اسم الزبون"
          value={
            data.firstName || data.lastName
              ? `${data.firstName || ""} ${data.lastName || ""}`.trim()
              : null
          }
        />
        <Info
          label="رقم الموبايل"
          value={<Box sx={{ direction: "rtl" }}>{data.phomeNumber}</Box>}
        />
        <Info label="اسم الأب" value={data.fatherName} />
        <Info label="اسم الأم" value={data.motherName} />
        <Info label="الخانة" value={data.city} />
        <Info label="الرقم الوطني" value={data.nationalNumber} />
        <Info
          label="تاريخ الميلاد"
          value={creationDateFormat(data.birthDate)}
        />
        <Info label="الجنس" value={<GenderText gender={data.gender} />} />
        <Info
          label="نوع الحجز"
          value={data.bookingType ? "من التطبيق" : "من المكتب"}
        />
        <Info label="رقم المقعد" value={data.chairNumber} />
        <Info
          label="تاريخ الحجز"
          value={useIsoToArabicDate(data.boockingDate)}
        />
        <Info
          label="تم الدفع"
          value={
            data.isPaid ? (
              <CheckIcon />
            ) : (
              <ClearIcon sx={{ color: "secondary.main" }} />
            )
          }
        />
        <Info
          label="نوع الدفع"
          value={<PaymentTypeText paymentType={data.paymentType} />}
        />
      </Paper>
    </Stack>
  );
};

export default Details;
