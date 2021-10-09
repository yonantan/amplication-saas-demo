import { App } from "../app/App";
import { OrganizationInvitation } from "../organizationInvitation/OrganizationInvitation";
import { OrganizationMembership } from "../organizationMembership/OrganizationMembership";
import { User } from "../user/User";

export type Organization = {
  apps?: Array<App>;
  createdAt: Date;
  id: string;
  organizationInvitations?: Array<OrganizationInvitation>;
  organizationMemberships?: Array<OrganizationMembership>;
  owner?: User;
  updatedAt: Date;
};
