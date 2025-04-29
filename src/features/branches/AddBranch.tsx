import React, { FC, useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Slide, 
  Stack,
  TextField,
  Typography,
} from "@mui/material"; 
import AddIcon from "@mui/icons-material/Add";
import { TransitionProps } from "@mui/material/transitions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DropDownInput from "../login/components/DropDownInput";
import RadioInput from "../login/components/RadioInput";
import { queries } from "../../API/auth/queries";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { citiesDefault } from "../login/validations";
import { AddBranchType } from "../../API/branches/type";
import { addBranchSchema, addBranch } from "./validations";
import branchQueries from "../../API/branches/queries";
import { useSearchParams } from "react-router-dom";
import controllers from "../../constants/controllers";
import useShrink from "../../hooks/useShrink";
import useSuccessSnackbar from "../../hooks/useSuccessSnackbar";
import useAxiosErrorSnackbar from "../../hooks/useAxiosErrorSnackBar";
import SaveButton from "../../components/buttons/SaveButton"; 
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import bussesQuery from "@/API/busses/queries";
import { fileSectionType } from "../bussess/validations";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const errorStyle = {
  mt: "0rem !important",
  position: "relative",
  left: 10,
  color: "error.main",
};

type Props = {
  addOpen: boolean;
  setAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddBranch: FC<Props> = ({ addOpen, setAddOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState<string>("");

  useEffect(() => {
    setId(searchParams.get("id") ?? "");
  }, [searchParams]);
  const [imageDefault, setImageDefault] = useState("")
  const getQuery = branchQueries.useDetailsQuery(id);
  const handleClickOpen = () => {
    setAddOpen(true);
  };

  const queryClient = useQueryClient();

  const form = useForm<AddBranchType>({
    resolver: yupResolver<AddBranchType>(addBranchSchema),
    defaultValues: addBranch,
  
   
  });
  
  const { register, control, formState, handleSubmit, setValue, reset, watch } =
    form;
  const { errors } = formState;

  const handleClose = () => {
    setSearchParams({});
    queryClient.invalidateQueries([controllers.BRANCH, "all"]);
    queryClient.invalidateQueries([
      controllers.BRANCH,
      "details",
      getQuery.data?.id,
    ]);

    setTimeout(() => {
      setIsEdit(false);
      reset();
      setImageDefault("");
      setDeletedIds([]);
    }, 1000);
    setAddOpen(false);
    handleDelete();
  };

  // This Flag is to ensure that this effect runs only when the edit button
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    const data = getQuery ? getQuery.data ?? null : null;
    if (data !== undefined && data !== null && !isEdit) {
      setIsEdit(true);

      setImageDefault(`https://file.dev.safra-binakra.com/wwwroot/${getQuery?.data?.logoUrl}`)
      
      Object.entries(data as AddBranchType).forEach(([name, value]) => {
        if (addBranch.hasOwnProperty(name)) {
          const key = name as keyof AddBranchType;
          setValue(key, value);
        }
      });
    }
  }, [getQuery]);

  const { data: citiesData, status: cityStatus } = queries.useCity();
  const cities = cityStatus === "success" ? citiesData : citiesDefault;

  const { status: regionStatus, data: regionsData } = queries.useRegion(
    watch("cityId")
  );
  const regions = regionStatus === "success" ? regionsData : citiesDefault;

  const mutation = branchQueries.useActionMutation();
  const { isLoading } = mutation;
  const successSnackbar = useSuccessSnackbar();
  const errorSnackbar = useAxiosErrorSnackbar();
  const onSubmit: SubmitHandler<AddBranchType> = (body: AddBranchType) => {
    id.length > 0 && (body.id = getQuery.data?.id ?? "");
 
     if(currentLogoId)
     {
   
     deletedIds.pop();
       if(getQuery.data?.logoId !== currentLogoId && getQuery.data?.logoId)
        deletedIds.push(getQuery.data.logoId);
       
     }
    body.logoId = currentLogoId? currentLogoId : getQuery.data?.logoId; 
    body.fileToRemoveIds = deletedIds;
    mutation.mutate(body, {
      onSuccess: (_data) => {
        successSnackbar("تم حفظ الفرع بنجاح");
        handleClose();
      },
      onError: (err: unknown) => errorSnackbar(err),
    });
  }; 
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(false); // Drag-and-drop state
  const [error, setError] = useState<string | null>(null); // Error handling
  const [deletedIds, setDeletedIds] = useState<string[]>([]); 
  const [currentLogoId, setCurrentLogoId] = useState<string>("")
   const fileMutation = bussesQuery.useAddFileMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for file input
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = (readerEvent) => {
        img.src = readerEvent.target?.result as string;
      };
  
      img.onload = () => {
        const { width, height } = img;
  
        const maxWidth = 2600;
        const maxHeight = 1300;
  
        if (width > maxWidth || height > maxHeight) {
      
          setError(`يجب انت تكون الأبعاد ضمن الحدود المسموحة ${maxWidth}x${maxHeight}px.`);
          return;
        }
  
        register("logoId");
  
        setImageFile(file);
        const formData = new FormData();
        formData.append("file", file);
  
        fileMutation.mutate(
          {
            formData: formData,
            params: {
              fileSectionType: fileSectionType.Logophoto,
              fileSourceType: 2,
            },
          },
          {
            onSuccess: (id) => {
              setCurrentLogoId(id);
              setDeletedIds((prev) => [...prev, id]);
              setError("")
            },
          }
        );
  
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsActive(false);
    const file = event.dataTransfer.files[0];
    handleImageChange({ target: { files: [file] } } as any); 
  };

  const handleDelete = () => {
    setImagePreview(null);
    setImageFile(null);
    setError(null);
  };
 
  const handleBoxClick = () => {
    fileInputRef.current?.click();  
  };



  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed !important", bottom: 6, right: 8 }}
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
        maxWidth="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Typography variant="h4" component="p" color="primary">
              {id.length > 0 ? "تعديل" : "إضافة"}
            </Typography>
          </DialogTitle>
          <Stack
            id="alert-dialog-slide-description"
            spacing={2}
            sx={{ justifyContent: "start", alignItems: "center" }}
          >
            <DialogContent sx={{ maxWidth: "160rem" }}>
              <Stack spacing={2} sx={{}}>
                {/* Represents ROW 1 */}
                <Stack direction="row" flexWrap="wrap" justifyContent="center">
                  <Box sx={{ my: 0.5 }}>
                    <TextField
                      label="اسم الفرع"
                      type="text"
                      {...register("name")}
                      InputLabelProps={useShrink()}
                      sx={{ width: "14rem" }}
                    />
                    <Typography sx={errorStyle} component="p" variant="body2">
                      {errors.name?.message}
                    </Typography>
                  </Box>
                  <Box sx={{ my: 0.5, mx: 1 }}>
                    <Controller
                      name="cityId"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <DropDownInput
                          data={cities ? cities : [{ name: "", id: "" }]}
                          label="المدينة"
                          onChange={onChange}
                          value={value}
                          isCity={true}
                          width="14rem"
                        />
                      )}
                    />
                    <Typography sx={errorStyle} component="p" variant="body2">
                      {errors.cityId?.message}
                    </Typography>
                  </Box>
                  <Box sx={{ my: 0.5 }}>
                    <Controller
                      name="regionId"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <DropDownInput
                          data={regions ? regions : [{ name: "", id: "" }]}
                          label="المنطقة"
                          onChange={onChange}
                          value={value}
                          isCity={false}
                          width="14rem"
                        />
                      )}
                    />
                    <Typography sx={errorStyle} component="p" variant="body2">
                      {errors.regionId?.message}
                    </Typography>
                  </Box>
                </Stack>

                {/* Represents ROW 2 */}
                <Stack direction="row" flexWrap="wrap" justifyContent="center">
                  <Box>
                    <TextField
                      label="موبايل 1"
                      type="tel"
                      InputLabelProps={useShrink()}
                      sx={{ width: "167px", my: 0.5, mx: 0.5 }}
                      {...register("phoneNumber")}
                    />
                    <Typography sx={errorStyle} component="p" variant="body2">
                      {errors.phoneNumber?.message}
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      label="موبايل 2"
                      type="tel"
                      InputLabelProps={useShrink()}
                      sx={{ width: "167px", my: 0.5, mx: 0.5 }}
                      {...register("anotherPhoneNumber")}
                    />
                    <Typography sx={errorStyle} component="p" variant="body2">
                      {errors.anotherPhoneNumber?.message}
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      label="هاتف 1"
                      type="tel"
                      InputLabelProps={useShrink()}
                      sx={{ width: "167px", my: 0.5, mx: 0.5 }}
                      {...register("landLineNumber")}
                    />
                    <Typography sx={errorStyle} component="p" variant="body2">
                      {errors.landLineNumber?.message}
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      label="هاتف 2"
                      type="tel"
                      InputLabelProps={useShrink()}
                      sx={{ width: "167px", my: 0.5, ml: 0.5 }}
                      {...register("anotherLandLineNumber")}
                    />
                    <Typography sx={errorStyle} component="p" variant="body2">
                      {errors.anotherLandLineNumber?.message}
                    </Typography>
                  </Box>
                </Stack>

                {/* Represents ROW 3*/}
                <Stack>
                  <Box>
                    <TextField
                      multiline
                      label="العنوان بالتفصيل"
                      type="text"
                      InputLabelProps={useShrink()}
                      sx={{ width: "100%", my: 0.5 }}
                      {...register("address")}
                    />
                    <Typography sx={errorStyle} component="p" variant="body2">
                      {errors.address?.message}
                    </Typography>
                  </Box>
      <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleBoxClick} // Box click triggers the file input
      sx={{
        width: { xs: "16rem", sm: "100%" },
        minWidth: "18rem",
        mx: "auto",
        mb: error ? 2 : 0,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "200px",
          borderRadius: "12px",
          border: error ? "1px solid red" : "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: isActive ? "lightgray" : "white",
          transition: "all 0.2s ease-in-out",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            transform: "scale(1.02)",
            backgroundColor: "lightgray",
          },
        }}
      >
      {/* Image Preview */}
{imagePreview ? (
  <Card sx={{ position: "relative", height: "100%", width: "100%" }}>
    <CardMedia
      component="img"
      image={imagePreview} // Show the preview image
      alt="Preview"
      sx={{ objectFit: "contain", height: "100%", width: "100%" }}
    />
  </Card>
) : imageDefault ? (
  <Card sx={{ position: "relative", height: "100%", width: "100%" }}>
    <CardMedia
      component="img"
      image={imageDefault} // Show the default image if no preview is available
      alt="Default"
      sx={{ objectFit: "contain", height: "100%", width: "100%" }}
    />
  </Card>
) : (
  <Typography
    variant="body2"
    color="textSecondary"
    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <CloudUploadIcon fontSize="large" />
    <Typography> اضغط لرفع الصورة</Typography>
  </Typography>
)}

{/* Show the file name if an image is selected */}
{imageFile && (
  <Chip
    label={imageFile.name}
    color="primary"
    onDelete={handleDelete} // This will delete the file preview when clicked
    sx={{ zIndex: 5 }}
  />
)}
        {/* File Input (hidden) */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          ref={fileInputRef} 
           
        />
      </Box>
      {error && (
        <Typography color="error" fontSize={12} sx={{ ml: 3 }}>
          {error}
        </Typography>
      )}
    </Box>
                  <Box sx={{ my: 1.5, ml: 1 }}>
                    <Controller
                      name="genderDiscrimination"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <RadioInput
                          onChange={onChange}
                          label="هل يمكن لشاب أن يحجز بجانب فتاة"
                          values={[true, false]}
                          valuesLabel={["نعم", "لا"]}
                          value={value}
                        />
                      )}
                    />
                  </Box>
                </Stack>
              </Stack>
            </DialogContent>
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

export default AddBranch;
