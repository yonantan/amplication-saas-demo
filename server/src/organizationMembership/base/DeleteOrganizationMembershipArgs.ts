import { ArgsType, Field } from "@nestjs/graphql";
import { OrganizationMembershipWhereUniqueInput } from "./OrganizationMembershipWhereUniqueInput";

@ArgsType()
class DeleteOrganizationMembershipArgs {
  @Field(() => OrganizationMembershipWhereUniqueInput, { nullable: false })
  where!: OrganizationMembershipWhereUniqueInput;
}

export { DeleteOrganizationMembershipArgs };
