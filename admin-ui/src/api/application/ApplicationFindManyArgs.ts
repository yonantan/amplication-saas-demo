import { ApplicationWhereInput } from "./ApplicationWhereInput";
import { ApplicationOrderByInput } from "./ApplicationOrderByInput";

export type ApplicationFindManyArgs = {
  where?: ApplicationWhereInput;
  orderBy?: ApplicationOrderByInput;
  skip?: number;
  take?: number;
};
