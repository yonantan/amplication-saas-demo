import { ArgsType, Field } from "@nestjs/graphql";
import { OrganizationMembershipCreateInput } from "./OrganizationMembershipCreateInput";

@ArgsType()
class CreateOrganizationMembershipArgs {
  @Field(() => OrganizationMembershipCreateInput, { nullable: false })
  data!: OrganizationMembershipCreateInput;
}

export { CreateOrganizationMembershipArgs };
