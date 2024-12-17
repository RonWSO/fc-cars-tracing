import * as kafkaLib from '@confluentinc/kafka-javascript';
export declare class KafkaContext {
    readonly message: kafkaLib.KafkaJS.Message;
    readonly messageValue: any;
    readonly topic: string;
    readonly partition: number;
    readonly consumer: kafkaLib.KafkaJS.Consumer;
    constructor(message: kafkaLib.KafkaJS.Message, messageValue: any, topic: string, partition: number, consumer: kafkaLib.KafkaJS.Consumer);
}
