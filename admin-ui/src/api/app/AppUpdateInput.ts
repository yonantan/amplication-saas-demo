import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";

export type AppUpdateInput = {
  name?: string | null;
  organization?: OrganizationWhereUniqueInput | null;
};
