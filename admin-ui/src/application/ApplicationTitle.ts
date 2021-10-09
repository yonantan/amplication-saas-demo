import { Application as TApplication } from "../api/application/Application";

export const APPLICATION_TITLE_FIELD = "name";

export const ApplicationTitle = (record: TApplication): string => {
  return record.name || record.id;
};
