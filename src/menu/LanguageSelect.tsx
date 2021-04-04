import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setLanguage } from "../api/api.actions";
import { getLanguage } from "../api/api.selectors";
import { Language } from "../api/api.types";
import { Color, FontSize, FontWeight } from "../design/styles";
import { A, pipe } from "../utils/fp-ts-exports";

export type LanguageItem = {
  key: Language;
  abbreviation: string;
};

export const languages: Array<LanguageItem> = [
  { key: Language.English, abbreviation: "EN" },
  { key: Language.Swedish, abbreviation: "SV" },
];

const SelectBox = styled.div`
  .MuiInput-underline:before,
  .MuiInput-underline:after,
  .MuiInput-underline:hover:not(.Mui-disabled):before,
  .MuiInput-underline:hover:not(.Mui-disabled):after {
    border-bottom: none;
  }
`;

const StyledSelect = styled(Select)`
  font-size: ${FontSize.Size5};
  width: 40px;
  height: 24px;
  border-radius: 8px;
  background-color: ${Color.White};
  border: 1px solid ${Color.Secondary};
  font-weight: ${FontWeight.Weight5};

  .MuiSelect-root {
    padding: 0 8px 0 6px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .MuiSvgIcon-root {
      right -2px;
      color: ${Color.Secondary};
  }

`;

export const useLanguageSelect = () => {
  const dispatch = useDispatch();

  const language = useSelector(getLanguage);

  const onChangeLanguage = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    /** TODO: dangerous cast */
    dispatch(setLanguage(e.target.value as Language));
  };

  return { language, onChangeLanguage };
};

export const LanguageSelect = () => {
  const state = useLanguageSelect();

  return (
    <SelectBox>
      <StyledSelect
        value={state.language}
        onChange={state.onChangeLanguage}
        label=""
        data-cy="language-select"
      >
        {pipe(
          languages,
          A.map((l) => <MenuItem value={l.key}>{l.abbreviation}</MenuItem>)
        )}
      </StyledSelect>
    </SelectBox>
  );
};
