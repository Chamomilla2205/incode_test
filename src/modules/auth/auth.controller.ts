import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { Response } from "express";
import { Authservice } from "./auth.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RegistrationDto } from "./dto/registration.dto";

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Authservice)
    private authService: Authservice
    ) {}

  @Post('signup')
  async createUser(@Body() credentials: RegistrationDto, @Res({ passthrough: true }) res: Response): Promise<LoginResponseDto> {    
    const user = await this.authService.registerUser(credentials, res);

    return plainToInstance(LoginResponseDto, user, {
      excludeExtraneousValues: true,
    })
  }

  @Post('signin')
  async signIn(@Body() credentials: RegistrationDto, @Res({ passthrough: true }) res: Response): Promise<void> {
    return this.authService.login(credentials, res)
  }
}