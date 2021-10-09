import { OrganizationMembershipWhereInput } from "./OrganizationMembershipWhereInput";
import { OrganizationMembershipOrderByInput } from "./OrganizationMembershipOrderByInput";

export type OrganizationMembershipFindManyArgs = {
  where?: OrganizationMembershipWhereInput;
  orderBy?: OrganizationMembershipOrderByInput;
  skip?: number;
  take?: number;
};
