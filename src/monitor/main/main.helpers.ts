import { MAX_CARD_WIDTH } from "./cell/cell.styles";

export const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

export const getColumnCount = (width: number): number =>
  Math.ceil((width - MAX_CARD_WIDTH * 2) / MAX_CARD_WIDTH);
