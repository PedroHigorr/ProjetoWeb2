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
    
    async lerDados(id: number){
        try{

            const retornaDadosDeUsuario = await this.prisma.user.findMany({
                //consulta SQL, SELECT * FROM USER WHERE ID = ID;
                where:{
                    id // isso é igual fazer >> id_do_usuario_no_banco: id_recebido_por_parametro
                }, // se atente à vírgula 
                select: { } // o select sem nenhum dado, é o mesmo que dizer para o prisma retornar todos od dados
            })

            return retornaDadosDeUsuario;

        }catch(err){

            if( err instanceof PrismaClientKnownRequestError ){
                console.log( "Erro ocorrido no prisma: ", err.code, err.meta )

                throw err;
            }

            throw new BadRequestException('Algum erro ocorreu durante a execução de buscar dados')

        }
    }

    async atualizarDados(dados: CadastroUsuario){
        
    }

    async deletarUsuario(id: number){}

}