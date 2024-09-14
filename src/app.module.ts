import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolineaEntity } from './aerolinea/aerolinea.entity';
import { AeropuertoEntity } from './aeropuerto/aeropuerto.entity';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertoAerolineaModule } from './aeropuerto-aerolinea/aeropuerto-aerolinea.module';

@Module({
  imports: [
    AerolineaModule,
    AeropuertoModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [AerolineaEntity, AeropuertoEntity],
      synchronize: true,
    }),
    AeropuertoAerolineaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
