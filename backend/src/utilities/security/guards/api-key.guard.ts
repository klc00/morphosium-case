import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SecurityStrategies } from 'src/constants/security-strategies';

@Injectable()
export class ApiKeyGuard extends AuthGuard(SecurityStrategies.ApiKey) {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
