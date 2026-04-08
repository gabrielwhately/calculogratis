import type { Locale } from './locales'

interface CategoriaI18n {
  nome: string
  slug: string
  descricao: string
}

interface CalculadoraI18n {
  nome: string
  descricao: string
  keywords: string
}

const CATEGORIAS_ES: Record<string, CategoriaI18n> = {
  trabalhista: { nome: 'Laboral', slug: 'laboral', descricao: 'Calculadoras laborales: liquidación, salario neto, seguro de desempleo, vacaciones, aguinaldo, horas extra y más.' },
  financeiro: { nome: 'Financiero', slug: 'financiero', descricao: 'Calculadoras financieras: interés simple y compuesto, financiamiento, préstamos, inversiones, IPVA y más.' },
  previdencia: { nome: 'Previsión', slug: 'prevision', descricao: 'Simuladores de jubilación y previsión social.' },
  saude: { nome: 'Salud', slug: 'salud', descricao: 'Calculadoras de salud: IMC, peso ideal, calorías y TMB, calculadora gestacional y más.' },
  matematica: { nome: 'Matemática', slug: 'matematica', descricao: 'Calculadoras matemáticas: científica, porcentaje, regla de tres, conversor de bases numéricas.' },
  juridica: { nome: 'Jurídica', slug: 'juridica', descricao: 'Calculadoras jurídicas: corrección monetaria, multa por atraso, plazos judiciales y procesales.' },
  conversores: { nome: 'Conversores', slug: 'conversores', descricao: 'Conversores online: peso a dólar, peso a bitcoin, unidades de medida, colores y más.' },
  utilidades: { nome: 'Utilidades', slug: 'utilidades', descricao: 'Herramientas útiles: generadores, validadores, formateadores, cronómetro y más.' },
}

