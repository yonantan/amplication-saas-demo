import { ArgsType, Field } from "@nestjs/graphql";
import { OrganizationInvitationWhereUniqueInput } from "./OrganizationInvitationWhereUniqueInput";

@ArgsType()
class OrganizationInvitationFindUniqueArgs {
  @Field(() => OrganizationInvitationWhereUniqueInput, { nullable: false })
  where!: OrganizationInvitationWhereUniqueInput;
}

export { OrganizationInvitationFindUniqueArgs };
