import React from "react";
import { useSelector } from "react-redux";
import { Collapsible } from "../../design/Collapsible";
import { getCustomerListItems } from "../../selectors";

export const CustomerFilter = () => {
  const customerListItems = useSelector(getCustomerListItems);

  return (
    <Collapsible
      headerText="Customer"
      items={customerListItems}
      notificationCount={10}
      search
    />
  );
};
