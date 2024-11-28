import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from "class-validator";


export class ValidatorCadastro { 
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(70)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @Transform(({ value }) => value.startsWith('+55') ? value : `+55${value}`)
    @IsPhoneNumber('BR', { message: 'Número de telefone inválido para o Brasil' })
    tel: string
}