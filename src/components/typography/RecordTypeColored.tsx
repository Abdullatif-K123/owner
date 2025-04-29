import { Chip, ChipProps } from "@mui/material";
import { FC, ForwardedRef, forwardRef } from "react";
import { RecordType } from "../../API/branches/type";
import { recordTypesVal } from "../../constants/enumsValues";
type Props = { recordType: RecordType } & Omit<ChipProps, "label">;
const RecordTypeColored: FC<Props> = forwardRef(function FC(
  { recordType, ...props }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  let color = "primary.main";
  let bgcolor = "";
  switch (recordType) {
    case RecordType.Accepted:
      color = "white";
      bgcolor = "success.main";
      break;
    case RecordType.Rejected:
      bgcolor = "error.main";
      color = "white";

      break;
    case RecordType.Pending:
    default:
      color = "white";
      bgcolor = "warning.main";
  }

  return (
    <Chip
      ref={ref}
      // label={t(`enum.RecordType.${RecordType[recordType]}`)}
      label={recordTypesVal[recordType]}
      {...props}
      sx={{
        ...props.sx,
        ...(props.clickable && {
          ":hover": { color, bgcolor, filter: "brightness(0.8)" },
        }),
        transition: "filter 0.5s",
        color,
        bgcolor,
      }}
    />
  );
});
export default RecordTypeColored;
