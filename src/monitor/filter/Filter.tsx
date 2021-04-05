import React from "react";
import { useFilter } from "./filter.hooks";
import { FilterBox } from "./filter.styles";
import { MinScreenFilter } from "./MinScreenFilter";
import { StandardScreenFilter } from "./StandardScreenFilter";

export const Filter = () => {
  const state = useFilter();

  return (
    <FilterBox>
      {state.isMinScreenWidth ? <MinScreenFilter /> : <StandardScreenFilter />}
    </FilterBox>
  );
};
