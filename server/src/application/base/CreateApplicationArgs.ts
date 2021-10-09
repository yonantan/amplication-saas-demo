import { ArgsType, Field } from "@nestjs/graphql";
import { ApplicationCreateInput } from "./ApplicationCreateInput";

@ArgsType()
class CreateApplicationArgs {
  @Field(() => ApplicationCreateInput, { nullable: false })
  data!: ApplicationCreateInput;
}

export { CreateApplicationArgs };
