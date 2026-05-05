import { ApiProperty } from "@nestjs/swagger";
import { AnimalImageDto } from "./animal-image.dto";

export class AnimalImageListDto {

  @ApiProperty({ type: [AnimalImageDto] })
  data!: AnimalImageDto[];

}