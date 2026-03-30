import { QueryFailedError } from 'typeorm';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export function handleMySQLError(error: QueryFailedError): never {
    const driverError = (error as any).driverError;
    throw new BadRequestException(`${driverError?.sqlMessage}`);
}