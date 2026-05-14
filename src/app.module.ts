import { Module } from '@nestjs/common';
import { CafeModule } from './modules/cafe/cafe.module';
import { PrismaModule } from './modules/prisma/prisma.module';


@Module({
  imports: [CafeModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
