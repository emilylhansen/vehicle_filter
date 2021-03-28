import { Lens } from "monocle-ts";
import { InitialState } from "./reducer";
import { createSelector } from "reselect";
import { A, pipe, R, O, RD } from "./utils/fp-ts-exports";
import { InjectedProps as CellInjectedProps } from "./monitor/main/Cell";
import {
  isoIntegerTimeStamp,
  isoNonEmptyString,
  isoNonEmptyString6,
  isoVehicleId,
  Vehicle,
  isoUserId,
} from "./api/types";
import { sequenceS } from "fp-ts/lib/Apply";
import {
  NonEmptyString,
  prismNonEmptyString,
} from "newtype-ts/lib/NonEmptyString";
import { Collapsible, CollapsibleListItem } from "./design/Collapsible";

const usersByIdLens = Lens.fromProp<InitialState>()("usersById");

const vehiclesByIdLens = Lens.fromProp<InitialState>()("vehiclesById");

export const getUsersById = (state: InitialState) => usersByIdLens.get(state);

export const getVehiclesById = (state: InitialState) =>
  vehiclesByIdLens.get(state);

export const getCustomerListItems = createSelector(
  getUsersById,
  (usersById): Array<CollapsibleListItem> =>
    pipe(
      usersById,
      RD.toOption,
      O.map(R.toArray),
      O.map((us) =>
        pipe(
          us,
          A.map(([k, v]) => ({
            primaryText: `${isoNonEmptyString.unwrap(
              v.first
            )} ${isoNonEmptyString.unwrap(v.last)}`,
            secondaryText: isoNonEmptyString.unwrap(v.email),
            key: k,
          }))
        )
      ),
      O.getOrElse<Array<CollapsibleListItem>>(() => A.empty)
    )
);

export const getCells = createSelector(
  getUsersById,
  getVehiclesById,
  (usersById, vehiclesById): Array<CellInjectedProps> => {
    return pipe(
      sequenceS(RD.remoteData)({ usersById, vehiclesById }),
      RD.toOption,
      O.map((data) =>
        pipe(
          data.vehiclesById,
          R.toArray,
          A.reduce<[string, Vehicle], Array<CellInjectedProps>>(
            A.empty,
            (acc, [k, v]) => {
              const cellDataO = pipe(
                data.usersById,
                R.lookup(isoUserId.unwrap(v.ownerId)),
                O.map((u) => ({
                  vehicle: isoNonEmptyString.wrap(
                    `${v.year} ${v.make} ${v.model}`
                  ),
                  owner: isoNonEmptyString.wrap(`${u.first} ${u.last}`),
                  isConnected: v.connected,
                  registration: v.registration,
                  lastConnected: v.lastConnected,
                  id: isoVehicleId.wrap(k),
                }))
              );

              return pipe(
                cellDataO,
                O.map((c) => [...acc, c]),
                O.getOrElse(() => acc)
              );
            }
          )
        )
      ),
      O.getOrElse<Array<CellInjectedProps>>(() => A.empty)
    );
  }
);
