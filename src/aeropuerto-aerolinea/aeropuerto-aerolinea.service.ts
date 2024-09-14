import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class AeropuertoAerolineaService {
  constructor(
    @InjectRepository(AeropuertoEntity)
    private readonly aeropuertoRepository: Repository<AeropuertoEntity>,

    @InjectRepository(AerolineaEntity)
    private readonly aerolineaRepository: Repository<AerolineaEntity>,
  ) {}

  async addAirportToAriline(
    aerolineaId: string,
    aeropuertoId: string,
  ): Promise<AerolineaEntity> {
    const aeropuerto = await this.aeropuertoRepository.findOne({
      where: { id: aeropuertoId },
    });
    if (!aeropuerto) {
      throw new BusinessLogicException(
        'The airport with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }

    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });
    if (!aerolinea) {
      throw new BusinessLogicException(
        'The airline with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }

    aerolinea.aeropuertos = [...aerolinea.aeropuertos, aeropuerto];
    return await this.aerolineaRepository.save(aerolinea);
  }

  async findAirportsFromAirline(
    aerolineaId: string,
  ): Promise<AeropuertoEntity[]> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });
    if (!aerolinea) {
      throw new BusinessLogicException(
        'The airline with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return aerolinea.aeropuertos;
  }

  async findAirportFromAirline(
    aerolineaId: string,
    aeropuertoId: string,
  ): Promise<AeropuertoEntity> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });
    if (!aerolinea) {
      throw new BusinessLogicException(
        'The airline with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }

    const aeropuerto = aerolinea.aeropuertos.find((a) => a.id === aeropuertoId);
    if (!aeropuerto) {
      throw new BusinessLogicException(
        'The airport with the given id is not associated with the airline',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return aeropuerto;
  }

  async updateAirportsFromAirline(
    aerolineaId: string,
    aeropuertos: AeropuertoEntity[],
  ): Promise<AerolineaEntity> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });
    if (!aerolinea) {
      throw new BusinessLogicException(
        'The airline with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }

    for (const aeropuerto of aeropuertos) {
      const aeropuertoExistente = await this.aeropuertoRepository.findOne({
        where: { id: aeropuerto.id },
      });
      if (!aeropuertoExistente) {
        throw new BusinessLogicException(
          'One of the airports with the given id was not found',
          BusinessError.NOT_FOUND,
        );
      }
    }

    aerolinea.aeropuertos = aeropuertos;
    return await this.aerolineaRepository.save(aerolinea);
  }

  async deleteAirportFromAirline(
    aerolineaId: string,
    aeropuertoId: string,
  ): Promise<void> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });
    if (!aerolinea) {
      throw new BusinessLogicException(
        'The airline with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }

    const aeropuerto = aerolinea.aeropuertos.find((a) => a.id === aeropuertoId);
    if (!aeropuerto) {
      throw new BusinessLogicException(
        'The airport with the given id is not associated with the airline',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    aerolinea.aeropuertos = aerolinea.aeropuertos.filter(
      (a) => a.id !== aeropuertoId,
    );
    await this.aerolineaRepository.save(aerolinea);
  }
}
