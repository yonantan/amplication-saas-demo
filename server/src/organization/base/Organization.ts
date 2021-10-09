import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { App } from "../../app/base/App";
import { ValidateNested, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
import { OrganizationInvitation } from "../../organizationInvitation/base/OrganizationInvitation";
import { OrganizationMembership } from "../../organizationMembership/base/OrganizationMembership";
import { User } from "../../user/base/User";
@ObjectType()
class Organization {
  @ApiProperty({
    required: false,
    type: () => [App],
  })
  @ValidateNested()
  @Type(() => App)
  @IsOptional()
  apps?: Array<App>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: () => [OrganizationInvitation],
  })
  @ValidateNested()
  @Type(() => OrganizationInvitation)
  @IsOptional()
  organizationInvitations?: Array<OrganizationInvitation>;

  @ApiProperty({
    required: false,
    type: () => [OrganizationMembership],
  })
  @ValidateNested()
  @Type(() => OrganizationMembership)
  @IsOptional()
  organizationMemberships?: Array<OrganizationMembership>;

  @ApiProperty({
    required: true,
    type: () => User,
  })
  @ValidateNested()
  @Type(() => User)
  owner?: User;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Organization };
