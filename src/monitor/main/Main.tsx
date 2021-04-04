import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import styled from "styled-components";
import { Chip } from "../../design/Chip";
import { Color } from "../../design/styles";
import { A, O, pipe, RD } from "../../utils/fp-ts-exports";
import { Cell } from "./cell/Cell";
import { useMain } from "./main.hooks";

const MainBox = styled.div`
  grid-area: main;
  background-color: ${Color.Gray4};
`;

const StyledChip = styled(Chip)`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 16px;
  bottom: 16px;
  color: ${Color.Secondary};
  background-color: ${Color.Primary};
`;

export const Main = () => {
  const state = useMain();

  return (
    <MainBox ref={state.mainRef}>
      <AutoSizer>
        {({ height, width }) =>
          pipe(
            state.cells,
            RD.fold(
              /** TODO: style loading and error states */
              () => <div>loading</div>,
              () => <div>loading</div>,
              (e) => <div>{e}</div>,
              (cs) => (
                <FixedSizeGrid
                  ref={state.gridRef}
                  columnCount={state.columnCount}
                  columnWidth={width / state.columnCount}
                  height={height}
                  rowCount={Math.ceil(cs.length / state.columnCount)}
                  rowHeight={311}
                  width={width}
                >
                  {({ rowIndex, columnIndex, style }) =>
                    pipe(
                      cs,
                      A.lookup(state.getListIndex({ rowIndex, columnIndex })),
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
                          translation={data.translation}
                        />
                      )),
                      O.toNullable
                    )
                  }
                </FixedSizeGrid>
              )
            )
          )
        }
      </AutoSizer>
      <StyledIconButton onClick={state.scrollToTop} aria-label="scroll to top">
        <ArrowUpwardIcon />
      </StyledIconButton>
      {pipe(
        state.cells,
        RD.toOption,
        O.map((cs) => (
          <StyledChip
            label={`${cs.length} ${state.translation.resultsFound}`}
            aria-label="results found count"
            data-cy="results-found-count"
          />
        )),
        O.toNullable
      )}
    </MainBox>
  );
};
