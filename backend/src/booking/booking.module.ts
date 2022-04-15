import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BookingService } from "./booking.service";
import { BookingController } from "./booking.controller";
import { User } from "./booking.model"; 

@Module({
    controllers: [BookingController],
    providers: [BookingService],
    imports: [
      SequelizeModule.forFeature([User])
    ]
})

export class BookingModule {}