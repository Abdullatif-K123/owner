export type ModelGetAllParams = {
  pageNumber?: number;
  query?: string;
  enablePagination: boolean;
};

export type Model = {
  id: string;
  name: string;
  module: string;
  chairCount: number;
  busCount: number;
  columnCount: number;
};

export type uploadImageParams = {
  formData: FormData;
  params: {
    fileSourceType: number;
    fileSectionType: number;
  };
};

export type GetAllBussesParams = {
  body?: string[];
  params?: {
    pageNumber: number;
    query: string;
  };
};

export type UploadedFiles = {
  value: string;
  color: "default" | "success";
};

export type AddBussesType = {
  id?: string | undefined; // Nullable for existing buses
  name: string;
  number?: string | undefined; // Nullable for existing buses
  modelId?: string | undefined; // Nullable for existing buses
  busPhotoId: string;
  platePhotoId: string;
  branchId?: string | undefined; // Nullable for existing buses
  fileToRemoveIds?: (string | null)[] | undefined; // Nullable for optional field
  model?: { id?: string | undefined; name?: string | undefined } | undefined; // Nullable for optional object
};

export type getBusDetails = {
  id: string;
  name: string;
  number: string;
  branchId: string;
  modelId?: string;
  model: {
    id: string;
    name: string;
    module: string;
    chairCount: number;
    columnCount: number;
  };
  branchName: string;
  modelName: string;
  busPhotoUrl: string;
  platePhotoUrl: string;
  busPhotoId: string;
  platePhotoId: string;
};
