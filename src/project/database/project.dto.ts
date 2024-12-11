export interface CadastroProjeto {
        name: string,
        description: string | null,
        link: string,
        language: string,
        userId: number
}

export interface ProjectDto{

    criarProjeto(dados: CadastroProjeto)

    lerDados(id: number)

    atualizarDados(name: string, nameAtt:string, description: string, link: string, language: string, userId: number)

    deletarProjeto(name: string, userId: number)
    
}