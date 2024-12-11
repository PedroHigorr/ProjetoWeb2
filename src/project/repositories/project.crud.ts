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

                console.log('Projeto não encontrado: ', error.code, error.meta)
    
                throw new NotFoundException('Projeto não encontrado, impossível retornar dados do projeto.')
    
            }else if(error instanceof PrismaClientKnownRequestError){
                
                console.log("Ocorreu um erro durante a execução do prisma: ", error.code, error.meta);

                throw new BadRequestException('Algum erro ocorreu ao buscar por projetos.')
            }

            console.log('Um erro desconhecido ocorreu: ', error)

            throw new BadRequestException('Um erro desconhecido ocorreu. ')
        }
    }

   async atualizarDados(name: string, nameAtt: string, description: string, link: string, language: string, userId: number){
    try {
        
        //essa interação com o banco retorna um json com os dados que foram retornados.
        const att = await this.prisma.project.update({
            where:{ name, userId },
            data:{
                name: nameAtt,
                description,
                link,
                language, 
            }
        })


        return att

    } catch (error) {
    
        //já explicado, mas um condicional "se o erro, for um erro conhecido pelo prisma então..."
        if(error.code === 'P2025'){

            console.log('Projeto não encontrado: ', error.code, error.meta)

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

   async deletarProjeto(name: string, userId: number){
        try {
            
            const deletar = await this.prisma.project.delete({
                where:{name, userId}
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

    async deletarPorIdUser(userId: number){
        
        try {
            
            const del =  await this.prisma.project.deleteMany({
                where:{
                    userId
                }
            })

        } catch (err) {
            
            if(err instanceof PrismaClientKnownRequestError){
                
                if(err.code === 'P2025'){

                    console.log('Nenhum projeto encontrado: ', err.code, err.meta)

                    throw new NotFoundException('Nenhum projeto encontrado, impossível deletar.')
                }

                console.log("Ocorreu um erro durante a execução do prisma: ", err.code, err.meta);

                throw new BadRequestException('Algum erro ocorreu ao deletar um projeto.')
            }

        console.log('Um erro desconhecido ocorreu: ', err)

        throw new BadRequestException('Um erro desconhecido ocorreu. ')
        }
        
    }

    async projetoPorNome(name: string ){
        try {

            const dados = await this.prisma.project.findUnique({
                where:{
                    name
                }
            })


            return dados

        } catch (err) {
            
            if(err.code === 'P2025'){

                console.log('Projeto não encontrado: ', err.code, err.meta)
    
                throw new NotFoundException('Projeto não encontrado, impossível retornar dados.')
    
            }else if(err instanceof PrismaClientKnownRequestError){
                
                console.log("Ocorreu um erro durante a execução do prisma: ", err.code, err.meta);

                throw new BadRequestException('Algum erro ocorreu ao buscar por projetos.')
            }

            console.log('Um erro desconhecido ocorreu: ', err)

            throw new BadRequestException('Um erro desconhecido ocorreu. ')
            
        }
    }
    
}