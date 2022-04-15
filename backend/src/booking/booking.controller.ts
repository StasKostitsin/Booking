import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { stringify } from 'querystring';
import { BookingService } from "./booking.service";
import { UserDto } from "./dto/User.dto";
import { addUserDto } from "./dto/addUser.dto";


@Controller()
export class BookingController{

    constructor(private bookingService: BookingService){}

    @Get()
    getAll(){
        return this.bookingService.countFree();
    }

    @Get('/add')
    reserve(@Query() dto: addUserDto){
        return this.bookingService.addReserve(dto);
    }

    @Get('/del')
    unReserve(@Query() dto: addUserDto){
        return this.bookingService.delReserve(dto);
    }

    @Post()
    createAll(@Body() dto: UserDto){
        return this.bookingService.createAllTickets(dto);
    }
}