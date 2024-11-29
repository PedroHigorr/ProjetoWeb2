import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CadastroUsuario, DadosUsuario } from "../database/user.dto";
import { UsuarioDto } from "../database/user.dto";
import { PrismaService } from "src/shared/prisma.instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


@Injectable()
export class CrudUsuario implements UsuarioDto {
    constructor( private readonly prisma: PrismaService){}

    async criarUsuario( dados: CadastroUsuario ){
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
    
    async lerDados( id: number ){
        try{

            const retornaDadosDeUsuario = await this.prisma.user.findUnique({
                //consulta SQL, SELECT * FROM USER WHERE ID = ID;
                where:{
                    id // isso é igual fazer >> id_do_usuario_no_banco: id_recebido_por_parametro
                }, // se atente à vírgula 

                // caso queira escolher os dados que deverão ser retornados, podemos usar um select, após a vírgula:
                // Mas omitir o select é o mesmo que dizer para o prisma retornar todos os dados

                // select: {
                //     id: true,
                //     name: true,
                //     email: true,
                //     tel: true,
                //     createdAt: true, 
                // },
            })

            if(!retornaDadosDeUsuario){
                throw new NotFoundException('Erro ao buscar por usuário')
            }

            return retornaDadosDeUsuario;

        }catch(err){

            if( err instanceof PrismaClientKnownRequestError ){
                console.log( "Erro ocorrido no prisma: ", err.code, err.meta )

                throw new BadRequestException('Um erro ocorreu durante a execução do processo. ');
            }

            console.log('Erro não listado: ', err)

            throw new BadRequestException('Erro desconhecido.')

        }
    }

    async atualizarDados( id: number, name: string, email:string, tel: string ){
        try {
            
            const update = await this.prisma.user.update({
                where:{
                    id
                }, 
                data: {
                    name, 
                    email,
                    tel
                }
            })

            if(!update){
                throw new NotFoundException('Não foi possível concluir ação. ')
            }

            return update

        } catch (error) {

            if(error instanceof PrismaClientKnownRequestError){

                console.log('Erro durante a comunicação com o prisma: ', error.code, error.meta)

                throw new BadRequestException('Erro ao tentar executar ação.')
            }

            console.log('Erro ocorrido: ', error)

            throw new BadRequestException('Um erro desconhecido ocorreu.')
        }
    
    }

    async deletarUsuario(id: number){
        try {
            
            const deletarUsuario = await this.prisma.user.delete({
                where:{
                    id
                }
            })

            if (!deletarUsuario) {
                throw new NotFoundException('Usuário não encontrado');
            }
    

            return deletarUsuario;

        } catch (err) {

            if (err instanceof PrismaClientKnownRequestError) {

                console.log('Erro do Prisma: ', err.code, err.meta);
                throw new BadRequestException('Erro ao tentar deletar o usuário');
            }
    
            console.log('Erro desconhecido: ', err);
            throw new BadRequestException('Erro desconhecido.');
        }
    }

}