import styled from "styled-components";
import { Menu } from "../menu/Menu";
import { Filter } from "./filter/Filter";
import { Main } from "./main/Main";

const MonitorBox = styled.div`
  display: grid;
  grid-template-areas:
    "menu filter main "
    "menu filter  main";
  grid-template-columns: 64px 216px auto;
  grid-auto-rows: auto;
  height: 100%;
`;

export const Monitor = () => (
  <MonitorBox>
    <Menu />
    <Filter />
    <Main />
  </MonitorBox>
);
