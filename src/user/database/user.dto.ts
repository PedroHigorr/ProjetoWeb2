export interface CadastroUsuario {
    name: string,
    email: string,
    tel: string
}

export interface DadosUsuario{
    id: number,
    name: string,
    email: string,
    tel: string | null,
    createdAt: Date
}

export interface UsuarioDto{

    criarUsuario(dados: CadastroUsuario)

    lerDados(id: number)

    atualizarDados(dados: CadastroUsuario)

    deletarUsuario(id: number)

    
}