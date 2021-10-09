import { SortOrder } from "../../util/SortOrder";

export type AppOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  name?: SortOrder;
  organizationId?: SortOrder;
  updatedAt?: SortOrder;
};
