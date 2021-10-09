import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type OrganizationMembershipCreateInput = {
  organization: OrganizationWhereUniqueInput;
  user: UserWhereUniqueInput;
};
