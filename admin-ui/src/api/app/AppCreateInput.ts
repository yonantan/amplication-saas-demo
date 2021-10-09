import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";

export type AppCreateInput = {
  name?: string | null;
  organization?: OrganizationWhereUniqueInput | null;
};