const CALCULADORAS_ES: Record<string, CalculadoraI18n> = {
  'rescisao': { nome: 'Liquidación Laboral', descricao: 'Calcule el valor de su liquidación laboral. Simule despido sin justa causa, renuncia y acuerdo.', keywords: 'liquidación laboral, cálculo liquidación, despido, indemnización' },
  'salario-liquido': { nome: 'Salario Neto', descricao: 'Descubra su salario neto con cálculo automático de deducciones. Tablas actualizadas.', keywords: 'salario neto, cálculo salario, deducciones, salario bruto a neto' },
  'seguro-desemprego': { nome: 'Seguro de Desempleo', descricao: 'Calcule el valor y número de cuotas del seguro de desempleo.', keywords: 'seguro desempleo, cuotas seguro desempleo, valor seguro desempleo' },
  'hora-extra': { nome: 'Horas Extra', descricao: 'Calcule el valor de las horas extra con adicional de 50%, 100% y nocturno.', keywords: 'horas extra, cálculo horas extra, adicional nocturno' },
  'decimo-terceiro': { nome: 'Aguinaldo', descricao: 'Calcule el valor del aguinaldo proporcional e integral.', keywords: 'aguinaldo, cálculo aguinaldo, gratificación' },
  'ferias': { nome: 'Vacaciones', descricao: 'Calcule el valor de las vacaciones con tercio constitucional y deducciones.', keywords: 'cálculo vacaciones, vacaciones laborales, tercio vacaciones' },
  'irrf': { nome: 'Impuesto sobre la Renta', descricao: 'Calcule el Impuesto sobre la Renta retenido en la fuente sobre su salario.', keywords: 'impuesto renta, retención, cálculo impuesto' },
  'custo-clt': { nome: 'Costo Empleado', descricao: 'Calcule el costo total de un empleado para la empresa.', keywords: 'costo empleado, cargas sociales, costo empleador' },
  'pj-vs-clt': { nome: 'Freelance vs Empleado', descricao: 'Compare cuánto necesita ganar como freelance para igualar un salario de empleado.', keywords: 'freelance vs empleado, comparar, autónomo vs dependiente' },
  'adicional-noturno': { nome: 'Adicional Nocturno', descricao: 'Calcule el valor del adicional nocturno sobre su salario.', keywords: 'adicional nocturno, hora nocturna, trabajo nocturno' },
  'insalubridade': { nome: 'Insalubridad y Peligrosidad', descricao: 'Calcule el adicional de insalubridad y peligrosidad sobre su salario.', keywords: 'insalubridad, peligrosidad, adicional insalubridad' },
  'juros-simples': { nome: 'Interés Simple', descricao: 'Calcule interés simple sobre cualquier valor. Informe capital, tasa y período.', keywords: 'interés simple, cálculo interés simple, matemática financiera' },
  'juros-compostos': { nome: 'Interés Compuesto', descricao: 'Calcule interés compuesto con aportes mensuales. Simule inversiones.', keywords: 'interés compuesto, cálculo interés compuesto, simulador inversión' },
  'financiamento': { nome: 'Financiamiento Inmobiliario', descricao: 'Simule financiamiento inmobiliario. Compare cuotas y amortización.', keywords: 'financiamiento inmobiliario, simulador financiamiento, cuota inmueble' },
  'emprestimo': { nome: 'Préstamo Personal', descricao: 'Simule préstamo personal y descubra el valor de las cuotas y el interés total.', keywords: 'préstamo personal, simulador préstamo, cuota préstamo' },
  'simulador-investimentos': { nome: 'Simulador de Inversiones', descricao: 'Simule inversiones en renta fija y variable. Compare opciones.', keywords: 'simulador inversiones, simulador renta fija, rendimiento' },
  'conversor-taxas': { nome: 'Conversor de Tasas', descricao: 'Convierta tasas de interés entre períodos: diaria, mensual y anual.', keywords: 'conversor tasas interés, tasa mensual a anual, tasa equivalente' },
  'ipva': { nome: 'Impuesto Vehicular', descricao: 'Calcule el valor del impuesto vehicular. Alícuotas actualizadas por estado.', keywords: 'impuesto vehicular, cálculo impuesto auto, patente' },
  'calculadora-desconto': { nome: 'Calculadora de Descuento', descricao: 'Calcule el precio final con descuento porcentual. Ideal para compras y promociones.', keywords: 'calculadora descuento, calcular descuento, precio con descuento' },
  'reajuste-aluguel': { nome: 'Reajuste de Alquiler', descricao: 'Calcule el reajuste del alquiler por índice de inflación.', keywords: 'reajuste alquiler, índice alquiler, actualización alquiler' },
  'simulador-importacao': { nome: 'Simulador de Importación', descricao: 'Calcule el costo total de importación incluyendo flete, seguro e impuestos.', keywords: 'simulador importación, impuesto importación, costo importar' },
  'markup': { nome: 'Markup', descricao: 'Calcule el precio de venta ideal a partir del costo del producto.', keywords: 'calculadora markup, margen de ganancia, precio de venta' },
  'rendimento-cdb': { nome: 'Rendimiento Renta Fija', descricao: 'Simule el rendimiento de inversiones en renta fija con tasa de referencia.', keywords: 'rendimiento renta fija, simulador, inversión, impuesto' },
  'aposentadoria': { nome: 'Jubilación', descricao: 'Simule su jubilación. Calcule tiempo de contribución y valor estimado.', keywords: 'jubilación, cálculo jubilación, previsión social' },
  'imc': { nome: 'IMC', descricao: 'Calcule su Índice de Masa Corporal (IMC) y vea la clasificación de la OMS.', keywords: 'IMC, índice de masa corporal, calcular IMC, peso ideal' },
  'peso-ideal': { nome: 'Peso Ideal', descricao: 'Descubra su peso ideal según altura, edad y sexo.', keywords: 'peso ideal, calculadora peso ideal, peso saludable' },
  'calorias-tmb': { nome: 'Calorías y TMB', descricao: 'Calcule su Tasa Metabólica Basal y necesidad calórica diaria.', keywords: 'TMB, tasa metabólica basal, calorías diarias, gasto calórico' },
  'gestacional': { nome: 'Calculadora Gestacional', descricao: 'Calcule la edad gestacional y fecha probable de parto.', keywords: 'calculadora gestacional, fecha probable parto, semanas de gestación' },
  'agua-diaria': { nome: 'Agua Diaria', descricao: 'Descubra cuánta agua debe beber por día según su peso y actividad física.', keywords: 'cuánta agua beber por día, calculadora agua, hidratación' },
  'calculadora-macros': { nome: 'Macronutrientes', descricao: 'Calcule la cantidad ideal de proteínas, carbohidratos y grasas para su objetivo.', keywords: 'calculadora macros, macronutrientes, proteína diaria, dieta' },
  'calculadora-cientifica': { nome: 'Calculadora Científica', descricao: 'Calculadora científica online con funciones trigonométricas, logarítmicas y más.', keywords: 'calculadora científica, calculadora online, seno, coseno, logaritmo' },
  'porcentagem': { nome: 'Porcentaje', descricao: 'Calcule porcentaje de forma rápida: cuánto es X% de Y, variación porcentual.', keywords: 'calculadora porcentaje, calcular porcentaje, variación porcentual' },
  'regra-de-tres': { nome: 'Regla de Tres', descricao: 'Resuelva regla de tres simple y compuesta de forma automática.', keywords: 'regla de tres, regla de tres simple, proporcionalidad' },
  'conversor-bases': { nome: 'Conversor de Bases', descricao: 'Convierta números entre bases: binario, octal, decimal y hexadecimal.', keywords: 'conversor bases numéricas, binario, octal, hexadecimal' },
  'correcao-monetaria': { nome: 'Corrección Monetaria', descricao: 'Calcule la corrección monetaria de valores por índices oficiales.', keywords: 'corrección monetaria, actualización monetaria, inflación' },
  'multa-atraso': { nome: 'Multa por Atraso', descricao: 'Calcule multa e intereses de mora por atraso en pagos.', keywords: 'multa atraso, intereses de mora, cálculo multa' },
  'prazos-judiciais': { nome: 'Plazos Judiciales', descricao: 'Calcule plazos procesales considerando días hábiles y feriados.', keywords: 'plazo judicial, plazo procesal, días hábiles' },
  'real-dolar': { nome: 'Peso a Dólar', descricao: 'Convierta pesos a dólares y dólares a pesos con cotización manual.', keywords: 'peso a dólar, dólar a peso, cotización dólar, conversor moneda' },
  'real-bitcoin': { nome: 'Peso a Bitcoin', descricao: 'Convierta pesos a bitcoin y bitcoin a pesos.', keywords: 'peso a bitcoin, bitcoin a peso, cotización bitcoin, BTC' },
  'conversor-unidades': { nome: 'Conversor de Unidades', descricao: 'Convierta unidades de medida: longitud, peso, volumen, temperatura y más.', keywords: 'conversor unidades, convertir medidas, metros a pies, kilos a libras' },
  'conversor-cores': { nome: 'Conversor de Colores', descricao: 'Convierta colores entre HEX, RGB, HSL y CMYK.', keywords: 'conversor colores, HEX a RGB, RGB a HSL, colores web' },
  'gerador-cpf': { nome: 'Generador de CPF', descricao: 'Genere números de CPF válidos para pruebas de software.', keywords: 'generador CPF, CPF válido, CPF para pruebas' },
  'validador-cpf': { nome: 'Validador de CPF', descricao: 'Verifique si un número de CPF es válido.', keywords: 'validador CPF, verificar CPF' },
  'gerador-cnpj': { nome: 'Generador de CNPJ', descricao: 'Genere números de CNPJ válidos para pruebas de software.', keywords: 'generador CNPJ, CNPJ válido' },
  'validador-cnpj': { nome: 'Validador de CNPJ', descricao: 'Verifique si un número de CNPJ es válido.', keywords: 'validador CNPJ, verificar CNPJ' },
  'gerador-senha': { nome: 'Generador de Contraseñas', descricao: 'Genere contraseñas fuertes y seguras con letras, números y caracteres especiales.', keywords: 'generador contraseña, contraseña fuerte, password generator' },
  'gerador-qrcode': { nome: 'Generador de QR Code', descricao: 'Cree QR Codes gratuitamente para URLs, textos y más.', keywords: 'generador QR Code, crear QR Code, código QR' },
  'calculadora-idade': { nome: 'Calculadora de Edad', descricao: 'Calcule su edad exacta en años, meses y días.', keywords: 'calculadora edad, cuántos años tengo, calcular edad' },
  'dias-entre-datas': { nome: 'Días entre Fechas', descricao: 'Calcule la diferencia entre dos fechas en días, semanas, meses y años.', keywords: 'días entre fechas, diferencia entre fechas, calcular días' },
  'combustivel': { nome: 'Combustible', descricao: 'Descubra si conviene más cargar con etanol o gasolina.', keywords: 'etanol o gasolina, calculadora combustible, comparar combustible' },
  'cronometro': { nome: 'Cronómetro', descricao: 'Cronómetro online gratuito con función de vueltas y cuenta regresiva.', keywords: 'cronómetro online, timer, cuenta regresiva, stopwatch' },
  'contador-caracteres': { nome: 'Contador de Caracteres', descricao: 'Cuente caracteres, palabras, frases y párrafos de su texto.', keywords: 'contador caracteres, contar palabras, word counter' },
  'conversor-base64': { nome: 'Conversor Base64', descricao: 'Codifique y decodifique textos en Base64.', keywords: 'base64, codificar base64, decodificar base64' },
  'formatador-json': { nome: 'Formateador JSON', descricao: 'Formatee, valide y visualice JSON de forma clara.', keywords: 'formateador JSON, JSON beautifier, validar JSON' },
  'gerador-uuid': { nome: 'Generador de UUID', descricao: 'Genere UUIDs v4 únicos y aleatorios.', keywords: 'generador UUID, UUID v4, generar UUID' },
  'gerador-hash': { nome: 'Generador de Hash', descricao: 'Genere hashes MD5, SHA-1, SHA-256 y SHA-512.', keywords: 'generador hash, MD5, SHA-256, criptografía' },
  'gerador-lorem': { nome: 'Generador de Lorem Ipsum', descricao: 'Genere textos Lorem Ipsum para llenar layouts y prototipos.', keywords: 'lorem ipsum, generador lorem ipsum, texto placeholder' },
  'gerador-meta-tags': { nome: 'Generador de Meta Tags', descricao: 'Genere meta tags HTML para SEO: title, description, Open Graph y Twitter Cards.', keywords: 'generador meta tags, meta tags SEO, Open Graph' },
  'preview-html': { nome: 'Preview HTML', descricao: 'Visualice código HTML, CSS y JavaScript en tiempo real.', keywords: 'preview HTML, editor HTML, live preview' },
  'fuso-horario': { nome: 'Huso Horario', descricao: 'Convierta horarios entre husos horarios del mundo entero.', keywords: 'huso horario, convertir horario, diferencia horaria' },
  'consumo-energia': { nome: 'Consumo de Energía', descricao: 'Calcule cuánto gasta cada aparato de energía eléctrica por mes.', keywords: 'consumo energía, calculadora energía, cuenta de luz, kWh' },
  'simulador-consorcio': { nome: 'Simulador de Consorcio', descricao: 'Simule las cuotas y el costo total de un consorcio. Compare con financiamiento.', keywords: 'simulador consorcio, cuota consorcio, tasa administración' },
  'frequencia-cardiaca': { nome: 'Frecuencia Cardíaca', descricao: 'Calcule su frecuencia cardíaca máxima y las zonas de entrenamiento ideales.', keywords: 'frecuencia cardíaca máxima, zonas de entrenamiento, FC máxima, Karvonen' },
  'calculadora-pintura': { nome: 'Calculadora de Pintura', descricao: 'Calcule cuántos litros de pintura necesita para pintar una habitación.', keywords: 'calculadora pintura, cuánta pintura necesito, litros de pintura, m² pintura' },
}

export function getCategoriaES(ptSlug: string): CategoriaI18n | undefined {
  return CATEGORIAS_ES[ptSlug]
}

export function getCalculadoraES(slug: string): CalculadoraI18n | undefined {
  return CALCULADORAS_ES[slug]
}

export function getLocalizedCategoriaSlug(ptSlug: string, locale: Locale): string {
  if (locale === 'pt') return ptSlug
  return CATEGORIAS_ES[ptSlug]?.slug ?? ptSlug
}

export function getLocalizedCalculadoraNome(slug: string, locale: Locale): string {
  if (locale === 'pt') return ''
  return CALCULADORAS_ES[slug]?.nome ?? ''
}

export { CATEGORIAS_ES, CALCULADORAS_ES }
