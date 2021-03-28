import React from "react";
import { useSelector } from "react-redux";
import { isoNonEmptyString, UserIdCarrier } from "../../api/types";
import { Collapsible, CollapsibleListItem } from "../../design/Collapsible";
import { getUsersById } from "../../selectors";
import { A, O, pipe, R, RD } from "../../utils/fp-ts-exports";
import { getCheckedCount } from "./filter.helpers";

type Props = {
  checkByUserId: Record<UserIdCarrier, boolean>;
  setCheckByUserId: (checkByUserId: Record<UserIdCarrier, boolean>) => void;
};

export const CustomerFilter = (props: Props) => {
  const usersById = useSelector(getUsersById);

  const checkedCount = getCheckedCount(props.checkByUserId);

  const customerListItems = React.useMemo(
    () =>
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
              checked: pipe(
                props.checkByUserId,
                R.lookup(k),
                O.map((c) => c),
                O.getOrElse(() => false)
              ),
              onChange: (c) => {
                pipe(
                  props.checkByUserId,
                  R.updateAt(k, c),
                  O.getOrElse(() => props.checkByUserId),
                  props.setCheckByUserId
                );
              },
              key: k,
            }))
          )
        ),
        O.getOrElse<Array<CollapsibleListItem>>(() => A.empty)
      ),
    [usersById, props]
  );

  return (
    <Collapsible
      headerText="Customer"
      items={customerListItems}
      notificationCount={checkedCount}
      search
    />
  );
};
