import { handle } from "redux-pack";
import { GetVehicles } from "../api.actions";
import { isoVehicleId, Vehicle, VehicleIdCarrier } from "../api.types";
import { InitialState } from "../api.reducer";
import { A, pipe, R, RD } from "../../utils/fp-ts-exports";

export const vehiclesByIdHandlers = ({
  state,
  action,
}: {
  state: InitialState;
  action: GetVehicles;
}) =>
  handle(state, action, {
    success: (prevState, prevAction) => {
      const _vehiclesById: InitialState["vehiclesById"] = RD.success(
        pipe(
          prevAction.payload.data,
          A.reduce<Vehicle, Record<VehicleIdCarrier, Vehicle>>(
            R.empty,
            (acc, cur) => ({
              ...acc,
              [isoVehicleId.unwrap(cur.id)]: cur,
            })
          )
        )
      );

      return { ...prevState, vehiclesById: _vehiclesById };
    },
  });
