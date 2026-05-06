import { StatusEtapa } from '../enums/StatusEtapa'

export interface Etapa {
  id: string
  nome: string
  prazo: string
  status: StatusEtapa
  funcionarios: string[]
}