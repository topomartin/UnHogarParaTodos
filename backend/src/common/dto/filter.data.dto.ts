import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class FilterDataDto {
  @ApiProperty({ required: false })
  @IsObject()
  filter: any = {};

    @ApiProperty({ required: false })
  @IsObject()
  order: object = {};

  @ApiProperty({ required: false })
  @IsNumber()
  skip: number = 0;

  @ApiProperty({ required: false })
  @IsNumber()
  take: number = 2;

}
