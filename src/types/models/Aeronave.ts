import type { Peca } from './Peca'
import type { Etapa } from './Etapa'
import type { Teste } from './Teste'
import { TipoAeronave } from '../enums/TipoAeronave'

export interface Aeronave {
  codigo: string
  modelo: string
  tipo: TipoAeronave
  capacidade: number
  alcance: number
  pecas: Peca[]
  etapas: Etapa[]
  testes: Teste[]
  cliente?: string
  dataEntrega?: string
}