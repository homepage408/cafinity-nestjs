import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class CafeService {
    constructor( private prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.cafe.findMany();
    }
}
