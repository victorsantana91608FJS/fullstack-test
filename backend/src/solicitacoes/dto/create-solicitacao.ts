import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMedicDTO {
  @IsString()
  @IsNotEmpty()
  nameMedic!: string;

  @IsString()
  @IsNotEmpty()
  crmMedic!: string;

  @IsString()
  @IsNotEmpty()
  specialty!: string;
    
}

export class CreateConsultDto {
    @IsInt()
    @Min(1)
    idMedic!: number;

    @IsString()
    @IsNotEmpty()
    pacient!: string;

  @Matches(
    /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}\s([01]\d|2[0-3]):[0-5]\d$/,
    { message: 'Use o formato DD/MM/AAAA HH:mm' }
  )
    dataHoraConsulta!: string;

}