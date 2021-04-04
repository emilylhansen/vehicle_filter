import React from "react";
import { useSelector } from "react-redux";
import { getTranslation } from "../../api/api.selectors";
import {
  CheckboxListItemProps,
  CollapsibleCheckboxList,
} from "../../design/collapsibleCheckboxList/CollapsibleCheckboxList";
import { ConnectedIcon } from "../../design/ConnectedIcon";
import { DisconnectedIcon } from "../../design/DisconnectedIcon";
import { O, pipe, R } from "../../utils/fp-ts-exports";
import { getCheckedIds } from "./filter.helpers";

export enum Status {
  Connected = "CONNECTED",
  Disconnected = "DISCONNTED",
}

type Props = {
  checkByStatus: Record<Status, boolean>;
  setCheckByStatus: (checkByStatus: Record<Status, boolean>) => void;
};

const useStatusFilter = (props: Props) => {
  const translation = useSelector(getTranslation);

  const checkedCount = getCheckedIds(props.checkByStatus).length;

  const connectedItem: CheckboxListItemProps = {
    key: Status.Connected,
    primaryText: translation.connected,
    rightAdornment: <ConnectedIcon fontSize={16} margin="0 2px 0 0" />,
    checked: pipe(
      props.checkByStatus,
      R.lookup(Status.Connected),
      O.map((c) => c),
      O.getOrElse<boolean>(() => false)
    ),
    onChange: (c) => {
      pipe(
        props.checkByStatus,
        R.updateAt(Status.Connected, c),
        O.getOrElse(() => props.checkByStatus),
        props.setCheckByStatus
      );
    },
  };

  const disconnectedItem: CheckboxListItemProps = {
    key: Status.Disconnected,
    primaryText: translation.disconnected,
    rightAdornment: <DisconnectedIcon fontSize={16} margin="0 2px 0 0" />,
    checked: pipe(
      props.checkByStatus,
      R.lookup(Status.Disconnected),
      O.map((c) => c),
      O.getOrElse<boolean>(() => false)
    ),
    onChange: (c) => {
      pipe(
        props.checkByStatus,
        R.updateAt(Status.Disconnected, c),
        O.getOrElse(() => props.checkByStatus),
        props.setCheckByStatus
      );
    },
  };

  const items: Array<CheckboxListItemProps> = [connectedItem, disconnectedItem];

  return { items, checkedCount, translation };
};

export const StatusFilter = (props: Props) => {
  const state = useStatusFilter(props);

  return (
    <CollapsibleCheckboxList
      headerText={state.translation.filterCategories.status}
      items={state.items}
      notificationCount={state.checkedCount}
    />
  );
};
