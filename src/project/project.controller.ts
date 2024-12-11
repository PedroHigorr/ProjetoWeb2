import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { validarDadosAtualizados, validarDadosProjeto } from './database/validator/project.validator';
import { ProjectService } from './project.service';
import { validadorNome, ValidarID } from 'src/user/database/validator/user.crud.validator';

@Controller('project')
export class ProjectController {
    constructor(private readonly project: ProjectService){}

    @Get()
    async retornarProjetos(@Query() query: ValidarID){
    
        const { id } = query

        const retornarDados = await this.project.lerProjeto(id);

        return retornarDados;
    }

    @Get("find")
    async retornaPorNome(@Query() query: validadorNome){
       
        const {name} =  query;

        const dados = await this.project.findByName(name)

        return dados
    }

    @Post()
    async cadProjeto(@Body() body: validarDadosProjeto){
        
        console.log('passando em POST project')

        console.log(body)

        const cad = await this.project.criarProjeto(body)

        return cad;
    }

    @Put(':name')
    async attProjeto(@Param() param: validadorNome, @Body() body: validarDadosAtualizados){
        
        const { name } = param;

        const { nameAtt, description, link, language, userId } = body

        const att = await this.project.atualizarProjeto(name, nameAtt, description, link, language, userId);

        return att;
    }

    @Delete(':name')
    async deletarProjeto(@Param() param: validadorNome, @Body() body: ValidarID){
        
        const { name } = param
        const userId = body.id

        const del = await this.project.delProjeto(name, userId)

        return {message: `Deletado com sucesso! ${del}`}

    }

    
}
