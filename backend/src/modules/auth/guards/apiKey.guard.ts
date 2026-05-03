import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { apiKeyConstants } from '../../../../config/constants.js';

@Injectable()
export class ApiKeyGuard implements CanActivate {

    private apiKey = apiKeyConstants.apiKey;

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        if (apiKey !== this.apiKey) {
            throw new UnauthorizedException('Invalid API Key');
        }

        return true;
    }
}