import { Body, Controller, Post } from '@nestjs/common';
import { ConsultService } from './consult.service';
import { CreateConsultDto } from '../solicitacoes/dto/create-solicitacao';

@Controller('consults')
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}

  @Post()
  create(@Body() dto: CreateConsultDto) {
    return this.consultService.create(dto);
  }
}
