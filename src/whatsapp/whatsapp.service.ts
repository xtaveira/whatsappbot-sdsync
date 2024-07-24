import { Injectable, OnModuleInit } from '@nestjs/common';
import { create, Whatsapp, Message } from 'venom-bot';

@Injectable()
export class WhatsAppService implements OnModuleInit {
  private client: Whatsapp;
  private qrCode: string;

  async onModuleInit() {

    this.client = await create('session-name', undefined, (base64Qrimg, asciiQR, attempts) => {
      console.log('Number of attempts to read the qrcode: ', attempts);
      console.log('Terminal qrcode: ', asciiQR);
      this.qrCode = base64Qrimg;
    });
    

    console.log(`
      qr informations::

      ${JSON.stringify(await this.client.getQrCode())}
      `)

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

    getQRCode(): string {
      return this.qrCode
    }

  async sendMessage(to: string, message: string): Promise<void> {
    await this.client.sendText(to, message);
  }
}
