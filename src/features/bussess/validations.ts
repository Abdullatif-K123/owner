import * as yup from "yup";

export const fileSectionType = {
  BusPhoto: 0,
  PlatePhoto: 1,
  FrontalIdentity: 2,
  BackgroundIdentity: 3,
  Logophoto: 4,
};

export const fileSourceType = {
  Bus: 0,
  Customer: 0,
};

export const filesUploadschema = yup.object().shape({
  attachment: yup
    .mixed()
    .test("fileType", "يمكنك تحميل صور فقط", (value: any) => {
      return value !== undefined ? value.type.indexOf("image") !== -1 : false;
    }),
});

export const addBussesSchema = yup.object().shape({
  id: yup.string(), // Required for adding new buses
  name: yup.string().required("الحقل مطلوب"),  
  number: yup.string().required("الحقل مطلوب"), // Required field with validation message
  modelId: yup.string().required("الحقل مطلوب"), // Required field with validation message
  busPhotoId: yup.string().required("الحقل مطلوب").test(
    "image isLoading",
    "الرجاء الانتظار حتى يكتمل التحميل",
    (value: string) => value !== "loading"
  ), // Required field with validation message and image load condition
  platePhotoId: yup.string().required("الحقل مطلوب").test(
    "image isLoading",
    "الرجاء الانتظار حتى يكتمل التحميل",
    (value: string) => value !== "loading"
  ), // Required field with validation message and image load condition
  branchId: yup.string().required("الحقل مطلوب"), // Required field with validation message
  fileToRemoveIds: yup.array().of(yup.string().default("")), // Optional array of strings
  model: yup.object().shape({id: yup.string(), name: yup.string()}) // Optional object for model ID
});

export const addBussesDefault = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "",
  number: "",
  modelId: "",
  busPhotoId: "",
  platePhotoId: "",
  branchId: "",
  fileToRemoveIds: [],
  
};
