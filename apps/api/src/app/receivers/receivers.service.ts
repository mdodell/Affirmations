import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Affirmation } from '../affirmations/models/affirmation.model';
import { User } from '../users/user.model';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { Receiver } from './models/receiver.model';

@Injectable()
export class ReceiversService {
  constructor(
    @InjectModel(Receiver) private receiverModel: typeof Receiver,
    private jwtService: JwtService
  ) {}
  create(createReceiverDto: CreateReceiverDto, user: User) {
    return this.receiverModel.create({
      ...createReceiverDto,
      subscriptionToken: this.jwtService.sign(createReceiverDto),
      userId: user.id,
    });
  }

  async updateSubscriptionToken(receiver: Receiver): Promise<Receiver> {
    const updatedReceiver = await this.receiverModel.update(
      {
        subscriptionToken: this.jwtService.sign({
          email: receiver.email,
          firstName: receiver.firstName,
          lastName: receiver.lastName,
        }),
      },
      {
        where: {
          id: receiver.id,
        },
        returning: true,
      }
    );

    return updatedReceiver[1][0];
  }

  find(id: number) {
    return this.receiverModel.findOne({
      where: {
        id,
      },
    });
  }

  findAll() {
    return this.receiverModel.findAll({
      include: [Affirmation, User],
      where: {
        subscribed: true,
      },
    });
  }

  findAllUserReceivers(user: User) {
    return this.receiverModel.findAll({
      where: {
        userId: user.id,
      },
    });
  }

  update(id: number, updateReceiverDto: UpdateReceiverDto, user: User) {
    return this.receiverModel.update(updateReceiverDto, {
      where: {
        id,
        userId: user.id,
      },
      returning: true,
    });
  }

  remove(id: number, user: User) {
    return this.receiverModel.destroy({
      where: {
        id,
        userId: user.id,
      },
    });
  }

  async updateSubscriptionStatus(
    token: string,
    subscriptionStatus: boolean
  ): Promise<Receiver> {
    const receiver = await this.receiverModel.update(
      {
        subscribed: subscriptionStatus,
      },
      {
        where: {
          subscriptionToken: token,
        },
        returning: true,
      }
    );
    return receiver[1][0];
  }
}
