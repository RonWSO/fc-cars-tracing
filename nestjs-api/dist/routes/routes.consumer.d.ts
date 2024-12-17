import { KafkaContext } from '../kafka/kafka-context';
import { RoutesService } from './routes.service';
export declare class RoutesConsumer {
    private routeService;
    private logger;
    constructor(routeService: RoutesService);
    updateFreight(payload: KafkaContext): Promise<void>;
}
