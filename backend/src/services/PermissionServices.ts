export default class PermissionService {
  isHost(userId: string, hostId: string) {
    return userId === hostId;
  }

  canKick(
    userId: string,
    hostId: string
  ) {
    return this.isHost(userId, hostId);
  }

  canPromote(
    userId: string,
    hostId: string
  ) {
    return this.isHost(userId, hostId);
  }
}
