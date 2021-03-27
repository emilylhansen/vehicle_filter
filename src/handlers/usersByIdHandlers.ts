import {
  failure,
  fold,
  initial,
  pending,
  RemoteData,
  success,
} from "@devexperts/remote-data-ts";
import { handle } from "redux-pack";
import { GetUsers } from "../api/actions";
import { isoUserId, User } from "../api/types";
import { InitialState } from "../reducer";
import { A, pipe, R } from "../utils/fp-ts-exports";

export const usersByIdHandlers = ({
  state,
  action,
}: {
  state: InitialState;
  action: GetUsers;
}) =>
  handle(state, action, {
    success: (prevState, prevAction) => ({
      ...prevState,
      usersById: fold<
        string,
        Record<string, User>,
        RemoteData<string, Record<string, User>>
      >(
        () => initial,
        () => pending,
        () => failure("failed to fetch users"),
        (u) => {
          return success({
            ...u,
            ...pipe(
              prevAction.payload.data,
              A.reduce<User, Record<string, User>>(R.empty, (acc, cur) => ({
                ...acc,
                [isoUserId.unwrap(cur.id)]: cur,
              }))
            ),
          });
        }
      )(prevState.usersById),
    }),
  });
