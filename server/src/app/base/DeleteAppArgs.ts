import { ArgsType, Field } from "@nestjs/graphql";
import { AppWhereUniqueInput } from "./AppWhereUniqueInput";

@ArgsType()
class DeleteAppArgs {
  @Field(() => AppWhereUniqueInput, { nullable: false })
  where!: AppWhereUniqueInput;
}

export { DeleteAppArgs };
