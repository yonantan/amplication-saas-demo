import { ArgsType, Field } from "@nestjs/graphql";
import { OrganizationInvitationWhereUniqueInput } from "./OrganizationInvitationWhereUniqueInput";

@ArgsType()
class DeleteOrganizationInvitationArgs {
  @Field(() => OrganizationInvitationWhereUniqueInput, { nullable: false })
  where!: OrganizationInvitationWhereUniqueInput;
}

export { DeleteOrganizationInvitationArgs };
