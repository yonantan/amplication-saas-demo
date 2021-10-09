import { ArgsType, Field } from "@nestjs/graphql";
import { OrganizationMembershipWhereUniqueInput } from "./OrganizationMembershipWhereUniqueInput";
import { OrganizationMembershipUpdateInput } from "./OrganizationMembershipUpdateInput";

@ArgsType()
class UpdateOrganizationMembershipArgs {
  @Field(() => OrganizationMembershipWhereUniqueInput, { nullable: false })
  where!: OrganizationMembershipWhereUniqueInput;
  @Field(() => OrganizationMembershipUpdateInput, { nullable: false })
  data!: OrganizationMembershipUpdateInput;
}

export { UpdateOrganizationMembershipArgs };
