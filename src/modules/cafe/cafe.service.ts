import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { paginate, paginationResponse } from '../../common/utils/pagination.utils';


@Injectable()
export class CafeService {
    constructor(private prisma: PrismaService) { }

    async findAll(limit: number, page: number, city?: string) {
        const safePage = page < 1 ? 1 : page;
        const safeLimit = limit > 100 ? 100 : limit;
        const { skip, take } = paginate(safePage, safeLimit);

        const where = {
            city: city || undefined,
        }

        const [data, total] = await this.prisma.$transaction([
            this.prisma.cafe.findMany({
                skip,
                take,
                where,
            }),
            this.prisma.cafe.count({ where }),
        ]);

        return paginationResponse(data, total, page, limit);
    }


    async findOne(id: number) {
        const data = await this.prisma.cafe.findUnique({
            where: { id, deleted_at: null },
            include: {
                menus: {
                    where: { deleted_at: null },
                },
                cafeFacilities: {
                    where: { deleted_at: null },
                    include: {
                        facility: true,
                    },
                },
                cafeTags: {
                    where: { deleted_at: null },
                    include: {
                        tag: true,
                    },
                },
            }
        });

        if (!data) {
            throw new Error('Cafe not found');
        }

        const {
            cafeFacilities,
            cafeTags,
            ...rest
        } = data;

        const dataMapping = {
            ...rest,

            facilities:
                cafeFacilities?.map(
                    (cf) => cf.facility,
                ) || [],

            tags:
                cafeTags?.map(
                    (ct) => ct.tag,
                ) || [],
        };


        return dataMapping;
    }

    async findMenus(cafeId: number) {
        return await this.prisma.menu.findMany({
            where: { cafe_id: cafeId, deleted_at: null },
        });
    }

    async create(createCafeDto: any) {

        const existingCafe = await this.prisma.cafe.findFirst({
            where: {
                name: {
                    equals: createCafeDto.name,
                    mode: 'insensitive',
                },
                city: {
                    equals: createCafeDto.city,
                    mode: 'insensitive',
                },
                deleted_at: null,
            },
        });

        if (existingCafe) {
            throw new ConflictException('Cafe already exists');
        }

        const { phone_number, ...rest } = createCafeDto;
        const inputData = {
            ...rest,
            phone: phone_number,
        };

        const data = await this.prisma.cafe.create({
            data: inputData,
        });

        return {};
    }

    async delete(id: number) {
        const existingCafe = await this.prisma.cafe.findUnique({
            where: { id, deleted_at: null },
        });

        if (!existingCafe) {
            throw new Error('Cafe not found');
        }

        await this.prisma.cafe.update({
            where: { id },
            data: { deleted_at: new Date() },
        });

        return {
            
        };
    }

}
