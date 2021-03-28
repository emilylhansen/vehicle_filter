import { AxiosResponse } from "axios";
import { Api } from "./api";
import { ApiParams, GetUsersResponse, GetVehiclesResponse } from "./types";

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

export type ApiAction = GetUsers | GetVehicles;

// const isGetVehicles = (action :ApiAction): action is GetVehicles => action.type === GET_VEHICLES
