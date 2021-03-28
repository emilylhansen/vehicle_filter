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
import { A, O, pipe, RD } from "../../utils/fp-ts-exports";
import { Cell } from "./cell/Cell";

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

const useMain = () => {
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

  return { cells, scrollToTop, gridRef };
};
export const Main = () => {
  const state = useMain();

  return (
    <MainBox>
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
                  columnCount={4}
                  columnWidth={width / 4}
                  height={height}
                  rowCount={Math.ceil(cs.length / 4)}
                  rowHeight={311}
                  width={width}
                >
                  {({ rowIndex, columnIndex, style }) =>
                    pipe(
                      cs,
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
                      /** TODO: styled error cell */
                      O.getOrElse(() => <div>unable to load cell</div>)
                    )
                  }
                </FixedSizeGrid>
              )
            )
          )
        }
      </AutoSizer>
      <StyledIconButton onClick={state.scrollToTop}>
        <ArrowUpwardIcon />
      </StyledIconButton>
      {pipe(
        state.cells,
        RD.toOption,
        O.map((cs) => <StyledChip label={`${cs.length} Results Found`} />),
        O.toNullable
      )}
    </MainBox>
  );
};
