import React, { FC, useEffect, useRef, useState } from "react";
import { TextField, InputLabel, Typography, Box, Chip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import bussesQuery from "../../../API/busses/queries";
import { filesUploadschema } from "../validations";
import { UploadedFiles } from "../../../API/busses/types";
import Loading from "../../../components/feedback/Loading";
import { useSnackbarContext } from "../../../contexts/snackBarContext";

type Props = {
  value: string;
  onChange: (val: string) => void;
  uploadedFile: UploadedFiles;
  setUploadedFile: React.Dispatch<React.SetStateAction<UploadedFiles>>;
  deletedIds: string[] | [];
  setDeletedIds: (ids: string[]) => void;
  label: string;
  fileSourceType: number;
  fileSectionType: number;
  styling?: {
    ml?: number | string;
    mr?: number | string;
  };
};

const FileInput: FC<Props> = ({
  label,
  styling,
  value,
  onChange,
  uploadedFile,
  setUploadedFile,
  // deletedIds,
  setDeletedIds,
  fileSourceType,
  fileSectionType,
}) => {
  console.log(value);
  const currentId = useRef(value);
  const [_refresh, setRefresh] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  // const deletedIds = useRef<string[] | []>([]);

  useEffect(() => {
    currentId.current = value;
    setRefresh((prev) => !prev);
  }, [value]);

  const mutation = bussesQuery.useAddFileMutation();
  const Snackbar = useSnackbarContext();

  const onFileChoose = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let deletedTemp: string[] = [];
    const { files } = e.target;
    if (files && files[0].type.indexOf("image") === -1) {
      setUploadedFile({ value: "", color: "default" });
      Snackbar({ message: "يمكنك تحميل صور فقط", severity: "warning" });
      return;
    }
    currentId.current.length > 0 && deletedTemp.push(currentId.current);
    setUploadedFile({ value: files ? files[0]?.name : "", color: "default" });
    onChange("loading");
    const formData = new FormData();
    try {
      if (files) {
        await filesUploadschema.validate({ attachment: files[0] });
        setErrorMsg("");
        formData.append("file", files[0]);
        mutation.mutate(
          {
            formData: formData,
            params: {
              fileSourceType: fileSourceType,
              fileSectionType: fileSectionType,
            },
          },
          {
            onSuccess: (id) => {
              onChange(id);
              setDeletedIds(deletedTemp);
              currentId.current = id;
              setUploadedFile((prev: UploadedFiles) => {
                return { ...prev, color: "success" };
              });
            },
            onError: (err) => console.log(err),
          }
        );
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleDelete = () => {
    console.log("deleteing...");
    setUploadedFile({ value: "", color: "default" });
    onChange("");
  };

  return (
    <Box sx={{ width: { xs: "16rem", sm: "100%" }, p: 1, mx: "auto" }}>
      <InputLabel
        sx={{
          ...styling,
          width: "100%",
          height: "12rem",
          borderRadius: "2rem",
          border: "1px solid",
          borderColor: "gray",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 0.1s linear",
          zIndex: 4,
          "&:hover": {
            transform: "scale(1.01)",
            backgroundColor: "lightgray",
          },
        }}
      >
        <CloudUploadIcon fontSize="large" />
        <Typography component="p">{label}</Typography>
        {uploadedFile.value.length > 0 ? (
          <>
            <Chip
              label={uploadedFile.value}
              color={uploadedFile.color}
              onDelete={handleDelete}
              icon={
                uploadedFile.color === "default" ? <Loading size={18} /> : <></>
              }
              sx={{ zIndex: 5 }}
            />
          </>
        ) : null}
        <TextField
          type="file"
          onChange={onFileChoose}
          sx={{ display: "none", zIndex: 4 }}
          id="fileUpload"
        />
      </InputLabel>
      <Typography sx={{ ml: 2 }} component="p" color="error.main">
        {errorMsg}
      </Typography>
    </Box>
  );
};

export default FileInput;
