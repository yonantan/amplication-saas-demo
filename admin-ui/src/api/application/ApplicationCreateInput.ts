import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";

export type ApplicationCreateInput = {
  createdBy?: UserWhereUniqueInput | null;
  name?: string | null;
  organization?: OrganizationWhereUniqueInput | null;
};
