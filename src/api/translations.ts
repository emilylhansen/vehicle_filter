import { Language, Translation } from "./api.types";

export const ENGLISH_TRANSLATION: Translation = {
  filterHeader: "Filter",
  filterCategories: {
    customer: "Customer",
    status: "Status",
    make: "Make",
    model: "Model",
    year: "Year",
  },
  searchButton: "Search",
  resetButton: "Reset",
  resultsFound: "Results Found",
  connected: "Connected",
  disconnected: "Disconnected",
  lastConnected: "Last Connected",
  now: "Now",
};

export const SWEDISH_TRANSLATION: Translation = {
  filterHeader: "Filtrera",
  filterCategories: {
    customer: "Kund",
    status: "Status",
    make: "Göra",
    model: "Modell",
    year: "År",
  },
  searchButton: "Sök",
  resetButton: "Återställa",
  resultsFound: "Resultat Hittades",
  connected: "Ansluten",
  disconnected: "Osammanhängande",
  lastConnected: "Senast Ansluten",
  now: "Nu",
};

export const TRANSLATIONS_BY_LANGUAGE: Record<Language, Translation> = {
  [Language.English]: ENGLISH_TRANSLATION,
  [Language.Swedish]: SWEDISH_TRANSLATION,
};
