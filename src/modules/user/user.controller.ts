import { Body, Controller, Get, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { UserEntity } from 'src/shared/db/entities/user.entity';
import { JwtAuthGuard } from 'src/shared/validation/guards/jwt-auth.guard';
import { LoginResponseDto } from '../auth/dto/login-response.dto';
import { BossWithUsersDto } from './dto/boss-with-users.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private userService: UserService
    ) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  async changeUsersBoss(@Req() req: Request, @Body() newBossInfo: UserUpdateDto): Promise<LoginResponseDto[]> {
    const result = await this.userService.updateUser(req.cookies.userInfo, newBossInfo);

    return plainToInstance(LoginResponseDto, result, {
      excludeExtraneousValues: true
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getSingleUserWithSubordinates(@Req() req: Request): Promise<BossWithUsersDto> {
    const result = await this.userService.getUserWithChilds(req.cookies.userInfo);

    return plainToInstance(BossWithUsersDto, result, {
      excludeExtraneousValues: true
    })
  }
}


// docker run --name habr-pg-13.3 -p 5432:5432 -e POSTGRES_PASSWORD=pgpwd4habr -d postgres:13.3