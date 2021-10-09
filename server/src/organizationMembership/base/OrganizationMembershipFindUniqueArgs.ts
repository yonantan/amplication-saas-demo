import { ArgsType, Field } from "@nestjs/graphql";
import { OrganizationMembershipWhereUniqueInput } from "./OrganizationMembershipWhereUniqueInput";

@ArgsType()
class OrganizationMembershipFindUniqueArgs {
  @Field(() => OrganizationMembershipWhereUniqueInput, { nullable: false })
  where!: OrganizationMembershipWhereUniqueInput;
}

export { OrganizationMembershipFindUniqueArgs };
