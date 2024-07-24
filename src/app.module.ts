import { Module } from '@nestjs/common';
import { WhatsAppModule } from './whatsapp/whatsapp.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    WhatsAppModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
