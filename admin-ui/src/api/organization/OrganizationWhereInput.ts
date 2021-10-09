import { StringFilter } from "../../util/StringFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type OrganizationWhereInput = {
  id?: StringFilter;
  owner?: UserWhereUniqueInput;
};
