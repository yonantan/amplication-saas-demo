import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type OrganizationCreateInput = {
  owner: UserWhereUniqueInput;
};
