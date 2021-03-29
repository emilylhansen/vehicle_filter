import List from "@material-ui/core/List";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import OpacityIcon from "@material-ui/icons/Opacity";
import React from "react";
import styled from "styled-components";
import { Color } from "../design/styles";
import { MenuItem } from "./MenuItem";
import { Icon } from "../design/Icon";

const MenuBox = styled.div`
  grid-area: menu;
  border-right: 1px solid ${Color.Gray4};
`;

const StyledList = styled(List)`
  padding-top: 0;
  padding-bottom: 0;

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-flow: row;
  }
`;

/** TODO: set up routing */
export const Menu = () => {
  return (
    <MenuBox>
      <StyledList>
        <Icon
          fontSize={32}
          color={Color.Primary}
          aria-label="home"
          margin="16px auto 32px"
        >
          <OpacityIcon />
        </Icon>
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
    </MenuBox>
  );
};
