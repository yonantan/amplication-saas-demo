import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type OrganizationMembershipUpdateInput = {
  organization?: OrganizationWhereUniqueInput;
  user?: UserWhereUniqueInput;
};
