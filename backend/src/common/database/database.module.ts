import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

const databaseConfig = require(join(process.cwd(), 'config', 'database.config'));

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: databaseConfig.synchronize,
      logging: databaseConfig.logging,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}