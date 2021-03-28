import React from "react";
import {
  Collapsible,
  CollapsibleItem,
} from "../../design/collapsible/Collapsible";
import { ConnectedIcon } from "../../design/ConnectedIcon";
import { DisconnectedIcon } from "../../design/DisconnectedIcon";
import { O, pipe, R } from "../../utils/fp-ts-exports";
import { getCheckedCount } from "./filter.helpers";

export enum Status {
  Connected = "CONNECTED",
  Disconnected = "DISCONNTED",
}

type Props = {
  checkByStatus: Record<Status, boolean>;
  setCheckByStatus: (checkByStatus: Record<Status, boolean>) => void;
};

const useStatusFilter = (props: Props) => {
  const checkedCount = getCheckedCount(props.checkByStatus);

  const connectedItem: CollapsibleItem = {
    key: Status.Connected,
    primaryText: "Connected",
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

  const disconnectedItem: CollapsibleItem = {
    key: Status.Disconnected,
    primaryText: "Disconnected",
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

  const items: Array<CollapsibleItem> = [connectedItem, disconnectedItem];

  return { items, checkedCount };
};

export const StatusFilter = (props: Props) => {
  const state = useStatusFilter(props);

  return (
    <Collapsible
      headerText="Status"
      items={state.items}
      notificationCount={state.checkedCount}
    />
  );
};
