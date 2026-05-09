# Aerocode - (AV2)

> Sistema web de gestão de produção de aeronaves — SPA desenvolvida em React + TypeScript.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss)](https://tailwindcss.com)

---

## Sobre o projeto

O **Aerocode** é o frontend (protótipo navegável) de um sistema de gestão de produção de aeronaves. Ele cobre o ciclo completo de produção — do cadastro inicial da aeronave até a geração do relatório de entrega ao cliente — com controle de acesso por perfil de usuário.

Este projeto é a **Atividade de Avaliação 2 (AV2)** da disciplina de Programação Orientada a Objetos.

> Protótipo disponível no [Figma](https://www.figma.com/design/mJ7McnkVv8SwthByrRoEBN/AV2-Aerocode?node-id=0-1&t=U9CTu44kJRdUZblm-1)
---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | Framework principal de UI |
| TypeScript | 5 | Tipagem estática |
| Vite | 6 | Bundler / dev server |
| Tailwind CSS | 3 | Estilização utilitária |
| React Router DOM | 6 | Roteamento SPA |
| Recharts | 2 | Gráficos de progresso |
| Lucide React | latest | Ícones |

---

## Instalação e execução

### Pré-requisitos

- **Node.js** 18+ (recomendado: 20 LTS)
- **npm** 9+
- Sistema operacional: Windows 10+, Ubuntu 24.04+ ou derivados

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/jopaul0/AV2.git
cd AV2

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
# Acesse: http://localhost:5173

# 4. Build de produção
npm run build

# 5. Pré-visualizar o build
npm run preview
```

---

## Acessos de demonstração

| Usuário | Senha | Nível |
|---|---|---|
| `gerson` | `1234` | Administrador |
| `ana.souza` | `1234` | Engenheiro |
| `carlos.lima` | `1234` | Engenheiro |
| `beatriz.torres` | `1234` | Operador |
| `rafael.costa` | `1234` | Operador |

---

## Estrutura do projeto

```
src/
├── components/
│   ├── layout/         
│   └── ui/            
├── data/
│   └── mocks/         
├── hooks/
├── pages/
├── types/
│   ├── enums/ 
│   └── models/       
└── utils/
```

---

## Entidades do sistema

```
Aeronave (1) ──< Peca
Aeronave (1) ──< Etapa >── Funcionario (N)
Aeronave (1) ──< Teste
Aeronave (1) ──  Relatorio
```

### Enumerações

| Enum | Valores |
|---|---|
| `TipoAeronave` | `COMERCIAL`, `MILITAR` |
| `TipoPeca` | `NACIONAL`, `IMPORTADA` |
| `StatusPeca` | `EM_PRODUCAO`, `EM_TRANSPORTE`, `PRONTA` |
| `StatusEtapa` | `PENDENTE`, `ANDAMENTO`, `CONCLUIDA` |
| `NivelPermissao` | `ADMINISTRADOR`, `ENGENHEIRO`, `OPERADOR` |
| `TipoTeste` | `ELETRICO`, `HIDRAULICO`, `AERODINAMICO` |
| `ResultadoTeste` | `APROVADO`, `REPROVADO` |

---

## Controle de acesso

| Funcionalidade | Admin | Engenheiro | Operador |
|---|:---:|:---:|:---:|
| Ver aeronaves e detalhes | ✅ | ✅ | ✅ |
| Cadastrar / editar aeronave | ✅ | ✅ | ❌ |
| Adicionar peças e etapas | ✅ | ✅ | ❌ |
| Atualizar status de peça | ✅ | ✅ | ✅ |
| Avançar etapas | ✅ | ✅ | ❌ |
| Registrar testes | ✅ | ✅ | ❌ |
| Gerar e exportar relatórios | ✅ | ✅ | ✅ |
| Criar / editar funcionários | ✅ | ❌ | ❌ |
| Deletar funcionários | ✅ | ❌ | ❌ |

---

## Regras de negócio principais

1. **Código único de aeronave** — não é permitido cadastrar duas aeronaves com o mesmo código.
2. **Sequência de etapas** — apenas **uma etapa pode estar "Em andamento"** por aeronave. Para iniciar a próxima etapa, a etapa atual deve ser finalizada primeiro.
3. **Administrador exclusivo** — criação, edição e remoção de funcionários são restritas ao perfil Administrador.
4. **Auto-proteção** — o administrador logado não pode deletar a si mesmo.
5. **Relatório completo** — o relatório de entrega consolida aeronave, cliente, etapas, peças e testes, exportável em `.txt`.

---

## Páginas disponíveis

| Rota | Página | Autenticação |
|---|---|:---:|
| `/login` | Tela de login | ❌ |
| `/` | Dashboard | ✅ |
| `/aeronaves` | Lista de aeronaves | ✅ |
| `/aeronaves/:codigo` | Detalhes da aeronave | ✅ |
| `/funcionarios` | Gerenciamento de funcionários | ✅ |
| `/testes` | Todos os testes | ✅ |
| `/relatorios` | Lista de relatórios | ✅ |
| `/relatorios/:codigo` | Relatório de entrega | ✅ |
| `/perfil` | Perfil do usuário | ✅ |
| `/sobre` | Sobre a empresa | ❌ |
| `/documentacao` | Documentação técnica | ❌ |
| `/suporte` | Suporte e FAQ | ❌ |
| `/api` | Status da API (em desenvolvimento) | ❌ |
| `/privacidade` | Política de privacidade (LGPD) | ❌ |

---

## Design tokens

```css
/* Cores principais */
--background:      220 20% 10%   /* azul marinho escuro */
--primary:         217 91% 58%   /* azul vibrante */
--card:            220 18% 14%   /* grafite */
--border:          220 12% 22%   /* cinza escuro */

/* Fontes */
font-family: 'Inter', sans-serif;

/* Arredondamentos */
--radius-sm: 4px  --radius-md: 8px  --radius-lg: 12px  --radius-xl: 24px
```

---

## Notas importantes

- **Sem backend**: todos os dados são mantidos em memória (estado React). Ao recarregar a página, os dados retornam ao mock inicial.
- **Protótipo navegável**: o projeto atende ao requisito da AV2 de SPA funcional sem backend, executável como servidor estático.
- **Datas no padrão brasileiro**: todas as datas são exibidas no formato `dd/mm/aaaa`.

> Relatório de Interface disponível no diretório [/docs](./docs) (tanto em PDF quanto em markdown).
---

## Autor

**João Paulo Santos**

- LinkedIn: [João Paulo Santos](https://www.linkedin.com/in/joaosantos02/)
- Email: jopaulo.as8@gmail.com
- GitHub: [@jopaul0](https://github.com/jopaul0)
