import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertoEntity } from './aeropuerto.entity';
import { AeropuertoService } from './aeropuerto.service';
import { AeropuertoController } from './aeropuerto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AeropuertoEntity])],
  controllers: [AeropuertoController],
  providers: [AeropuertoService],
  exports: [AeropuertoService],
})
export class AeropuertoModule {}
