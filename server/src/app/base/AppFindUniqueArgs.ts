import { ArgsType, Field } from "@nestjs/graphql";
import { AppWhereUniqueInput } from "./AppWhereUniqueInput";

@ArgsType()
class AppFindUniqueArgs {
  @Field(() => AppWhereUniqueInput, { nullable: false })
  where!: AppWhereUniqueInput;
}

export { AppFindUniqueArgs };
