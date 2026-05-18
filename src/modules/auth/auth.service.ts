import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordUtil } from '../../common/utils/password.utils';
import { TokenUtils } from '../../common/utils/token.utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: any) {
    // Implement registration logic here
    // cek apakah email sudah terdaftar
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashPassword = await PasswordUtil.hash(registerDto.password);

    const datas = await this.prisma.user.create({
      data: {
        fullName: registerDto.fullname,
        email: registerDto.email,
        password: hashPassword,
      },
    });

    return {
      id: datas.id,
      fullName: datas.fullName,
      email: datas.email,
    };
  }

  async login(email: string, password: string) {
    // Implement login logic here
    // cari dulu user berdasarkan email
    console.log('Attempting to find user with email:', email);
    const userExisting = await this.prisma.user.findUnique({
      where: { email },
    });

    // jika user tidak ditemukan, return error
    if (!userExisting) {
      throw new ConflictException('Email not registered');
    }

    // jika user ditemukan, cek password
    const passwordHash = userExisting.password;
    const isPasswordValid = await PasswordUtil.compare(password, passwordHash);

    // jika password salah, return error
    if (!isPasswordValid) {
      throw new ConflictException('Invalid password');
    }

    // jika password benar, generate access token dan refresh token
    const accessToken = TokenUtils.generateAccessToken(this.jwtService, {
      sub: userExisting.id,
      uuid: userExisting.userId,
      email: userExisting.email,
      role: userExisting.platformRole,
    });
    const refreshToken = TokenUtils.generateRefreshToken(this.jwtService, {
      sub: userExisting.id,
      uuid: userExisting.userId,
      email: userExisting.email,
      role: userExisting.platformRole,
    });

    // return access token dan refresh token
    return {
      data: {},
      meta: {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: {
          uuid: userExisting.userId,
          fullname: userExisting.fullName,
          email: userExisting.email,
        },
      },
    };
  }
}
