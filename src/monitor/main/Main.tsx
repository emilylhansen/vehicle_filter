import styled, { css } from "styled-components";
import { FixedSizeList, FixedSizeGrid } from "react-window";

import car_placeholder from "./car_placeholder.png";
import car_stock_image from "./car_stock_image.png";
import AutoSizer from "react-virtualized-auto-sizer";
import { Color } from "../../design/styles";
import { ConnectedIcon } from "../../design/ConnectedIcon";
import { DisconnectedIcon } from "../../design/DisconnectedIcon";
import { Cell } from "./Cell";
import { ScrollToTop } from "./ScrollToTop";
import { ResultsCount } from "./ResultsCount";
import { Chip } from "../../design/Chip";

// const CARD_HEIGHT = 80;
// const ROW_VERTICAL_MARGIN = 8;
// const ROW_HEIGHT = CARD_HEIGHT + ROW_VERTICAL_MARGIN * 2;

const MainBox = styled.div`
  grid-area: main;
  background-color: ${Color.Gray4};
`;

const StyledChip = styled(Chip)`
  position: absolute;
  bottom: 16px;
  right: 45%;
`;

export const Main = () => {
  return (
    <MainBox>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeGrid
            columnCount={4}
            columnWidth={width / 4}
            height={height}
            rowCount={20}
            rowHeight={311}
            width={width}
          >
            {Cell}
          </FixedSizeGrid>
        )}
      </AutoSizer>
      <ScrollToTop />
      <StyledChip label="4 Results Found" />
    </MainBox>
  );
};
