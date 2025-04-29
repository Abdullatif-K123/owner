import { PaginationParams } from "../../types/api";

export type CityGetAllParams = PaginationParams & {
  countryId: string;
};

export type City = {
  id: string;
  cityName: string;
  countryName: string;
  regionCount: number;
  latitude: number;
  longitude: number;
};
export type CitySelect = Pick<City, "id" | "cityName">;
export type CityDetails = {
  id: string;
  countryId: string;
  cityName: string;
  countryName: string;
  latitude: number;
  longitude: number;
};

export type CityActionBody = {
  id?: string;
  name: string;
  countryId: string;
  latitude: number;
  longitude: number;
};
