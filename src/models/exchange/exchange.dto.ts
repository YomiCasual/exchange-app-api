import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class ExchangeDto {
  @IsString()
  currencyFrom: string;

  @IsNumber()
  amountFrom: string;

  @IsString()
  unitFrom: string;

  @IsString()
  currencyTo: string;

  @IsNumber()
  unitTo: string;

  @IsString()
  amountTo: string;

  @IsString()
  type: string;
}

export class EditExchangeDTO extends PartialType(ExchangeDto) {}
