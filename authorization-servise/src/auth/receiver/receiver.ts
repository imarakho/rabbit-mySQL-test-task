import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constants";
import { IReceiver } from "./interfaces/IReceiver";

const amqp = require('amqplib/callback_api');

export class Receiver implements IReceiver {
    private channel;
    
    constructor(
        private quequeName: string,
        private jwtService: JwtService,
    ) {}

    public connect(): void {
            amqp.connect('amqp://localhost', (connectionError, connection) => {
                if (connectionError) throw connectionError;
            
                connection.createChannel((channelError, channel) => {
                    if (channelError) throw channelError;

                    this.channel = channel.assertQueue(this.quequeName);

                    this.channel.consume(this.quequeName, async (message) => {
                        const authorisationHeader = JSON.parse(message.content.toString());
                        const token = authorisationHeader.authorization.split(' ')[1];
                        try {
                            this.jwtService.verify(token, jwtConstants);
                            this.channel.sendToQueue(this.quequeName, Buffer.from(String(true)));
                        } catch (error) {
                            this.channel.sendToQueue(this.quequeName, Buffer.from(String(error)));
                        }
                    })
                });
            });
        }
}