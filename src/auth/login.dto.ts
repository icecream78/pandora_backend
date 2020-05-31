import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Указанное при регистрации имя пользователя',
    maxLength: 10,
    minLength: 4,
    example: 'faker',
    maximum: 10,
  })
  login: string;

  @ApiProperty()
  password: string;
}
