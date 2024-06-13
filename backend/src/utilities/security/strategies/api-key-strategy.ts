import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { ConfigService } from '@nestjs/config';
import { SecurityStrategies } from 'src/constants/security-strategies';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  Strategy,
  SecurityStrategies.ApiKey,
) {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async validate(apiKey: string): Promise<boolean> {
    const validApiKey = await this.configService.get<string>('API_KEY');
    return apiKey === validApiKey;
  }
}
