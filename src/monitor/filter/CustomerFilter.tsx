import React from "react";
import { useSelector } from "react-redux";
import { isoNonEmptyString, UserIdCarrier } from "../../api/types";
import {
  Collapsible,
  CollapsibleItem,
} from "../../design/collapsible/Collapsible";
import { getUsersById } from "../../selectors";
import { A, O, pipe, R, RD } from "../../utils/fp-ts-exports";
import { getCheckedIds } from "./filter.helpers";

type Props = {
  checkByUserId: Record<UserIdCarrier, boolean>;
  setCheckByUserId: (checkByUserId: Record<UserIdCarrier, boolean>) => void;
};

const useCustomerFilter = (props: Props) => {
  const usersById = useSelector(getUsersById);

  const checkedCount = getCheckedIds(props.checkByUserId).length;

  const customerListItems = React.useMemo(
    () =>
      pipe(
        usersById,
        RD.toOption,
        O.map(R.toArray),
        O.map((us) =>
          pipe(
            us,
            A.map(([k, v]) => {
              const primaryText = `${isoNonEmptyString.unwrap(
                v.first
              )} ${isoNonEmptyString.unwrap(v.last)}`;
              const secondaryText = isoNonEmptyString.unwrap(v.email);
              const checked = pipe(
                props.checkByUserId,
                R.lookup(k),
                O.map((c) => c),
                O.getOrElse(() => false)
              );

              return {
                primaryText,
                secondaryText,
                checked,
                onChange: (c) => {
                  pipe(
                    props.checkByUserId,
                    R.updateAt(k, c),
                    O.getOrElse(() => props.checkByUserId),
                    props.setCheckByUserId
                  );
                },
                key: k,
              };
            })
          )
        ),
        O.getOrElse<Array<CollapsibleItem>>(() => A.empty)
      ),
    [usersById, props]
  );

  return { customerListItems, checkedCount };
};

export const CustomerFilter = (props: Props) => {
  const state = useCustomerFilter(props);

  return (
    <Collapsible
      headerText="Customer"
      items={state.customerListItems}
      notificationCount={state.checkedCount}
      // search
    />
  );
};
