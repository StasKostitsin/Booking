import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { User } from "./admin.model"; 

@Module({
    controllers: [AdminController],
    providers: [AdminService],
    imports: [
      SequelizeModule.forFeature([User])
    ]
})

export class AdminModule {}