import { Shield } from 'lucide-react'
import { formatDate } from '../utils/date'

const ULTIMA_ATUALIZACAO = '2026-05-08'

export function PrivacidadePage() {
    return (
        <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield size={20} className="text-primary" />
                    </div>
                    <div>
                        <h1 className="section-title">Política de Privacidade</h1>
                        <p className="text-xs text-muted-foreground">Última atualização: {formatDate(ULTIMA_ATUALIZACAO)}</p>
                    </div>
                </div>
                <p className="section-subtitle">
                    A Aerocode está comprometida com a proteção dos seus dados pessoais e com a transparência sobre como os utilizamos.
                </p>
            </div>

            {[
                {
                    title: '1. Quem somos',
                    content: 'A Aerocode é uma empresa de tecnologia especializada em software para gestão de produção aeronáutica, com sede em São José dos Campos - SP, Brasil. Somos os controladores dos dados pessoais coletados por meio de nossa plataforma.',
                },
                {
                    title: '2. Dados que coletamos',
                    content: `Coletamos os seguintes dados para operação do sistema:\n\n• Dados de identificação: nome completo, endereço de e-mail, nome de usuário.\n• Dados de contato: telefone e endereço.\n• Dados de uso: nível de acesso, ações realizadas no sistema (auditoria interna).\n• Dados técnicos: informações do navegador e dispositivo para fins de segurança.`,
                },
                {
                    title: '3. Como utilizamos seus dados',
                    content: `Seus dados são utilizados exclusivamente para:\n\n• Autenticação e controle de acesso ao sistema.\n• Atribuição de responsabilidades em etapas de produção.\n• Geração de relatórios de entrega de aeronaves.\n• Comunicação sobre atualizações do sistema.\n• Cumprimento de obrigações legais.`,
                },
                {
                    title: '4. Base legal (LGPD)',
                    content: `O tratamento de dados é realizado com fundamento nas seguintes bases legais da Lei Geral de Proteção de Dados (Lei nº 13.709/2018):\n\n• Execução de contrato: para operar o sistema contratado pela sua organização.\n• Legítimo interesse: para segurança, auditoria e melhoria do sistema.\n• Cumprimento de obrigação legal: quando aplicável pela legislação aeronáutica.`,
                },
                {
                    title: '5. Compartilhamento de dados',
                    content: 'Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais. Podemos compartilhar dados com prestadores de serviços que atuam em nosso nome (como serviços de hospedagem em nuvem), sempre sob contratos de confidencialidade e adequação à LGPD.',
                },
                {
                    title: '6. Segurança',
                    content: 'Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda, destruição ou divulgação indevida. Isso inclui criptografia de dados em trânsito (TLS), controle de acesso baseado em perfis e monitoramento de segurança.',
                },
                {
                    title: '7. Retenção de dados',
                    content: 'Os dados pessoais são mantidos enquanto o contrato de uso do sistema estiver ativo e pelo período exigido pela legislação aplicável após o encerramento. Dados de produção aeronáutica podem ser mantidos por até 10 anos para fins de conformidade regulatória.',
                },
                {
                    title: '8. Seus direitos',
                    content: `Como titular de dados, você tem os seguintes direitos garantidos pela LGPD:\n\n• Confirmação da existência de tratamento.\n• Acesso aos dados.\n• Correção de dados incompletos ou desatualizados.\n• Anonimização, bloqueio ou eliminação de dados desnecessários.\n• Portabilidade dos dados.\n• Eliminação dos dados tratados com consentimento.\n• Informação sobre o compartilhamento de dados.\n• Revogação do consentimento.`,
                },
                {
                    title: '9. Cookies',
                    content: 'A plataforma Aerocode utiliza apenas cookies estritamente necessários para manter a sessão do usuário autenticado. Não utilizamos cookies de rastreamento, publicidade ou análise de comportamento.',
                },
                {
                    title: '10. Contato',
                    content: 'Para exercer seus direitos, tirar dúvidas ou reportar incidentes de privacidade, entre em contato com nosso Encarregado de Proteção de Dados (DPO):\n\nE-mail: privacidade@aerocode.com.br',
                },
                {
                    title: '11. Alterações desta política',
                    content: 'Esta política pode ser atualizada periodicamente. Notificaremos os usuários sobre mudanças significativas por e-mail ou por aviso destacado na plataforma. O uso continuado do sistema após as alterações implica na aceitação da nova política.',
                },
            ].map(({ title, content }) => (
                <div key={title} className="card space-y-3">
                    <h2 className="text-sm font-semibold text-foreground">{title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{content}</p>
                </div>
            ))}
        </div>
    )
}