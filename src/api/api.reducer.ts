import { initial, RemoteData } from "@devexperts/remote-data-ts";
import { ThemeEnum } from "../design/theme";
import {
  ApiAction,
  GET_USERS,
  GET_VEHICLES,
  SET_LANGUAGE,
  SET_THEME,
  SET_VEHICLES,
} from "./api.actions";
import {
  Language,
  RdError,
  User,
  UserIdCarrier,
  Vehicle,
  VehicleIdCarrier,
} from "./api.types";
import { usersByIdHandlers } from "./handlers/usersByIdHandlers";
import { vehiclesByIdHandlers } from "./handlers/vehiclesByIdHandlers";

export type InitialState = {
  usersById: RemoteData<RdError, Record<UserIdCarrier, User>>;
  vehiclesById: RemoteData<RdError, Record<VehicleIdCarrier, Vehicle>>;
  language: Language;
  theme: ThemeEnum;
};
const initialState: InitialState = {
  usersById: initial,
  vehiclesById: initial,
  language: Language.English,
  theme: ThemeEnum.Light,
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

  if (action.type === SET_THEME) {
    return { ...state, theme: action.payload };
  }

  return state;
}
