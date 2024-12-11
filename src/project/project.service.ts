import { Injectable } from '@nestjs/common';
import { CadastroProjeto } from './database/project.dto';
import { ProjectCrud } from './repositories/project.crud';

@Injectable()
export class ProjectService {
   constructor(private readonly project: ProjectCrud){}

    async criarProjeto(dados: CadastroProjeto){
        
        const criar = await this.project.criarProjeto(dados)

        return criar
    }

    async lerProjeto(id: number){
        
        const lerProj = await this.project.lerDados(id)

        return lerProj
    }

    async atualizarProjeto(name: string, nameAtt:string, description: string, link: string, language: string, userId: number){

        const atualizar = await this.project.atualizarDados(name, nameAtt, description, link, language, userId)

        return atualizar
    }

    async delProjeto(name: string, userId: number){
        
        const del = await this.project.deletarProjeto(name, userId)

        return del
    }

    async delByUser(id: number){

        const del = await this.project.deletarPorIdUser(id)

        return del;
    }

    async findByName(name: string){
       
        const find = await this.project.projetoPorNome(name)

        return find
    }
}
