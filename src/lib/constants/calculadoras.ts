export interface CalculadoraInfo {
  nome: string
  slug: string
  categoria: string
  categoriaSlug: string
  descricao: string
  keywords: string
}

export const CATEGORIAS = [
  { nome: 'Trabalhista', slug: 'trabalhista', descricao: 'Calculadoras trabalhistas: rescisão, salário líquido, seguro desemprego, férias, 13º, hora extra, IRRF e mais.', icone: 'briefcase', cor: 'blue' },
  { nome: 'Financeiro', slug: 'financeiro', descricao: 'Calculadoras financeiras: juros simples e compostos, financiamento, empréstimo, investimentos, IPVA e mais.', icone: 'banknotes', cor: 'green' },
  { nome: 'Previdência', slug: 'previdencia', descricao: 'Simuladores de aposentadoria e previdência social pelo INSS.', icone: 'shield-check', cor: 'purple' },
  { nome: 'Saúde', slug: 'saude', descricao: 'Calculadoras de saúde: IMC, peso ideal, calorias e TMB, calculadora gestacional e mais.', icone: 'heart', cor: 'red' },
  { nome: 'Matemática', slug: 'matematica', descricao: 'Calculadoras matemáticas: científica, porcentagem, regra de três, conversor de bases numéricas.', icone: 'calculator', cor: 'indigo' },
  { nome: 'Jurídica', slug: 'juridica', descricao: 'Calculadoras jurídicas: correção monetária, multa por atraso, prazos judiciais e processuais.', icone: 'scale', cor: 'amber' },
  { nome: 'Conversores', slug: 'conversores', descricao: 'Conversores online: real para dólar, real para bitcoin, unidades de medida, cores e mais.', icone: 'arrows', cor: 'teal' },
  { nome: 'Utilidades', slug: 'utilidades', descricao: 'Ferramentas úteis: geradores de CPF, CNPJ, senhas, QR Code, validadores, formatadores e mais.', icone: 'wrench', cor: 'orange' },
] as const

