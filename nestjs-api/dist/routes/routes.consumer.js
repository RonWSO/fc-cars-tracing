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
var RoutesConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesConsumer = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const kafka_context_1 = require("../kafka/kafka-context");
const routes_service_1 = require("./routes.service");
let RoutesConsumer = RoutesConsumer_1 = class RoutesConsumer {
    constructor(routeService) {
        this.routeService = routeService;
        this.logger = new common_1.Logger(RoutesConsumer_1.name);
    }
    async updateFreight(payload) {
        this.logger.log(`Receiving message from topic ${payload.topic}`, payload.messageValue);
        const { route_id, amount } = payload.messageValue;
        await this.routeService.update(route_id, { freight: amount });
    }
};
exports.RoutesConsumer = RoutesConsumer;
__decorate([
    (0, microservices_1.MessagePattern)('freight'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kafka_context_1.KafkaContext]),
    __metadata("design:returntype", Promise)
], RoutesConsumer.prototype, "updateFreight", null);
exports.RoutesConsumer = RoutesConsumer = RoutesConsumer_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [routes_service_1.RoutesService])
], RoutesConsumer);
//# sourceMappingURL=routes.consumer.js.map