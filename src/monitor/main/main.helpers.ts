import { MAX_CARD_WIDTH } from "./cell/cell.styles";
import { MIN_SCREEN_WIDTH } from "../../utils/constants";

export const getColumnCount = (width: number): number =>
  width < MIN_SCREEN_WIDTH ? 1 : Math.floor(width / MAX_CARD_WIDTH);
