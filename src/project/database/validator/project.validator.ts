import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsUrl, MaxLength, MinLength } from "class-validator";

export class validarDadosProjeto{
    
    @IsNotEmpty({message: "O nome deve ser definido!"})
    @MinLength( 2, {message: "O nome deve conter ao menos 2 caracteres. "})
    @MaxLength(50, {message: "O nome não deve exceder 50 caracteres. "})
    name: string

    @MaxLength( 200, {message: "A descrição não deve conter mais de 200 caracteres"})
    description: string

    @IsNotEmpty({message: "Um link para o projeto é necessário"})
    @IsUrl({ protocols: ['http', 'https'] }, {message: "URL Inválida, somente são aceitos url's com protocolos http/https"})
    link: string

    @IsNotEmpty({message: "O nome da linguagem de programação utilizada no projeto deve ser fornecido."})
    language:string

    @IsNotEmpty({message: "Usário não informado"})
    @Type(() => Number)
    @IsInt()
    userId: number
}

export class validarDadosAtualizados{
    
    @IsNotEmpty({message: "O nome deve ser definido!"})
    @MinLength( 2, {message: "O nome deve conter ao menos 2 caracteres. "})
    @MaxLength(50, {message: "O nome não deve exceder 50 caracteres. "})
    nameAtt: string

    @MaxLength( 200, {message: "A descrição não deve conter mais de 200 caracteres"})
    description: string

    @IsNotEmpty({message: "Um link para o projeto é necessário"})
    @IsUrl({ protocols: ['http', 'https'] }, {message: "URL Inválida, somente são aceitos url's com protocolos http/https"})
    link: string

    @IsNotEmpty({message: "O nome da linguagem de programação utilizada no projeto deve ser fornecido."})
    language:string

    @IsNotEmpty({message: "Usário não informado"})
    @Type(() => Number)
    @IsInt()
    userId: number
}

