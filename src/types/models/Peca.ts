import { TipoPeca } from '../enums/TipoPeca'
import { StatusPeca } from '../enums/StatusPeca'

export interface Peca {
  id:         string
  nome:       string
  tipo:       TipoPeca
  fornecedor: string
  status:     StatusPeca
}