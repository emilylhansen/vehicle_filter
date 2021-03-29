import { MAX_CARD_WIDTH } from "./cell/cell.styles";

export const getWindowWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

export const getColumnCount = (width: number): number => {
  const columnCount = Math.ceil((width - MAX_CARD_WIDTH * 2) / MAX_CARD_WIDTH);

  return width <= MAX_CARD_WIDTH * 2 ? 1 : columnCount;
};
