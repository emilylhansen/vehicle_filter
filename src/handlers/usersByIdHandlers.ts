import { handle } from "redux-pack";
import { GetUsers } from "../api/actions";
import { isoUserId, User } from "../api/types";
import { InitialState } from "../reducer";
import { A, pipe, R, O, RD } from "../utils/fp-ts-exports";

export const usersByIdHandlers = ({
  state,
  action,
}: {
  state: InitialState;
  action: GetUsers;
}) =>
  handle(state, action, {
    success: (prevState, prevAction) => {
      const _usersById = RD.success({
        ...pipe(
          prevState.usersById,
          RD.toOption,
          O.getOrElse<Record<string, User>>(() => R.empty)
        ),
        ...pipe(
          prevAction.payload.data,
          A.reduce<User, Record<string, User>>(R.empty, (acc, cur) => ({
            ...acc,
            [isoUserId.unwrap(cur.id)]: cur,
          }))
        ),
      });

      return { ...prevState, usersById: _usersById };
    },
  });
