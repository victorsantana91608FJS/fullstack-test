import { Module } from '@nestjs/common';
import { ConsultService } from './consult.service';
import { ConsultController } from './consult.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ConsultController],
  providers: [ConsultService],
})
export class ConsultModule {}
