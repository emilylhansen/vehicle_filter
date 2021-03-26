import SignalWifi0BarIcon from "@material-ui/icons/SignalWifi4Bar";
import { Icon, IconProps } from "./Icon";
import { Color } from "./styles";

export const DisconnectedIcon = (props: IconProps) => (
  <Icon {...props} color={Color.Disconnected}>
    <SignalWifi0BarIcon />
  </Icon>
);
