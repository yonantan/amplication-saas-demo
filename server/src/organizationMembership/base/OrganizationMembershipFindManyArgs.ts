import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { OrganizationMembershipWhereInput } from "./OrganizationMembershipWhereInput";
import { Type } from "class-transformer";
import { OrganizationMembershipOrderByInput } from "./OrganizationMembershipOrderByInput";

@ArgsType()
class OrganizationMembershipFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => OrganizationMembershipWhereInput,
  })
  @Field(() => OrganizationMembershipWhereInput, { nullable: true })
  @Type(() => OrganizationMembershipWhereInput)
  where?: OrganizationMembershipWhereInput;

  @ApiProperty({
    required: false,
    type: OrganizationMembershipOrderByInput,
  })
  @Field(() => OrganizationMembershipOrderByInput, { nullable: true })
  @Type(() => OrganizationMembershipOrderByInput)
  orderBy?: OrganizationMembershipOrderByInput;

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

export { OrganizationMembershipFindManyArgs };
