import { Controller, Post, Body } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post('send')
  async sendMessage(@Body() body: { to: string; message: string }) {
    const { to, message } = body;
    await this.whatsappService.sendMessage(to, message);
    return { status: 'Message sent' };
  }
}
