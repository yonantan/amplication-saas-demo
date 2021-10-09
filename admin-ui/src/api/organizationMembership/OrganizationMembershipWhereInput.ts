import { StringFilter } from "../../util/StringFilter";
import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type OrganizationMembershipWhereInput = {
  id?: StringFilter;
  organization?: OrganizationWhereUniqueInput;
  user?: UserWhereUniqueInput;
};
