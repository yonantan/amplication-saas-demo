import { SortOrder } from "../../util/SortOrder";

export type OrganizationInvitationOrderByInput = {
  acceptedAt?: SortOrder;
  createdAt?: SortOrder;
  emailSentAt?: SortOrder;
  id?: SortOrder;
  organizationId?: SortOrder;
  updatedAt?: SortOrder;
  userEmail?: SortOrder;
};
