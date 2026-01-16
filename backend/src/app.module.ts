import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultModule } from './consult/consult.module';
import { MedicModule } from './medic/medic-module';

@Module({
  imports: [ConsultModule, MedicModule],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
