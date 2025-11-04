import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.client.user.findMany();
  }

  findOne(id: number) {
    return this.prismaService.client.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prismaService.client.user.findUnique({ where: { email } });
  }

  create(data: { email: string; name?: string; passwordHash?: string | null }) {
    return this.prismaService.client.user.create({ data });
  }

  update(id: number, data: { email?: string; name?: string }) {
    return this.prismaService.client.user.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prismaService.client.user.delete({ where: { id } });
  }
}


