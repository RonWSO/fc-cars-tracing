"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaServer = void 0;
const microservices_1 = require("@nestjs/microservices");
const kafkaLib = require("@confluentinc/kafka-javascript");
const common_1 = require("@nestjs/common");
const kafka_context_1 = require("./kafka-context");
class KafkaServer extends microservices_1.Server {
    constructor(options) {
        super();
        this.options = options;
        this.logger = new common_1.Logger(KafkaServer.name);
    }
    async listen(callback) {
        this.kafkaInst = new kafkaLib.KafkaJS.Kafka(this.options.server);
        this.consumer = this.kafkaInst.consumer(this.options.consumer);
        await this.consumer.connect();
        await this.bindEvents();
        callback();
    }
    async bindEvents() {
        const registeredPatterns = [...this.messageHandlers.keys()];
        if (registeredPatterns.length > 0) {
            await this.consumer.subscribe({
                topics: registeredPatterns,
            });
        }
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const handler = this.getHandlerByPattern(topic);
                if (!handler) {
                    this.logger.error(`No handler for topic ${topic}`);
                    return;
                }
                const kafkaContext = new kafka_context_1.KafkaContext(message, JSON.parse(message.value.toString()), topic, partition, this.consumer);
                await handler(kafkaContext);
            },
        });
    }
    async close() {
        console.log('Closing Kafka connection');
        await this.consumer?.disconnect();
        this.consumer = null;
    }
}
exports.KafkaServer = KafkaServer;
//# sourceMappingURL=kafka-server.js.map