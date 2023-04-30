import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as CONSTANTS from '../../constants/classValidation';
export class CreateCategoryDto {
  @ApiProperty({ required: true })
  @IsString({ message: CONSTANTS.TITLE_MESSAGE_REQUIRED })
  @IsNotEmpty({ message: CONSTANTS.TITLE_MESSAGE_NOT_EMPTY })
  title: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean({ message: CONSTANTS.PUBLISHED_MESSAGE })
  @IsOptional()
  published?: boolean = false;
}
