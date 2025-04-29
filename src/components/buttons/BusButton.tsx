import { IconButton as Button, IconButtonProps, Tooltip } from "@mui/material";

type Props = IconButtonProps;

const BusButton = ({ disabled, children, title, ...props }: Props) => {
  if (disabled)
    return (
      <Button disabled={disabled} {...props}>
        {children}
      </Button>
    );
  return (
    <Tooltip title={title}>
      <Button {...props}>{children}</Button>
    </Tooltip>
  );
};
export default BusButton;
