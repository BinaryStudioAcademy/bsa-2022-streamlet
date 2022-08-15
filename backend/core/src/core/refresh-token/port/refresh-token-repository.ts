export interface RefreshTokenRepository {
  createForUser(userId: string): Promise<string>;
  checkForExistence(userId: string, refreshToken: string): Promise<boolean>;
}
