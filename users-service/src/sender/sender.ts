import { ISender } from "./interfaces/ISender";

const amqp = require('amqplib/callback_api');

export class Sender implements ISender {
    private channel;
    private quequeName = '';

    constructor(quequeName: string) {
        amqp.connect('amqp://localhost',(connectionError, connection) => {
            if (connectionError) throw connectionError;
            
            connection.createChannel((channelError, channel) => {
                if (channelError) throw channelError;

                this.quequeName = quequeName;
                this.channel = channel.assertQueue(quequeName);
            });
        });
    }

    public sendToQueue(message: string): void {
        this.channel.sendToQueue(this.quequeName, Buffer.from(message));
    }
}

