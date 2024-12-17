import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RoutesDriverService } from './routes-driver/routes-driver.service';
export declare class RoutesController {
    private readonly routesService;
    private routesDriverService;
    constructor(routesService: RoutesService, routesDriverService: RoutesDriverService);
    create(createRouteDto: CreateRouteDto): Promise<{
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
    }>;
    processRoute(id: string, payload: {
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
    startRoute(id: string): Promise<void>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__RouteClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateRouteDto: UpdateRouteDto): import(".prisma/client").Prisma.Prisma__RouteClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): string;
}
