"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaContext = void 0;
class KafkaContext {
    constructor(message, messageValue, topic, partition, consumer) {
        this.message = message;
        this.messageValue = messageValue;
        this.topic = topic;
        this.partition = partition;
        this.consumer = consumer;
    }
}
exports.KafkaContext = KafkaContext;
//# sourceMappingURL=kafka-context.js.map