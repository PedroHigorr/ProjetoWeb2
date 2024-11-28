import { Injectable } from '@nestjs/common';
import { UsuarioDto } from './database/user.dto';
import { CadastroUsuario, DadosUsuario } from './database/user.dto';import { PrismaClient } from '@prisma/client';


@Injectable()
export class UserService implements UsuarioDto {
   
    private prisma = new PrismaClient();

    criarUsuario(dados: CadastroUsuario){

        const variavel = 2
    }

    lerDados(dados: DadosUsuario){}

    atualizarDados(dados: CadastroUsuario){}

    deletarUsuario(id: number){}

}
