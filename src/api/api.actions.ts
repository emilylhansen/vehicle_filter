import { RemoteData } from "@devexperts/remote-data-ts";
import { AxiosResponse } from "axios";
import { Api } from "./api";
import {
  ApiParams,
  GetUsersResponse,
  GetVehiclesResponse,
  RdError,
  Vehicle,
  VehicleIdCarrier,
  Language,
} from "./api.types";

//#region getUsers start
export const GET_USERS = "GET_USERS";
export type GET_USERS = typeof GET_USERS;
export type GetUsers = {
  type: GET_USERS;
  promise: Promise<AxiosResponse<GetUsersResponse>>;
};
export const getUsers = (): GetUsers => {
  return {
    type: GET_USERS,
    promise: Api.getUsers(),
  };
};
//#endregion getUsers end

//#region getVehicles start
export const GET_VEHICLES = "GET_VEHICLES";
export type GET_VEHICLES = typeof GET_VEHICLES;
export type GetVehicles = {
  type: GET_VEHICLES;
  promise: Promise<AxiosResponse<GetVehiclesResponse>>;
};
export const getVehicles = (params?: ApiParams): GetVehicles => {
  return {
    type: GET_VEHICLES,
    promise: Api.getVehicles(params),
  };
};
//#endregion getVehicles end

//#region setVehicles start
export const SET_VEHICLES = "SET_VEHICLES";
export type SET_VEHICLES = typeof SET_VEHICLES;
export type SetVehicles = {
  type: SET_VEHICLES;
  payload: RemoteData<RdError, Record<VehicleIdCarrier, Vehicle>>;
};
export const setVehicles = (
  vehiclesById: RemoteData<RdError, Record<VehicleIdCarrier, Vehicle>>
): SetVehicles => {
  return {
    type: SET_VEHICLES,
    payload: vehiclesById,
  };
};
//#endregion setVehicles end

//#region setLanguage start
export const SET_LANGUAGE = "SET_LANGUAGE";
export type SET_LANGUAGE = typeof SET_LANGUAGE;
export type SetLanguage = {
  type: SET_LANGUAGE;
  payload: Language;
};
export const setLanguage = (language: Language): SetLanguage => {
  return {
    type: SET_LANGUAGE,
    payload: language,
  };
};
//#endregion setVehicles end

export type ApiAction = GetUsers | GetVehicles | SetVehicles | SetLanguage;
