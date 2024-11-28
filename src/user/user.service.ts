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

}

