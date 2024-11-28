import { BadRequestException, Injectable } from "@nestjs/common";
import { CadastroUsuario, DadosUsuario } from "../database/user.dto";
import { UsuarioDto } from "../database/user.dto";
import { PrismaService } from "src/shared/prisma.instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


@Injectable()
export class CrudUsuario implements UsuarioDto {
    constructor( private readonly prisma: PrismaService){}

    async criarUsuario(dados: CadastroUsuario){
        try{
    
            const {name, email, tel} = dados
            
            const cadastrar = await this.prisma.user.create({
                data: { 
                    name,
                    email, 
                    tel
                }
            })

            return cadastrar;

        }catch ( err ){
            
            if(err instanceof PrismaClientKnownRequestError ){
                
                console.log("Erro ocorrido durante a execução: ", err.code, err.meta)
                
                throw err
            }

            console.log("Erro ocorrido: ", err)

            throw new BadRequestException

        }
    }
    
    async lerDados(dados: DadosUsuario){}

    async atualizarDados(dados: CadastroUsuario){}

    async deletarUsuario(id: number){}

}