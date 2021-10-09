import { ArgsType, Field } from "@nestjs/graphql";
import { OrganizationInvitationCreateInput } from "./OrganizationInvitationCreateInput";

@ArgsType()
class CreateOrganizationInvitationArgs {
  @Field(() => OrganizationInvitationCreateInput, { nullable: false })
  data!: OrganizationInvitationCreateInput;
}

export { CreateOrganizationInvitationArgs };
