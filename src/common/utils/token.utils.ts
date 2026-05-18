import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from '../interface/jwt-payload.interface';

export class TokenUtils {
  static generateAccessToken(
    jwtService: JwtService,
    payload: JwtPayloadInterface,
  ): string {
    return jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET!,
      expiresIn: '15m',
    });
  }

  static generateRefreshToken(
    jwtService: JwtService,
    payload: JwtPayloadInterface,
  ): string {
    return jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET!,
      expiresIn: '7d',
    });
  }

  static verifyAccessToken(jwtService: JwtService, token: string): any {
    return jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  static verifyRefreshToken(jwtService: JwtService, token: string): any {
    return jwtService.verify(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
