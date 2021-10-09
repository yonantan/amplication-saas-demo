import { Organization } from "../organization/Organization";

export type Application = {
  createdAt: Date;
  id: string;
  name: string | null;
  organization?: Organization | null;
  updatedAt: Date;
};
