import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma.instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ProjectDto, CadastroProjeto } from "../database/project.dto";


@Injectable()
export class ProjectCrud implements ProjectDto {
    constructor( private readonly prisma: PrismaService){}
 
   async criarProjeto(dados: CadastroProjeto){
        try {
            const { name, description, link, language, userId } = dados

            const criarProjeto = await this.prisma.project.create({
                data:{
                    name,
                    description,
                    link,
                    language,
                    userId
                }
            })

            return criarProjeto;

        } catch (error) {
            
            if(error instanceof PrismaClientKnownRequestError){
                
                console.log("Ocorreu um erro durante a execução do prisma: ", error.code, error.meta);

                throw new BadRequestException('Algum erro ocorreu ao criar o projeto. ')
            }

            console.log('Um erro desconhecido ocorreu: ', error)

            throw new BadRequestException('Um erro desconhecido ocorreu. ')
        }
    }

   async lerDados(id: number){
        try {
            
            const ler = await this.prisma.project.findUnique({
                
                where:{id}

            })


            return ler
        } catch (error) {
            
            if(error.code === 'P2025'){

                console.log('Usuário não encontrado: ', error.code, error.meta)
    
                throw new NotFoundException('Projeto não encontrado, impossível retornar dados do projeto.')
    
            }else if(error instanceof PrismaClientKnownRequestError){
                
                console.log("Ocorreu um erro durante a execução do prisma: ", error.code, error.meta);

                throw new BadRequestException('Algum erro ocorreu ao buscar por projetos.')
            }

            console.log('Um erro desconhecido ocorreu: ', error)

            throw new BadRequestException('Um erro desconhecido ocorreu. ')
        }
    }

   async atualizarDados(id: number, name: string, description: string, link: string, language: string, userId: number){
    try {
        
        //essa interação com o banco retorna um json com os dados que foram retornados.
        const att = await this.prisma.project.update({
            where:{ id },
            data:{
                name,
                description,
                link,
                language, 
                userId
            }
        })


        return att

    } catch (error) {
    
        //já explicado, mas um condicional "se o erro, for um erro conhecido pelo prisma então..."
        if(error.code === 'P2025'){

            console.log('Usuário não encontrado: ', error.code, error.meta)

            throw new NotFoundException('Usário não encontrado, impossível atualizar projeto.')

        }else if(error instanceof PrismaClientKnownRequestError){
                
            console.log("Ocorreu um erro durante a execução do prisma: ", error.code, error.meta);

            throw new BadRequestException('Algum erro ocorreu ao atualizar projeto.')
        }

        //caso o erro não seja conhecido.
        console.log('Um erro desconhecido ocorreu: ', error)

        throw new BadRequestException('Um erro desconhecido ocorreu. ')
    }
   }

   async deletarProjeto(id: number){
        try {
            
            const deletar = await this.prisma.project.delete({
                where:{id}
            })


        } catch (error) {
                
        //já explicado, mas um condicional "se o erro, for um erro conhecido pelo prisma então..."
        if(error.code === 'P2025'){

            console.log('Projeto não encontrado: ', error.code, error.meta)

            throw new NotFoundException('Projeto não encontrado, impossível deletar projeto.')
   
        }else if(error instanceof PrismaClientKnownRequestError){
                
            console.log("Ocorreu um erro durante a execução do prisma: ", error.code, error.meta);

            throw new BadRequestException('Algum erro ocorreu ao deletar um projeto.')
        }

        //caso o erro não seja conhecido.
        console.log('Um erro desconhecido ocorreu: ', error)

        throw new BadRequestException('Um erro desconhecido ocorreu. ')
        }
        
    }

    
}