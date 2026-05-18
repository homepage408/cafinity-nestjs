import { Controller, Get, Param, Post, Query, Body, Delete } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CreateCafeDto } from './dto/create-cafe.dto';

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
    async create(@Body() createCafeDto: CreateCafeDto) {
        return await this.cafeService.create(createCafeDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.cafeService.delete(Number(id));
    }
}
