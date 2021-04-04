import List from "@material-ui/core/List";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import OpacityIcon from "@material-ui/icons/Opacity";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import React from "react";
import styled from "styled-components";
import { Color } from "../design/styles";
import { MIN_SCREEN_WIDTH } from "../utils/constants";
import { LanguageSelect } from "./LanguageSelect";
import { MenuItem, MenuItemBox } from "./MenuItem";

const MenuBox = styled.div`
  grid-area: menu;
  border-right: 1px solid ${Color.Gray4};
  justify-content: space-between;
  display: flex;
  flex-direction: column;

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: ${MIN_SCREEN_WIDTH}px) {
    display: flex;
    flex-flow: row;
  }
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
