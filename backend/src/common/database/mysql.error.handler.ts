import { QueryFailedError } from 'typeorm';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export function handleMySQLError(error: QueryFailedError): never {
    const driverError = (error as any).driverError;
    switch (driverError?.code) {
    case 'ER_DUP_ENTRY':
        throw new BadRequestException('Registro duplicado.');
    default:
        throw new InternalServerErrorException('Error en la base de datos.');
    }
}