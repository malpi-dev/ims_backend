"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const app_controller_1 = require("./app.controller");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const soft_delete_interceptor_1 = require("./common/interceptors/soft-delete.interceptor");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const auth_module_1 = require("./modules/auth/auth.module");
const clients_module_1 = require("./modules/clients/clients.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const files_module_1 = require("./modules/files/files.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const tickets_module_1 = require("./modules/tickets/tickets.module");
const users_module_1 = require("./modules/users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: Number(process.env.THROTTLE_TTL),
                    limit: Number(process.env.THROTTLE_LIMIT),
                },
            ]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            clients_module_1.ClientsModule,
            inventory_module_1.InventoryModule,
            tickets_module_1.TicketsModule,
            files_module_1.FilesModule,
            dashboard_module_1.DashboardModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
            { provide: core_1.APP_FILTER, useClass: http_exception_filter_1.HttpExceptionFilter },
            { provide: core_1.APP_INTERCEPTOR, useClass: transform_interceptor_1.TransformInterceptor },
            { provide: core_1.APP_INTERCEPTOR, useClass: soft_delete_interceptor_1.SoftDeleteInterceptor },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map