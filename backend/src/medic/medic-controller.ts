import { Body, Controller, Post, Get } from '@nestjs/common';
import { MedicService } from './medic-service';
import { CreateMedicDTO } from '../solicitacoes/dto/create-solicitacao';

@Controller('medics') //
export class MedicController {
  constructor(private readonly medicService: MedicService) {}

  @Post()
  create(@Body() dto: CreateMedicDTO) {
    return this.medicService.create(dto);
  }

  @Get()
  findAll() {
    return this.medicService.findAll();
  }
}