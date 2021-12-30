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
  Req,
} from '@nestjs/common';
import { ReceiversService } from './receivers.service';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MailService } from '../mail/mail.service';
import { ReceiverTokenGuard } from './receiverToken-auth.guard';

@Controller('receivers')
export class ReceiversController {
  constructor(
    private readonly receiversService: ReceiversService,
    private readonly mailService: MailService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createReceiverDto: CreateReceiverDto) {
    const receiver = await this.receiversService.create(
      createReceiverDto,
      req.user
    );
    this.mailService.sendAffirmationWelcomeMessage(receiver, req.user);
    return receiver;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllUserReceivers(@Request() req) {
    return this.receiversService.findAllUserReceivers(req.user);
  }

  @UseGuards(ReceiverTokenGuard)
  @Get('testing')
  testing(@Request() req) {
    console.log(req.query.token);
    return 'Worked';
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateReceiverDto: UpdateReceiverDto
  ) {
    return this.receiversService.update(+id, updateReceiverDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.receiversService.remove(+id, req.user);
  }
}
