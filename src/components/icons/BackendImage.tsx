import { Box, BoxProps } from "@mui/material";
import { FILE_BASE_URL } from "../../constants/domain";
import { FC, useEffect, useState } from "react";
export type BackendImageProps = { url: string | undefined } & BoxProps<"img">;
const BackendImage: FC<BackendImageProps> = ({ url, ...props }) => {
  const [state, setState] = useState<"loading" | "error" | "success">("loading");
  const src = `${FILE_BASE_URL}/${url}`;
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setState("success");
    };
    image.onerror = () => {
      if (url !== "") setState("error");
    };
    image.src = src;
  }, [url, src]);
  return (
    <Box
      component={"img"}
      src={
        state === "loading"
          ? "/images/image-loading.png"
          : state === "error"
          ? "/images/image-error.png"
          : src
      }
      width={"100%"}
      height={"100%"}
      {...props}
      sx={{
        ...(state !== "success" && { objectFit: "cover" }),
        borderRadius: 1,
        objectFit: "contain",
        ...props?.sx,
      }}
    />
  );
};
export default BackendImage;
