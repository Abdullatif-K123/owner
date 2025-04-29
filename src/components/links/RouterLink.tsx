import { Link, LinkProps } from "@mui/material";
import { Ref, forwardRef } from "react";
import { Link as Router } from "react-router-dom";
const RouterLink = forwardRef(function FC(
  {
    href,
    children,
    noDecoration = false,
    ...props
  }: LinkProps & { noDecoration?: boolean },
  ref: Ref<HTMLAnchorElement>
) {
  return (
    <Link
      ref={ref}
      component={Router}
      to={href ?? ""}
      {...props}
      sx={{
        textDecoration: noDecoration ? "none" : "underline",
        ...props.sx,
      }}
    >
      {children}
    </Link>
  );
});
export default RouterLink;
