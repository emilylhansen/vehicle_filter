import styled from "styled-components";
import { Color } from "./styles";
import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Search from "@material-ui/icons/Search";
import { Icon } from "./Icon";

const StyledTextField = styled(TextField)`
  border-radius: 16px;
  padding: 0 16px 0 8px;
  border: 1px solid ${Color.Secondary};
  height: 28px;

  .MuiInputBase-input {
    font-size: 0.75rem;
    bottom: -1px;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after,
  .MuiInput-underline:hover:not(.Mui-disabled):before,
  .MuiInput-underline:hover:not(.Mui-disabled):after {
    border-bottom: none;
  }
`;

export const SearchInput = () => {
  return (
    <StyledTextField
      label=""
      InputLabelProps={{ shrink: false }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon fontSize={18} color={Color.Gray2}>
              <Search />
            </Icon>
          </InputAdornment>
        ),
      }}
    />
  );
};
