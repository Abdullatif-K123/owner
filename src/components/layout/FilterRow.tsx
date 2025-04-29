import { Grid, GridProps } from "@mui/material";
import { FC, ReactNode } from "react";
type Props = { children: ReactNode } & GridProps;
const FilterRow: FC<Props> = ({ children,...props }) => {
  return (
    <Grid container spacing={1} {...props}>
      {children}
    </Grid>
  );
};
export default FilterRow;
