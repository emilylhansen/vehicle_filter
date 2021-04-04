import { initial, RemoteData } from "@devexperts/remote-data-ts";
import {
  ApiAction,
  GET_USERS,
  GET_VEHICLES,
  SET_VEHICLES,
  SET_LANGUAGE,
} from "./api.actions";
import {
  RdError,
  User,
  UserIdCarrier,
  Vehicle,
  VehicleIdCarrier,
  Language,
} from "./api.types";
import { usersByIdHandlers } from "./handlers/usersByIdHandlers";
import { vehiclesByIdHandlers } from "./handlers/vehiclesByIdHandlers";

export type InitialState = {
  usersById: RemoteData<RdError, Record<UserIdCarrier, User>>;
  vehiclesById: RemoteData<RdError, Record<VehicleIdCarrier, Vehicle>>;
  language: Language;
};
const initialState: InitialState = {
  usersById: initial,
  vehiclesById: initial,
  language: Language.English,
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

  if (action.type === SET_LANGUAGE) {
    return { ...state, language: action.payload };
  }

  return state;
}
