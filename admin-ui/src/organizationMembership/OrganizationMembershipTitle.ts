import { OrganizationMembership as TOrganizationMembership } from "../api/organizationMembership/OrganizationMembership";

export const ORGANIZATIONMEMBERSHIP_TITLE_FIELD = "id";

export const OrganizationMembershipTitle = (
  record: TOrganizationMembership
): string => {
  return record.id || record.id;
};
