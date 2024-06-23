import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/configuration';
import {AuthModule} from "./modules/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => appConfig],
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: 'mongodb://0.0.0.0:27017/chat-db',
        retryAttempts: 0,
        retryDelay: 1,
      }),
      inject: [ConfigService],
    }),
      AuthModule
  ],
})
export class AppModule {}