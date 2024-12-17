import { KafkaContext } from '../../kafka/kafka-context';
import { HttpService } from '@nestjs/axios';
export declare class RoutesDriverConsumer {
    private httpService;
    private logger;
    constructor(httpService: HttpService);
    driverMoved(payload: KafkaContext): Promise<void>;
}
