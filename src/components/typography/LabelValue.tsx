import { Stack, StackProps } from "@mui/material";
import { Box } from "@mui/system";
import Skeleton, { SkeletonProps } from "../feedback/Skeleton";
import { useLoadingContext } from "../../contexts//loadingContext";
import { FC, ReactNode } from "react";
export type KeyValueProps = {
  label: ReactNode;
  children?: ReactNode;
  noColon?: boolean;
  ltr?: boolean;
  skeletonProps?: SkeletonProps;
} & StackProps;
const LabelValue: FC<KeyValueProps> = ({
  children,
  label,
  skeletonProps,
  noColon = false,
  ltr = false,
  ...props
}) => {
  const isLoading = useLoadingContext();
  return (
    <Stack
      direction={"row"}
      gap={1}
      {...props}
      sx={{
        fontSize: 14,
        wordBreak: "break-word",
        ...props.sx,
      }}
      className="label-value"
    >
      <Stack
        className="label"
        color="secondary.main"
        sx={{ wordBreak: "normal" }}
        direction="row"
      >
        {label}
        {!noColon && ":"}
      </Stack>

      {!isLoading && (
        <Box color="primary.main" className="value">
          {children ?? <Empty />}
        </Box>
      )}
      {isLoading && (
        <Skeleton
          widthRange={{ min: 40, max: 70 }}
          height={"100%"}
          sx={{ my: "auto" }}
          {...skeletonProps}
        />
      )}
    </Stack>
  );
};
const Empty = () => (
  <Box px={3} fontWeight="bold">
    -
  </Box>
);
export default LabelValue;
