import { accountingQueries } from "@/API/accounting/queries";
import CountCard from "@/components/analytics/CountCard";
import useAccountingPageParams from "@/features/accounting/usePageParams";
import { Stack } from "@mui/material";

const AccountingAnalytics = () => {
  const params = useAccountingPageParams();

  const { pageNumber, query, ...restParams } = params;
  const { data, isLoading, isError } =
    accountingQueries.useAnalyticsQuery(restParams);
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      flexWrap="wrap"
      mt={2}
    >
      <CountCard
        count={data?.total}
        label="الإجمالي"
        isLoading={isLoading}
        isError={isError}
      />
      <CountCard
        count={data?.generalSandook}
        label="المصاريف العامة"
        isLoading={isLoading}
        isError={isError}
      />
      <CountCard
        count={data?.tourSandook}
        label="مصاريف الرحلات"
        isLoading={isLoading}
        isError={isError}
      />
      <CountCard
        count={data?.cashTour}
        label="مبلغ الرحلات المستقبلية"
        isLoading={isLoading}
        isError={isError}
      />
      <CountCard
        count={data?.recievedTour}
        label="مبلغ الرحلات المنتهية"
        isLoading={isLoading}
        isError={isError}
      />
    </Stack>
  );
};

export default AccountingAnalytics;
