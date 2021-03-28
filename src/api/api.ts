import axios, { AxiosResponse } from "axios";
import { GetUsersResponse, GetVehiclesResponse, Vehicle } from "./types";

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
    params?: Partial<Vehicle>
  ): Promise<AxiosResponse<GetVehiclesResponse>> =>
    apiClient.get<GetVehiclesResponse>(`vehicles`, { params }),
};
