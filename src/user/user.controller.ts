import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidarID, ValidatorCadastro } from './database/validator/user.crud.validator';

@Controller('user')
export class UserController {
    constructor(private readonly user: UserService){}

    @Post()
    async cadastrarUsuario(@Body() body: ValidatorCadastro) {

        const resultado = await this.user.cad(body)

        return resultado
    }

    @Get()
    async retornarDados(@Query() query: ValidarID){

        const { id } = query

        const restulado = await this.user.dadosDoUsuario(id)

        return restulado

    }

}
