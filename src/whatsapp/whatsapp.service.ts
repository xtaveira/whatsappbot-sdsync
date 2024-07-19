import { Injectable, OnModuleInit } from '@nestjs/common';
import { create, Whatsapp, Message } from 'venom-bot';

@Injectable()
export class WhatsAppService implements OnModuleInit {
  private client: Whatsapp;

  async onModuleInit() {
    this.client = await create({
      session:'main'
    });

    this.client.onMessage((message: Message) => {
      const messageReceived = `
      Message Received:
      From: ${message.sender.id}
      Name: ${message.sender.name}
      IsGroup: ${message.isGroupMsg}
      Text: ${message.body}
      `
      console.log(messageReceived);
    });
  }

  async sendMessage(to: string, message: string): Promise<void> {
    await this.client.sendText(to, message);
  }
}
