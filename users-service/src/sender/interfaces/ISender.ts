export interface ISender {
    sendToQueue(message: string): void;
}