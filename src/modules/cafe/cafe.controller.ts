import { Controller, Get } from '@nestjs/common';
import { CafeService } from './cafe.service';

@Controller('cafes')
export class CafeController {
    constructor(private cafeService: CafeService) { }


    @Get()
    async findAll() {
        let data = await this.cafeService.findAll();
        if (!data) {
            return {
                status: 'error',
                message: 'No cafes found',
            }
        }
        return {
            status: 'success',
            data: data,
        }
    }
}
