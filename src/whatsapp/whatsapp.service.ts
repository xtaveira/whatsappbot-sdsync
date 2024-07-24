import { Injectable, OnModuleInit } from '@nestjs/common';
import { create, Whatsapp, Message } from 'venom-bot';

@Injectable()
export class WhatsAppService implements OnModuleInit {
  private client: Whatsapp;
  private qrCode: string;

  async onModuleInit() {
    this.client = await create(
      'session', 
      (base64Qrimg, asciiQR, attempts, urlCode) => {
        console.log('Number of attempts to read the qrcode: ', attempts);
        console.log('Terminal qrcode: ', asciiQR);
        console.log('base64 image string qrcode: ', base64Qrimg);
        console.log('urlCode (data-ref): ', urlCode);
        this.qrCode = base64Qrimg;
      },
      (statusSession, session) => {
        console.log('Status Session: ', statusSession);
        console.log('Session name: ', session);
      },
      {
        headless: 'new',
        disableSpins: true,
        disableWelcome: true,
        autoClose: 0,
        logQR: false,
      }
    );

    console.log(`
      qr informations::
      ${JSON.stringify(await this.client.getQrCode())}
    `);

    this.client.onMessage((message: Message) => {
      console.log(`
        Message Received:
        From: ${message.sender.id}
        Name: ${message.sender.name}
        IsGroup: ${message.isGroupMsg}
        Text: ${message.body}
      `);
    });
  }

  getQRCode(): string {
    return this.qrCode;
  }

  async sendMessage(to: string, message: string): Promise<void> {
    await this.client.sendText(to, message);
  }
}
