import { ArgsType, Field } from "@nestjs/graphql";
import { AppWhereUniqueInput } from "./AppWhereUniqueInput";
import { AppUpdateInput } from "./AppUpdateInput";

@ArgsType()
class UpdateAppArgs {
  @Field(() => AppWhereUniqueInput, { nullable: false })
  where!: AppWhereUniqueInput;
  @Field(() => AppUpdateInput, { nullable: false })
  data!: AppUpdateInput;
}

export { UpdateAppArgs };
