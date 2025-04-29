import { ReactNode } from "react";
import { Box, Card, Fade, Skeleton, Stack, Typography } from "@mui/material";
import { moneyFormatter } from "@/utils/transforms";

export type CountCardProps = {
  count?: number;
  label: ReactNode;
  icon?: ReactNode;
  timeout?: number;
  isLoading: boolean;
  isError?: boolean;
  countUpDuration?: number;
};

const CountCard = ({
  count = 0,
  label,
  isLoading,
  icon,
  timeout = 500,
  isError = false,
}: // countUpDuration = 300,
CountCardProps) => {
  return (
    <Fade in={true} timeout={timeout}>
      <Card
        elevation={1}
        sx={{ px: 2, pt: 2, pb: 1, flex: "1", borderRadius: 2 }}
      >
        <Stack direction="row" justifyContent={"space-between"}>
          <Stack pl={1}>
            <Box>
              <Typography variant="body1">{label}</Typography>
              <Box
                sx={{
                  fontSize: 18,
                  pl: "10px",
                  mt: "10px",
                  color: count <= 0 ? "error.main" : "success.main",
                }}
              >
                {!isLoading && !isError && moneyFormatter.format(count)}
                {/* {!isLoading && !isError && (
                  
                  <CountUp end={count} useEasing duration={countUpDuration} />
                )} */}
                {isLoading && <Skeleton sx={{ fontSize: 15 }} />}
                {isError && (
                  <Typography variant="h6" color="error">
                    حدث أمر ما خاطئ!
                  </Typography>
                )}
              </Box>
            </Box>
          </Stack>
          {icon && (
            <Box
              my="auto"
              sx={{ svg: { fontSize: 50, color: "primary.main" } }}
            >
              {icon}
            </Box>
          )}
        </Stack>
      </Card>
    </Fade>
  );
};
export default CountCard;
