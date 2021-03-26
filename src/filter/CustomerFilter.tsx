import React from "react";
import { Collapsible, CollapsibleListItem } from "../design/Collapsible";
import { A, R, O, pipe } from "../utils/fp-ts";

export const CustomerFilter = () => {
  const items: Array<CollapsibleListItem> = pipe(
    A.range(0, 20),
    A.map<number, CollapsibleListItem>((i) => ({
      key: i.toLocaleString(),
      primaryText: "First Last",
      secondaryText: "first+last@email.com",
    }))
  );
  return (
    <Collapsible
      headerText="Customer"
      items={items}
      notificationCount={10}
      search
    />
  );
};
