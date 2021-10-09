import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
import { OrganizationWhereUniqueInput } from "../../organization/base/OrganizationWhereUniqueInput";
@InputType()
class OrganizationInvitationUpdateInput {
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  acceptedAt?: Date | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  emailSentAt?: Date | null;

  @ApiProperty({
    required: false,
    type: () => OrganizationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => OrganizationWhereUniqueInput)
  @IsOptional()
  @Field(() => OrganizationWhereUniqueInput, {
    nullable: true,
  })
  organization?: OrganizationWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  userEmail?: string;
}
export { OrganizationInvitationUpdateInput };
