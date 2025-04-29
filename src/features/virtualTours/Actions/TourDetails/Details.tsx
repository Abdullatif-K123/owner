import { Paper, Stack, Typography } from "@mui/material";
import { TourDetails } from "../../../../API/tour/types";
import LuggageIcon from "@mui/icons-material/Luggage";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import Info from "./Info";
import useIsoToArabicDate from "../../../../hooks/useIsoToArabicDate";
import CitiesList from "./CitiesList";

const Details = ({ data }: { data: TourDetails }) => {
  return (
    <Stack gap={3}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography
          component="h3"
          variant="h6"
          color="primary.main"
          sx={{ display: "flex", alignItems: "center", mb: 2 }}
        >
          <LuggageIcon
            fontSize="medium"
            sx={{ color: "secondary.main", mx: 0.5 }}
          />
          تفاصيل الرحلة
        </Typography>
        <Info label="اسم الرحلة" value={data.name} />
        <Info label="الفرع" value={data.name} />

        <Info
          label="تاريخ الإنطلاق"
          value={useIsoToArabicDate(data.leaveDate)}
        />
        <Info
          label="تاريخ الوصول"
          value={useIsoToArabicDate(data.arriveDate)}
        />
      </Paper>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography
          component="h3"
          variant="h6"
          color="primary.main"
          sx={{ display: "flex", alignItems: "center", mb: 2 }}
        >
          المدن
        </Typography>
        <CitiesList list={data.tourCities} />
      </Paper>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography
          component="h3"
          variant="h6"
          color="primary.main"
          sx={{ display: "flex", alignItems: "center", mb: 2 }}
        >
          <DirectionsBusIcon
            fontSize="medium"
            sx={{ color: "secondary.main", mx: 0.5 }}
          />
          تفاصيل الحافلة
        </Typography>

        <Info label="الحافلة" value={data.busName} />
        <Info label="سعر المقعد" value={data.chairPrice} />

        <Info label="اسم السائق" value={data.driverName} />
        <Info label="اسم معاون السائق" value={data.coDriverName} />

        <Info label="رقم موبايل السائق" value={data.driverphoneNumber} />
        <Info
          label="رقم موبايل معاون السائق"
          value={data.coDriverPhoneNumber}
        />

        <Info
          label="رقم موبايل بديل السائق"
          value={data.anotherDriverphoneNumber}
        />
        <Info
          label="رقم موبايل بديل لمعاول السائق"
          value={data.anotherCoDriverPhoneNumber}
        />
      </Paper>
    </Stack>
  );
};

export default Details;
