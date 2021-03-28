import CardActionArea from "@material-ui/core/CardActionArea";
import { NonEmptyString } from "newtype-ts/lib/NonEmptyString";
import {
  IntegerTimeStamp,
  isoIntegerTimeStamp,
  isoNonEmptyString,
  isoNonEmptyString6,
  isoVehicleId,
  NonEmptyString6,
  VehicleId,
} from "../../../api/types";
import { ConnectedIcon } from "../../../design/ConnectedIcon";
import { DisconnectedIcon } from "../../../design/DisconnectedIcon";
import { Color, FontSize, FontWeight } from "../../../design/styles";
import { Text } from "../../../design/Text";
import car_placeholder from "./car_placeholder.png";
import {
  CellBox,
  LastConnectedBox,
  Registration,
  StyledCard,
  StyledCardContent,
  StyledCardMedia,
} from "./cell.styles";

type ReactWindowCellProps = {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
};
export type InjectedProps = {
  vehicle: NonEmptyString;
  owner: NonEmptyString;
  isConnected: boolean;
  registration: NonEmptyString6;
  lastConnected: IntegerTimeStamp;
  id: VehicleId;
};
type Props = ReactWindowCellProps & InjectedProps;

const useCell = (props: Props) => {
  const dateString = new Date(
    isoIntegerTimeStamp.unwrap(props.lastConnected) * 1000
  ).toLocaleDateString();
  const date = props.isConnected ? "Now" : dateString;

  return { date };
};

export const Cell = (props: Props) => {
  const state = useCell(props);

  return (
    <CellBox style={props.style} key={isoVehicleId.unwrap(props.id)}>
      <StyledCard>
        <CardActionArea>
          <StyledCardMedia image={car_placeholder} />
          <StyledCardContent>
            <Text fontSize={FontSize.Size1} fontWeight={FontWeight.Weight6}>
              {isoNonEmptyString.unwrap(props.vehicle)}
            </Text>
            <Text
              fontSize={FontSize.Size3}
              fontWeight={FontWeight.Weight4}
              color={Color.Gray2}
              margin="0 0 8px"
            >
              {isoNonEmptyString.unwrap(props.owner)}
            </Text>
            <LastConnectedBox>
              <Text
                fontSize={FontSize.Size6}
                fontWeight={FontWeight.Weight2}
                color={Color.Gray3}
              >
                {`Last Connected: ${state.date}`}
              </Text>
              {props.isConnected ? (
                <ConnectedIcon fontSize={12} margin="0 0 0 8px" />
              ) : (
                <DisconnectedIcon fontSize={12} margin="0 0 0 8px" />
              )}
              <Registration
                fontSize={FontSize.Size3}
                fontWeight={FontWeight.Weight5}
                color={Color.Secondary}
                margin="0 0 0 auto"
              >
                {isoNonEmptyString6.unwrap(props.registration)}
              </Registration>
            </LastConnectedBox>
          </StyledCardContent>
        </CardActionArea>
      </StyledCard>
    </CellBox>
  );
};
