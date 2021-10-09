import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
import { OrganizationWhereUniqueInput } from "../../organization/base/OrganizationWhereUniqueInput";
@InputType()
class OrganizationInvitationCreateInput {
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
    required: true,
    type: () => OrganizationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => OrganizationWhereUniqueInput)
  @Field(() => OrganizationWhereUniqueInput)
  organization!: OrganizationWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  userEmail!: string;
}
export { OrganizationInvitationCreateInput };
