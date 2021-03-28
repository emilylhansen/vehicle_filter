import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import styled from "styled-components";
import { Text } from "../../../design/Text";

const CARD_MARGIN = 16;
export const CARD_WIDTH = 240;
export const MAX_CARD_WIDTH = CARD_WIDTH + CARD_MARGIN * 2;

export const CellBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LastConnectedBox = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledCard = styled(Card)`
  width: ${CARD_WIDTH}px;
  min-width: ${CARD_WIDTH}px;
  max-width: ${CARD_WIDTH}px;
  border-radius: 16px;
  margin: 16px;
  box-shadow: 0 2.8px 4.4px rgba(55, 40, 177, 0.006),
    0 6.7px 10.6px rgba(55, 40, 177, 0.008),
    0 12.5px 20px rgba(55, 40, 177, 0.01),
    0 22.3px 35.7px rgba(55, 40, 177, 0.012),
    0 41.8px 66.8px rgba(55, 40, 177, 0.014),
    0 100px 160px rgba(55, 40, 177, 0.02);
`;

export const StyledCardMedia = styled(CardMedia)`
  height: 160px;
  border-radius: 16px;
  margin: 16px 16px 0;
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-flow: column;
`;

export const Registration = styled(Text)`
  text-transform: uppercase;
`;
