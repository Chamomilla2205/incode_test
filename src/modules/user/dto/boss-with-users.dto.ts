import { Expose, Type } from "class-transformer";
import { IsAlpha, IsArray, ValidateNested } from "class-validator";
import { LoginResponseDto } from "src/modules/auth/dto/login-response.dto";
import { UserEntity } from "src/shared/db/entities/user.entity";
import { Roles } from "src/shared/enums/roles.enum";

export class BossWithUsersDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  role: Roles;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BossWithUsersDto)
  user: BossWithUsersDto
}