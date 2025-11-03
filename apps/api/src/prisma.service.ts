import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prismaClient: PrismaClient;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: this.configService.get<string>('DATABASE_URL'),
        },
      },
    });
    await this.prismaClient.$connect();
  }

  async onModuleDestroy() {
    if (this.prismaClient) {
      await this.prismaClient.$disconnect();
    }
  }

  get client() {
    return this.prismaClient;
  }
}
