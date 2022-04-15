import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserDto } from "./dto/User.dto";
import { addUserDto } from "./dto/addUser.dto";
import { User } from "./booking.model"; 

@Injectable()
export class BookingService{
    constructor(@InjectModel(User) private userRepository: typeof User){}

    async countFree(){
        const user = await this.userRepository.findAll({
            where: {
                reserve: false
            }
        });
        return user.length;
    }


    async addReserve(dto: addUserDto){
        const num = await this.userRepository.findAll({
            where: {
                reserve: false
            },
            limit: dto.limit
        });
        const numStr = num.map(item => item.id);
        const user = await this.userRepository.update({ name: dto.name, reserve: true }, {
            where: {
                id: numStr 
            }
          });
        return user;
    }


    async delReserve(dto: addUserDto){
        const num = await this.userRepository.findAll({
            where: {
                name: dto.name,
                reserve: true
            },
            limit: dto.limit
        });
        const numStr = num.map(item => item.id);
        const user = await this.userRepository.update({ name: null, reserve: false }, {
            where: {
                id: numStr
            }
          });
        return user;
    }

    async deleteAllReserve(){
        const user = await this.userRepository.update({ name: null, reserve: false }, {
            where: {
                name: "stas"
            }
          });
        return user;
    }


    async createAllTickets(dto: UserDto ){
        const user = await this.userRepository.bulkCreate([dto]);
        return user;
    }


}