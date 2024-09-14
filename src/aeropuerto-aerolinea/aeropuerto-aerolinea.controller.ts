import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AeropuertoAerolineaService } from './aeropuerto-aerolinea.service';
import { plainToInstance } from 'class-transformer';
import { AeropuertoEntity } from 'src/aeropuerto/aeropuerto.entity';
import { AeropuertoDto } from 'src/aeropuerto/aeropuerto.dto/aeropuerto.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('aeropuerto-aerolinea')
@UseInterceptors(BusinessErrorsInterceptor)
export class AeropuertoAerolineaController {
  constructor(
    private readonly aeropuertoAerolineaService: AeropuertoAerolineaService,
  ) {}

  @Post(':aerolineaId/aeropuerto/:aeropuertoId')
  async addAirportToAirline(
    @Param('aerolineaId') aerolineaId: string,
    @Param('aeropuertoId') aeropuertoId: string,
  ) {
    return await this.aeropuertoAerolineaService.addAirportToAriline(
      aerolineaId,
      aeropuertoId,
    );
  }

  @Get(':aerolineaId/aeropuerto')
  async findAirportsFromAirline(@Param('aerolineaId') aerolineaId: string) {
    return await this.aeropuertoAerolineaService.findAirportsFromAirline(
      aerolineaId,
    );
  }

  @Get(':aerolineaId/aeropuerto/:aeropuertoId')
  async findAirportFromAirline(
    @Param('aerolineaId') aerolineaId: string,
    @Param('aeropuertoId') aeropuertoId: string,
  ) {
    return await this.aeropuertoAerolineaService.findAirportFromAirline(
      aerolineaId,
      aeropuertoId,
    );
  }

  @Put(':aerolineaId/aeropuerto')
  async updateAirportsFromAirline(
    @Param('aerolineaId') aerolineaId: string,
    @Body() aeropuertosDto: AeropuertoDto[],
  ) {
    const aeropuertos = plainToInstance(AeropuertoEntity, aeropuertosDto);
    return await this.aeropuertoAerolineaService.updateAirportsFromAirline(
      aerolineaId,
      aeropuertos,
    );
  }

  @Delete(':aerolineaId/aeropuerto/:aeropuertoId')
  @HttpCode(204)
  async deleteAirportFromAirline(
    @Param('aerolineaId') aerolineaId: string,
    @Param('aeropuertoId') aeropuertoId: string,
  ) {
    return await this.aeropuertoAerolineaService.deleteAirportFromAirline(
      aerolineaId,
      aeropuertoId,
    );
  }
}
