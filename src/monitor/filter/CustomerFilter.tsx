import React from "react";
import { useSelector } from "react-redux";
import { isoNonEmptyString, UserIdCarrier } from "../../api/api.types";
import {
  CollapsibleCheckboxList,
  CheckboxListItemProps,
} from "../../design/collapsibleCheckboxList/CollapsibleCheckboxList";
import { getUsersById } from "../../api/api.selectors";
import { A, O, pipe, R, RD } from "../../utils/fp-ts-exports";
import { getCheckedIds } from "./filter.helpers";

type Props = {
  checkByUserId: Record<UserIdCarrier, boolean>;
  setCheckByUserId: (checkByUserId: Record<UserIdCarrier, boolean>) => void;
};

const useCustomerFilter = (props: Props) => {
  const [searchValue, setSearchValue] = React.useState<string>("");

  const usersById = useSelector(getUsersById);

  const onChangeSearch = (v: string) => setSearchValue(v);

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
            A.filterMap(([k, v]) => {
              const primaryText = `${isoNonEmptyString.unwrap(
                v.first
              )} ${isoNonEmptyString.unwrap(v.last)}`;
              const secondaryText = isoNonEmptyString.unwrap(v.email);

              const isMatch =
                primaryText
                  .toLocaleLowerCase()
                  .includes(searchValue.toLocaleLowerCase()) ||
                secondaryText
                  .toLocaleLowerCase()
                  .includes(searchValue.toLocaleLowerCase());

              if (isMatch) {
                const checked = pipe(
                  props.checkByUserId,
                  R.lookup(k),
                  O.map((c) => c),
                  O.getOrElse(() => false)
                );

                const item: CheckboxListItemProps = {
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

                return O.some(item);
              } else {
                return O.none;
              }
            })
          )
        ),
        O.getOrElse<Array<CheckboxListItemProps>>(() => A.empty)
      ),
    [usersById, props.checkByUserId, props.setCheckByUserId, searchValue]
  );

  return { customerListItems, checkedCount, searchValue, onChangeSearch };
};

export const CustomerFilter = (props: Props) => {
  const state = useCustomerFilter(props);

  return (
    <CollapsibleCheckboxList
      headerText="Customer"
      items={state.customerListItems}
      notificationCount={state.checkedCount}
      search={{ value: state.searchValue, onChange: state.onChangeSearch }}
    />
  );
};
