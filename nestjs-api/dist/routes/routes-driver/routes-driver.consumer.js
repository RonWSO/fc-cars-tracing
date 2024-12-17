"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RoutesDriverConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesDriverConsumer = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const kafka_context_1 = require("../../kafka/kafka-context");
const axios_1 = require("@nestjs/axios");
let RoutesDriverConsumer = RoutesDriverConsumer_1 = class RoutesDriverConsumer {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(RoutesDriverConsumer_1.name);
    }
    async driverMoved(payload) {
        this.logger.log(`Receiving message from topic ${payload.topic}`, payload.messageValue);
        const { route_id, lat, lng } = payload.messageValue;
        await this.httpService.axiosRef.post(`http://localhost:3000/routes/${route_id}/process-route`, {
            lat,
            lng,
        });
    }
};
exports.RoutesDriverConsumer = RoutesDriverConsumer;
__decorate([
    (0, microservices_1.MessagePattern)('simulation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kafka_context_1.KafkaContext]),
    __metadata("design:returntype", Promise)
], RoutesDriverConsumer.prototype, "driverMoved", null);
exports.RoutesDriverConsumer = RoutesDriverConsumer = RoutesDriverConsumer_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], RoutesDriverConsumer);
//# sourceMappingURL=routes-driver.consumer.js.map