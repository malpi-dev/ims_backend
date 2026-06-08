"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftDeleteInterceptor = void 0;
const common_1 = require("@nestjs/common");
let SoftDeleteInterceptor = class SoftDeleteInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        if (request?.query && request.query.includeDeleted === undefined) {
            request.query.includeDeleted = 'false';
        }
        return next.handle();
    }
};
exports.SoftDeleteInterceptor = SoftDeleteInterceptor;
exports.SoftDeleteInterceptor = SoftDeleteInterceptor = __decorate([
    (0, common_1.Injectable)()
], SoftDeleteInterceptor);
//# sourceMappingURL=soft-delete.interceptor.js.map