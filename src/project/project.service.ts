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

    async atualizarProjeto(id: number, name:string, description: string, link: string, language: string, userId: number){

        const atualizar = await this.project.atualizarDados(id, name, description, link, language, userId)

        return atualizar
    }

    async delProjeto(id: number){
        
        const del = await this.project.deletarProjeto(id)

        return del
    }

    async delByUser(id: number){

        const del = await this.project.deletarPorIdUser(id)

        return del;
    }
}
