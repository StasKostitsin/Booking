import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./admin.model"; 

@Injectable()
export class AdminService{
    constructor(@InjectModel(User) private userRepository: typeof User){}

    async getUsers(){
        const user = await this.userRepository.findAll({
            where: {
                reserve: true
            }
        });
        return user;
    }


   


}