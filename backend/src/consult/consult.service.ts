import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateConsultDto } from '../solicitacoes/dto/create-solicitacao';
import { parseBRDateTime } from '../common/date';

@Injectable()
export class ConsultService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateConsultDto) {
        const medic = await this.prisma.medic.findUnique({
            where: { id: dto.idMedic }, 
            select: { id:true }
        });
        if (!medic) throw new NotFoundException('Médico não encontrado')
        let dataHora: Date;

        try {
            dataHora = parseBRDateTime(dto.dataHoraConsulta)
        } catch {
            throw new BadRequestException('dataHoraConsulta inválida. Use DD/MM/AAAA HH:mm')
        }
        return this.prisma.consult.create({
            data: {
                pacient: dto.pacient,
                dataHota: dataHora,
                medicId: dto.idMedic,
            },
            include: { medic: true },
        }
    )}
    async findAll() {
        return this.prisma.consult.findMany({
        orderBy: { id: 'desc' },
        include: { medic: true },
        });
    }

}
