import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import prisma from '@prisma/client'; 

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prismaClient = prisma; 

  async onModuleInit() {
    
    console.log('Prisma ready');
  }

  async onModuleDestroy() {
    console.log('Prisma shutting down');
  }

  get client() {
    return this.prismaClient;
  }
}
