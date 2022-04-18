import { Controller, Get, Query} from '@nestjs/common';
import { stringify } from 'querystring';
import { BookingService } from "./booking.service";
import { addUserDto } from "./dto/addUser.dto";


@Controller()
export class BookingController{

    constructor(private bookingService: BookingService){}

    @Get()
    async getAll(){
        return this.bookingService.getAll();
    }

    @Get('/add')
    async reserve(@Query() dto: addUserDto){
        return this.bookingService.reserve(dto);
    }

    @Get('/del')
    async unReserve(@Query() dto: addUserDto){
        return this.bookingService.unReserve(dto);
    }

    @Get('/admin')
    async adminReq(){
        return this.bookingService.adminReq();
    }
}