// auth-response.dto.ts
import { UserResponseDto } from './user-response.dto';

export class AuthResponseDto {
  access_token: string;
  user: UserResponseDto;
}
