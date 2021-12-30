import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { MailService } from '../mail/mail.service';
import { Receiver } from '../receivers/models/receiver.model';
import { ReceiversService } from '../receivers/receivers.service';
import { User } from '../users/user.model';
import { CreateAffirmationDto } from './dto/create-affirmation.dto';
import { UpdateAffirmationDto } from './dto/update-affirmation.dto';
import { Affirmation } from './models/affirmation.model';

@Injectable()
export class AffirmationsService {
  constructor(
    @InjectModel(Affirmation) private affirmationModel: typeof Affirmation,
    private receiverService: ReceiversService,
    private mailService: MailService
  ) {}

  async create(createAffirmationDto: CreateAffirmationDto) {
    return this.affirmationModel.create(createAffirmationDto);
  }

  // Comment out to start cron job
  // @Cron('0 8 * * *', {
  //   name: 'Daily Affirmation',
  //   timeZone: 'America/New_York',
  // })
  async sendOutAffirmations() {
    const receivers = await this.receiverService.findAll();
    for (const receiver of receivers) {
      const { affirmations, user } = receiver;
      if (affirmations.length) {
        // Get a random affirmation
        const randomAffirmation =
          affirmations[Math.floor(Math.random() * (affirmations.length - 1))];

        // Send out the mail notification
        await this.mailService.sendAffirmation(
          receiver,
          randomAffirmation,
          user
        );
        // Delete the affirmation from the database
        await this.remove(randomAffirmation.id, user);
      }
    }
  }

  findAll(userId: string) {
    return this.affirmationModel.findAll({
      include: Receiver,
      where: {
        userId,
      },
    });
  }

  findOne(id: number, user: User) {
    return this.affirmationModel.findOne({ where: { id, userId: user.id } });
  }

  findAffirmationUser(id: number) {
    return this.affirmationModel.findOne({
      include: User,
      where: {
        id,
      },
    });
  }

  update(id: number, updateAffirmationDto: UpdateAffirmationDto, user: User) {
    return this.affirmationModel.update(updateAffirmationDto, {
      where: { id, userId: user.id },
      returning: true,
    });
  }

  remove(id: number, user: User) {
    return this.affirmationModel.destroy({
      where: {
        id,
        userId: user.id,
      },
    });
  }
}
