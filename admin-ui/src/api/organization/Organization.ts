import { Application } from "../application/Application";
import { OrganizationInvitation } from "../organizationInvitation/OrganizationInvitation";
import { OrganizationMembership } from "../organizationMembership/OrganizationMembership";
import { User } from "../user/User";

export type Organization = {
  applications?: Array<Application>;
  createdAt: Date;
  id: string;
  name: string;
  organizationInvitations?: Array<OrganizationInvitation>;
  organizationMemberships?: Array<OrganizationMembership>;
  owner?: User;
  updatedAt: Date;
};
