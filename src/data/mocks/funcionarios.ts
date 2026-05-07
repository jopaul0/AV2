import type { Funcionario } from '../../types/models/Funcionario'
import { NivelPermissao } from '../../types/enums/NivelPermissao'

export const FUNCIONARIOS: Funcionario[] = [
    {
        id: 'F001',
        nome: 'Gerson Penha',
        telefone: '(11) 99999-0001',
        endereco: 'Av. Paulista, 1000 – São Paulo, SP',
        usuario: 'gerson',
        nivelPermissao: NivelPermissao.ADMINISTRADOR,
        email: 'gerson@aerocode.com.br',
    },
    {
        id: 'F002',
        nome: 'Ana Souza',
        telefone: '(11) 99999-0002',
        endereco: 'Rua das Flores, 250 – São José dos Campos, SP',
        usuario: 'ana.souza',
        nivelPermissao: NivelPermissao.ENGENHEIRO,
        email: 'ana.souza@aerocode.com.br',
    },
    {
        id: 'F003',
        nome: 'Carlos Lima',
        telefone: '(11) 99999-0003',
        endereco: 'Rua XV de Novembro, 80 – Campinas, SP',
        usuario: 'carlos.lima',
        nivelPermissao: NivelPermissao.ENGENHEIRO,
        email: 'carlos.lima@aerocode.com.br',
    },
    {
        id: 'F004',
        nome: 'Beatriz Torres',
        telefone: '(11) 99999-0004',
        endereco: 'Av. Brasil, 500 – São Paulo, SP',
        usuario: 'beatriz.torres',
        nivelPermissao: NivelPermissao.OPERADOR,
        email: 'beatriz.torres@aerocode.com.br',
    },
    {
        id: 'F005',
        nome: 'Rafael Costa',
        telefone: '(11) 99999-0005',
        endereco: 'Rua Augusta, 300 – São Paulo, SP',
        usuario: 'rafael.costa',
        nivelPermissao: NivelPermissao.OPERADOR,
        email: 'rafael.costa@aerocode.com.br',
    },
]