import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';

import { isProductionEnvironment } from './utils/environment';
import { AffirmationsModule } from './affirmations/affirmations.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
      exclude: ['/api*'],
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      ignoreEnvFile: isProductionEnvironment,
      isGlobal: true,
    }),
    AuthModule,
    AffirmationsModule,
    MailModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      dialectOptions: isProductionEnvironment && {
        ssl: {
          require: isProductionEnvironment,
          rejectUnauthorized: false,
        },
      },
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
