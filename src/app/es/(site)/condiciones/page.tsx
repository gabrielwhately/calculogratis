import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos de Uso | Cálculo Gratis",
  description: "Lea los términos y condiciones de uso de nuestra plataforma de calculadoras en línea.",
}

export default function CondicionesPage() {
  return (
    <div className="container-app py-12 prose prose-slate dark:prose-invert max-w-3xl">
      <h1 className="text-navy dark:text-white">Términos de Uso</h1>
      <p className="lead">Bienvenido a Cálculo Gratis. Al acceder y utilizar este sitio, usted acepta los términos y condiciones descritos a continuación.</p>
      
      <h2>1. Uso del Sitio</h2>
      <p>Cálculo Gratis proporciona calculadoras y herramientas de simulación solo con fines informativos. Aunque nos esforzamos por garantizar la precisión de los cálculos basados en la legislación de 2026, los resultados no constituyen asesoramiento profesional, jurídico o financiero.</p>
      
      <h2>2. Precisión de la Información</h2>
      <p>Las herramientas se basan en fórmulas matemáticas y tablas oficiales. Sin embargo, pueden ocurrir variaciones en casos específicos. Recomendamos siempre consultar con un profesional calificado antes de tomar decisiones basadas en nuestros simuladores.</p>
      
      <h2>3. Propiedad Intelectual</h2>
      <p>El diseño, código y contenido de Cálculo Gratis son propiedad exclusiva de la plataforma. Se prohíbe la reproducción total o parcial con fines comerciales sin autorización previa.</p>
      
      <h2>4. Limitación de Responsabilidad</h2>
      <p>Cálculo Gratis no se hace responsable de ninguna pérdida, daño o perjuicio derivado del uso de la información obtenida en nuestro sitio.</p>
      
      <h2>5. Cambios</h2>
      <p>Nos reservamos el derecho de modificar estos términos en cualquier momento, con el objetivo de mejorar continuamente y actualizar según las nuevas leyes y regulaciones.</p>
      
      <p className="mt-12 text-sm text-slate-500">Última actualización: 06 de mayo de 2026.</p>
    </div>
  )
}
