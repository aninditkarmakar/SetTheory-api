import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/prisma';

// The IPrismaClientProviderToken is used for dependency injection
export const IPrismaClientProviderToken = 'IPrismaClientProvider';
export interface IPrismaClientProvider {
  getPrismaClient(): PrismaClient;
}

@Injectable()
export class PrismaClientService implements IPrismaClientProvider {
  private readonly prismaClient: PrismaClient;

  public constructor() {
    this.prismaClient = new PrismaClient();
  }

  public getPrismaClient(): PrismaClient {
    return this.prismaClient;
  }
}
