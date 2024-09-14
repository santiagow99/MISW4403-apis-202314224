import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';
import { AerolineaService } from './aerolinea.service';
import { AerolineaController } from './aerolinea.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AerolineaEntity])],
  controllers: [AerolineaController],
  providers: [AerolineaService],
  exports: [AerolineaService],
})
export class AerolineaModule {}
