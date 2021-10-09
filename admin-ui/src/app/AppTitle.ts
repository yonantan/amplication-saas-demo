import { App as TApp } from "../api/app/App";

export const APP_TITLE_FIELD = "name";

export const AppTitle = (record: TApp): string => {
  return record.name || record.id;
};
