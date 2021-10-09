import { Organization } from "../organization/Organization";
import { User } from "../user/User";

export type OrganizationMembership = {
  createdAt: Date;
  id: string;
  organization?: Organization;
  updatedAt: Date;
  user?: User;
};
