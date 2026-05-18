import { Injectable } from '@nestjs/common';
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

    // async create() {
    //     return await this.prisma.cafe.create({
    //         data: {
    //             name: "Cafe ABC",
    //             city: "Jakarta",
    //             address: "Jl. Sudirman No. 123",
    //         },
    //     });
    // }        

}
