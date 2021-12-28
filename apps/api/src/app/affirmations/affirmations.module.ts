import { Module } from '@nestjs/common';
import { AffirmationsService } from './affirmations.service';
import { AffirmationsController } from './affirmations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Affirmation } from './models/affirmation.model';

@Module({
  imports: [SequelizeModule.forFeature([Affirmation])],
  controllers: [AffirmationsController],
  providers: [AffirmationsService],
})
export class AffirmationsModule {}
