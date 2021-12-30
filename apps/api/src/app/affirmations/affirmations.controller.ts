import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/user.model';
import { AffirmationsService } from './affirmations.service';
import { CreateAffirmationDto } from './dto/create-affirmation.dto';
import { UpdateAffirmationDto } from './dto/update-affirmation.dto';

@Controller('affirmations')
export class AffirmationsController {
  constructor(private affirmationsService: AffirmationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createAffirmationDto: CreateAffirmationDto) {
    return this.affirmationsService.create({
      userId: req.user.id,
      ...createAffirmationDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const { id } = req.user as User;
    return this.affirmationsService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAffirmationDto: UpdateAffirmationDto,
    @Request() req
  ) {
    return this.affirmationsService.update(+id, updateAffirmationDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.affirmationsService.remove(+id, req);
  }
}
