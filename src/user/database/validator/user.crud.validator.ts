import { Transform, Type } from "class-transformer";
import { IsEmail, IsIn, IsInt, IsNotEmpty, IsPhoneNumber, MaxLength, Min, MinLength } from "class-validator";


export class ValidatorCadastro { 
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(40)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @Transform(({ value }) => value.startsWith('+55') ? value : `+55${value}`)
    @IsPhoneNumber('BR', { message: 'Número de telefone inválido para o Brasil' })
    tel: string
}

export class ValidarID{
    @IsNotEmpty()
    @Type(() => Number) //tudo que chega via URL é uma STRING, isso aqui já realiza a conversão de string para INT, ou number no caso
    @IsInt()
    @Min(1)
    id: number
}