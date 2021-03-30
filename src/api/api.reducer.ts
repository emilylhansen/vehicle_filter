import { initial, RemoteData } from "@devexperts/remote-data-ts";
import {
  ApiAction,
  GET_USERS,
  GET_VEHICLES,
  SET_VEHICLES,
  SET_WINDOW_WIDTH,
} from "./api.actions";
import {
  RdError,
  User,
  UserIdCarrier,
  Vehicle,
  VehicleIdCarrier,
} from "./api.types";
import { usersByIdHandlers } from "./handlers/usersByIdHandlers";
import { vehiclesByIdHandlers } from "./handlers/vehiclesByIdHandlers";
import { getCurrentWindowWidth } from "./api.helpers";

export type InitialState = {
  usersById: RemoteData<RdError, Record<UserIdCarrier, User>>;
  vehiclesById: RemoteData<RdError, Record<VehicleIdCarrier, Vehicle>>;
  windowWidth: number;
};
const initialState: InitialState = {
  usersById: initial,
  vehiclesById: initial,
  windowWidth: getCurrentWindowWidth(),
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
