import { Module } from '@nestjs/common';
import { MedicService } from './medic-service';
import { MedicController } from './medic-controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MedicController],
  providers: [MedicService],
})
export class MedicModule {}
