import axios, { AxiosResponse } from "axios";
import { ApiParams, GetUsersResponse, GetVehiclesResponse } from "./api.types";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export const Api = {
  getUsers: async (): Promise<AxiosResponse<GetUsersResponse>> =>
    apiClient.get<GetUsersResponse>(`users`),
  getVehicles: async (
    params?: ApiParams
  ): Promise<AxiosResponse<GetVehiclesResponse>> =>
    apiClient.get<GetVehiclesResponse>(`vehicles`, {
      params: new URLSearchParams(params),
    }),
};
