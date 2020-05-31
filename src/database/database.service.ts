import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private configServer: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: +this.configServer.get('MYSQL_PORT'),
      username: 'admin',
      password: 'pass',
      database: 'lights_db',
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
