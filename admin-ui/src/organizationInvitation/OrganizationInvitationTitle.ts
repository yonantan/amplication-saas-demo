import { OrganizationInvitation as TOrganizationInvitation } from "../api/organizationInvitation/OrganizationInvitation";

export const ORGANIZATIONINVITATION_TITLE_FIELD = "id";

export const OrganizationInvitationTitle = (
  record: TOrganizationInvitation
): string => {
  return record.id || record.id;
};
