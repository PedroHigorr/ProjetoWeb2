import { Transform, Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, MaxLength, Min, MinLength } from "class-validator";


export class ValidatorCadastro { 
    @IsNotEmpty({message: "O nome do usuario deve ser definido!"})
    @MinLength(1, {message: "O nome do usuario deve conter ao menos um caracter. "})
    @MaxLength( 100, {message: "O nome do usuario não deve exceder 100 caracteres."})
    name: string

    @IsNotEmpty({message: "O email não pode estar vazio."})
    @IsEmail({}, {message: "Email inválido!"})
    email: string

    @Transform(({ value }) => value.startsWith('+55') ? value : `+55${value}`)
    @IsPhoneNumber('BR', { message: 'Número de telefone inválido para o Brasil.' })
    tel: string
}

export class ValidarID{
    @IsNotEmpty({message: "Este campo não deve ser vazio."})
    @Type(() => Number) //tudo que chega via URL é uma STRING, isso aqui já realiza a conversão de string para INT, ou number no caso
    @IsInt({message: "O campo deve ser um número válido."})
    @Min(1, {message: "Impossível valores menores que 0. "})
    id: number
}

export class validarVerificador{
    
        @IsNotEmpty({message: "O nome do usuario deve ser definido!"})
        name: string
    
        @IsNotEmpty({message: "O email não pode estar vazio."})
        email: string
    
}
