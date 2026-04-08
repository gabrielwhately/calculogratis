import type { ComponentType } from 'react'
import { RescisaoForm } from './rescisao-form'
import { SalarioLiquidoForm } from './salario-liquido-form'
import { SeguroDesempregoForm } from './seguro-desemprego-form'
import { HoraExtraForm } from './hora-extra-form'
import { DecimoTerceiroForm } from './decimo-terceiro-form'
import { FeriasForm } from './ferias-form'
import { IRRFForm } from './irrf-form'
import { CustoCLTForm } from './custo-clt-form'
import { PjVsCltForm } from './pj-vs-clt-form'
import { AdicionalNoturnoForm } from './adicional-noturno-form'
import { InsalubridadeForm } from './insalubridade-form'
import { JurosSimplesForm } from './juros-simples-form'
import { JurosCompostosForm } from './juros-compostos-form'
import { FinanciamentoForm } from './financiamento-form'
import { EmprestimoForm } from './emprestimo-form'
import { SimuladorInvestimentosForm } from './simulador-investimentos-form'
import { ConversorTaxasForm } from './conversor-taxas-form'
import { IPVAForm } from './ipva-form'
import { CalculadoraDescontoForm } from './calculadora-desconto-form'
import { ReajusteAluguelForm } from './reajuste-aluguel-form'
import { SimuladorImportacaoForm } from './simulador-importacao-form'
import { MarkupForm } from './markup-form'
import { RendimentoCDBForm } from './rendimento-cdb-form'
import { AposentadoriaForm } from './aposentadoria-form'
import { IMCForm } from './imc-form'
import { PesoIdealForm } from './peso-ideal-form'
import { CaloriasTMBForm } from './calorias-tmb-form'
import { GestacionalForm } from './gestacional-form'
import { AguaDiariaForm } from './agua-diaria-form'
import { CalculadoraMacrosForm } from './calculadora-macros-form'
import { CalculadoraCientificaForm } from './calculadora-cientifica-form'
import { PorcentagemForm } from './porcentagem-form'
import { RegraDeTresForm } from './regra-de-tres-form'
import { ConversorBasesForm } from './conversor-bases-form'
import { CorrecaoMonetariaForm } from './correcao-monetaria-form'
import { MultaAtrasoForm } from './multa-atraso-form'
import { PrazosJudiciaisForm } from './prazos-judiciais-form'
import { RealDolarForm } from './real-dolar-form'
import { RealBitcoinForm } from './real-bitcoin-form'
import { ConversorUnidadesForm } from './conversor-unidades-form'
import { ConversorCoresForm } from './conversor-cores-form'
import { GeradorCPFForm } from './gerador-cpf-form'
import { ValidadorCPFForm } from './validador-cpf-form'
import { GeradorCNPJForm } from './gerador-cnpj-form'
import { ValidadorCNPJForm } from './validador-cnpj-form'
import { GeradorSenhaForm } from './gerador-senha-form'
import { GeradorQRCodeForm } from './gerador-qrcode-form'
import { CalculadoraIdadeForm } from './calculadora-idade-form'
import { DiasEntreDatasForm } from './dias-entre-datas-form'
import { CombustivelForm } from './combustivel-form'
import { CronometroForm } from './cronometro-form'
import { ContadorCaracteresForm } from './contador-caracteres-form'
import { ConversorBase64Form } from './conversor-base64-form'
import { FormatadorJSONForm } from './formatador-json-form'
import { GeradorUUIDForm } from './gerador-uuid-form'
import { GeradorHashForm } from './gerador-hash-form'
import { GeradorLoremForm } from './gerador-lorem-form'
import { GeradorMetaTagsForm } from './gerador-meta-tags-form'
import { PreviewHtmlForm } from './preview-html-form'
import { FusoHorarioForm } from './fuso-horario-form'
import { ConsumoEnergiaForm } from './consumo-energia-form'
import { SimuladorConsorcioForm } from './simulador-consorcio-form'
import { FrequenciaCardiacaForm } from './frequencia-cardiaca-form'
import { CalculadoraPinturaForm } from './calculadora-pintura-form'

export const FORM_MAP: Record<string, ComponentType> = {
  'rescisao': RescisaoForm,
  'salario-liquido': SalarioLiquidoForm,
  'seguro-desemprego': SeguroDesempregoForm,
  'hora-extra': HoraExtraForm,
  'decimo-terceiro': DecimoTerceiroForm,
  'ferias': FeriasForm,
  'irrf': IRRFForm,
  'custo-clt': CustoCLTForm,
  'pj-vs-clt': PjVsCltForm,
  'adicional-noturno': AdicionalNoturnoForm,
  'insalubridade': InsalubridadeForm,
  'juros-simples': JurosSimplesForm,
  'juros-compostos': JurosCompostosForm,
  'financiamento': FinanciamentoForm,
  'emprestimo': EmprestimoForm,
  'simulador-investimentos': SimuladorInvestimentosForm,
  'conversor-taxas': ConversorTaxasForm,
  'ipva': IPVAForm,
  'calculadora-desconto': CalculadoraDescontoForm,
  'reajuste-aluguel': ReajusteAluguelForm,
  'simulador-importacao': SimuladorImportacaoForm,
  'markup': MarkupForm,
  'rendimento-cdb': RendimentoCDBForm,
  'aposentadoria': AposentadoriaForm,
  'imc': IMCForm,
  'peso-ideal': PesoIdealForm,
  'calorias-tmb': CaloriasTMBForm,
  'gestacional': GestacionalForm,
  'agua-diaria': AguaDiariaForm,
  'calculadora-macros': CalculadoraMacrosForm,
  'calculadora-cientifica': CalculadoraCientificaForm,
  'porcentagem': PorcentagemForm,
  'regra-de-tres': RegraDeTresForm,
  'conversor-bases': ConversorBasesForm,
  'correcao-monetaria': CorrecaoMonetariaForm,
  'multa-atraso': MultaAtrasoForm,
  'prazos-judiciais': PrazosJudiciaisForm,
  'real-dolar': RealDolarForm,
  'real-bitcoin': RealBitcoinForm,
  'conversor-unidades': ConversorUnidadesForm,
  'conversor-cores': ConversorCoresForm,
  'gerador-cpf': GeradorCPFForm,
  'validador-cpf': ValidadorCPFForm,
  'gerador-cnpj': GeradorCNPJForm,
  'validador-cnpj': ValidadorCNPJForm,
  'gerador-senha': GeradorSenhaForm,
  'gerador-qrcode': GeradorQRCodeForm,
  'calculadora-idade': CalculadoraIdadeForm,
  'dias-entre-datas': DiasEntreDatasForm,
  'combustivel': CombustivelForm,
  'cronometro': CronometroForm,
  'contador-caracteres': ContadorCaracteresForm,
  'conversor-base64': ConversorBase64Form,
  'formatador-json': FormatadorJSONForm,
  'gerador-uuid': GeradorUUIDForm,
  'gerador-hash': GeradorHashForm,
  'gerador-lorem': GeradorLoremForm,
  'gerador-meta-tags': GeradorMetaTagsForm,
  'preview-html': PreviewHtmlForm,
  'fuso-horario': FusoHorarioForm,
  'consumo-energia': ConsumoEnergiaForm,
  'simulador-consorcio': SimuladorConsorcioForm,
  'frequencia-cardiaca': FrequenciaCardiacaForm,
  'calculadora-pintura': CalculadoraPinturaForm,
}
