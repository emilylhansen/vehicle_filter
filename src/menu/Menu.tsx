import List from "@material-ui/core/List";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import React from "react";
import { Color, styled } from "../design/styles";
import { MenuItem } from "./MenuItem";
const MenuBox = styled.div`
  grid-area: menu;
  border-right: 1px solid ${Color.Gray4};
`;

const StyledList = styled(List)`
  padding-top: 0;
  padding-bottom: 0;
`;

export const Menu = () => {
  return (
    <MenuBox>
      <StyledList>
        <MenuItem isActive={false} icon={<HomeOutlinedIcon />} />
        <MenuItem isActive={true} icon={<FilterListOutlinedIcon />} />
        <MenuItem isActive={false} icon={<AccountTreeOutlinedIcon />} />
        <MenuItem isActive={false} icon={<AssignmentOutlinedIcon />} />
        <MenuItem isActive={false} icon={<SettingsOutlinedIcon />} />
      </StyledList>
    </MenuBox>
  );
};
