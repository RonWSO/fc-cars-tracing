"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const kafka_server_1 = require("../kafka/kafka-server");
const config_1 = require("@nestjs/config");
const app_module_1 = require("../app.module");
async function bootstrap() {
    const appConfigContext = await core_1.NestFactory.createApplicationContext(config_1.ConfigModule);
    const configService = appConfigContext.get(config_1.ConfigService);
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        strategy: new kafka_server_1.KafkaServer({
            server: {
                'bootstrap.servers': configService.get('KAFKA_BROKER'),
            },
            consumer: {
                'group.id': 'nest-group',
                'client.id': `nest-group-${configService.get('HOSTNAME')}`,
                'max.poll.interval.ms': 10000,
                'session.timeout.ms': 10000,
            },
        }),
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=kafka.cmd.js.map