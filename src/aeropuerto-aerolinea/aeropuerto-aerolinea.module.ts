import { Module } from '@nestjs/common';
import { AeropuertoAerolineaService } from './aeropuerto-aerolinea.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';
import { AeropuertoAerolineaController } from './aeropuerto-aerolinea.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AerolineaEntity, AeropuertoEntity])],
  providers: [AeropuertoAerolineaService],
  controllers: [AeropuertoAerolineaController],
})
export class AeropuertoAerolineaModule {}
