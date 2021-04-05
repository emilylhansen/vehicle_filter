import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import React from "react";
import styled from "styled-components";
import { Collapsible } from "../../design/collapsible/Collapsible";
import { Icon } from "../../design/Icon";
import { useFilterVariant } from "./filter.hooks";
import { FilterList } from "./FilterList";

const MinScreenWidthCollapsibleBox = styled.div`
  position: absolute;
  overflow: auto;
  bottom: 0;
  top: 64px;
  width: 100%;
  .Mui-expanded {
    z-index: 1;
  }
`;

export const MinScreenFilter = () => {
  const state = useFilterVariant();

  return (
    <MinScreenWidthCollapsibleBox>
      <Collapsible
        headerText={state.translation.filterHeader}
        headerIconLeft={
          <Icon fontSize={18} margin="0 8px 0 0">
            <FilterListOutlinedIcon />
          </Icon>
        }
      >
        <FilterList
          checkByStatus={state.checkByStatus}
          checkByUserId={state.checkByUserId}
          setCheckByStatus={state.setCheckByStatus}
          setCheckByUserId={state.setCheckByUserId}
          onReset={state.onReset}
          onSearch={state.onSearch}
          isResetDisabled={state.isResetDisabled}
          translation={state.translation}
        />
      </Collapsible>
    </MinScreenWidthCollapsibleBox>
  );
};
