import React from "react";
import { Collapsible, CollapsibleListItem } from "../design/Collapsible";
import { A, R, O, pipe } from "../utils/fp-ts";
import { ConnectedIcon } from "../design/ConnectedIcon";
import { DisconnectedIcon } from "../design/DisconnectedIcon";

export const StatusFilter = () => {
  const items: Array<CollapsibleListItem> = [
    {
      key: "connected",
      primaryText: "Connected",
      rightAdornment: <ConnectedIcon fontSize={16} margin="0 2px 0 0" />,
    },
    {
      key: "disconnected",
      primaryText: "Disconnected",
      rightAdornment: <DisconnectedIcon fontSize={16} margin="0 2px 0 0" />,
    },
  ];
  return (
    <Collapsible headerText="Status" items={items} notificationCount={1} />
  );
};
