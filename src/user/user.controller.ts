import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidatorCadastro } from './database/validator/user.crud.validator';

@Controller('user')
export class UserController {
    constructor(private readonly user: UserService){}

    @Post()
    async cadastrarUsuario(@Body() body: ValidatorCadastro) {

        const resultado = await this.user.cad(body)

        return resultado
    }


}
