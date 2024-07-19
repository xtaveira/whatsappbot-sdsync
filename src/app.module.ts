import { Module } from '@nestjs/common';
import { WhatsAppModule } from './whatsapp/whatsapp.module';
import { AppController } from './app.controller';

@Module({
  imports: [WhatsAppModule],
  controllers: [AppController],
})
export class AppModule {}
