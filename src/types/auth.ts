import type { Funcionario } from './models/Funcionario'

export interface AuthUser {
    funcionario: Funcionario
    token: string
}