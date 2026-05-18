import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CafeService } from './cafe.service';

@Controller('cafes')
export class CafeController {
    constructor(private cafeService: CafeService) { }


    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('city') city?: string) {
        return await this.cafeService.findAll(limit, page, city);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const response = await this.cafeService.findOne(Number(id));
        return response;
    }

    @Get(":id/menus")
    async findMenus(@Param('id') id: string) {
        return await this.cafeService.findMenus(Number(id));
    }

    @Post()
    async create() {
        // return await this.cafeService.create();
    }
}
