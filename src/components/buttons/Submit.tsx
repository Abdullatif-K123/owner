import { Button, ButtonProps } from "@mui/material";
import { Box } from "@mui/system";
import Loading from "@/components/feedback/Loading";
import { RefObject, forwardRef } from "react";

type Props = {
  isSubmitting?: boolean;
  error?: boolean;
  loadingSize?: number;
} & ButtonProps;

const Submit = forwardRef(function FR(
  {
    isSubmitting = false,
    error = false,
    disabled,
    children,
    sx,
    loadingSize = 25,
    ...props
  }: Props,
  ref
) {
  return (
    <Button
      ref={ref as RefObject<any>}
      disabled={isSubmitting || error || disabled}
      variant="contained"
      type="submit"
      {...props}
      sx={{
        position: "relative",
        bgcolor: error ? "error.main" : "",
        ...sx,
      }}
    >
      {isSubmitting && (
        <Box sx={{ position: "absolute" }}>
          <Loading size={loadingSize} sx={{ p: 0.5 }} />
        </Box>
      )}
      <Box sx={{ opacity: isSubmitting ? 0 : 1 }}>{children ?? "التالي"}</Box>
    </Button>
  );
});
export default Submit;
