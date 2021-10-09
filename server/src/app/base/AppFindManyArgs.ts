import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { AppWhereInput } from "./AppWhereInput";
import { Type } from "class-transformer";
import { AppOrderByInput } from "./AppOrderByInput";

@ArgsType()
class AppFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => AppWhereInput,
  })
  @Field(() => AppWhereInput, { nullable: true })
  @Type(() => AppWhereInput)
  where?: AppWhereInput;

  @ApiProperty({
    required: false,
    type: AppOrderByInput,
  })
  @Field(() => AppOrderByInput, { nullable: true })
  @Type(() => AppOrderByInput)
  orderBy?: AppOrderByInput;

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

export { AppFindManyArgs };
