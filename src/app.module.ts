import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LightsModule } from './lights/lights.module';
import { ServicesModule } from './services/services.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    LightsModule,
    ServicesModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
