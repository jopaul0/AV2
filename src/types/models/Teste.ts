import { TipoTeste } from '../enums/TipoTeste'
import { ResultadoTeste } from '../enums/ResultadoTeste'

export interface Teste {
  id:        string
  tipo:      TipoTeste
  resultado: ResultadoTeste
  data:      string
}