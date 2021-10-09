import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type OrganizationUpdateInput = {
  name?: string;
  owner?: UserWhereUniqueInput;
};
