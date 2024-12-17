import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DirectionsService } from '../maps/directions/directions.service';
import * as kafkaLib from '@confluentinc/kafka-javascript';
export declare class RoutesService {
    private prismaService;
    private directionsService;
    private kafkaProducer;
    constructor(prismaService: PrismaService, directionsService: DirectionsService, kafkaProducer: kafkaLib.KafkaJS.Producer);
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
    remove(id: number): string;
}
