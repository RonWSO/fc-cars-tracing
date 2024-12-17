import { RoutesService } from '../routes.service';
import { Server } from 'socket.io';
export declare class RoutesDriverGateway {
    private routesService;
    server: Server;
    private logger;
    constructor(routesService: RoutesService);
    handleMessage(client: any, payload: any): Promise<void>;
    emitNewPoints(payload: {
        route_id: string;
        lat: number;
        lng: number;
    }): void;
}
