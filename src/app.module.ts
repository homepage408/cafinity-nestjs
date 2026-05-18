import { Module } from '@nestjs/common';
import { CafeModule } from './modules/cafe/cafe.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';


@Module({
  imports: [CafeModule, PrismaModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
