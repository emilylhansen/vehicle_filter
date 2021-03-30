import { MAX_CARD_WIDTH } from "./cell/cell.styles";

export const getColumnCount = (width: number): number => {
  const columnCount = Math.ceil((width - MAX_CARD_WIDTH * 2) / MAX_CARD_WIDTH);
  console.log({ width, columnCount });
  return width <= MAX_CARD_WIDTH * 2 ? 1 : columnCount;
};
