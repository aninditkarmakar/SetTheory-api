import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/prisma';

@Injectable()
export class PrismaClientProvider {
  private readonly prismaClient: PrismaClient;

  public constructor() {
    this.prismaClient = new PrismaClient();
  }

  public getPrismaClient(): PrismaClient {
    return this.prismaClient;
  }
}
