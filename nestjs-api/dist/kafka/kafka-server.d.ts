import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import * as kafkaLib from '@confluentinc/kafka-javascript';
import { Logger } from '@nestjs/common';
export declare class KafkaServer extends Server implements CustomTransportStrategy {
    private readonly options;
    readonly logger: Logger;
    private kafkaInst;
    private consumer;
    constructor(options: {
        server: kafkaLib.KafkaJS.CommonConstructorConfig;
        consumer: kafkaLib.KafkaJS.ConsumerConstructorConfig;
    });
    listen(callback: () => void): Promise<void>;
    bindEvents(): Promise<void>;
    close(): Promise<void>;
}
