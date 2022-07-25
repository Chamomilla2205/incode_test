import { Expose } from "class-transformer";
import { Roles } from "src/shared/enums/roles.enum";

export class LoginResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  role: Roles;
}