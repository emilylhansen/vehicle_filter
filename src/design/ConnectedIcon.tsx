import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";
import { Icon, IconProps } from "./Icon";
import { Color } from "./styles";

export const ConnectedIcon = (props: IconProps) => (
  <Icon {...props} color={Color.Connected}>
    <SignalWifi4BarIcon />
  </Icon>
);
