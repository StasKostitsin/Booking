import { Controller, Get } from '@nestjs/common';
import { AdminService } from "./Admin.service";

@Controller()
export class AdminController{

    constructor(private adminService: AdminService){}

    @Get('admin')
    getAll(){
        return this.adminService.getUsers();
    }

   
}