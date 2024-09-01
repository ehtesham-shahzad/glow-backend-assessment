import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Deal } from '../enums/deal.enum';
import { Industry } from '../enums/industry.enum';
import { ContactDto } from './contact.dto';

export class BusinessDto {
  @IsNumberString()
  @Length(9, 9, { message: `fein must be equal to 9 characters` })
  fein: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsEnum(Industry)
  @IsOptional()
  industry?: Industry;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactDto)
  contact?: ContactDto;

  @IsOptional()
  @IsEnum(Deal)
  deal?: Deal;
}
