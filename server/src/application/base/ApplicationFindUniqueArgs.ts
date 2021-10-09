import { ArgsType, Field } from "@nestjs/graphql";
import { ApplicationWhereUniqueInput } from "./ApplicationWhereUniqueInput";

@ArgsType()
class ApplicationFindUniqueArgs {
  @Field(() => ApplicationWhereUniqueInput, { nullable: false })
  where!: ApplicationWhereUniqueInput;
}

export { ApplicationFindUniqueArgs };
