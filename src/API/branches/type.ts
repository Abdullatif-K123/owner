export type BranchGetAllParams = {
  pageNumber?: number;
  query?: string;
  cityId?: string | null;
  enablePagination: boolean;
};
export type BranchGetAllBody = {
  ownerId: string | null;
  recordType: RecordType | null;
};
export type Branch = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  landLineNumber: string;
  bussesCount: number;
  recordType: RecordType;
  region: string;
  city: string;
  rate: number;
  owner: string;
  ownerPhoneNumber: string;
  toursCount: number;
  creationDate: string;
};
export type BranchDetails = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string | null;
  anotherPhoneNumber: string | null;
  landLineNumber: string | null;
  anotherLandLineNumber: string | null;
  regionName: string;
  regionId: string;
  cityName: string;
  cityId: string;
  ownerId: string;
  ownerName: string;
  ownerPhoneNumber: string;
};

export type BranchChangeRecordParams = {
  branchId: string;
  recordType: RecordType;
  rejectingReason: string;
};

export type BranchSelectParams = {
  ownerId: string | null;
};

export type BranchSelect = {
  id: string;
  name: string;
};

export type City = {
  id: string;
  cityName: string;
  countryName: string;
  regionCount: number;
  latitude: number;
  longitude: number;
};

export type CitySelect = {
  name: string;
  id: string;
};

export enum RecordType {
  Pending,
  Accepted,
  Rejected,
}

export type OwnerSelect = {
  id: string;
  name: string;
};

export type CountrySelect = Pick<Country, "id" | "name">;

export type Country = {
  id: string;
  name: string;
  cityCount: number;
};

export type AddBranchType = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  anotherPhoneNumber?: string;
  landLineNumber?: string;
  anotherLandLineNumber?: string;
  regionId: string;
  cityId: string;
  logoId?: string;
  fileToRemoveIds?: (string | null)[] | undefined;
  genderDiscrimination: boolean;
};

export type BranchDetailsRes = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  anotherPhoneNumber: string;
  landLineNumber: string;
  anotherLandLineNumber: string;
  latitude: number;
  longitude: number;
  regionId: string;
  cityId: string;
  logoId?: string;
  bussesCount: number;
  finishedTourCounts: number;
  ongoingTourCounts: number;
  upComingTourCount: number;
  genderDiscrimination: boolean;
  logoUrl: string;
  toursChart?:
    | {
        additionalProp1: number[];
        additionalProp2: number[];
        additionalProp3: number[];
      }
    | string;
};

export type Region = {
  regionName: string;
  cityName: string;
  countryName: string;
  id: string;
};

export type RegionSelect = Pick<Region, "id" | "regionName">;
