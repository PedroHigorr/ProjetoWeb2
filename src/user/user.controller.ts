import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidarID, validarVerificador, ValidatorCadastro } from './database/validator/user.crud.validator';

@Controller('user')
export class UserController {
    constructor(private readonly user: UserService){}

    @Get('verify')
    async verificar(@Query() query: validarVerificador){

        const {name, email } = query

        console.log("passando pelo CONTROLLER de verificar usuario")
        console.log('Name: ',name, "\nEmail: ", email)

        const r = await this.user.verificarUsuario(name, email)

        console.log(r)
        
        return r
    }

    @Post()
    async cadastrarUsuario(@Body() body: ValidatorCadastro) {

        console.log("passando pelo cadastro!")

        const resultado = await this.user.cad(body)

        return resultado
    }

    @Get()
    async retornarDados(@Query() query: ValidarID ){

        console.log('passando pelo histórico')

        const { id } = query

        const restulado = await this.user.dadosDoUsuario(id)

        return restulado

    }

    @Put(":id")
    async atualizaDados(@Param() param: ValidarID, @Body() body: ValidatorCadastro){

        const { id } = param
        const { name, email, tel } = body

        console.log('passando pelo atualiza dados')

        const result = await this.user.attDados(id, name, email, tel)

        return result

    }

    @Delete(':id')
    async deletaDados(@Param() param: ValidarID ){
        
        console.log("Passando pelo deletar. ")
        

        const { id } = param
        
        const deletar = await this.user.deletarUsuario( id )

        return deletar;
    }
}
