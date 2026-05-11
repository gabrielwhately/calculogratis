export interface ArticleContent {
  title: string
  cat: string
  date: string
  description: string
  content: string[]
  ctaLabel: string
  ctaLink: string
}

export const ARTIGOS_PT: Record<string, ArticleContent> = {
  "rescisao-2026": {
    title: "Como calcular sua rescisão em 2026",
    cat: "Trabalhista",
    date: "04 Mai 2026",
    description: "Guia completo sobre as verbas rescisórias, prazos e direitos do trabalhador em 2026.",
    content: [
      "Sair de um emprego gera muitas dúvidas, principalmente sobre quanto você tem direito a receber. Em 2026, as regras continuam baseadas na CLT, mas com as tabelas de INSS e IRRF atualizadas.",
      "### Principais Verbas Rescisórias",
      "1. **Saldo de Salário**: Dias trabalhados no mês da saída.",
      "2. **Aviso Prévio**: Pode ser trabalhado ou indenizado (30 dias + 3 dias por ano trabalhado).",
      "3. **Férias Proporcionais**: Com acréscimo de 1/3 constitucional.",
      "4. **13º Proporcional**: Meses trabalhados no ano corrente.",
      "5. **Multa de 40% do FGTS**: Apenas em demissões sem justa causa.",
      "### Prazo de Pagamento",
      "A empresa tem até 10 dias corridos após o término do contrato para efetuar o pagamento das verbas e entregar a documentação."
    ],
    ctaLabel: "Calcular Minha Rescisão Agora",
    ctaLink: "/trabalhista/rescisao"
  },
  "juros-compostos": {
    title: "Juros Compostos: O segredo da riqueza",
    cat: "Financeiro",
    date: "02 Mai 2026",
    description: "Entenda como os juros sobre juros podem acelerar seus investimentos a longo prazo.",
    content: [
      "Os juros compostos são considerados a 'oitava maravilha do mundo'. Diferente dos juros simples, aqui os juros do período são somados ao capital para o cálculo dos juros do próximo período.",
      "### A Fórmula da Riqueza",
      "A fórmula básica é M = C(1 + i)^t, onde o tempo (t) é o fator mais importante. Quanto mais cedo você começa, maior o efeito da 'bola de neve'.",
      "### Onde encontrar Juros Compostos?",
      "Investimentos como CDB, Tesouro Direto e Fundos de Investimento utilizam este sistema. Evite dívidas que usam juros compostos, como o rotativo do cartão de crédito!"
    ],
    ctaLabel: "Simular Meus Investimentos",
    ctaLink: "/financeiro/juros-compostos"
  },
  "salario-liquido": {
    title: "Guia do Salário Líquido: Para onde vai seu dinheiro?",
    cat: "Trabalhista",
    date: "28 Abr 2026",
    description: "Entenda a diferença entre salário bruto e líquido e como funcionam os descontos de INSS e IRRF.",
    content: [
      "O salário líquido é o valor que efetivamente cai na sua conta após todos os descontos obrigatórios. Para muitos, a diferença entre o bruto e o líquido é uma surpresa desagradável.",
      "### Descontos Obrigatórios",
      "1. **INSS**: Contribuição previdenciária que varia de 7,5% a 14% em 2026.",
      "2. **IRRF**: Imposto de Renda Retido na Fonte, calculado após a dedução do INSS e dependentes.",
      "### Outros Possíveis Descontos",
      "Vale-transporte (até 6%), plano de saúde, previdência privada e empréstimos configurados são exemplos comuns de deduções facultativas ou contratuais."
    ],
    ctaLabel: "Calcular Salário Líquido",
    ctaLink: "/trabalhista/salario-liquido"
  },
  "imc-saude": {
    title: "IMC: Como interpretar seus resultados",
    cat: "Saúde",
    date: "25 Abr 2026",
    description: "Saiba o que significa o seu Índice de Massa Corporal e quais são os riscos para cada faixa.",
    content: [
      "O Índice de Massa Corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso ideal. Ele foi desenvolvido pelo polímata Lambert Quételet no fim do século XIX.",
      "### Categorias do IMC",
      "1. **Abaixo de 18,5**: Abaixo do peso.",
      "2. **18,5 a 24,9**: Peso normal (Eutrofia).",
      "3. **25 a 29,9**: Sobrepeso.",
      "4. **30 ou mais**: Obesidade.",
      "### Limitações do IMC",
      "O IMC não diferencia massa magra (músculos) de gordura. Por isso, atletas podem ter um IMC alto sem estarem com excesso de gordura corporal."
    ],
    ctaLabel: "Calcular Meu IMC",
    ctaLink: "/saude/imc"
  },
  "seguro-desemprego": {
    title: "Seguro Desemprego 2026: Quem tem direito e como calcular?",
    cat: "Trabalhista",
    date: "15 Abr 2026",
    description: "Tudo o que você precisa saber sobre as novas parcelas e regras do seguro desemprego em 2026.",
    content: [
      "O seguro-desemprego é um benefício temporário que garante assistência financeira ao trabalhador demitido sem justa causa. Em 2026, o valor das parcelas foi reajustado conforme o novo salário mínimo.",
      "### Quem tem direito?",
      "Trabalhadores CLT demitidos sem justa causa, que não possuam renda própria para seu sustento e que cumpram o tempo de carência (número de meses trabalhados).",
      "### Número de Parcelas",
      "Varia de 3 a 5 parcelas, dependendo de quantas vezes você já solicitou o benefício e do tempo trabalhado nos últimos 36 meses.",
      "### Valor da Parcela",
      "O cálculo é baseado na média dos salários dos últimos 3 meses antes da demissão, respeitando o teto estabelecido pelo governo para 2026."
    ],
    ctaLabel: "Calcular Seguro Desemprego",
    ctaLink: "/trabalhista/seguro-desemprego"
  },
  "sac-vs-price": {
    title: "SAC ou Price: Qual a melhor tabela de financiamento?",
    cat: "Financeiro",
    date: "20 Abr 2026",
    description: "Compare os dois principais sistemas de amortização do Brasil e escolha o melhor para seu bolso.",
    content: [
      "Ao financiar um imóvel ou veículo, você geralmente deve escolher entre a Tabela SAC e a Tabela Price. A escolha certa pode economizar milhares de reais em juros.",
      "### Tabela SAC (Sistema de Amortização Constante)",
      "Neste sistema, o valor da amortização é fixo. Como os juros incidem sobre o saldo devedor (que diminui todo mês), as parcelas começam mais altas e vão reduzindo ao longo do tempo.",
      "### Tabela Price (Sistema Francês)",
      "Aqui, as parcelas são fixas do início ao fim. No começo, a maior parte da prestação é juros e uma pequena parte é amortização. Ao final, a proporção se inverte.",
      "### Qual escolher?",
      "O SAC costuma ter um custo total (soma de juros) menor, mas exige uma renda maior para aprovação devido às parcelas iniciais elevadas. O Price oferece previsibilidade e parcelas iniciais menores."
    ],
    ctaLabel: "Simular Financiamento",
    ctaLink: "/financeiro/financiamento"
  },
  "guia-aposentadoria": {
    title: "Como planejar sua aposentadoria em 2026",
    cat: "Previdência",
    date: "08 Mai 2026",
    description: "Entenda as regras atuais, idade mínima e tempo de contribuição para se aposentar pelo INSS.",
    content: [
      "Planejar a aposentadoria é essencial para garantir tranquilidade no futuro. Em 2026, as regras de transição da Reforma da Previdência continuam avançando.",
      "### Principais Requisitos",
      "1. **Idade Mínima**: Gradualmente aumentada para homens e mulheres.",
      "2. **Tempo de Contribuição**: Período mínimo de pagamentos ao INSS.",
      "3. **Regras de Transição**: Pedágio, sistema de pontos e idade mínima progressiva.",
      "### Dica de Planejamento",
      "Quanto antes você começar a contribuir e diversificar seus investimentos (como a previdência privada), menos dependerá exclusivamente do teto do INSS."
    ],
    ctaLabel: "Simular Minha Aposentadoria",
    ctaLink: "/previdencia/aposentadoria"
  },
  "guia-irrf-2026": {
    title: "Tabela IRRF 2026: Como calcular o imposto retido",
    cat: "Trabalhista",
    date: "09 Mai 2026",
    description: "Confira a tabela atualizada do Imposto de Renda 2026 e aprenda a calcular o desconto no seu salário.",
    content: [
      "O Imposto de Renda Retido na Fonte (IRRF) incide sobre os rendimentos do trabalho. Em 2026, as alíquotas e faixas de isenção foram atualizadas.",
      "### Tabela Progressiva",
      "O cálculo é baseado em faixas: quanto maior o salário, maior a alíquota (que varia de 7,5% a 27,5%). Existe uma parcela a deduzir para cada faixa.",
      "### Deduções Permitidas",
      "Para reduzir o imposto, você pode deduzir valores por dependente, pensão alimentícia e a própria contribuição ao INSS.",
      "### Como calcular?",
      "Subtraia o INSS do salário bruto, aplique a alíquota da faixa correspondente sobre o resultado e, por fim, subtraia a parcela a deduzir da tabela oficial."
    ],
    ctaLabel: "Calcular meu IRRF",
    ctaLink: "/trabalhista/irrf"
  },
  "guia-ferias-clt": {
    title: "Cálculo de Férias: Entenda o terço constitucional",
    cat: "Trabalhista",
    date: "09 Mai 2026",
    description: "Saiba quanto você vai receber ao tirar férias, incluindo o adicional de 1/3 e o abono pecuniário.",
    content: [
      "Todo trabalhador CLT tem direito a 30 dias de descanso após 12 meses de trabalho. O pagamento das férias deve ocorrer até 2 dias antes do início do descanso.",
      "### O Adicional de 1/3",
      "A Constituição garante que o valor das férias seja acrescido de, no mínimo, um terço do salário normal.",
      "### Abono Pecuniário (Venda de Férias)",
      "Você pode optar por 'vender' até 10 dias das suas férias para a empresa, recebendo o valor correspondente em dinheiro.",
      "### Férias Proporcionais",
      "Em caso de saída da empresa antes de completar 12 meses, você tem direito a receber o valor proporcional aos meses trabalhados."
    ],
    ctaLabel: "Calcular minhas Férias",
    ctaLink: "/trabalhista/ferias"
  },
  "pedir-demissao-2-anos": {
    title: "Quanto recebo se pedir demissão com 2 anos de empresa?",
    cat: "Trabalhista",
    date: "09 Mai 2026",
    description: "Saiba exatamente quais são seus direitos e valores ao solicitar desligamento após 24 meses.",
    content: [
      "Pedir demissão após dois anos de casa é uma decisão comum de carreira. No entanto, muitos trabalhadores não sabem que ao tomar essa iniciativa, abrem mão de certas verbas que teriam em uma demissão sem justa causa.",
      "### O que você RECEBE:",
      "1. **Saldo de Salário**: Os dias trabalhados no último mês.",
      "2. **13º Proporcional**: Meses trabalhados no ano corrente.",
      "3. **Férias Vencidas**: Se houver, com o acréscimo de 1/3.",
      "4. **Férias Proporcionais**: Referentes ao período aquisitivo atual, com 1/3.",
      "### O que você NÃO recebe:",
      "Ao pedir demissão, você **não tem direito** ao aviso prévio indenizado (deve cumprir ou ser descontado), não saca o FGTS e não recebe a multa de 40%, além de não ter direito ao Seguro Desemprego.",
      "### Vale a pena?",
      "Faça a conta! Às vezes, negociar um acordo (conforme a nova lei de 2017) pode garantir o saque de 80% do FGTS e metade da multa."
    ],
    ctaLabel: "Simular Pedido de Demissão",
    ctaLink: "/trabalhista/rescisao"
  },
  "rendimento-cdb": {
    title: "Como calcular o rendimento do CDB em 2026",
    cat: "Financeiro",
    date: "10 Mai 2026",
    description: "Entenda como a taxa Selic e o CDI afetam o rendimento dos seus investimentos em renda fixa.",
    content: [
      "O Certificado de Depósito Bancário (CDB) é um dos investimentos mais populares do Brasil. Ele funciona como um empréstimo que você faz ao banco em troca de juros.",
      "### CDI e Selic",
      "A maioria dos CDBs rende um percentual do CDI, que caminha muito próximo à taxa Selic. Em 2026, é fundamental acompanhar as decisões do COPOM.",
      "### Imposto de Renda (Tabela Regressiva)",
      "Diferente da poupança, o CDB tem desconto de IR sobre o lucro. A alíquota cai de 22,5% para até 15% dependendo do tempo que o dinheiro ficar investido.",
      "### Liquidez Diária vs. Vencimento",
      "Escolha CDBs de liquidez diaira para reserva de emergência e CDBs com prazo fechado para buscar rentabilidades maiores."
    ],
    ctaLabel: "Calcular Rendimento CDB",
    ctaLink: "/financeiro/rendimento-cdb"
  },
  "como-calcular-hora-extra": {
    title: "Como calcular hora extra em 2026",
    cat: "Trabalhista",
    date: "10 Mai 2026",
    description: "Aprenda a calcular o valor das suas horas adicionais com 50%, 100% e o adicional noturno.",
    content: [
      "As horas extras são aquelas trabalhadas além da jornada normal contratada. Em 2026, a legislação mantém os percentuais mínimos de acréscimo.",
      "### Valor da Hora Comum",
      "Divida seu salário bruto pelo número de horas mensais (ex: 220h) para encontrar o valor da sua hora normal.",
      "### Adicional de 50% e 100%",
      "1. **Dias Úteis**: Acréscimo de 50% sobre a hora normal.",
      "2. **Domingos e Feriados**: Acréscimo de 100% (dobro da hora normal).",
      "### Adicional Noturno",
      "Se a hora extra for feita entre 22h e 5h, incide também o adicional noturno (mínimo 20% no meio urbano)."
    ],
    ctaLabel: "Calcular Minhas Horas Extra",
    ctaLink: "/trabalhista/hora-extra"
  },
  "salario-minimo-2026": {
    title: "Salário Mínimo 2026: Valor atualizado e impactos",
    cat: "Trabalhista",
    date: "10 Mai 2026",
    description: "Confira o novo valor do salário mínimo em 2026 e como ele afeta benefícios e aposentadorias.",
    content: [
      "O salário mínimo é o menor valor que uma empresa pode pagar a um funcionário. Em 2026, o reajuste seguiu a política de valorização acima da inflação.",
      "### Valor Vigente",
      "O valor oficial para 2026 é utilizado como base para o cálculo de diversos benefícios sociais e trabalhistas.",
      "### O que muda com o reajuste?",
      "1. **Aposentadorias e Pensões**: O piso do INSS acompanha o mínimo.",
      "2. **Seguro-Desemprego**: O valor das parcelas também é reajustado.",
      "3. **PIS/PASEP**: O abono salarial tem o teto de um salário mínimo.",
      "### Impacto para as Empresas",
      "O custo total do funcionário aumenta proporcionalmente, afetando também o recolhimento de FGTS e INSS."
    ],
    ctaLabel: "Explorar Calculadoras Trabalhistas",
    ctaLink: "/trabalhista"
  },
  "pj-vs-clt": {
    title: "PJ ou CLT: Qual vale mais a pena em 2026?",
    cat: "Trabalhista",
    date: "10 Mai 2026",
    description: "Compare os ganhos reais e benefícios de cada modelo e escolha o melhor para sua carreira.",
    content: [
      "Decidir entre ser um profissional PJ (Pessoa Jurídica) ou trabalhar com carteira assinada (CLT) é um dos maiores dilemas de carreira em 2026. A resposta depende não apenas do salário bruto, mas de todos os benefícios e encargos envolvidos.",
      "### Vantagens da CLT",
      "1. **Segurança**: Seguro-desemprego, aviso prévio e estabilidade relativa.",
      "2. **Benefícios**: 13º salário, férias remuneradas (+1/3) e FGTS (8% mensais).",
      "3. **Previdência**: Contribuição direta para o INSS com teto garantido.",
      "### Vantagens do PJ",
      "1. **Liberdade**: Maior flexibilidade de horários e múltiplos clientes.",
      "2. **Ganho Líquido**: Geralmente o valor bruto é maior, e a carga tributária (Simples Nacional) pode ser menor.",
      "### Regra de Ouro",
      "Como regra geral, para manter o mesmo padrão de vida, um contrato PJ deve pagar entre 30% a 50% a mais que o salário bruto da CLT."
    ],
    ctaLabel: "Comparar PJ vs CLT Agora",
    ctaLink: "/trabalhista/pj-vs-clt"
  },
  "guia-13-salario": {
    title: "Guia do 13º Salário: Datas e como calcular",
    cat: "Trabalhista",
    date: "10 Mai 2026",
    description: "Saiba quando você recebe a primeira e segunda parcela da gratificação natalina em 2026.",
    content: [
      "O 13º salário é um direito de todo trabalhador formal. Em 2026, as datas de pagamento seguem o cronograma tradicional estabelecido por lei.",
      "### Datas de Pagamento",
      "1. **1ª Parcela**: Deve ser paga entre 1º de fevereiro e 30 de novembro.",
      "2. **2ª Parcela**: Deve ser paga até o dia 20 de dezembro.",
      "### Como é feito o cálculo?",
      "O valor é proporcional aos meses trabalhados no ano. Se trabalhou o ano todo, recebe um salário extra. Se trabalhou parte do ano, o cálculo é (Salário / 12) * número de meses.",
      "### Descontos",
      "Atenção: a primeira parcela é paga sem descontos. Todos os descontos de INSS e IRRF incidem integralmente sobre a segunda parcela."
    ],
    ctaLabel: "Calcular Meu 13º Salário",
    ctaLink: "/trabalhista/decimo-terceiro"
  },
  "guia-calculadora-gestacional": {
    title: "Guia da Gestação: Como contar as semanas",
    cat: "Saúde",
    date: "10 Mai 2026",
    description: "Entenda o cálculo da idade gestacional e a data provável do parto (DPP).",
    content: [
      "Descobrir uma gravidez traz a dúvida: de quantas semanas estou? Médicos utilizam a data da última menstruação (DUM) para o cálculo padrão.",
      "### Por que contar por semanas?",
      "A gestação humana dura em média 40 semanas. Contar por semanas é mais preciso que meses, pois permite acompanhar marcos específicos do desenvolvimento fetal.",
      "### Data Provável do Parto (DPP)",
      "A DPP é apenas uma estimativa. Apenas 5% dos bebês nascem exatamente no dia calculado. O parto é considerado 'a termo' entre a 37ª e 42ª semana.",
      "### Trimestres",
      "A gravidez é dividida em três trimestres, cada um com desafios e exames específicos necessários para a saúde da mãe e do bebê."
    ],
    ctaLabel: "Calcular Idade Gestacional",
    ctaLink: "/saude/gestacional"
  },
  "guia-regra-de-tres": {
    title: "Como fazer Regra de Três Simples e Composta",
    cat: "Matemática",
    date: "10 Mai 2026",
    description: "Aprenda o passo a passo para resolver problemas de proporcionalidade direta e inversa.",
    content: [
      "A regra de três é uma das ferramentas matemáticas mais úteis do dia a dia. Ela permite descobrir um valor desconhecido a partir de outros três que guardam uma proporção entre si.",
      "### Regra de Três Simples",
      "Utilizada quando temos apenas duas grandezas. Pode ser Direta (quando uma aumenta, a outra também aumenta) ou Inversa (quando uma aumenta, a outra diminui).",
      "### Passo a Passo",
      "1. Monte a tabela agrupando as grandezas da mesma espécie.",
      "2. Identifique se são diretamente ou inversamente proporcionais.",
      "3. Monte a equação e resolva para X.",
      "### Regra de Três Composta",
      "Envolve três ou mais grandezas. O processo é similar, mas requer atenção redobrada na análise de proporcionalidade de cada grandeza em relação àquela que contém o X."
    ],
    ctaLabel: "Resolver Regra de Três Agora",
    ctaLink: "/matematica/regra-de-tres"
  },
  "porcentagem-guia-rapido": {
    title: "Como calcular porcentagem: Guia rápido e prático",
    cat: "Matemática",
    date: "10 Mai 2026",
    description: "Aprenda a calcular descontos, aumentos e variações percentuais sem complicação.",
    content: [
      "O cálculo de porcentagem está presente em quase tudo: descontos em lojas, taxas de juros, multas e estatísticas. 'Por cento' significa literalmente 'por cada cem'.",
      "### Como calcular?",
      "A forma mais simples é multiplicar o valor total pela taxa percentual e dividir por 100. Exemplo: 20% de 500 é (500 * 20) / 100 = 100.",
      "### Aumento e Desconto",
      "1. **Aumento**: Multiplique por (1 + taxa). Ex: aumento de 10% -> valor * 1.10.",
      "2. **Desconto**: Multiplique por (1 - taxa). Ex: desconto de 15% -> valor * 0.85.",
      "### Variação Percentual",
      "Para saber quanto um valor cresceu ou diminuiu: ((Valor Final / Valor Inicial) - 1) * 100."
    ],
    ctaLabel: "Usar Calculadora de Porcentagem",
    ctaLink: "/matematica/porcentagem"
  },
  "guia-emprestimo": {
    title: "Empréstimo Pessoal: Como conseguir as melhores taxas",
    cat: "Financeiro",
    date: "11 Mai 2026",
    description: "Dicas essenciais para comparar empréstimos e entender o Custo Efetivo Total (CET).",
    content: [
      "Contratar um empréstimo pessoal exige cautela. O valor da parcela é apenas um dos fatores a considerar. O mais importante é o CET (Costo Efectivo Total).",
      "### O que é o CET?",
      "O CET engloba não apenas os juros, mas também tarifas bancárias, seguros e impostos (como o IOF). É o valor real que você está pagando pelo dinheiro emprestado.",
      "### Dicas para Economizar",
      "1. **Compare sempre**: Use nosso simulador para ver o impacto dos juros no longo prazo.",
      "2. **Cuidado com o Seguro Prestamista**: Muitas vezes ele é opcional e encarece o contrato.",
      "3. **Antecipe Parcelas**: Se sobrar dinheiro, antecipar as últimas parcelas garante um desconto proporcional nos juros."
    ],
    ctaLabel: "Simular Meu Empréstimo",
    ctaLink: "/financeiro/emprestimo"
  }
}

