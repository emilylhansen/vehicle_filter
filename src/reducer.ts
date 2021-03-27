import { initial, RemoteData } from "@devexperts/remote-data-ts";
import { ApiAction, GET_USERS, GET_VEHICLES } from "./api/actions";
import { User, Vehicle } from "./api/types";
import { usersByIdHandlers } from "./handlers/usersByIdHandlers";
import { vehiclesByIdHandlers } from "./handlers/vehiclesByIdHandlers";

export type InitialState = {
  usersById: RemoteData<string, Record<string, User>>;
  vehiclesById: RemoteData<string, Record<string, Vehicle>>;
};
const initialState: InitialState = {
  usersById: initial,
  vehiclesById: initial,
};

export function rootReducer(state = initialState, action: ApiAction) {
  if (action.type === GET_USERS) {
    return usersByIdHandlers({ state, action });
  }

  if (action.type === GET_VEHICLES) {
    return vehiclesByIdHandlers({ state, action });
  }

  return state;
}
