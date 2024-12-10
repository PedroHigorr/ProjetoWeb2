import { Injectable } from '@nestjs/common';
import { CadastroUsuario } from './database/user.dto';
import { CrudUsuario } from './repositories/user.crud';


@Injectable()
export class UserService {
    constructor(private readonly crud: CrudUsuario){}

    
    async cad(data: CadastroUsuario){
    
        const cadastrar = await this.crud.criarUsuario(data) // o data é um objeto

        return cadastrar;
    }

    async dadosDoUsuario(id: number){
        
        const dados = await this.crud.lerDados(id)

        return dados;
    }

    async attDados( id: number, name: string, email: string, tel: string){

        const atualizar = await this.crud.atualizarDados(id, name, email, tel)

        return atualizar
    }

    async deletarUsuario( id: number ){

        const deletar = await this.crud.deletarUsuario(id)
        
        return deletar;
    }

    async verificarUsuario(name: string, email:string){
        
        const dados = await this.crud.verificarUsuario(name, email);

        return dados
    }
}

