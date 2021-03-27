import {
  failure,
  fold,
  initial,
  pending,
  RemoteData,
  success,
} from "@devexperts/remote-data-ts";
import { handle } from "redux-pack";
import { GetVehicles } from "../api/actions";
import { isoVehicleId, Vehicle } from "../api/types";
import { InitialState } from "../reducer";
import { A, pipe, R } from "../utils/fp-ts-exports";

export const vehiclesByIdHandlers = ({
  state,
  action,
}: {
  state: InitialState;
  action: GetVehicles;
}) =>
  handle(state, action, {
    success: (prevState, prevAction) => ({
      ...prevState,
      vehiclesById: fold<
        string,
        Record<string, Vehicle>,
        RemoteData<string, Record<string, Vehicle>>
      >(
        () => initial,
        () => pending,
        () => failure("failed to fetch vehicles"),
        (v) => {
          return success({
            ...v,
            ...pipe(
              prevAction.payload.data,
              A.reduce<Vehicle, Record<string, Vehicle>>(
                R.empty,
                (acc, cur) => ({
                  ...acc,
                  [isoVehicleId.unwrap(cur.id)]: cur,
                })
              )
            ),
          });
        }
      )(prevState.vehiclesById),
    }),
  });
