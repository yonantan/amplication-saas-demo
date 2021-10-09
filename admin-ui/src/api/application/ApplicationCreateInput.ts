import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";

export type ApplicationCreateInput = {
  name?: string | null;
  organization?: OrganizationWhereUniqueInput | null;
};
