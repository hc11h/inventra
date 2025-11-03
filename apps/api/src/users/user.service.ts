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

  create(data: { email: string; name?: string }) {
    return this.prismaService.client.user.create({ data });
  }

  update(id: number, data: { email?: string; name?: string }) {
    return this.prismaService.client.user.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prismaService.client.user.delete({ where: { id } });
  }
}


