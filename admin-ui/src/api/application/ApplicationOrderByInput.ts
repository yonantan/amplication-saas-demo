import { SortOrder } from "../../util/SortOrder";

export type ApplicationOrderByInput = {
  createdAt?: SortOrder;
  createdById?: SortOrder;
  id?: SortOrder;
  name?: SortOrder;
  organizationId?: SortOrder;
  updatedAt?: SortOrder;
};
