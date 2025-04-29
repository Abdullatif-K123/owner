import CountCard from "@/components/analytics/CountCard";
import { Stack } from "@mui/material";

const NoStaffSelectedAnalytics = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      flexWrap="wrap"
      mt={2}
    >
      <CountCard count={0} label="الإجمالي" isLoading={false} />
      <CountCard count={0} label="المصاريف العامة" isLoading={false} />
      <CountCard count={0} label="مصاريف الرحلات" isLoading={false} />
      <CountCard count={0} label="مبلغ الرحلات المستقبلية" isLoading={false} />
      <CountCard count={0} label="مبلغ الرحلات المنتهية" isLoading={false} />
    </Stack>
  );
};

export default NoStaffSelectedAnalytics;
