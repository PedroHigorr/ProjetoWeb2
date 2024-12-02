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

    atualizarDados(id: number, name:string, description: string, link: string, language: string, userId: number)

    deletarProjeto(id: number)
    
}