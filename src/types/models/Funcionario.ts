import { NivelPermissao } from '../enums/NivelPermissao'

export interface Funcionario {
  id: string
  nome: string
  telefone: string
  endereco: string
  usuario: string
  nivelPermissao: NivelPermissao
  email: string
  avatarUrl?: string
}