export const CALCULADORAS: CalculadoraInfo[] = [
  // === Trabalhista ===
  { nome: 'Rescisão Trabalhista', slug: 'rescisao', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Calcule o valor da sua rescisão trabalhista. Simule demissão sem justa causa, pedido de demissão e acordo conforme a CLT.', keywords: 'rescisão trabalhista, cálculo rescisão, demissão sem justa causa, verbas rescisórias, FGTS, multa 40%' },
  { nome: 'Salário Líquido', slug: 'salario-liquido', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Descubra seu salário líquido com cálculo automático de INSS, IRRF e outros descontos. Tabelas atualizadas 2026.', keywords: 'salário líquido, cálculo salário, desconto INSS, desconto IRRF, salário bruto para líquido' },
  { nome: 'Seguro Desemprego', slug: 'seguro-desemprego', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Calcule o valor e o número de parcelas do seguro desemprego. Simulador atualizado com as faixas de 2026.', keywords: 'seguro desemprego, parcelas seguro desemprego, valor seguro desemprego, calcular seguro desemprego' },
  { nome: 'Hora Extra', slug: 'hora-extra', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Calcule o valor das horas extras com adicional de 50%, 100% e noturno. Conforme a CLT atualizada.', keywords: 'hora extra, cálculo hora extra, adicional noturno, adicional 50%, hora extra domingo' },
  { nome: 'Décimo Terceiro', slug: 'decimo-terceiro', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Calcule o valor do 13º salário proporcional e integral. Simule primeira e segunda parcela.', keywords: '13º salário, décimo terceiro, cálculo 13º, décimo terceiro proporcional, gratificação natalina' },
  { nome: 'Férias', slug: 'ferias', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Calcule o valor das férias com terço constitucional, abono pecuniário e descontos de INSS e IRRF.', keywords: 'cálculo férias, férias CLT, terço de férias, abono pecuniário, férias proporcionais' },
  { nome: 'IRRF', slug: 'irrf', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Calcule o Imposto de Renda Retido na Fonte sobre seu salário. Tabela progressiva atualizada 2026.', keywords: 'IRRF, imposto de renda retido na fonte, cálculo IRRF, tabela IRRF 2026, desconto imposto de renda' },
  { nome: 'Custo CLT', slug: 'custo-clt', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Calcule o custo total de um funcionário CLT para a empresa. Inclui INSS patronal, FGTS, férias e 13º.', keywords: 'custo CLT, custo funcionário, encargos trabalhistas, INSS patronal, custo empregador' },
  { nome: 'PJ vs CLT', slug: 'pj-vs-clt', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Compare quanto você precisa ganhar como PJ para ter o equivalente ao salário CLT. Considere impostos e benefícios.', keywords: 'PJ vs CLT, comparar PJ CLT, vale mais a pena PJ ou CLT, salário PJ equivalente CLT' },

  // === Financeiro ===
  { nome: 'Juros Simples', slug: 'juros-simples', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Calcule juros simples sobre qualquer valor. Informe capital, taxa e período para obter o montante e os juros.', keywords: 'juros simples, cálculo juros simples, matemática financeira, fórmula juros simples' },
  { nome: 'Juros Compostos', slug: 'juros-compostos', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Calcule juros compostos com aportes mensais. Simule investimentos e veja o efeito dos juros sobre juros.', keywords: 'juros compostos, cálculo juros compostos, simulador investimento, juros sobre juros, rendimento' },
  { nome: 'Financiamento Imobiliário', slug: 'financiamento', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Simule financiamento imobiliário nas tabelas Price e SAC. Compare parcelas, juros totais e amortização.', keywords: 'financiamento imobiliário, tabela Price, tabela SAC, simulador financiamento, prestação imóvel' },
  { nome: 'Empréstimo Pessoal', slug: 'emprestimo', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Simule empréstimo pessoal e descubra o valor das parcelas, juros totais e custo efetivo total (CET).', keywords: 'empréstimo pessoal, simulador empréstimo, parcela empréstimo, CET, custo efetivo total' },
  { nome: 'Simulador de Investimentos', slug: 'simulador-investimentos', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Simule investimentos em renda fixa e variável. Compare CDB, Tesouro Direto, poupança e fundos.', keywords: 'simulador investimentos, simulador CDB, Tesouro Direto, rendimento poupança, renda fixa' },
  { nome: 'Conversor de Taxas', slug: 'conversor-taxas', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Converta taxas de juros entre períodos: diária, mensal e anual. Regime simples e composto.', keywords: 'conversor taxas juros, taxa mensal para anual, taxa equivalente, conversão taxa de juros' },
  { nome: 'IPVA', slug: 'ipva', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Calcule o valor do IPVA do seu veículo. Alíquotas atualizadas por estado para 2026.', keywords: 'IPVA, cálculo IPVA, IPVA 2026, valor IPVA, alíquota IPVA por estado' },
  { nome: 'Calculadora de Desconto', slug: 'calculadora-desconto', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Calcule o preço final com desconto percentual. Ideal para compras, promoções e liquidações.', keywords: 'calculadora desconto, calcular desconto, preço com desconto, desconto percentual, promoção' },
  { nome: 'Reajuste de Aluguel', slug: 'reajuste-aluguel', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Calcule o reajuste do aluguel pelo IGP-M, IPCA ou outro índice. Valores atualizados.', keywords: 'reajuste aluguel, IGP-M, IPCA, cálculo reajuste aluguel, índice aluguel' },
  { nome: 'Simulador de Importação', slug: 'simulador-importacao', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Calcule o custo total de importação incluindo frete, seguro, imposto de importação, ICMS e IPI.', keywords: 'simulador importação, imposto importação, custo importar, taxa importação, ICMS importação' },
  { nome: 'Markup', slug: 'markup', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Calcule o preço de venda ideal com base no custo do produto. Descubra markup, margem de lucro e lucro por unidade.', keywords: 'calculadora markup, margem de lucro, preço de venda, markup e margem, precificação' },

  // === Previdência ===
  { nome: 'Aposentadoria', slug: 'aposentadoria', categoria: 'Previdência', categoriaSlug: 'previdencia', descricao: 'Simule sua aposentadoria pelo INSS. Calcule tempo de contribuição restante e valor estimado do benefício.', keywords: 'aposentadoria, cálculo aposentadoria, INSS, previdência social, tempo de contribuição, regra de transição' },

  // === Saúde ===
  { nome: 'IMC', slug: 'imc', categoria: 'Saúde', categoriaSlug: 'saude', descricao: 'Calcule seu Índice de Massa Corporal (IMC) e veja a classificação da OMS. Descubra se está no peso ideal.', keywords: 'IMC, índice de massa corporal, calcular IMC, peso ideal, classificação OMS, obesidade' },
  { nome: 'Peso Ideal', slug: 'peso-ideal', categoria: 'Saúde', categoriaSlug: 'saude', descricao: 'Descubra seu peso ideal com base em altura, idade e sexo. Fórmulas clínicas reconhecidas.', keywords: 'peso ideal, calculadora peso ideal, peso saudável, peso por altura, fórmula peso ideal' },
  { nome: 'Calorias e TMB', slug: 'calorias-tmb', categoria: 'Saúde', categoriaSlug: 'saude', descricao: 'Calcule sua Taxa Metabólica Basal e necessidade calórica diária para emagrecer, manter ou ganhar peso.', keywords: 'TMB, taxa metabólica basal, calorias diárias, calculadora calorias, gasto calórico, metabolismo' },
  { nome: 'Calculadora Gestacional', slug: 'gestacional', categoria: 'Saúde', categoriaSlug: 'saude', descricao: 'Calcule a idade gestacional, data provável do parto e acompanhe o desenvolvimento semana a semana.', keywords: 'calculadora gestacional, data provável parto, semanas de gestação, DPP, idade gestacional' },
  { nome: 'Água Diária', slug: 'agua-diaria', categoria: 'Saúde', categoriaSlug: 'saude', descricao: 'Descubra quanta água você deve beber por dia com base no peso e nível de atividade física.', keywords: 'quanta água beber por dia, calculadora água, hidratação, água por peso, consumo de água diário' },

  // === Matemática ===
  { nome: 'Calculadora Científica', slug: 'calculadora-cientifica', categoria: 'Matemática', categoriaSlug: 'matematica', descricao: 'Calculadora científica online com funções trigonométricas, logarítmicas, exponenciais e mais.', keywords: 'calculadora científica, calculadora online, seno, cosseno, logaritmo, raiz quadrada' },
  { nome: 'Porcentagem', slug: 'porcentagem', categoria: 'Matemática', categoriaSlug: 'matematica', descricao: 'Calcule porcentagem de forma rápida: quanto é X% de Y, variação percentual e acréscimo/desconto.', keywords: 'calculadora porcentagem, calcular porcentagem, quanto é por cento de, variação percentual' },
  { nome: 'Regra de Três', slug: 'regra-de-tres', categoria: 'Matemática', categoriaSlug: 'matematica', descricao: 'Resolva regra de três simples e composta de forma automática. Direta e inversamente proporcional.', keywords: 'regra de três, regra de três simples, regra de três composta, proporcionalidade, cálculo proporcional' },
  { nome: 'Conversor de Bases', slug: 'conversor-bases', categoria: 'Matemática', categoriaSlug: 'matematica', descricao: 'Converta números entre bases: binário, octal, decimal e hexadecimal. Ferramenta para programadores.', keywords: 'conversor bases numéricas, binário, octal, hexadecimal, decimal para binário, conversão numérica' },

  // === Jurídica ===
  { nome: 'Correção Monetária', slug: 'correcao-monetaria', categoria: 'Jurídica', categoriaSlug: 'juridica', descricao: 'Calcule a correção monetária de valores por IPCA, IGP-M, INPC e outros índices oficiais.', keywords: 'correção monetária, atualização monetária, IPCA, IGP-M, INPC, inflação, valor corrigido' },
  { nome: 'Multa por Atraso', slug: 'multa-atraso', categoria: 'Jurídica', categoriaSlug: 'juridica', descricao: 'Calcule multa e juros de mora por atraso em pagamentos, boletos e obrigações contratuais.', keywords: 'multa atraso, juros de mora, cálculo multa, atraso pagamento, multa boleto' },
  { nome: 'Prazos Judiciais', slug: 'prazos-judiciais', categoria: 'Jurídica', categoriaSlug: 'juridica', descricao: 'Calcule prazos processuais e judiciais considerando dias úteis, feriados e recesso forense.', keywords: 'prazo judicial, prazo processual, dias úteis, contagem prazo, CPC, recesso forense' },

  // === Conversores ===
  { nome: 'Real para Dólar', slug: 'real-dolar', categoria: 'Conversores', categoriaSlug: 'conversores', descricao: 'Converta real para dólar e dólar para real com cotação atualizada. Câmbio comercial e turismo.', keywords: 'real para dólar, dólar para real, cotação dólar, câmbio, conversor moeda, dólar hoje' },
  { nome: 'Real para Bitcoin', slug: 'real-bitcoin', categoria: 'Conversores', categoriaSlug: 'conversores', descricao: 'Converta real para bitcoin e bitcoin para real com cotação em tempo real.', keywords: 'real para bitcoin, bitcoin para real, cotação bitcoin, BTC, conversor bitcoin, preço bitcoin' },
  { nome: 'Conversor de Unidades', slug: 'conversor-unidades', categoria: 'Conversores', categoriaSlug: 'conversores', descricao: 'Converta unidades de medida: comprimento, peso, volume, temperatura, velocidade e mais.', keywords: 'conversor unidades, converter medidas, metros para pés, quilos para libras, celsius fahrenheit' },
  { nome: 'Conversor de Cores', slug: 'conversor-cores', categoria: 'Conversores', categoriaSlug: 'conversores', descricao: 'Converta cores entre HEX, RGB, HSL e CMYK. Ferramenta essencial para designers e desenvolvedores.', keywords: 'conversor cores, HEX para RGB, RGB para HSL, cores web, paleta cores, color picker' },

  // === Utilidades ===
  { nome: 'Gerador de CPF', slug: 'gerador-cpf', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Gere números de CPF válidos para testes e desenvolvimento de software. Somente para fins de teste.', keywords: 'gerador CPF, CPF válido, gerar CPF para teste, CPF fake, CPF desenvolvimento' },
  { nome: 'Validador de CPF', slug: 'validador-cpf', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Verifique se um número de CPF é válido conforme o algoritmo oficial da Receita Federal.', keywords: 'validador CPF, verificar CPF, CPF válido, consultar CPF, validação CPF' },
  { nome: 'Gerador de CNPJ', slug: 'gerador-cnpj', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Gere números de CNPJ válidos para testes e desenvolvimento de software. Somente para fins de teste.', keywords: 'gerador CNPJ, CNPJ válido, gerar CNPJ para teste, CNPJ fake, CNPJ desenvolvimento' },
  { nome: 'Validador de CNPJ', slug: 'validador-cnpj', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Verifique se um número de CNPJ é válido conforme o algoritmo oficial da Receita Federal.', keywords: 'validador CNPJ, verificar CNPJ, CNPJ válido, consultar CNPJ, validação CNPJ' },
  { nome: 'Gerador de Senha', slug: 'gerador-senha', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Gere senhas fortes e seguras com letras, números e caracteres especiais. Personalize o comprimento.', keywords: 'gerador senha, senha forte, criar senha segura, password generator, senha aleatória' },
  { nome: 'Gerador de QR Code', slug: 'gerador-qrcode', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Crie QR Codes gratuitamente para URLs, textos, Wi-Fi e mais. Baixe em PNG ou SVG.', keywords: 'gerador QR Code, criar QR Code, QR Code grátis, código QR, QR Code online' },
  { nome: 'Calculadora de Idade', slug: 'calculadora-idade', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Calcule sua idade exata em anos, meses e dias a partir da data de nascimento.', keywords: 'calculadora idade, quantos anos tenho, calcular idade, idade exata, data de nascimento' },
  { nome: 'Dias Entre Datas', slug: 'dias-entre-datas', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Calcule a diferença entre duas datas em dias, semanas, meses e anos. Inclui dias úteis.', keywords: 'dias entre datas, diferença entre datas, calcular dias, dias úteis, contagem de dias' },
  { nome: 'Combustível', slug: 'combustivel', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Descubra se vale mais a pena abastecer com álcool ou gasolina. Compare preços e consumo.', keywords: 'álcool ou gasolina, calculadora combustível, etanol ou gasolina, vale a pena álcool, comparar combustível' },
  { nome: 'Cronômetro', slug: 'cronometro', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Cronômetro online gratuito com função de voltas (laps) e contagem regressiva. Precisão de milissegundos.', keywords: 'cronômetro online, timer, contagem regressiva, stopwatch, cronômetro grátis' },
  { nome: 'Contador de Caracteres', slug: 'contador-caracteres', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Conte caracteres, palavras, frases e parágrafos do seu texto. Ideal para redes sociais e SEO.', keywords: 'contador caracteres, contar palavras, contador texto, caracteres limite, word counter' },
  { nome: 'Conversor Base64', slug: 'conversor-base64', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Codifique e decodifique textos e arquivos em Base64. Ferramenta para desenvolvedores.', keywords: 'base64, codificar base64, decodificar base64, converter base64, base64 encode decode' },
  { nome: 'Formatador JSON', slug: 'formatador-json', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Formate, valide e visualize JSON de forma clara e organizada. Indentação automática.', keywords: 'formatador JSON, JSON beautifier, validar JSON, JSON formatter, formatar JSON online' },
  { nome: 'Gerador de UUID', slug: 'gerador-uuid', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Gere UUIDs v4 únicos e aleatórios. Copie com um clique para usar em bancos de dados e APIs.', keywords: 'gerador UUID, UUID v4, gerar UUID, identificador único, GUID' },
  { nome: 'Gerador de Hash', slug: 'gerador-hash', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Gere hashes MD5, SHA-1, SHA-256 e SHA-512 a partir de qualquer texto. Ferramenta para segurança.', keywords: 'gerador hash, MD5, SHA-256, SHA-1, SHA-512, hash online, criptografia' },
  { nome: 'Gerador de Lorem Ipsum', slug: 'gerador-lorem', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Gere textos Lorem Ipsum para preencher layouts e protótipos. Parágrafos, frases ou palavras.', keywords: 'lorem ipsum, gerador lorem ipsum, texto placeholder, dummy text, texto de exemplo' },
  { nome: 'Gerador de Meta Tags', slug: 'gerador-meta-tags', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Gere meta tags HTML para SEO: title, description, Open Graph e Twitter Cards. Copie e cole.', keywords: 'gerador meta tags, meta tags SEO, Open Graph, Twitter Card, HTML meta tags' },
  { nome: 'Preview HTML', slug: 'preview-html', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Visualize código HTML, CSS e JavaScript em tempo real. Editor ao vivo para desenvolvedores.', keywords: 'preview HTML, editor HTML, HTML ao vivo, live preview, editor código online' },
  { nome: 'Fuso Horário', slug: 'fuso-horario', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Converta horários entre fusos horários do mundo inteiro. Ideal para reuniões internacionais.', keywords: 'fuso horário, converter horário, diferença fuso horário, horário mundial, timezone converter' },
  { nome: 'Consumo de Energia', slug: 'consumo-energia', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Calcule quanto cada aparelho gasta de energia elétrica por mês. Descubra o impacto na conta de luz.', keywords: 'consumo energia, calculadora energia, conta de luz, gasto eletricidade, kWh, tarifa energia' },
]

export function getCalculadorasByCategoria(categoriaSlug: string): CalculadoraInfo[] {
  return CALCULADORAS.filter(c => c.categoriaSlug === categoriaSlug)
}

export function getCalculadora(slug: string): CalculadoraInfo | undefined {
  return CALCULADORAS.find(c => c.slug === slug)
}
