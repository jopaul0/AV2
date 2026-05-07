import type { Aeronave } from '../../types/models/Aeronave'
import type { Etapa } from '../../types/models/Etapa'
import type { Peca } from '../../types/models/Peca'
import type { Teste } from '../../types/models/Teste'
import { TipoAeronave } from '../../types/enums/TipoAeronave'
import { TipoPeca } from '../../types/enums/TipoPeca'
import { StatusPeca } from '../../types/enums/StatusPeca'
import { StatusEtapa } from '../../types/enums/StatusEtapa'
import { ResultadoTeste } from '../../types/enums/ResultadoTeste'
import { TipoTeste } from '../../types/enums/TipoTeste'

function makePecas(prefix: string): Peca[] {
    return [
        { id: `${prefix}-P1`, nome: 'Asa Principal', tipo: TipoPeca.NACIONAL, fornecedor: 'Embraer', status: StatusPeca.PRONTA },
        { id: `${prefix}-P2`, nome: 'Motor Turbo', tipo: TipoPeca.IMPORTADA, fornecedor: 'Rolls-Royce', status: StatusPeca.EM_TRANSPORTE },
        { id: `${prefix}-P3`, nome: 'Fuselagem Dianteira', tipo: TipoPeca.NACIONAL, fornecedor: 'Embraer', status: StatusPeca.PRONTA },
        { id: `${prefix}-P4`, nome: 'Trem de Pouso', tipo: TipoPeca.NACIONAL, fornecedor: 'Embraer', status: StatusPeca.EM_PRODUCAO },
        { id: `${prefix}-P5`, nome: 'Radome', tipo: TipoPeca.IMPORTADA, fornecedor: 'Cobham', status: StatusPeca.PRONTA },
    ]
}

function makeEtapas(status1: StatusEtapa, status2: StatusEtapa, status3: StatusEtapa): Etapa[] {
    return [
        { id: 'E1', nome: 'Montagem da Fuselagem', prazo: '2025-03-10', status: status1, funcionarios: ['F002', 'F003'] },
        { id: 'E2', nome: 'Instalação de Sistemas', prazo: '2025-04-15', status: status2, funcionarios: ['F002'] },
        { id: 'E3', nome: 'Montagem do Trem de Pouso', prazo: '2025-05-20', status: status3, funcionarios: ['F003', 'F004'] },
        { id: 'E4', nome: 'Pintura e Acabamento', prazo: '2025-06-30', status: StatusEtapa.PENDENTE, funcionarios: [] },
    ]
}

function makeTestes(r1: ResultadoTeste, r2: ResultadoTeste): Teste[] {
    return [
        { id: 'T1', tipo: TipoTeste.ELETRICO, resultado: r1, data: '2025-04-01' },
        { id: 'T2', tipo: TipoTeste.HIDRAULICO, resultado: r2, data: '2025-04-05' },
        { id: 'T3', tipo: TipoTeste.AERODINAMICO, resultado: ResultadoTeste.APROVADO, data: '2025-04-10' },
    ]
}

export const AERONAVES: Aeronave[] = [
    {
        codigo: 'BOC-MD737',
        modelo: 'NAVY-A',
        tipo: TipoAeronave.COMERCIAL,
        capacidade: 189,
        alcance: 6110,
        cliente: 'Boeing Airlines',
        dataEntrega: '2025-12-01',
        pecas: makePecas('B737'),
        etapas: makeEtapas(StatusEtapa.CONCLUIDA, StatusEtapa.ANDAMENTO, StatusEtapa.PENDENTE),
        testes: makeTestes(ResultadoTeste.APROVADO, ResultadoTeste.APROVADO),
    },
    {
        codigo: 'BOC-MD738',
        modelo: 'NAVY-A',
        tipo: TipoAeronave.COMERCIAL,
        capacidade: 162,
        alcance: 5600,
        cliente: 'Airbus Leasing Co.',
        dataEntrega: '2025-11-15',
        pecas: makePecas('B738'),
        etapas: makeEtapas(StatusEtapa.CONCLUIDA, StatusEtapa.CONCLUIDA, StatusEtapa.ANDAMENTO),
        testes: makeTestes(ResultadoTeste.APROVADO, ResultadoTeste.REPROVADO),
    },
    {
        codigo: 'BOC-MD739',
        modelo: 'NAVY-A',
        tipo: TipoAeronave.COMERCIAL,
        capacidade: 220,
        alcance: 7200,
        cliente: 'Embraer Commercial',
        dataEntrega: '2026-02-01',
        pecas: makePecas('B739'),
        etapas: makeEtapas(StatusEtapa.ANDAMENTO, StatusEtapa.PENDENTE, StatusEtapa.PENDENTE),
        testes: [],
    },
    {
        codigo: 'ACR-001',
        modelo: 'NAVE-A',
        tipo: TipoAeronave.MILITAR,
        capacidade: 4,
        alcance: 3200,
        cliente: 'Força Aérea Brasileira',
        dataEntrega: '2026-06-30',
        pecas: makePecas('A001'),
        etapas: makeEtapas(StatusEtapa.CONCLUIDA, StatusEtapa.CONCLUIDA, StatusEtapa.CONCLUIDA),
        testes: makeTestes(ResultadoTeste.APROVADO, ResultadoTeste.APROVADO),
    },
    {
        codigo: 'ACR-011',
        modelo: 'NAVE-A',
        tipo: TipoAeronave.MILITAR,
        capacidade: 2,
        alcance: 2800,
        cliente: 'Lockheed Martin BR',
        dataEntrega: '2026-08-15',
        pecas: makePecas('A011'),
        etapas: makeEtapas(StatusEtapa.CONCLUIDA, StatusEtapa.ANDAMENTO, StatusEtapa.PENDENTE),
        testes: makeTestes(ResultadoTeste.REPROVADO, ResultadoTeste.APROVADO),
    },
    {
        codigo: 'ACR-100',
        modelo: 'NAVE-B',
        tipo: TipoAeronave.MILITAR,
        capacidade: 6,
        alcance: 4500,
        cliente: 'BAE Systems',
        dataEntrega: '2026-10-01',
        pecas: makePecas('A100'),
        etapas: makeEtapas(StatusEtapa.ANDAMENTO, StatusEtapa.PENDENTE, StatusEtapa.PENDENTE),
        testes: [],
    },
    {
        codigo: 'ACR-101',
        modelo: 'NAVE-B',
        tipo: TipoAeronave.MILITAR,
        capacidade: 8,
        alcance: 5000,
        cliente: 'Dassault Aviation',
        dataEntrega: '2027-01-20',
        pecas: makePecas('A101'),
        etapas: makeEtapas(StatusEtapa.PENDENTE, StatusEtapa.PENDENTE, StatusEtapa.PENDENTE),
        testes: [],
    },
]