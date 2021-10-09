import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type OrganizationCreateInput = {
  name: string;
  owner: UserWhereUniqueInput;
};
