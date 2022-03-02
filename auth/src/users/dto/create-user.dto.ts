import {IsEmail, IsMobilePhone, IsString, Length, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @MinLength(3)
    @MaxLength(20)
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;
    @IsMobilePhone('ru-RU')
    readonly phoneNumber: string;
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;
}
