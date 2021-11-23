import { Application } from "../application/Application";
import { OrganizationMembership } from "../organizationMembership/OrganizationMembership";
import { Organization } from "../organization/Organization";

export type User = {
  applications?: Array<Application>;
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastName: string | null;
  organizationMemberships?: Array<OrganizationMembership>;
  ownedOrganizations?: Array<Organization>;
  roles: Array<string>;
  updatedAt: Date;
  username: string;
};
