import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SecurityStrategies } from 'src/constants/security-strategies';
import { ApiKeyGuard } from 'src/utilities/security/guards/api-key.guard';
import { ApiKeyStrategy } from 'src/utilities/security/strategies/api-key-strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: SecurityStrategies.ApiKey }),
  ],
  providers: [ApiKeyGuard, ApiKeyStrategy],
})
export class AuthModule {}
