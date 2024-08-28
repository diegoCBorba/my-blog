import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Isso torna o PrismaModule global, então você não precisa importá-lo em cada módulo
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
