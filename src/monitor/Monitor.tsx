import styled from "styled-components";
import { Menu } from "../menu/Menu";
import { MIN_SCREEN_WIDTH } from "../utils/constants";
import { Filter } from "./filter/Filter";
import { Main } from "./main/Main";

const MonitorBox = styled.div`
  display: grid;
  height: 100%;

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: ${MIN_SCREEN_WIDTH}px) {
    grid-template-areas:
      "menu  "
      "filter "
      "main";
    grid-auto-rows: 64px 48px auto;
  }

  /* other devices (600px and up) */
  @media only screen and (min-width: ${MIN_SCREEN_WIDTH}px) {
    grid-template-areas:
      "menu filter main "
      "menu filter  main";
    grid-template-columns: 64px 216px auto;
    grid-auto-rows: auto;
  }
`;

export const Monitor = () => (
  <MonitorBox>
    <Menu />
    <Filter />
    <Main />
  </MonitorBox>
);
