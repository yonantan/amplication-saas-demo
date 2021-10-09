import { SortOrder } from "../../util/SortOrder";

export type OrganizationMembershipOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  organizationId?: SortOrder;
  updatedAt?: SortOrder;
  userId?: SortOrder;
};
