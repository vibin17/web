import { IsMobilePhone, IsString, Length } from "class-validator";

export class SignUpUserDto {
    @Length(3, 20, { message: 'Не меньше 4 и не больше 16' })
    @IsString({ message: 'Должно быть строкой' })
    readonly userName: string;
    @IsMobilePhone('ru-RU', { message: 'Должно быть номером телефона российского формата' })
    readonly phoneNumber: string;
    @IsString({ message: 'Должно быть строкой' })
    @Length(6, 16, { message: 'Не меньше 4 и не больше 16' })
    readonly password: string;
}

export class SignInUserDto {
    readonly userName: string;
    readonly password: string;
}
