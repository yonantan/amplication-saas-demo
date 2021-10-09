import { Organization } from "../organization/Organization";

export type App = {
  createdAt: Date;
  id: string;
  name: string | null;
  organization?: Organization | null;
  updatedAt: Date;
};
