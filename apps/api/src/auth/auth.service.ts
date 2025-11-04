import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  private hashPassword(password: string, salt?: string) {
    const usedSalt = salt || randomBytes(16).toString('hex');
    const hash = scryptSync(password, usedSalt, 64).toString('hex');
    return `${usedSalt}:${hash}`;
  }

  private verifyPassword(password: string, passwordHash: string) {
    const [salt, key] = passwordHash.split(':');
    const hashBuffer = Buffer.from(key, 'hex');
    const derived = scryptSync(password, salt, 64);
    return timingSafeEqual(derived, hashBuffer);
  }

  async register(email: string, password: string, name?: string) {
    const existing = await this.prisma.client.user.findUnique({ where: { email } });
    if (existing) throw new UnauthorizedException('Email already in use');
    const passwordHash = this.hashPassword(password);
    const user = await this.prisma.client.user.create({ data: { email, name, passwordHash } });
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.client.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) throw new UnauthorizedException('Invalid credentials');
    const ok = this.verifyPassword(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email, super: user.isSuperAdmin };
    const token = await this.jwtService.signAsync(payload);
    await this.prisma.client.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    return { accessToken: token, user };
  }

  async requestPasswordReset(email: string) {
    const user = await this.prisma.client.user.findUnique({ where: { email } });
    if (!user) return true;
    const token = randomBytes(24).toString('hex');
    const exp = new Date(Date.now() + 1000 * 60 * 30);
    await this.prisma.client.user.update({ where: { id: user.id }, data: { passwordResetToken: token, passwordResetExp: exp } });
    // In real app, send email with token
    return true;
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.client.user.findFirst({ where: { passwordResetToken: token } });
    if (!user || !user.passwordResetExp || user.passwordResetExp < new Date()) throw new UnauthorizedException('Invalid token');
    const passwordHash = this.hashPassword(newPassword);
    await this.prisma.client.user.update({
      where: { id: user.id },
      data: { passwordHash, passwordResetToken: null, passwordResetExp: null },
    });
    return true;
  }
}


