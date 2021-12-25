import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { isProductionEnvironment } from './utils/environment';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      ignoreEnvFile: isProductionEnvironment,
      isGlobal: true,
    }),
    AuthModule,
    MailModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      // dialectOptions: true && {
      //   ssl: {
      //     require: true,
      //     rejectUnauthorized: false,
      //   },
      // },
      // ssl: true,
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
