import React from "react";
import { Collapsible, CollapsibleListItem } from "../../design/Collapsible";
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

export const StatusFilter = (props: Props) => {
  const checkedCount = getCheckedCount(props.checkByStatus);

  const items: Array<CollapsibleListItem> = [
    {
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
    },
    {
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
    },
  ];
  return (
    <Collapsible
      headerText="Status"
      items={items}
      notificationCount={checkedCount}
    />
  );
};
