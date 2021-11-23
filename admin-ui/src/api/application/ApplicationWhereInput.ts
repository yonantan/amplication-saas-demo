import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";

export type ApplicationWhereInput = {
  createdBy?: UserWhereUniqueInput;
  id?: StringFilter;
  name?: StringNullableFilter;
  organization?: OrganizationWhereUniqueInput;
};
