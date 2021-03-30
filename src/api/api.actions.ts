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

//#region setWindowWidth start
export const SET_WINDOW_WIDTH = "SET_WINDOW_WIDTH";
export type SET_WINDOW_WIDTH = typeof SET_WINDOW_WIDTH;
export type SetWindowWidth = {
  type: SET_WINDOW_WIDTH;
  payload: number;
};
export const setWindowWidth = (windowWidth: number): SetWindowWidth => {
  return {
    type: SET_WINDOW_WIDTH,
    payload: windowWidth,
  };
};
//#endregion setWindowWidth end

export type ApiAction = GetUsers | GetVehicles | SetVehicles | SetWindowWidth;
