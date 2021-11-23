import { User } from "../user/User";
import { Organization } from "../organization/Organization";

export type Application = {
  createdAt: Date;
  createdBy?: User | null;
  id: string;
  name: string | null;
  organization?: Organization | null;
  updatedAt: Date;
};
