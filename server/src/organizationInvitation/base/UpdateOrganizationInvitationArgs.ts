import { ArgsType, Field } from "@nestjs/graphql";
import { OrganizationInvitationWhereUniqueInput } from "./OrganizationInvitationWhereUniqueInput";
import { OrganizationInvitationUpdateInput } from "./OrganizationInvitationUpdateInput";

@ArgsType()
class UpdateOrganizationInvitationArgs {
  @Field(() => OrganizationInvitationWhereUniqueInput, { nullable: false })
  where!: OrganizationInvitationWhereUniqueInput;
  @Field(() => OrganizationInvitationUpdateInput, { nullable: false })
  data!: OrganizationInvitationUpdateInput;
}

export { UpdateOrganizationInvitationArgs };
