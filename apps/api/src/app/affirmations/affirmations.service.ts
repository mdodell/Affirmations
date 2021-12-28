import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { CreateAffirmationDto } from './dto/create-affirmation.dto';
import { UpdateAffirmationDto } from './dto/update-affirmation.dto';
import { Affirmation } from './models/affirmation.model';

@Injectable()
export class AffirmationsService {
  constructor(
    @InjectModel(Affirmation) private affirmationModel: typeof Affirmation
  ) {}

  async create(createAffirmationDto: CreateAffirmationDto) {
    return this.affirmationModel.create(createAffirmationDto);
  }

  findAll(userId: number) {
    return this.affirmationModel.findAll({
      where: {
        userId,
      },
    });
  }

  findOne(id: number, user: User) {
    return this.affirmationModel.findOne({ where: { id, userId: user.id } });
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
