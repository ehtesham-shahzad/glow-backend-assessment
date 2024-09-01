import { IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class ContactDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsPhoneNumber(undefined, {
    message:
      'Invalid phone number. Make sure to add your country code. Blank spaces, dashes, and parentheses are not allowed',
  })
  phone: string;
}
