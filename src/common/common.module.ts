import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtModule,  } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
    
  ],
  exports: [PrismaClient, JwtModule],
})
export class CommonModule {}
