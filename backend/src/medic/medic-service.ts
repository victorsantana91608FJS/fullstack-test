import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMedicDTO } from '../solicitacoes/dto/create-solicitacao';

@Injectable()
export class MedicService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMedicDTO) {
    try {
      return await this.prisma.medic.create({
        data: {
          name: dto.nameMedic,
          crm: dto.crmMedic,
          specialty: dto.specialty,
        },
      });
    } catch (e: any) {
      if (e?.code === 'P2002') {
        throw new ConflictException('Já existe médico cadastrado com esse CRM.');
      }
      throw e;
    }
  }

  async findAll() {
    return this.prisma.medic.findMany({
      orderBy: { id: 'desc' },
    });
  }
}
