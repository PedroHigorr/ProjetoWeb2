import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.instance';

@Module({

    providers:[PrismaService],
    exports: [PrismaService]
})
export class SharedModule {}
