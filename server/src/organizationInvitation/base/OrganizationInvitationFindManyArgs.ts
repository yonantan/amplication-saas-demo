import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { OrganizationInvitationWhereInput } from "./OrganizationInvitationWhereInput";
import { Type } from "class-transformer";
import { OrganizationInvitationOrderByInput } from "./OrganizationInvitationOrderByInput";

@ArgsType()
class OrganizationInvitationFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => OrganizationInvitationWhereInput,
  })
  @Field(() => OrganizationInvitationWhereInput, { nullable: true })
  @Type(() => OrganizationInvitationWhereInput)
  where?: OrganizationInvitationWhereInput;

  @ApiProperty({
    required: false,
    type: OrganizationInvitationOrderByInput,
  })
  @Field(() => OrganizationInvitationOrderByInput, { nullable: true })
  @Type(() => OrganizationInvitationOrderByInput)
  orderBy?: OrganizationInvitationOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { OrganizationInvitationFindManyArgs };
