import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import styled from "styled-components";
import { getUsers, getVehicles } from "../../api/actions";
import { Chip } from "../../design/Chip";
import { Color } from "../../design/styles";
import { getCells } from "../../selectors";
import { A, O, pipe } from "../../utils/fp-ts-exports";
import { Cell } from "./Cell";

const MainBox = styled.div`
  grid-area: main;
  background-color: ${Color.Gray4};
`;

const StyledChip = styled(Chip)`
  position: absolute;
  bottom: 16px;
  right: 45%;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 16px;
  bottom: 16px;
  color: ${Color.Secondary};
  background-color: ${Color.Primary};
`;

export const Main = () => {
  const dispatch = useDispatch();
  const gridRef = React.createRef<FixedSizeGrid>();

  const cells = useSelector(getCells);

  const scrollToTop = () => {
    /**
     * Unable to use window smooth scroll with react-window,
     * since it would require the library to render all items.
     */
    pipe(
      gridRef.current,
      O.fromNullable,
      O.map((r) => () => {
        r.scrollToItem({
          rowIndex: 0,
          align: "start",
        });
      }),
      O.getOrElse(() => () => {}),
      (io) => io()
    );
  };

  React.useEffect(() => {
    dispatch(getUsers());
    dispatch(getVehicles());
  }, []);

  return (
    <MainBox>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeGrid
            ref={gridRef}
            columnCount={4}
            columnWidth={width / 4}
            height={height}
            rowCount={Math.ceil(cells.length / 4)}
            rowHeight={311}
            width={width}
          >
            {({ rowIndex, columnIndex, style }) =>
              pipe(
                cells,
                A.lookup(rowIndex + 1 + columnIndex + 1),
                O.map((data) => (
                  <Cell
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    style={style}
                    vehicle={data.vehicle}
                    owner={data.owner}
                    isConnected={data.isConnected}
                    registration={data.registration}
                    lastConnected={data.lastConnected}
                    id={data.id}
                  />
                )),
                O.getOrElse(() => <div>unable to load cell</div>)
              )
            }
          </FixedSizeGrid>
        )}
      </AutoSizer>
      <StyledIconButton onClick={scrollToTop}>
        <ArrowUpwardIcon />
      </StyledIconButton>
      <StyledChip label={`${cells.length} Results Found`} />
    </MainBox>
  );
};
