import Checkbox from "@material-ui/core/Checkbox";
import { default as MuiListItem } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { styled } from "../design.helpers";
import { FontSize } from "../styles";
import { CheckboxListItemProps } from "./CollapsibleCheckboxList";

export const StyledListItem = styled(MuiListItem)`
  .MuiListItemIcon-root {
    min-width: 0;
  }

  .MuiListItem-gutters {
    padding-left: 0;
    padding-right: 8px;
  }

  .MuiListItemText-primary,
  .MuiListItemText-secondary {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .MuiListItemText-primary {
    font-size: ${FontSize.Size3};
    color: ${({ theme }) => theme.color1};
  }

  .MuiListItemText-secondary {
    font-size: ${FontSize.Size5};
    color: ${({ theme }) => theme.color2};
  }

  .MuiListItemText-root {
    flex: unset;
    margin-right: 8px;
  }
`;

export const CheckboxListItem = ({
  item,
  style,
}: {
  item: CheckboxListItemProps;
  style: React.CSSProperties;
}) => (
  <StyledListItem
    style={style}
    key={item.key}
    role={undefined}
    dense
    button
    data-cy="collapsible-list-item"
  >
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
