import Loading from "@/components/feedback/Loading";
import { Box, Button, ButtonProps } from "@mui/material";

type Props = {
  isLoading: boolean;
  label?: string;
  loadingSize?: number;
} & ButtonProps;

const LoadingButton = ({
  isLoading,
  label = "التالي",
  loadingSize = 28,
  disabled,
  sx,
  ...props
}: Props) => {
  return (
    <Button
      disabled={disabled || isLoading}
      variant="contained"
      {...props}
      sx={{ position: "relative", ...sx }}
    >
      {isLoading && (
        <Box sx={{ position: "absolute" }}>
          <Loading size={loadingSize} sx={{ p: 0.5 }} />
        </Box>
      )}
      <Box sx={{ opacity: isLoading ? 0 : 1 }}>{label ?? "إرسال"}</Box>
    </Button>
  );
};

export default LoadingButton;
