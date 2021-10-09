import { ArgsType, Field } from "@nestjs/graphql";
import { AppCreateInput } from "./AppCreateInput";

@ArgsType()
class CreateAppArgs {
  @Field(() => AppCreateInput, { nullable: false })
  data!: AppCreateInput;
}

export { CreateAppArgs };
