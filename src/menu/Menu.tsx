import List from "@material-ui/core/List";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import OpacityIcon from "@material-ui/icons/Opacity";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import React from "react";
import styled from "styled-components";
import { Icon } from "../design/Icon";
import { Color } from "../design/styles";
import { MIN_SCREEN_WIDTH } from "../utils/constants";
import { MenuItem, MenuItemBox } from "./MenuItem";
import { LanguageSelect } from "./LanguageSelect";

const MenuBox = styled.div`
  grid-area: menu;
  border-right: 1px solid ${Color.Gray4};
`;

const StyledList = styled(List)`
  padding-top: 0;
  padding-bottom: 0;

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: ${MIN_SCREEN_WIDTH}px) {
    display: flex;
    flex-flow: row;
  }
`;

/** TODO: set up routing */
export const Menu = () => {
  return (
    <MenuBox>
      <StyledList>
        <MenuItem
          isActive={false}
          icon={<OpacityIcon />}
          isDisabled={true}
          color={Color.Primary}
        />
        <MenuItem isActive={false} icon={<HomeOutlinedIcon />} />
        <MenuItem
          isActive={true}
          icon={<FilterListOutlinedIcon />}
          aria-label="filter"
        />
        <MenuItem
          isActive={false}
          icon={<AccountTreeOutlinedIcon />}
          aria-label="paceholder 1"
        />
        <MenuItem
          isActive={false}
          icon={<AssignmentOutlinedIcon />}
          aria-label="paceholder 2"
        />
        <MenuItem
          isActive={false}
          icon={<SettingsOutlinedIcon />}
          aria-label="paceholder 3"
        />
      </StyledList>

      <MenuItemBox>
        <LanguageSelect />
      </MenuItemBox>
    </MenuBox>
  );
};
