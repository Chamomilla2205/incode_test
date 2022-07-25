import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/shared/db/entities/user.entity";
import { AuthController } from "./auth.controller";
import { Authservice } from "./auth.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController],
  providers: [Authservice],
  exports: []
})
export class AuthModule {}