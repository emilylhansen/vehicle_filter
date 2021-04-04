import List from "@material-ui/core/List";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import OpacityIcon from "@material-ui/icons/Opacity";
import React from "react";
import { styled } from "../design/design.helpers";
import { Color } from "../design/styles";
import { MIN_SCREEN_WIDTH } from "../utils/constants";
import { LanguageSelect } from "./LanguageSelect";
import { MenuItem } from "./MenuItem";
import { ThemeSwitch } from "./ThemeSwitch";

const MenuBox = styled.div`
  grid-area: menu;
  border-right: 1px solid ${({ theme }) => theme.background2};
  justify-content: space-between;
  display: flex;
  flex-direction: column;

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: ${MIN_SCREEN_WIDTH}px) {
    display: flex;
    flex-flow: row;

    .menu-bottom {
      display: none;
    }
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

const BottomMenuItemBox = styled.div`
  display: flex;
  height: 32px;
  justify-content: center;
  align-items: center;
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
        {/** placeholder */}
        <MenuItem isActive={false} icon={<HomeOutlinedIcon />} />
        <MenuItem
          isActive={true}
          icon={<FilterListOutlinedIcon />}
          aria-label="filter"
        />
      </StyledList>
      <StyledList className="menu-bottom">
        <BottomMenuItemBox>
          <LanguageSelect />
        </BottomMenuItemBox>
        <BottomMenuItemBox>
          <ThemeSwitch />
        </BottomMenuItemBox>
      </StyledList>
    </MenuBox>
  );
};
