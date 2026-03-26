import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from 'src/modules/user/entities/user.entity';

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
      entities: [User],
      synchronize: databaseConfig.synchronize,
      logging: databaseConfig.logging,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}