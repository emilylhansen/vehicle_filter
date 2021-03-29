import faker from "faker";
import { sequenceS } from "fp-ts/lib/Apply";
import { Lens } from "monocle-ts";
import { createSelector } from "reselect";
import {
  isoNonEmptyString,
  isoUserId,
  isoVehicleId,
  RdError,
  User,
  UserIdCarrier,
  Vehicle,
  VehicleIdCarrier,
} from "./api/types";
import { InjectedProps as CellInjectedProps } from "./monitor/main/cell/Cell";
import { InitialState } from "./reducer";
import { A, O, pipe, R, RD } from "./utils/fp-ts-exports";

const usersByIdLens = Lens.fromProp<InitialState>()("usersById");

const vehiclesByIdLens = Lens.fromProp<InitialState>()("vehiclesById");

export const getUsersById = (state: InitialState) => usersByIdLens.get(state);

export const getVehiclesById = (state: InitialState) =>
  vehiclesByIdLens.get(state);

/** change the connect value for each vehicle to simulate changing connection */
export const getVehiclesByIdNewStatus = createSelector(
  getVehiclesById,
  (vehiclesById): RD.RemoteData<RdError, Record<VehicleIdCarrier, Vehicle>> =>
    RD.success(
      pipe(
        vehiclesById,
        RD.toOption,
        O.map(R.map((v) => ({ ...v, connected: faker.random.boolean() }))),
        O.getOrElse(() => ({}))
      )
    )
);

/** get data for cells in vehicle grid */
export const getCells = createSelector(
  getUsersById,
  getVehiclesById,
  (
    usersById,
    vehiclesById
  ): RD.RemoteData<RdError, Array<CellInjectedProps>> => {
    return pipe(
      sequenceS(RD.remoteData)({ usersById, vehiclesById }),
      RD.fold<
        RdError,
        {
          usersById: Record<UserIdCarrier, User>;
          vehiclesById: Record<VehicleIdCarrier, Vehicle>;
        },
        RD.RemoteData<RdError, Array<CellInjectedProps>>
      >(
        () => RD.initial,
        () => RD.pending,
        (e) => RD.failure(e),
        (data) =>
          pipe(
            data.vehiclesById,
            R.toArray,
            A.reduce<[string, Vehicle], Array<CellInjectedProps>>(
              [],
              (acc, [k, v]) => {
                const cellDataO = pipe(
                  data.usersById,
                  R.lookup(isoUserId.unwrap(v.ownerId)),
                  O.map((u) => {
                    const vehicle = isoNonEmptyString.wrap(
                      `${v.year} ${v.make} ${v.model}`
                    );
                    const owner = isoNonEmptyString.wrap(
                      `${u.first} ${u.last}`
                    );

                    return {
                      vehicle,
                      owner,
                      isConnected: v.connected,
                      registration: v.registration,
                      lastConnected: v.lastConnected,
                      id: isoVehicleId.wrap(k),
                    };
                  })
                );

                return pipe(
                  cellDataO,
                  O.map((c) => [...acc, c]),
                  O.getOrElse(() => acc)
                );
              }
            ),
            RD.success
          )
      )
    );
  }
);

export const getInitCheckByUserId = createSelector(
  getUsersById,
  (usersById): Record<UserIdCarrier, boolean> =>
    pipe(
      usersById,
      RD.toOption,
      O.map((us) =>
        pipe(
          us,
          R.map((u) => true)
        )
      ),
      O.getOrElse<Record<UserIdCarrier, boolean>>(() => ({}))
    )
);
