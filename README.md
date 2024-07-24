# WhatsApp Bot API

\```
This is a WhatsApp bot API built with NestJS and `venom-bot`. The API allows sending messages to specific phone numbers via WhatsApp.
\```

## Installation

1. Clone the repository:
   \```
   git clone https://github.com/your-username/whatsapp-bot.git
   cd whatsapp-bot
   \```

2. Install dependencies:
   \```
   npm install
   \```

## Configuration

Create a configuration file `src/config/whatsapp.config.ts` to store specific settings for `venom-bot`:

   \```typescript
   export const whatsappConfig = {
     // Specific configurations if needed
   };
   \```

## Running the Application

Start the application:

   \```
   npm run start
   \```

The application will run on `http://localhost:3000`.

## Usage

### Send a Message

To send a message, make a `POST` request to the `/whatsapp/send` endpoint with the following JSON body:

   \```json
   {
     "to": "1234567890",
     "message":
     "Hello, this is a test message!"
   }
   \```

### Example using cURL

   \```
   curl -X POST http://localhost:3000/whatsapp/send -H "Content-Type: application/json" -d '{"to": "1234567890", "message": "Hello, this is a test message!"}'
   \```

## Project Structure

   \```plaintext
   src/
   |-- app.module.ts
   |-- main.ts
   |-- whatsapp/
   |   |-- whatsapp.module.ts
   |   |-- whatsapp.service.ts
   |   |-- whatsapp.controller.ts
   |-- config/
   |   |-- whatsapp.config.ts
   \```

## WhatsApp Service (`whatsapp.service.ts`)

   \```typescript
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
         `;
         console.log(messageReceived);
       });
     }

     async sendMessage(to: string, message: string): Promise<void> {
       await this.client.sendText(to, message);
     }
   }
   \```

## WhatsApp Controller (`whatsapp.controller.ts`)

   \```typescript
   import { Controller, Post, Body } from '@nestjs.common';
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
   \```
