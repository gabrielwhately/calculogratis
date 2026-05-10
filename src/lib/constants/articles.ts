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
      "Vale-transporte (até 6%), plano de saúde, previdência privada e empréstimos consignados são exemplos comuns de deduções facultativas ou contratuais."
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
      "Escolha CDBs de liquidez diária para reserva de emergência e CDBs com prazo fechado para buscar rentabilidades maiores."
    ],
    ctaLabel: "Calcular Rendimento CDB",
    ctaLink: "/financeiro/rendimento-cdb"
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
    description: "Guía completa sobre conceptos de liquidación, plazos y derechos del trabajador en 2026.",
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
      "La fórmula básica es M = C(1 + i)^t, donde el tiempo (t) es el factor más importante. Cuanto antes empiece, mayor será el efecto 'bola de nieve'.",
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
      "El SAC suele resultar en un costo total menor de intereses, pero requiere mayores ingresos iniciales. El sistema Francés ofrece cuotas iniciales más accesibles y previsibilidad total."
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
    description: "Consulte la tabla actualizada del Impuesto sobre la Renta 2026 y aprenda a calcular el descuento en su salario.",
    content: [
      "El impuesto sobre la renta retenido en la fuente se aplica sobre los ingresos del trabajo. En 2026, las tasas y tramos de exención han sido actualizados.",
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
    description: "Entienda cómo la tasa Selic y el CDI afectan el rendimiento de sus inversiones en renta fija.",
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
  }
}
