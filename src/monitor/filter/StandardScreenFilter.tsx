import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import React from "react";
import { withTheme } from "styled-components";
import { Icon } from "../../design/Icon";
import { FontSize, FontWeight } from "../../design/styles";
import { Text } from "../../design/Text";
import { Theme } from "../../design/theme";
import { useFilterVariant } from "./filter.hooks";
import { StyledListSubheader } from "./filter.styles";
import { FilterList } from "./FilterList";

type Props = { theme: Theme };

export const StandardScreenFilter = withTheme((props: Props) => {
  const state = useFilterVariant();

  return (
    <>
      <StyledListSubheader data-cy="filter-list-header">
        <Icon fontSize={18} margin="0 8px 0 0">
          <FilterListOutlinedIcon />
        </Icon>
        <Text
          fontSize={FontSize.Size2}
          fontWeight={FontWeight.Weight4}
          color={props.theme.color1}
        >
          {state.translation.filterHeader}
        </Text>
      </StyledListSubheader>
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
    </>
  );
});
