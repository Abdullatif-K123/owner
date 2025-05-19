import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Fab,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import useShrink from "../../hooks/useShrink";
import { TransitionProps } from "@mui/material/transitions";
import DropDownInput from "../login/components/DropDownInput";
import ModalAccordion from "./components/ModalAccordion";
import bussesQuery from "../../API/busses/queries";
import FileInput from "./components/FileInput";
import {
  fileSourceType,
  fileSectionType,
  addBussesSchema,
  addBussesDefault,
} from "./validations";
import { citiesDefault } from "../login/validations";
import { AddBussesType, UploadedFiles } from "../../API/busses/types";
import "./index.css";
import useAxiosErrorSnackbar from "../../hooks/useAxiosErrorSnackBar";
import { useQueryClient } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import useSuccessSnackbar from "../../hooks/useSuccessSnackbar";
import SaveButton from "../../components/buttons/SaveButton";

type Props = {
  addOpen: boolean;
  setAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddBusses: FC<Props> = ({ setAddOpen, addOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [id, setId] = useState<string>("");
  const [deletedIds, setDeletedIds] = useState<string[] | []>([]);
  const [busImageName, setBusImageName] = useState<UploadedFiles>({
    value: "",
    color: "default",
  });
  const [plateImageName, setPlateImageName] = useState<UploadedFiles>({
    value: "",
    color: "default",
  });

  useEffect(() => {
    setId(searchParams.get("id") ?? "");
  }, [searchParams]);

  const getQuery = bussesQuery.useDetailsQuery(id);

  const handleClickOpen = () => {
    setAddOpen(true);
  };

  const { data, status } = bussesQuery.useSelectBranchQuery();

  const branches = status === "success" ? data : citiesDefault;

  const form = useForm<AddBussesType>({
    resolver: yupResolver<AddBussesType>(addBussesSchema),
    defaultValues: addBussesDefault,
  });

  const { register, control, formState, handleSubmit, setValue, reset } = form;
  const { errors } = formState;

  const handleClose = () => {
    setSearchParams({});
    setTimeout(() => {
      reset();
      setModelDefault("");
      setFlag(false);
      setBusImageName({ value: "", color: "default" });
      setPlateImageName({ value: "", color: "default" });
    }, 100);
    setAddOpen(false);
  };

  // ##### THIS blOCK IS FOR SETTING THE EDITED VALUES ##########

  // This Flag is to ensure that this effect runs only in Edit mode
  const [flag, setFlag] = useState(false);
  const [modelDefault, setModelDefault] = useState("");
  useEffect(() => {
    const data = getQuery ? getQuery.data ?? null : null;
    console.log(data);
    if (data !== undefined && data !== null && !flag) {
      setFlag(true);
      Object.entries(data as AddBussesType).forEach(([name, value]) => {
        if (
          name === "model" &&
          !Array.isArray(value) &&
          typeof value !== "string"
        ) {
          setValue("modelId", value?.id);
          setModelDefault(value?.name ?? "");
        } else if (addBussesDefault.hasOwnProperty(name)) {
          const key = name as keyof AddBussesType;
          setValue(key, value);
        }
      });
    }
  }, [getQuery]);

  const queryClient = useQueryClient();

  const mutation = bussesQuery.useAddBusMutation();
  const { isLoading } = mutation;

  const errSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const onSubmit = (body: AddBussesType) => {
    mutation.mutate(body, {
      onSuccess: (_data) => {
        successSnackbar("تم حفظ الحافلة بنجاح");
        queryClient.invalidateQueries([controllers.BUS, "all"]);
        handleClose();
      },
      onError: (err: unknown) => errSnackbar(err),
    });
  };

  const isEditing = id.length > 0;

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed !important", bottom: 16, right: 16 }}
        onClick={handleClickOpen}
      >
        <AddIcon style={{ fill: "#fefefe" }} />
      </Fab>

      <Dialog
        open={addOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
      >
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle>
            <Typography variant="h4" component="p" color="primary">
              {isEditing ? "تعديل الحافلة" : "إضافة حافلة"}
            </Typography>
          </DialogTitle>
          <Stack
            id="alert-dialog-slide-description"
            spacing={4}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "80vw", lg: "75rem" },
            }}
          >
            <Stack
              sx={{ width: "85%", justifyContent: "space-between" }}
              direction="row"
              flexWrap="wrap"
            >
              <Box sx={{ my: 1, mx: "auto" }}>
                <TextField
                  // sx={{ width: "20rem" }}
                  label="اسم الحافلة"
                  type="text"
                  {...register("name")}
                  InputLabelProps={useShrink()}
                />
                <Typography
                  className="error-style"
                  component="p"
                  variant="body2"
                >
                  {errors.name?.message}
                </Typography>
              </Box>
              <Box sx={{ my: 1, mx: "auto" }}>
                <TextField
                  // sx={{ width: "20rem" }}
                  label="رقم الحافلة"
                  type="text"
                  {...register("number")}
                  InputLabelProps={useShrink()}
                />
                <Typography
                  className="error-style"
                  component="p"
                  variant="body2"
                >
                  {errors.number?.message}
                </Typography>
              </Box>
              <Box sx={{ my: 1, mx: "auto", width: "fit-content" }}>
                <Controller
                  name="branchId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DropDownInput
                      data={branches}
                      label="الفرع"
                      onChange={onChange}
                      value={value}
                      isCity={true}
                    />
                  )}
                />
                <Typography
                  className="error-style"
                  component="p"
                  variant="body2"
                >
                  {errors.branchId?.message}
                </Typography>
              </Box>
            </Stack>
            <Box sx={{ width: "85%", mx: "auto" }}>
              <Controller
                control={control}
                name="modelId"
                render={({ field: { onChange, value } }) => (
                  <ModalAccordion
                    onChange={onChange}
                    value={value}
                    defaultValue={modelDefault}
                  />
                )}
              />
              <Typography className="error-style" component="p" variant="body2">
                {errors.modelId?.message}
              </Typography>
            </Box>
            <Stack
              sx={{ width: "85%", justifyContent: "center" }}
              direction="row"
              flexWrap="wrap"
            >
              <Box sx={{ minWidth: 480 }}>
                <Controller
                  control={control}
                  name="busPhotoId"
                  render={({ field: { onChange, value } }) => (
                    <FileInput
                      label="صورة الحافلة"
                      styling={{ mr: 0 }}
                      value={value}
                      onChange={onChange}
                      deletedIds={deletedIds}
                      setDeletedIds={(val) => {
                        setValue("fileToRemoveIds", val);
                        setDeletedIds(val);
                      }}
                      uploadedFile={busImageName}
                      setUploadedFile={(val) => setBusImageName(val)}
                      fileSourceType={fileSourceType.Bus}
                      fileSectionType={fileSectionType.BusPhoto}
                    />
                  )}
                />
                <Typography
                  className="error-style"
                  component="p"
                  variant="body2"
                >
                  {errors.busPhotoId?.message}
                </Typography>
              </Box>
              <Box sx={{ minWidth: 480 }}>
                <Controller
                  control={control}
                  name="platePhotoId"
                  render={({ field: { onChange, value } }) => (
                    <FileInput
                      label="صورة النمرة"
                      styling={{ ml: 0 }}
                      value={value}
                      onChange={onChange}
                      deletedIds={deletedIds}
                      setDeletedIds={(val) => {
                        setValue("fileToRemoveIds", val);
                        setDeletedIds(val);
                      }}
                      uploadedFile={plateImageName}
                      setUploadedFile={(val) => setPlateImageName(val)}
                      fileSourceType={fileSourceType.Bus}
                      fileSectionType={fileSectionType.PlatePhoto}
                    />
                  )}
                />
                <Typography
                  className="error-style"
                  component="p"
                  variant="body2"
                >
                  {errors.platePhotoId?.message}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <DialogActions>
            <Button onClick={handleClose}>إلغاء</Button>
            <SaveButton isLoading={isLoading} />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddBusses;
