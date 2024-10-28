"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEcho = exports.createEcho = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(8),
    email: zod_1.default.string().email(),
    name: zod_1.default.string(),
    phone: zod_1.default.string().optional(),
});
exports.signinInput = zod_1.default.object({
    username: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
});
exports.createEcho = zod_1.default.object({
    content: zod_1.default.string(),
    username: zod_1.default.string(),
});
exports.updateEcho = zod_1.default.object({
    content: zod_1.default.string(),
    username: zod_1.default.string(),
    id: zod_1.default.number(),
});
