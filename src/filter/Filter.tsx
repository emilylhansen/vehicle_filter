import React from "react";
import { FixedSizeList } from "react-window";
import { Button, ButtonPropsDisplay } from "../design/Button";
import { SearchInput } from "../design/SearchInput";
import { Color, styled, FontSize, FontWeight } from "../design/styles";
import { ConnectedIcon } from "../design/ConnectedIcon";
import { DisconnectedIcon } from "../design/DisconnectedIcon";
import { CustomerFilter } from "./CustomerFilter";
import { StatusFilter } from "./StatusFilter";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Icon } from "../design/Icon";
import List from "@material-ui/core/List";
import { Text } from "../design/Text";
import { Collapsible, CollapsibleListItem } from "../design/Collapsible";

const FilterBox = styled.div`
  grid-area: filter;
  display: flex;
  flex-flow: column;
  border-right: 1px solid ${Color.Gray4};
  overflow: auto;
`;

const ButtonsBox = styled.div`
  display: flex;
  flex-flow: column;
  padding: 16px;
`;

const ScrollList = styled.div`
  flex: 1;
  overflow: auto;

  > * {
    border-bottom: 1px solid ${Color.Gray4};
  }
`;

const SearchButton = styled(Button)`
  margin-bottom: 4px;
`;

const StyledListSubheader = styled(ListSubheader)`
  display: flex;
  align-items: center;
  height: 48px;
`;

export const Filter = () => {
  return (
    <FilterBox>
      <ScrollList>
        <StyledListSubheader>
          <Icon fontSize={18} margin="0 8px 0 0">
            <FilterListOutlinedIcon />
          </Icon>
          <Text
            fontSize={FontSize.Size2}
            fontWeight={FontWeight.Weight4}
            color={Color.Gray1}
          >
            Filter
          </Text>
        </StyledListSubheader>
        <CustomerFilter />
        <StatusFilter />
        <Collapsible headerText="Make" items={[]} notificationCount={0} />
        <Collapsible headerText="Model" items={[]} notificationCount={3} />
        <Collapsible headerText="Year" items={[]} notificationCount={2} />
      </ScrollList>

      <ButtonsBox>
        <SearchButton
          variant="contained"
          size="small"
          display={ButtonPropsDisplay.Primary}
        >
          Search
        </SearchButton>
        <Button
          variant="outlined"
          size="small"
          display={ButtonPropsDisplay.Secondary}
        >
          Reset
        </Button>
      </ButtonsBox>
    </FilterBox>
  );
};