export const ARTICULOS_ES: Record<string, ArticleContent> = {
  "renuncia-2-anos": {
    title: "¿Cuánto recibo si renuncio después de 2 años?",
    cat: "Laboral",
    date: "09 May 2026",
    description: "Conozca sus derechos y beneficios económicos al solicitar la baja voluntaria tras 24 meses.",
    content: [
      "Renunciar a un empleo tras dos años es un paso importante. Es fundamental entender qué conceptos se le deben pagar y cuáles pierde al ser usted quien toma la iniciativa.",
      "### Lo que SÍ recibe:",
      "1. **Salario Pendiente**: Los días trabajados en el mes de la renuncia.",
      "2. **Aguinaldo Proporcional**: La parte proporcional del décimo tercero.",
      "3. **Vacaciones Pendientes**: Días no disfrutados con el adicional legal.",
      "4. **Vacaciones Proporcionales**: Del periodo actual en curso.",
      "### Lo que NO recibe:",
      "Generalmente, al renunciar voluntariamente, se pierde el derecho a indemnizaciones por despido, preaviso pagado por la empresa y el acceso inmediato a fondos de desempleo (según el país).",
      "### Recomendación:",
      "Revise siempre su contrato y la legislación local. En algunos casos, un acuerdo mutuo puede ser más beneficioso para ambas partes."
    ],
    ctaLabel: "Simular Mi Renuncia",
    ctaLink: "/es/laboral/rescisao"
  },
  "liquidacion-2026": {
    title: "¿Cómo calcular su liquidación en 2026?",
    cat: "Laboral",
    date: "04 May 2026",
    description: "Guía completa sobre conceptos de liquidación, plazos y derechos del trabajador in 2026.",
    content: [
      "Dejar un empleo genera muchas dudas, especialmente sobre cuánto tiene derecho a recibir. En 2026, las reglas siguen los estándares legales con tablas de impuestos actualizadas.",
      "### Conceptos Principales",
      "1. **Salario Pendiente**: Días trabajados en el último mes.",
      "2. **Aviso Previo**: Indemnización por falta de preaviso según ley.",
      "3. **Vacaciones Proporcionales**: Pago de los días no disfrutados.",
      "4. **Décimo Tercero / Aguinaldo**: Parte proporcional del año actual.",
      "5. **Indemnización por Despido**: En casos de despido sin causa justa.",
      "### Plazo de Pago",
      "La empresa debe efectuar el pago en los plazos legales, generalmente inmediatamente tras el fin del contrato."
    ],
    ctaLabel: "Calcular Mi Liquidación Ahora",
    ctaLink: "/es/laboral/rescisao"
  },
  "interes-compuesto": {
    title: "Interés Compuesto: El secreto de la riqueza",
    cat: "Finanzas",
    date: "02 May 2026",
    description: "Entienda cómo el interés sobre interés puede acelerar sus inversiones a largo plazo.",
    content: [
      "El interés compuesto es considerado la 'octava maravilla del mundo'. A diferencia del interés simple, aquí los intereses se reinvierten para generar nuevos intereses.",
      "### La Fórmula de la Riqueza",
      "La fórmula básica es M = C(1 + i)^t, onde el tiempo (t) es el factor más importante. Cuanto antes empiece, mayor será el efecto 'bola de nieve'.",
      "### ¿Dónde encontrar Interés Compuesto?",
      "Inversiones como Bonos, Depósitos a Plazo y Fondos de Inversión utilizan este sistema."
    ],
    ctaLabel: "Simular Mis Inversiones",
    ctaLink: "/es/financiero/juros-compostos"
  },
  "salario-neto": {
    title: "Guia del Salario Neto: ¿A dónde va su dinero?",
    cat: "Laboral",
    date: "28 Abr 2026",
    description: "Entienda la diferencia entre salario bruto y neto y cómo funcionan las deducciones legales.",
    content: [
      "El salario neto es el valor que efectivamente recibe en su cuenta tras todos los descuentos obligatorios. Entender estas deducciones es vital para su planificación financiera.",
      "### Deducciones Comunes",
      "1. **Seguridad Social**: Contribución para jubilación y beneficios sociales.",
      "2. **Impuesto sobre la Renta**: Impuesto que varía según el nivel de ingresos.",
      "### Importancia del Cálculo",
      "Conocer su salario neto real le permite negociar mejores contratos y entender su verdadero poder adquisitivo."
    ],
    ctaLabel: "Calcular Salario Neto",
    ctaLink: "/es/laboral/salario-liquido"
  },
  "imc-salud": {
    title: "IMC: Cómo interpretar sus resultados",
    cat: "Salud",
    date: "25 Abr 2026",
    description: "Sepa qué significa su Índice de Masa Corporal y cuáles son los rangos saludables.",
    content: [
      "El Índice de Masa Corporal (IMC) es una medida simple pero efectiva para evaluar si su peso es adecuado para su estatura.",
      "### Rangos del IMC",
      "1. **Menos de 18,5**: Bajo peso.",
      "2. **18,5 a 24,9**: Peso saludable.",
      "3. **25 a 29,9**: Sobrepeso.",
      "4. **30 o más**: Obesidad.",
      "### Recomendación",
      "El IMC es una guía inicial. Siempre consulte con un profesional de la salud para una evaluación completa de su composición corporal."
    ],
    ctaLabel: "Calcular Mi IMC",
    ctaLink: "/es/salud/imc"
  },
  "seguro-desempleo": {
    title: "Seguro de Desempleo 2026: ¿Quién tiene derecho y cómo calcular?",
    cat: "Laboral",
    date: "15 Abr 2026",
    description: "Todo lo que necesita saber sobre los nuevos pagos y reglas del seguro de desempleo en 2026.",
    content: [
      "El seguro de desempleo es un beneficio temporal que garantiza asistencia financiera al trabajador despedido sin causa justa.",
      "### ¿Quién tiene derecho?",
      "Trabajadores que han sido despedidos sin causa justa y que cumplen con el tiempo mínimo de servicio requerido por la ley.",
      "### Monto del Beneficio",
      "El cálculo se basa en el promedio de los últimos salarios, respetando los límites legales establecidos para el año 2026.",
      "### Duración",
      "El número de cuotas varía según el tiempo trabajado y la cantidad de veces que se ha solicitado el beneficio anteriormente."
    ],
    ctaLabel: "Calcular Seguro de Desempleo",
    ctaLink: "/es/laboral/seguro-desemprego"
  },
  "sac-o-frances": {
    title: "SAC o Francés: ¿Cuál es el mejor sistema de amortización?",
    cat: "Finanzas",
    date: "20 Abr 2026",
    description: "Compare los dos principales sistemas de amortización y elija el mejor para sus finanzas.",
    content: [
      "Al financiar un inmueble o vehículo, generalmente debe elegir entre el Sistema de Amortización Constante (SAC) o el Sistema Francés (Price).",
      "### Sistema SAC",
      "En este sistema, el monto de amortización es fijo. Las cuotas comienzan más altas y disminuyen con el tiempo a medida que se reducen los intereses sobre el saldo deudor.",
      "### Sistema Francés (Price)",
      "Las cuotas son fijas durante todo el plazo. Al principio, la mayor parte del pago corresponde a intereses, y al final, la mayor parte es amortización del capital.",
      "### ¿Cuál elegir?",
      "El SAC suele resultar en un costo total menor de intereses, pero requiere mayores ingresos iniciales. El sistema Francés ofrece cuotas iniciales más accesibles y previsibilidad total.",
    ],
    ctaLabel: "Simular Financiamiento",
    ctaLink: "/es/financiero/financiamento"
  },
  "guia-jubilacion": {
    title: "Cómo planificar su jubilación en 2026",
    cat: "Previsión",
    date: "08 May 2026",
    description: "Entienda las reglas actuales, edad mínima y tiempo de contribución para jubilarse.",
    content: [
      "Planificar la jubilación es esencial para garantizar tranquilidad en el futuro. En 2026, las regulaciones siguen evolucionando para asegurar la sostenibilidad del sistema.",
      "### Requisitos Principales",
      "1. **Edad Mínima**: Requisito base que varía según el género y tipo de actividad.",
      "2. **Tiempo de Contribución**: Años mínimos de aportes al sistema de seguridad social.",
      "3. **Sistemas de Cálculo**: Cómo se determina el monto mensual de su pensión.",
      "### Consejo de Planificación",
      "No dependa únicamente del sistema público. Complementar con ahorros privados o fondos de inversión es la clave para un retiro digno."
    ],
    ctaLabel: "Simular Mi Jubilación",
    ctaLink: "/es/prevision/aposentadoria"
  },
  "guia-irrf-2026": {
    title: "Impuesto de Renta 2026: Cómo calcular la retención",
    cat: "Laboral",
    date: "09 May 2026",
    description: "Consulte la tabla actualizada del Impuesto sobre la Renta 2026 y aprenda a calcular el desconto in su salario.",
    content: [
      "El impuesto sobre la renta retenido in la fuente se aplica sobre los ingresos del trabajo. En 2026, las tasas y tramos de exención han sido actualizados.",
      "### Tabla Progresiva",
      "El cálculo se basa en tramos: a mayor salario, mayor es la tasa aplicada. Existe un monto a deducir para cada tramo.",
      "### Deducciones Permitidas",
      "Para reducir el impuesto, puede deducir montos por dependientes, pensiones y su propia contribución a la seguridad social.",
      "### ¿Cómo calcular?",
      "Reste la seguridad social del salario bruto, aplique la tasa del tramo correspondiente y, finalmente, reste el monto a deducir de la tabla oficial."
    ],
    ctaLabel: "Calcular mi IRRF",
    ctaLink: "/es/laboral/irrf"
  },
  "guia-vacaciones-clt": {
    title: "Cálculo de Vacaciones: Entienda sus beneficios",
    cat: "Laboral",
    date: "09 May 2026",
    description: "Sepa cuánto recibirá al tomar vacaciones, incluyendo el adicional legal y el bono vacacional.",
    content: [
      "Todo trabajador tiene derecho a un período de descanso tras 12 meses de trabajo continuo. El pago debe realizarse antes del inicio del descanso.",
      "### El Adicional Legal",
      "La ley garantiza que el valor de las vacaciones se incremente en una fracción adicional del salario normal.",
      "### Venta de Vacaciones",
      "En algunos sistemas, puede optar por compensar parte de sus vacaciones por un pago económico adicional.",
      "### Vacaciones Proporcionales",
      "Si termina su contrato antes de cumplir el año, tiene derecho a recibir el valor proporcional al tiempo trabajado."
    ],
    ctaLabel: "Calcular mis Vacaciones",
    ctaLink: "/es/laboral/ferias"
  },
  "rendimiento-cdb": {
    title: "Cómo calcular el rendimiento del CDB en 2026",
    cat: "Finanzas",
    date: "10 May 2026",
    description: "Entienda cómo la tasa Selic e el CDI afectan el rendimiento de sus inversiones en renta fija.",
    content: [
      "El Certificado de Depósito Bancario (CDB) es una de las inversiones más populares. Funciona como un préstamo que usted le hace al banco a cambio de intereses.",
      "### CDI y Selic",
      "La mayoría de los CDB rinden un porcentaje del CDI, que se mantiene muy cerca de la tasa Selic. En 2026, es fundamental seguir las decisiones de política monetaria.",
      "### Impuesto sobre la Renta (Tabla Regresiva)",
      "A diferencia de los ahorros comunes, el CDB tiene un descuento de impuesto sobre el beneficio. La tasa baja del 22,5% hasta el 15% dependiendo del tiempo que el dinero permanezca invertido.",
      "### Liquidez Diaria vs. Vencimiento",
      "Elija CDB de liquidez diaria para su fondo de emergencia y CDB con plazo fijo para buscar mayores rentabilidades."
    ],
    ctaLabel: "Calcular Rendimiento CDB",
    ctaLink: "/es/financiero/rendimento-cdb"
  },
  "como-calcular-hora-extra": {
    title: "Cómo calcular horas extra en 2026",
    cat: "Laboral",
    date: "10 May 2026",
    description: "Aprenda a calcular el valor de sus horas adicionales con recargos del 50%, 100% y recargo nocturno.",
    content: [
      "Las horas extra son aquellas trabajadas más allá de la jornada normal contratada. En 2026, los recargos legales se mantienen según la normativa vigente.",
      "### Valor de la Hora Común",
      "Divida su salario bruto por el número de horas mensuales pactadas para encontrar el valor de su hora normal.",
      "### Recargos del 50% e 100%",
      "1. **Días Laborables**: Recargo del 50% sobre la hora normal.",
      "2. **Domingos e Festivos**: Recargo del 100% (el doble de la hora normal).",
      "### Recargo Nocturno",
      "Si la hora extra se realiza en horario nocturno, se aplica un recargo adicional según la ley de cada país."
    ],
    ctaLabel: "Calcular Mis Horas Extra",
    ctaLink: "/es/laboral/hora-extra"
  },
  "salario-minimo-2026": {
    title: "Salario Mínimo 2026: Valores y repercusiones",
    cat: "Laboral",
    date: "10 May 2026",
    description: "Conozca los nuevos valores del salario mínimo in 2026 y cómo afecta a los beneficios y al mercado laboral.",
    content: [
      "El salario mínimo es la remuneración base legal. En 2026, los ajustes buscan mantener el poder adquisitivo frente a la inflación.",
      "### Impacto Económico",
      "El salario mínimo sirve como referencia para pensiones, subsidios de desempleo y otras ayudas estatales.",
      "### Beneficios Afectados",
      "1. **Pensiones**: Las pensiones mínimas suelen estar ligadas a este valor.",
      "2. **Subsidios**: Ayudas por desempleo o maternidad/paternidad.",
      "### Negociación Colectiva",
      "Muchos sectores utilizan el salario mínimo como base para las tablas salariales de los convenios colectivos."
    ],
    ctaLabel: "Explorar Calculadoras Laborales",
    ctaLink: "/es/laboral"
  },
  "freelance-vs-empleado": {
    title: "¿Freelance o Empleado: Cuál conviene más en 2026?",
    cat: "Laboral",
    date: "10 May 2026",
    description: "Decida entre trabajar de forma independiente o bajo contrato comparando beneficios y salario real.",
    content: [
      "Decidir entre trabajar como freelance (independiente) o como empleado contratado es un dilema común in 2026. La elección depende del equilibrio entre seguridad, beneficios y salario neto real.",
      "### Ventajas del Empleado",
      "1. **Seguridad**: Seguro de desempleo, indemnizaciones por despido y mayor estabilidad legal.",
      "2. **Beneficios**: Aguinaldo (décimo tercero), vacaciones pagas y aportes patronales a la seguridad social.",
      "3. **Previsión**: Contribución automática para la jubilación.",
      "### Ventajas del Freelance",
      "1. **Flexibilidad**: Autonomía de horarios y posibilidad de trabajar con múltiples proyectos internacionales.",
      "2. **Ingreso Neto**: El valor bruto suele ser superior, y la gestión de impuestos puede ser más eficiente según el régimen fiscal.",
      "### El Factor Comparativo",
      "En promedio, para compensar la falta de beneficios corporativos, un contrato como independiente debería pagar entre un 40% y un 60% más que un sueldo base contratado."
    ],
    ctaLabel: "Comparar Freelance vs Empleado",
    ctaLink: "/es/laboral/pj-vs-clt"
  },
  "guia-13-salario": {
    title: "Guía del Aguinaldo: Fechas y cómo calcular",
    cat: "Laboral",
    date: "10 May 2026",
    description: "Sepa cuándo recibe la primera y segunda parte de su gratificación anual in 2026.",
    content: [
      "El aguinaldo o décimo tercer sueldo es un derecho fundamental. En 2026, los plazos de pago se mantienen para asegurar que los trabajadores reciban este beneficio a tiempo.",
      "### Fechas de Pago",
      "1. **Primer Pago**: Generalmente se realiza a mitad de año o antes de diciembre.",
      "2. **Segundo Pago**: Se debe completar antes de las festividades de fin de año.",
      "### ¿Cómo se calcula?",
      "El monto es proporcional a los meses trabajados durante el año calendario. La fórmula básica es (Sueldo mensual / 12) multiplicado por los meses de servicio.",
      "### Deducciones Legales",
      "Tenga en cuenta que el pago final suele incluir los descuentos de seguridad social e impuestos correspondientes al total del beneficio."
    ],
    ctaLabel: "Calcular Mi Aguinaldo",
    ctaLink: "/es/laboral/decimo-terceiro"
  },
  "guia-calculadora-gestacional": {
    title: "Guía de Embarazo: Cómo contar las semanas",
    cat: "Salud",
    date: "10 May 2026",
    description: "Entienda el cálculo de la edad gestacional e la fecha probable de parto (FPP).",
    content: [
      "Al confirmar un embarazo, la primera pregunta es: ¿cuánto tiempo tengo? El método estándar utiliza la fecha de la última regla (FUR).",
      "### La importancia de las semanas",
      "El embarazo se mide en semanas para un seguimiento médico preciso. Un embarazo normal dura unas 40 semanas desde el primer día del último ciclo.",
      "### Fecha Probable de Parto (FPP)",
      "La FPP es una guía estimada. El nacimiento se considera a término si ocurre entre la semana 37 y la 42.",
      "### Etapas del desarrollo",
      "Dividimos el proceso in tres trimestres clave, cada uno con hitos específicos en el crecimiento del bebé y cuidados para la madre."
    ],
    ctaLabel: "Calcular Edad Gestacional",
    ctaLink: "/es/salud/gestacional"
  },
  "guia-regra-de-tres": {
    title: "Cómo hacer Regla de Tres Simple y Compuesta",
    cat: "Matemática",
    date: "10 May 2026",
    description: "Aprenda el paso a paso para resolver problemas de proporcionalidad directa e inversa.",
    content: [
      "La regla de tres es una de las herramientas matemáticas más útiles del día a día. Permite descubrir un valor desconocido a partir de otros tres que guardan una proporción entre sí.",
      "### Regla de Tres Simple",
      "Se utiliza cuando tenemos solo dos magnitudes. Puede ser Directa (cuando una aumenta, la otra también aumenta) o Inversa (cuando una aumenta, la otra disminuye).",
      "### Passo a Passo",
      "1. Organice los datos en una tabla agrupando las magnitudes de la misma especie.",
      "2. Identifique si son directamente o inversamente proporcionales.",
      "3. Plantee la ecuación y despeje la X.",
      "### Regla de Tres Compuesta",
      "Involucra tres o más magnitudes. El proceso es similar, pero requiere analizar la proporcionalidad de cada magnitud respecto a la que contiene la incógnita X."
    ],
    ctaLabel: "Resolver Regla de Tres Ahora",
    ctaLink: "/es/matematica/regra-de-tres"
  },
  "porcentaje-guia-rapida": {
    title: "Cómo calcular porcentajes: Guía rápida y práctica",
    cat: "Matemática",
    date: "10 May 2026",
    description: "Aprenda a calcular descuentos, aumentos y variaciones porcentuales sin complicaciones.",
    content: [
      "El cálculo de porcentajes está presente in casi todo: descuentos en tiendas, tasas de interés, impuestos y estadísticas. 'Por ciento' significa literalmente 'por cada cien'.",
      "### ¿Cómo calcular?",
      "La forma más simple es multiplicar el valor total por la tasa porcentual y dividir por 100. Ejemplo: el 20% de 500 es (500 * 20) / 100 = 100.",
      "### Aumentos y Descuentos",
      "1. **Aumento**: Multiplique por (1 + tasa). Ej: aumento del 10% -> valor * 1.10.",
      "2. **Desconto**: Multiplique por (1 - tasa). Ej: descuento del 15% -> valor * 0.85.",
      "### Variación Porcentual",
      "Para saber cuánto creció o disminuyó un valor: ((Valor Final / Valor Inicial) - 1) * 100."
    ],
    ctaLabel: "Usar Calculadora de Porcentaje",
    ctaLink: "/es/matematica/porcentagem"
  },
  "guia-prestamo": {
    title: "Préstamo Personal: Cómo conseguir las mejores tasas",
    cat: "Finanzas",
    date: "11 May 2026",
    description: "Consejos esenciales para comparar préstamos y entender el Costo Efectivo Total (CET).",
    content: [
      "Contratar un préstamo personal exige cautela. El valor de la cuota es solo uno de los factores a considerar. Lo más importante es el CET (Costo Efectivo Total).",
      "### ¿Qué es el CET?",
      "El CET incluye no solo los intereses, sino también tarifas bancarias, seguros e impuestos. Es el valor real que está pagando por el dinero prestado.",
      "### Consejos para Ahorrar",
      "1. **Compare siempre**: Use nuestro simulador para ver el impacto de los intereses a largo plazo.",
      "2. **Cuidado con los Seguros**: Muchas veces son opcionales y encarecen el contrato.",
      "3. **Anticipe Cuotas**: Si le sobra dinero, anticipar las últimas cuotas garantiza un descuento proporcional en los intereses."
    ],
    ctaLabel: "Simular Mi Préstamo",
    ctaLink: "/es/financiero/emprestimo"
  }
}
