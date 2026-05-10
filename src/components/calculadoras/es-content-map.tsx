import React from 'react'

export const ES_CONTENT_MAP: Record<string, React.ReactNode> = {
  'rescisao': (
    <>
      <h2>Cómo funciona el cálculo de liquidación laboral en 2026</h2>
      <p>El cálculo de liquidación laboral (rescisão) involucra diversos pagos que dependen del <strong>tipo de despido</strong>, el tiempo de servicio y el salario del trabajador. Para obtener el valor correcto, nuestra calculadora considera automáticamente el saldo de salario, el aviso previo proporcional, las vacaciones proporcionales y vencidas con el adicional de 1/3, el aguinaldo proporcional (13º salário) y la multa del FGTS.</p>
      <p>Todos los descuentos de seguridad social e impuesto de renta se aplican según las tablas vigentes en 2026, garantizando un resultado preciso y actualizado.</p>

      <h3>Los cuatro tipos de despido y sus derechos</h3>
      <p>No todas las salidas del empleo generan los mismos derechos. Vea qué cambia en cada modalidad:</p>
      <ol>
        <li><strong>Despido sin justa causa:</strong> el trabajador recibe el paquete completo, incluyendo la multa del 40% del FGTS, el retiro integral del fondo y el derecho al seguro de desempleo.</li>
        <li><strong>Renuncia:</strong> iniciativa del empleado. En este caso, no hay multa del FGTS ni seguro de desempleo.</li>
        <li><strong>Despido por justa causa:</strong> ocurre por faltas graves. El trabajador recibe solo el saldo de salario y vacaciones vencidas.</li>
        <li><strong>Acuerdo mutuo:</strong> prevé el 50% del aviso previo indemnizado y el 20% de la multa del FGTS.</li>
      </ol>
    </>
  ),
  'salario-liquido': (
    <>
      <h2>Cómo calcular el salario neto en Brasil (2026)</h2>
      <p>El salario neto es la cantidad que realmente recibe el trabajador después de todos los descuentos legales. Los dos descuentos principales son el INSS (Seguridad Social) y el IRRF (Impuesto de Renta).</p>
      <p>Nuestra calculadora utiliza las tablas oficiales de 2026 para realizar el cálculo progresivo, asegurando que sepas exactamente cuánto llegará a tu cuenta bancaria a fin de mes.</p>
    </>
  ),
  'juros-compostos': (
    <>
      <h2>El poder del interés compuesto</h2>
      <p>El interés compuesto es aquel que se calcula sobre el capital inicial y también sobre los intereses acumulados de períodos anteriores. Es fundamental para quienes desean ver crecer su patrimonio a largo plazo.</p>
      <p>Usa nuestro simulador para proyectar tus inversiones, considerando aportes mensuales y diferentes tasas de rentabilidad.</p>
    </>
  ),
  'imc': (
    <>
      <h2>¿Qué es el IMC y cómo se calcula?</h2>
      <p>El Índice de Masa Corporal (IMC) es una medida internacional utilizada para calcular si una persona está en su peso ideal. Fue desarrollado por la OMS para identificar casos de desnutrición o obesidad.</p>
      <p>La fórmula es simple: peso dividido por el cuadrado de la altura (kg/m²). Nuestra herramienta clasifica tu resultado instantáneamente.</p>
    </>
  ),
  'ferias': (
    <>
      <h2>Cálculo de vacaciones (CLT 2026)</h2>
      <p>Todo trabajador bajo el régimen CLT tiene derecho a 30 días de vacaciones después de cada 12 meses de trabajo. El pago incluye el salario bruto más el <strong>tercio constitucional</strong>.</p>
      <p>Nuestra calculadora desglosa los valores de los días de descanso, el adicional de 1/3 y los descuentos de INSS e IRRF, permitiéndote simular también el abono pecuniario (vender 10 días).</p>
    </>
  ),
  'decimo-terceiro': (
    <>
      <h2>Aguinaldo o Décimo Tercer Sueldo</h2>
      <p>El aguinaldo es una gratificación obligatoria que se paga a los trabajadores al final del año. Se calcula proporcionalmente a los meses trabajados (cada mes con más de 15 días cuenta como mes completo).</p>
      <p>Simula el valor de la primera cuota (pagada hasta noviembre) y la segunda cuota (con descuentos, pagada hasta diciembre).</p>
    </>
  ),
  'seguro-desemprego': (
    <>
      <h2>Seguro de Desempleo 2026</h2>
      <p>El seguro de desempleo es una asistencia financiera temporal para trabajadores despedidos sin justa causa. El valor y el número de cuotas dependen del tiempo trabajado y de cuántas veces se ha solicitado previamente.</p>
      <p>Utiliza nuestra calculadora para verificar si tienes derecho y cuál será el monto mensual de tu beneficio según las nuevas franjas salariales.</p>
    </>
  ),
  'hora-extra': (
    <>
      <h2>Cómo calcular horas extras</h2>
      <p>Las horas extras se pagan con un adicional sobre el valor de la hora normal. Generalmente, el adicional es del 50% para días hábiles y del 100% para domingos y feriados.</p>
      <p>Nuestra herramienta también considera el adicional nocturno si tu jornada se extiende después de las 22:00, asegurando un cálculo preciso según la legislación brasileña.</p>
    </>
  ),
  'financiamento': (
    <>
      <h2>Simulador de Financiamiento (Price y SAC)</h2>
      <p>Al financiar un inmueble o vehículo, elegir el sistema de amortización correcto puede ahorrarte miles de reales. Los dos sistemas principales son:</p>
      <ul>
        <li><strong>SAC (Sistema de Amortización Constante):</strong> las cuotas empiezan más altas y disminuyen con el tiempo.</li>
        <li><strong>Price (Francés):</strong> las cuotas son fijas durante todo el contrato.</li>
      </ul>
      <p>Compara ambos sistemas y ve el costo total efectivo de tu financiamiento.</p>
    </>
  ),
  'aposentadoria': (
    <>
      <h2>Simulación de Jubilación (INSS)</h2>
      <p>Con las reglas actuales de la previsión social, es fundamental planificar con antelación. Las reglas varían según la edad, el tiempo de contribución y el tipo de transición.</p>
      <p>Calcula cuánto tiempo te falta para jubilarte y obtén una estimación del valor de tu beneficio futuro.</p>
    </>
  ),
  'juros-simples': (
    <>
      <h2>¿Qué son los intereses simples?</h2>
      <p>El interés simple es el beneficio que produce un capital prestado, el cual se calcula siempre sobre el monto original. A diferencia del interés compuesto, los intereses ganados no se suman al capital para generar nuevos intereses.</p>
      <p>Es ideal para cálculos rápidos de préstamos a corto plazo o inversiones donde el rendimiento se retira periódicamente.</p>
    </>
  ),
  'emprestimo': (
    <>
      <h2>Simulador de Préstamos Personales</h2>
      <p>Antes de contratar un crédito, es vital conocer el costo real. Nuestra calculadora te ayuda a entender el valor de las cuotas mensuales y el monto total que habrás pagado al final del contrato.</p>
      <p>Ten en cuenta siempre el <strong>CET (Costo Efectivo Total)</strong>, que incluye no solo los intereses, sino también tasas y seguros bancarios.</p>
    </>
  ),
  'simulador-investimentos': (
    <>
      <h2>Simulador de Inversiones</h2>
      <p>Proyecta el crecimiento de tu dinero en diferentes escenarios. Compara el rendimiento de renta fija (como CDB o Tesoro) frente a otras opciones.</p>
      <p>Considera la inflación y los impuestos para descubrir cuál es la rentabilidad real de tu inversión a medio y largo plazo.</p>
    </>
  ),
  'peso-ideal': (
    <>
      <h2>Cómo descubrir tu peso saludable</h2>
      <p>El peso ideal varía para cada persona según su estatura, edad y complexión física. Nuestra herramienta utiliza fórmulas científicas reconocidas (como Devine y Robinson) para ofrecerte un rango de peso saludable.</p>
      <p>Recuerda que estas métricas son referenciales y siempre es recomendable consultar con un profesional de la salud o nutrición.</p>
    </>
  ),
  'calorias-tmb': (
    <>
      <h2>Calculadora de TMB y Calorías Diarias</h2>
      <p>La Tasa Metabólica Basal (TMB) es la cantidad mínima de energía que tu cuerpo necesita para funcionar en reposo. Conocer este valor es el primer paso para planificar una dieta efectiva.</p>
      <p>Dependiendo de tu nivel de actividad física, nuestra calculadora estima cuántas calorías debes consumir diariamente para mantener, perder o ganar peso.</p>
    </>
  ),
  'porcentagem': (
    <>
      <h2>Cálculos de Porcentaje Rápidos</h2>
      <p>El porcentaje es una de las herramientas matemáticas más usadas en el día a día: desde calcular descuentos en tiendas hasta aumentos salariales o variaciones en inversiones.</p>
      <p>Usa nuestras tres modalidades: cuánto es X% de un valor, qué porcentaje representa A de B, y el porcentaje de aumento o descuento entre dos valores.</p>
    </>
  ),
  'regra-de-tres': (
    <>
      <h2>Regla de Tres Simple</h2>
      <p>La regla de tres es un método para resolver problemas de proporcionalidad entre tres valores conocidos y una incógnita. Puede ser directa (cuando una magnitud aumenta, la otra también) o inversa.</p>
      <p>Nuestra herramienta resuelve ambos casos automáticamente, ahorrándote tiempo y evitando errores de cálculo manual.</p>
    </>
  ),
  'fuso-horario': (
    <>
      <h2>Calculadora de Diferencia Horaria</h2>
      <p>Con la globalización y el trabajo remoto, saber la hora exacta en diferentes partes del mundo es esencial. Nuestra herramienta te permite convertir el horario de Brasil (Brasilia) a cualquier otra zona horaria instantáneamente.</p>
      <p>Ten en cuenta el horario de verano (Daylight Saving Time) que algunos países aplican en diferentes épocas del año para evitar errores en tus reuniones o viajes.</p>
    </>
  ),
  'reajuste-aluguel': (
    <>
      <h2>Cómo calcular el reajuste del alquiler</h2>
      <p>En Brasil, los contratos de alquiler suelen reajustarse anualmente basándose en índices de inflación. Los más comunes son el <strong>IGP-M</strong> (Índice General de Precios de Mercado) y el <strong>IPCA</strong> (Índice de Precios al Consumidor Amplio).</p>
      <p>Simplemente ingresa el valor actual de tu alquiler y elige el índice para ver el nuevo valor actualizado según el acumulado de los últimos 12 meses.</p>
    </>
  ),
  'rendimento-cdb': (
    <>
      <h2>Rendimiento de Renta Fija (CDB, LCI y LCA)</h2>
      <p>El CDB (Certificado de Depósito Bancario) es uno de los instrumentos de renta fija más populares en Brasil. Su rentabilidad suele estar ligada al <strong>CDI</strong>, que sigue de cerca la tasa básica de interés (Selic).</p>
      <p>Nuestra calculadora aplica automáticamente la <strong>tabla regresiva del Impuesto de Renta (IR)</strong> según el plazo de la inversión, permitiéndote comparar el valor bruto frente al valor líquido (lo que realmente recibes).</p>
    </>
  ),
  'markup': (
    <>
      <h2>Cómo calcular el precio de venta ideal (Markup)</h2>
      <p>El Markup es un índice que se aplica sobre el costo de un producto para determinar su precio de venta. Debe cubrir los gastos fijos, variables y el margen de lucro deseado.</p>
      <p>Usar un markup correcto asegura que tu negocio sea sostenible y que no pierdas dinero por ignorar costos ocultos o impuestos sobre la venta.</p>
    </>
  ),
  'gestacional': (
    <>
      <h2>Calculadora de Embarazo y Fecha de Parto</h2>
      <p>Saber con precisión tu edad gestacional te ayuda a seguir el desarrollo de tu bebé semana a semana. Nuestra calculadora utiliza la <strong>Regla de Naegele</strong>, basada en la fecha de tu última menstruación (FUM).</p>
      <p>Obtén una estimación de tu fecha probable de parto (FPP) y descubre en qué trimestre te encuentras actualmente.</p>
    </>
  ),
  'calculadora-idade': (
    <>
      <h2>Calculadora de Edad Exacta</h2>
      <p>Descubre cuántos años, meses y días tienes con total precisión. Nuestra herramienta también te dice cuántos días faltan para tu próximo cumpleaños y en qué día de la semana naciste.</p>
    </>
  ),
  'ipva': (
    <>
      <h2>Cálculo del IPVA 2026</h2>
      <p>El IPVA (Impuesto sobre la Propiedad de Vehículos Automotores) es un impuesto anual que deben pagar los dueños de vehículos. El valor se calcula aplicando una alícuota sobre el valor venal del vehículo definido por la tabla FIPE.</p>
      <p>Simula el valor de tu impuesto y conoce los plazos de pago para aprovechar los descuentos por pago al contado (cota única).</p>
    </>
  ),
  'dias-entre-datas': (
    <>
      <h2>Calculadora de Días entre Fechas</h2>
      <p>Cuenta exactamente cuántos días, semanas o meses hay entre dos fechas. Es ideal para planificar proyectos, plazos de entrega o simplemente saber cuánto tiempo falta para un evento importante.</p>
      <p>Nuestra herramienta permite incluir o excluir el día final del conteo, dándote flexibilidad total para tus cálculos de plazos.</p>
    </>
  ),
  'agua-diaria': (
    <>
      <h2>Cuánta agua debes beber al día</h2>
      <p>La recomendación general de 2 litros por día no es exacta para todos. El consumo ideal de agua depende de factores como tu peso corporal y tu nivel de actividad física.</p>
      <p>Mantenerse hidratado es fundamental para el funcionamiento del cerebro, la regulación de la temperatura corporal y la salud de la piel. ¡Calcula tu meta personalizada ahora!</p>
    </>
  ),
  'custo-clt': (
    <>
      <h2>Costo de un Empleado para la Empresa</h2>
      <p>En Brasil, el salario base es solo una parte de lo que una empresa paga por un trabajador. Hay cargos adicionales como el FGTS, vacaciones, aguinaldo e impuestos patronales.</p>
      <p>Nuestra calculadora desglosa todos estos costos para que los emprendedores y gestores puedan planificar sus contrataciones con seguridad financiera.</p>
    </>
  )
}
