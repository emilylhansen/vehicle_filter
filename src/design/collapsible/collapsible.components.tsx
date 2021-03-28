import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { CollapsibleItem } from "./Collapsible";
import { StyledListItem } from "./collapsible.styles";

export const CollapsibleListItem = ({
  item,
  style,
}: {
  item: CollapsibleItem;
  style: React.CSSProperties;
}) => (
  <StyledListItem style={style} key={item.key} role={undefined} dense button>
    <ListItemIcon>
      <Checkbox
        tabIndex={-1}
        disableRipple
        onChange={(event, checked) => item.onChange(checked)}
        checked={item.checked}
      />
    </ListItemIcon>
    <ListItemText primary={item.primaryText} secondary={item.secondaryText} />
    {item.rightAdornment}
  </StyledListItem>
);
