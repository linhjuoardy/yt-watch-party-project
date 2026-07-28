"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PermissionService {
    isHost(userId, hostId) {
        return userId === hostId;
    }
    canKick(userId, hostId) {
        return this.isHost(userId, hostId);
    }
    canPromote(userId, hostId) {
        return this.isHost(userId, hostId);
    }
}
exports.default = PermissionService;
