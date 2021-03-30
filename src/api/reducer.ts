import { initial, RemoteData } from "@devexperts/remote-data-ts";
import {
  ApiAction,
  GET_USERS,
  GET_VEHICLES,
  SET_VEHICLES,
  SET_WINDOW_WIDTH,
} from "./actions";
import {
  RdError,
  User,
  UserIdCarrier,
  Vehicle,
  VehicleIdCarrier,
} from "./types";
import { usersByIdHandlers } from "./handlers/usersByIdHandlers";
import { vehiclesByIdHandlers } from "./handlers/vehiclesByIdHandlers";

export type InitialState = {
  usersById: RemoteData<RdError, Record<UserIdCarrier, User>>;
  vehiclesById: RemoteData<RdError, Record<VehicleIdCarrier, Vehicle>>;
  windowWidth: number;
};
const initialState: InitialState = {
  usersById: initial,
  vehiclesById: initial,
  windowWidth: 0,
};

export function rootReducer(state = initialState, action: ApiAction) {
  if (action.type === GET_USERS) {
    return usersByIdHandlers({ state, action });
  }

  if (action.type === GET_VEHICLES) {
    return vehiclesByIdHandlers({ state, action });
  }

  if (action.type === SET_VEHICLES) {
    return { ...state, vehiclesById: action.payload };
  }

  if (action.type === SET_WINDOW_WIDTH) {
    return { ...state, windowWidth: action.payload };
  }

  return state;
}
