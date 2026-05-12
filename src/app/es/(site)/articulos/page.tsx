import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Artículos y Consejos Financieros | Cálculo Gratis",
  description: "Aprenda a cuidar su dinero con nuestros guías sobre liquidación, inversiones, impuestos y mucho más.",
}

const ARTICULOS = [
  {
    slug: "liquidacion-2026",
    title: "Cómo calcular su liquidación laboral en 2026",
    excerpt: "Guía completa sobre prestaciones sociales, aviso previo y multa del FGTS.",
    date: "04 May 2026",
    category: "Laboral",
    readTime: "5 min",
    tags: ["Liquidación", "FGTS", "Derechos"]
  },
  {
    slug: "interes-compuesto",
    title: "Interés Compuesto: El secreto de la riqueza",
    excerpt: "Entienda cómo el tiempo trabaja a su favor en las inversiones.",
    date: "02 May 2026",
    category: "Financiero",
    readTime: "4 min",
    tags: ["Inversiones", "Interés"]
  },
  {
    slug: "salario-neto",
    title: "Guía del Salario Neto: ¿A dónde va su dinero?",
    excerpt: "Todo sobre deducciones de seguridad social e impuestos en la nómina.",
    date: "28 Abr 2026",
    category: "Laboral",
    readTime: "6 min",
    tags: ["Salario", "Impuestos"]
  },
  {
    slug: "imc-salud",
    title: "IMC: Cómo interpretar sus resultados",
    excerpt: "Entienda lo que su Índice de Massa Corporal dice sobre su salud y cuáles son los límites de cada categoría.",
    date: "25 Abr 2026",
    category: "Salud",
    readTime: "3 min",
    tags: ["Salud", "IMC"]
  },
  {
    slug: "sac-o-frances",
    title: "¿SAC o Price: Cuál es la mejor tabla de financiamiento?",
    excerpt: "Descubra las diferencias entre los sistemas de amortización y cuál de ellos le hace pagar menos intereses a largo plazo.",
    date: "20 Abr 2026",
    category: "Financiero",
    readTime: "7 min",
    tags: ["Financiamiento", "SAC", "Price"]
  },
  {
    slug: "seguro-desempleo",
    title: "Seguro de Desempleo 2026: ¿Quién tiene derecho y cómo calcular?",
    excerpt: "Guía actualizada sobre las nuevas reglas, plazos y valores de las cuotas del seguro de desempleo.",
    date: "15 Abr 2026",
    category: "Laboral",
    readTime: "5 min",
    tags: ["Seguro Desempleo", "Derechos"]
  },
  {
    slug: "guia-jubilacion",
    title: "Cómo planificar su jubilación en 2026",
    excerpt: "Entienda las reglas actuales, edad mínima y tiempo de contribución para jubilarse.",
    date: "08 May 2026",
    category: "Previsión",
    readTime: "5 min",
    tags: ["Jubilación", "Seguridad Social"]
  },
  {
    slug: "guia-irrf-2026",
    title: "Impuesto de Renta 2026: Cómo calcular la retención",
    excerpt: "Consulte la tabla actualizada del Impuesto sobre la Renta 2026 y aprenda a calcular el descuento.",
    date: "09 May 2026",
    category: "Laboral",
    readTime: "4 min",
    tags: ["IRRF", "Impuestos", "2026"]
  },
  {
    slug: "guia-vacaciones-clt",
    title: "Cálculo de Vacaciones: Entienda sus beneficios",
    excerpt: "Sepa cuánto recibirá al tomar vacaciones, incluyendo el adicional legal y el bono vacacional.",
    date: "09 May 2026",
    category: "Laboral",
    readTime: "5 min",
    tags: ["Vacaciones", "Derechos"]
  },
  {
    slug: "rendimiento-cdb",
    title: "Cómo calcular el rendimiento del CDB en 2026",
    excerpt: "Entienda cómo la tasa Selic y el CDI afectan el rendimiento de sus inversiones en renta fija.",
    date: "10 May 2026",
    category: "Finanzas",
    readTime: "5 min",
    tags: ["CDB", "Renta Fija", "Inversiones"]
  },
  {
    slug: "como-calcular-hora-extra",
    title: "Cómo calcular horas extra en 2026",
    excerpt: "Aprenda a calcular el valor de sus horas adicionales con recargos del 50%, 100% y recargo nocturno.",
    date: "10 May 2026",
    category: "Laboral",
    readTime: "4 min",
    tags: ["Horas Extra", "Derechos", "Laboral"]
  },
  {
    slug: "salario-minimo-2026",
    title: "Salario Mínimo 2026: Valores y repercusiones",
    excerpt: "Conozca los nuevos valores del salario mínimo en 2026 y cómo afecta a los beneficios y al mercado laboral.",
    date: "10 May 2026",
    category: "Laboral",
    readTime: "5 min",
    tags: ["Salario Mínimo", "Economía", "2026"]
  },
  {
    slug: "renuncia-2-anos",
    title: "¿Cuánto recibo si renuncio después de 2 años?",
    excerpt: "Conozca sus derechos y beneficios económicos al solicitar la baja voluntaria tras 24 meses.",
    date: "09 May 2026",
    category: "Laboral",
    readTime: "6 min",
    tags: ["Renuncia", "Derechos", "Liquidación"]
  },
  {
    slug: "freelance-vs-empleado",
    title: "¿Freelance o Empleado: Cuál conviene más en 2026?",
    excerpt: "Decida entre trabajar de forma independiente o bajo contrato comparando beneficios y salario real.",
    date: "10 May 2026",
    category: "Laboral",
    readTime: "6 min",
    tags: ["Freelance", "Contrato", "Laboral"]
  },
  {
    slug: "guia-13-salario",
    title: "Guía del Aguinaldo: Fechas y cómo calcular",
    excerpt: "Sepa cuándo recibe la primera y segunda parte de su gratificación anual en 2026.",
    date: "10 May 2026",
    category: "Laboral",
    readTime: "5 min",
    tags: ["Aguinaldo", "Derechos", "Laboral"]
  },
  {
    slug: "guia-calculadora-gestacional",
    title: "Guía de Embarazo: Cómo contar las semanas",
    excerpt: "Entienda el cálculo de la edad gestacional y la fecha probable de parto (FPP).",
    date: "10 May 2026",
    category: "Salud",
    readTime: "5 min",
    tags: ["Salud", "Embarazo", "Semanas"]
  },
  {
    slug: "guia-regla-de-tres",
    title: "Cómo hacer Regla de Tres Simple y Compuesta",
    excerpt: "Aprenda el paso a paso para resolver problemas de proporcionalidad directa e inversa.",
    date: "10 May 2026",
    category: "Matemática",
    readTime: "4 min",
    tags: ["Matemática", "Educación", "Proporción"]
  },
  {
    slug: "porcentaje-guia-rapida",
    title: "Cómo calcular porcentajes: Guía rápida y práctica",
    excerpt: "Aprenda a calcular descuentos, aumentos y variaciones porcentuales sin complicaciones.",
    date: "10 May 2026",
    category: "Matemática",
    readTime: "3 min",
    tags: ["Matemática", "Porcentaje", "Finanzas"]
  },
  {
    slug: "reajuste-alquiler-guia",
    title: "Guía del Reajuste de Alquiler 2026",
    excerpt: "Entienda cómo funciona el reajuste de la renta, qué índices se utilizan y cómo calcular el nuevo valor.",
    date: "11 May 2026",
    category: "Finanzas",
    readTime: "5 min",
    tags: ["Alquiler", "IPC", "Finanzas"]
  },
  {
    slug: "alcohol-o-gasolina-ahorro",
    title: "¿Alcohol o Gasolina: Cuál conviene más en 2026?",
    excerpt: "Aprenda la regla del 70% y sepa cómo ahorrar al llenar el tanque de su coche flexible.",
    date: "11 May 2026",
    category: "Utilidades",
    readTime: "4 min",
    tags: ["Combustible", "Ahorro", "Coche"]
  },
  {
    slug: "markup-vs-margen",
    title: "Markup vs Margen de Beneficio: ¿Cuál es la diferencia?",
    excerpt: "Confundir el markup con el margen de beneficio es un error común. Aprenda a fijar precios correctamente.",
    date: "11 May 2026",
    category: "Finanzas",
    readTime: "5 min",
    tags: ["Emprendimiento", "Precio", "Finanzas"]
  },
  {
    slug: "costo-empleado-clt",
    title: "¿Cuánto cuesta un empleado para la empresa en 2026?",
    excerpt: "Entienda el costo real de un trabajador contratado, incluyendo cargas sociales y beneficios legales.",
    date: "11 May 2026",
    category: "Laboral",
    readTime: "6 min",
    tags: ["Recursos Humanos", "Empresas", "Laboral"]
  },
  {
    slug: "guia-impuesto-vehicular",
    title: "Guía del Impuesto Vehicular 2026: Cómo calcular",
    excerpt: "Sepa cómo se determina el valor del impuesto sobre su vehículo y cómo planificar el pago.",
    date: "11 May 2026",
    category: "Finanzas",
    readTime: "4 min",
    tags: ["Impuestos", "Coche", "Vehículo"]
  },
  {
    slug: "guia-correccion-monetaria",
    title: "Cómo calcular la Corrección Monetaria en 2026",
    excerpt: "Entienda cómo actualizar valores financieros usando índices de inflación oficiales.",
    date: "11 May 2026",
    category: "Jurídica",
    readTime: "5 min",
    tags: ["Corrección Monetaria", "Inflación", "Finanzas"]
  },
  {
    slug: "guia-prestamo",
    title: "Préstamo Personal: Cómo conseguir las mejores tasas",
    excerpt: "Consejos esenciales para comparar préstamos y entender el Costo Efectivo Total (CET).",
    date: "11 May 2026",
    category: "Finanzas",
    readTime: "5 min",
    tags: ["Préstamo", "Crédito", "Finanzas"]
  },
  {
    slug: "guia-vale-transporte",
    title: "Guía de Vale-Transporte 2026: Reglas y Beneficios",
    excerpt: "Entienda cómo funciona el beneficio de transporte para empleados y los límites legales de descuento.",
    date: "12 May 2026",
    category: "Laboral",
    readTime: "4 min",
    tags: ["Vale-Transporte", "Laboral", "Derechos"]
  },
  {
    slug: "guia-costas-procesales",
    title: "Guía de Costas Procesales: Cómo estimar gastos judiciales",
    excerpt: "Conozca cuánto cuesta iniciar un proceso legal y cómo se determinan las tasas judiciales.",
    date: "12 May 2026",
    category: "Jurídica",
    readTime: "5 min",
    tags: ["Justicia", "Tasas", "Proceso"]
  },
  {
    slug: "comparativa-sac-price",
    title: "Amortización SAC vs Price: ¿Qué sistema elegir?",
    excerpt: "Compare las cuotas de su financiamiento entre los sistemas SAC y Francés (Price) para decidir mejor.",
    date: "12 May 2026",
    category: "Finanzas",
    readTime: "6 min",
    tags: ["Amortización", "SAC", "Price"]
  }
]

export default function ArticlesPageES() {
  return (
    <div className="container-app py-8 space-y-12">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-navy dark:text-white md:text-5xl tracking-tight">
          Artículos y <span className="text-accent">Consejos</span>
        </h1>
        <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Guías prácticas para ayudarle a entender sus derechos y organizar sus finanzas con claridad.
        </p>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        {ARTICULOS.map((art, i) => (
          <article key={i} className="group flex flex-col bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
                  {art.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {art.readTime} de lectura
                </span>
              </div>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-3 leading-tight group-hover:text-accent transition-colors">
                {art.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {art.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {art.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              <Link href={`/es/articulos/${art.slug}`} className="mt-auto inline-flex items-center gap-2 text-accent font-bold group-hover:translate-x-1 transition-transform">
                Leer guía completa
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-navy rounded-3xl p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-3">¿Tiene alguna duda?</h3>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto text-lg">
            Nuestras calculadoras se actualizan constantemente según la legislación de 2026.
          </p>
          <Link href="/es" className="inline-flex items-center px-8 py-4 bg-accent hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-accent/20 active:scale-95">
            Explorar todas las calculadoras
          </Link>
        </div>
      </div>
    </div>
  )
}
