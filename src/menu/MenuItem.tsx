import React from "react";
import styled, { css } from "styled-components";
import { Icon } from "../design/Icon";
import { Color } from "../design/styles";

const MenuItemBox = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
`;

const IconBox = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  position: relative;
  right: 0;
  transition: right 250ms;
  z-index: 999;

  :hover {
    right: -16px;
  }

  ${({ isActive }) =>
    isActive
      ? css`
          background-color: ${Color.Primary};
          box-shadow: 0 1.4px 4.4px rgba(55, 40, 177, 0.084),
            0 3.3px 10.6px rgba(55, 40, 177, 0.121),
            0 6.3px 20px rgba(55, 40, 177, 0.15),
            0 11.2px 35.7px rgba(55, 40, 177, 0.179),
            0 20.9px 66.8px rgba(55, 40, 177, 0.216),
            0 50px 160px rgba(55, 40, 177, 0.3);
        `
      : css``}
`;

type Props = { isActive: boolean; icon: JSX.Element };

export const MenuItem = (props: Props) => {
  return (
    <MenuItemBox>
      <IconBox isActive={props.isActive}>
        <Icon fontSize={32} color={Color.Secondary}>
          {props.icon}
        </Icon>
      </IconBox>
    </MenuItemBox>
  );
};
