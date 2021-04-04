import Switch from "@material-ui/core/Switch";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { useDispatch, useSelector } from "react-redux";
import { css } from "styled-components";
import { setTheme } from "../api/api.actions";
import { getTheme } from "../api/api.selectors";
import { styled } from "../design/design.helpers";
import { Icon } from "../design/Icon";
import { ThemeEnum } from "../design/theme";

const ThemeSwitchBox = styled.div`
  position: relative;
  // width: 100%;
  // height: 100%;
  width: 40px;
  height: 24px;
`;

const StyledSwitch = styled(Switch)`
  position: absolute;

  .MuiSwitch-track {
    height: 22px;
    top: 8px;
    position: absolute;
    width: 38px;
    border-radius: 11px;
  }

  .MuiSwitch-switchBase.Mui-checked {
    transform: translateX(16px);
  }

  .MuiSwitch-switchBase {
    left: 4px;
  }
`;

const StyledIcon = styled(Icon)<{ checked: boolean }>`
  position: absolute;
  font-size: 10px;
  bottom: 8px;
  left: 18px;
  cursor: pointer;

  ${({ checked }) =>
    checked &&
    css`
      transform: translateX(16px);
    `}
`;

const useThemeSwitch = () => {
  const dispatch = useDispatch();

  const theme = useSelector(getTheme);

  const checked = theme === ThemeEnum.Dark;

  const onToggle = () =>
    dispatch(setTheme(checked ? ThemeEnum.Light : ThemeEnum.Dark));

  return {
    checked,
    onToggle,
  };
};

export const ThemeSwitch = () => {
  const state = useThemeSwitch();

  return (
    <ThemeSwitchBox>
      <StyledSwitch checked={state.checked} onChange={state.onToggle} />
      <StyledIcon
        fontSize={10}
        onClick={state.onToggle}
        checked={state.checked}
      >
        {state.checked ? <Brightness2Icon /> : <WbSunnyIcon />}
      </StyledIcon>
    </ThemeSwitchBox>
  );
};
