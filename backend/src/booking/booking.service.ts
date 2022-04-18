import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserDto } from "./dto/User.dto";
import { addUserDto } from "./dto/addUser.dto";
import { User } from "./booking.model"; 

@Injectable()
export class BookingService{
    constructor(@InjectModel(User) private userRepository: typeof User){}

    async adminReq(){
        const user = await this.userRepository.findAll({
            where: {
                reserve: true
            }
        });
        return user;      
    }

    async getAll(){
        const user = await this.userRepository.findAll({
            where: {
                reserve: false
            }
        });
        return user.length;
    }

    async getLimit(dto: addUserDto){
        const user = await this.userRepository.findAll({
            where: {
                name: dto.name
            }
        });
        return user.length;
    }


    async findName(dto: UserDto){
        const user = await this.userRepository.findOne({
            where: {
                name: dto.name
            }
        });
        return user;
    }

    async reserve(dto: addUserDto){

        const el = await this.findName(dto)
        if(el !== null) throw new HttpException('Пользователь с таким именем уже существует', HttpStatus.NOT_FOUND);
        
        const lim = await this.getAll()
        if(lim < dto.limit) throw new HttpException('Недостаточно мест', HttpStatus.NOT_FOUND);
        
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


    async unReserve(dto: addUserDto){

        const el = await this.findName(dto)
        if(el === null) throw new HttpException('Пользователя с таким именем не существует', HttpStatus.NOT_FOUND);
        
        const lim = await this.getLimit(dto)
        if(lim < dto.limit) throw new HttpException(`Число забронированных мест ${lim}`, HttpStatus.NOT_FOUND);


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

    
}