import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: []
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
  .apply(AuthMiddleware)
  .forRoutes({ path: '/auth/register', method: RequestMethod.POST }
   
  );
}
}
