import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { NonEmptyString } from "newtype-ts/lib/NonEmptyString";
import styled from "styled-components";
import {
  IntegerTimeStamp,
  isoIntegerTimeStamp,
  isoNonEmptyString,
  isoNonEmptyString6,
  NonEmptyString6,
  VehicleId,
  isoVehicleId,
} from "../../api/types";
import car_placeholder from "../../car_placeholder.png";
import { ConnectedIcon } from "../../design/ConnectedIcon";
import { DisconnectedIcon } from "../../design/DisconnectedIcon";
import { Color, FontSize, FontWeight } from "../../design/styles";
import { Text } from "../../design/Text";

// const CELL_MARGIN = 16;
const CARD_WIDTH = 240;
// const CARD_HEIGHT = 240;
// const CELL_HEIGHT = CARD_HEIGHT + CELL_MARGIN * 2;
// const CELL_WIDTH = CARD_WIDTH + CELL_MARGIN * 2;

const CellBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LastConnectedBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCard = styled(Card)`
  width: ${CARD_WIDTH}px;
  border-radius: 16px;
  margin: 16px;
  box-shadow: 0 2.8px 4.4px rgba(55, 40, 177, 0.006),
    0 6.7px 10.6px rgba(55, 40, 177, 0.008),
    0 12.5px 20px rgba(55, 40, 177, 0.01),
    0 22.3px 35.7px rgba(55, 40, 177, 0.012),
    0 41.8px 66.8px rgba(55, 40, 177, 0.014),
    0 100px 160px rgba(55, 40, 177, 0.02);
`;

const StyledCardMedia = styled(CardMedia)`
  height: 160px;
  border-radius: 16px;
  margin: 16px 16px 0;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-flow: column;
`;

const Registration = styled(Text)`
  text-transform: uppercase;
`;

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

export const Cell = (props: Props) => {
  const dateString = new Date(
    isoIntegerTimeStamp.unwrap(props.lastConnected) * 1000
  ).toLocaleDateString();
  const date = props.isConnected ? "Now" : dateString;

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
                {`Last Connected: ${date}`}
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
