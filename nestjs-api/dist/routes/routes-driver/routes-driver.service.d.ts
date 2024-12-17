import { PrismaService } from 'src/prisma/prisma.service';
import { RoutesDriverGateway } from './routes-driver.gateway';
export declare class RoutesDriverService {
    private prismaService;
    private routesGateway;
    constructor(prismaService: PrismaService, routesGateway: RoutesDriverGateway);
    processRoute(dto: {
        route_id: string;
        lat: number;
        lng: number;
    }): Promise<{
        route: {
            name: string;
            directions: import("@prisma/client/runtime/library").JsonValue;
            freight: number | null;
            id: string;
            distance: number;
            duration: number;
            created_at: Date;
            updated_at: Date;
            source: {
                name: string;
            } & {
                location: {
                    lat: number;
                    lng: number;
                };
            };
            destination: {
                name: string;
            } & {
                location: {
                    lat: number;
                    lng: number;
                };
            };
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        route_id: string;
        points: ({
            created_at: Date;
        } & {
            location: {
                lat: number;
                lng: number;
            };
        })[];
    }>;
}
