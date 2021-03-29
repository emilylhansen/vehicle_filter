import SignalWifiOffIcon from "@material-ui/icons/SignalWifiOff";
import { Icon, IconProps } from "./Icon";
import { Color } from "./styles";

export const DisconnectedIcon = (props: IconProps) => (
  <Icon {...props} color={Color.Disconnected}>
    <SignalWifiOffIcon />
  </Icon>
);
