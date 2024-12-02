import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { validarDadosProjeto } from './database/validator/project.validator';
import { ProjectService } from './project.service';
import { ValidarID } from 'src/user/database/validator/user.crud.validator';

@Controller('project')
export class ProjectController {
    constructor(private readonly project: ProjectService){}

    @Get()
    async retornarProjetos(@Query() query: ValidarID){
    
        const { id } = query

        const retornarDados = await this.project.lerProjeto(id);

        return retornarDados;
    }

    @Post()
    async cadProjeto(@Body() body: validarDadosProjeto){
        
        console.log(body)

        const cad = await this.project.criarProjeto(body)

        return cad;
    }

    @Put(':id')
    async attProjeto(@Param() param: ValidarID, @Body() body: validarDadosProjeto){
        
        const { id } = param;

        const { name, description, link, language, userId } = body

        const att = await this.project.atualizarProjeto(id, name, description, link, language, userId);

        return att;
    }

    @Delete(':id')
    async deletarProjeto(@Param() param: ValidarID){
        
        const { id } = param

        const del = await this.project.delProjeto(id)

        return del;

    }
}
