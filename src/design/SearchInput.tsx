import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import React from "react";
import styled, { withTheme } from "styled-components";
import { Icon } from "./Icon";
import { Color, FontSize } from "./styles";
import { Theme } from "./theme";

const StyledTextField = styled(TextField)`
  border-radius: 16px;
  padding: 0 16px 0 8px;
  border: 1px solid ${Color.Secondary};
  height: 28px;

  .MuiInputBase-input {
    font-size: ${FontSize.Size3};
    bottom: -1px;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after,
  .MuiInput-underline:hover:not(.Mui-disabled):before,
  .MuiInput-underline:hover:not(.Mui-disabled):after {
    border-bottom: none;
  }
`;

export type PassedProps = { value: string; onChange: (value: string) => void };
export type SearchInputProps = PassedProps & {
  theme: Theme;
};

export const SearchInput = withTheme((props: SearchInputProps) => (
  <StyledTextField
    data-cy="search-input"
    value={props.value}
    onChange={(e) => props.onChange(e.currentTarget.value)}
    label=""
    InputLabelProps={{ shrink: false }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Icon fontSize={18} color={props.theme.color2}>
            <Search />
          </Icon>
        </InputAdornment>
      ),
    }}
  />
));
