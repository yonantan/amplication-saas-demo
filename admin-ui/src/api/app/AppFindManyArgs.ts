import { AppWhereInput } from "./AppWhereInput";
import { AppOrderByInput } from "./AppOrderByInput";

export type AppFindManyArgs = {
  where?: AppWhereInput;
  orderBy?: AppOrderByInput;
  skip?: number;
  take?: number;
};
