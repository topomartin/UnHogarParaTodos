import { QueryFailedError } from 'typeorm';
import { BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';

export function handleMySQLError(error: QueryFailedError): never {
    const driverError = (error as any).driverError;

    switch (driverError?.errno) {
    case 1062: // ER_DUP_ENTRY
        throw new ConflictException( 'Duplicate entry: this user already has an adoption for this animal');

    case 1452: // FK invalid
        throw new BadRequestException(`${driverError?.sqlMessage}`);

    case 1048: // NOT NULL
        throw new BadRequestException(`${driverError?.sqlMessage}`);

    default:
        throw new InternalServerErrorException(`${driverError?.sqlMessage}` || 'Database error');
    }

}