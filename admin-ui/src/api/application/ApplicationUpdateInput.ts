import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";

export type ApplicationUpdateInput = {
  name?: string | null;
  organization?: OrganizationWhereUniqueInput | null;
};
