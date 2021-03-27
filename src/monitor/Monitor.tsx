import styled from "styled-components";
import { Main } from "./main/Main";
import { Menu } from "../menu/Menu";
import { Filter } from "./filter/Filter";

const MonitorBox = styled.div`
  display: grid;
  grid-template-areas:
    // "header header"

    "menu filter main "
    "menu filter  main";
  grid-template-columns: 64px 216px auto;
  grid-auto-rows: auto;
  height: 100%;
`;

export const Monitor = () => {
  return (
    <MonitorBox>
      <Menu />
      <Filter />
      <Main />
    </MonitorBox>
  );
};
