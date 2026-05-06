import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad | Cálculo Gratis",
  description: "Entienda cómo tratamos sus datos y garantizamos su privacidad al usar nuestras herramientas.",
}

export default function PrivacidadPage() {
  return (
    <div className="container-app py-12 prose prose-slate dark:prose-invert max-w-3xl">
      <h1 className="text-navy dark:text-white">Política de Privacidad</h1>
      <p className="lead">Su privacidad es una prioridad para nosotros. Esta política describe cómo Cálculo Gratis maneja su información.</p>
      
      <h2>1. Recopilación de Datos</h2>
      <p>Cálculo Gratis <strong>no solicita datos personales</strong> (como nombre, identificación o dirección) para realizar cálculos. La información ingresada en las calculadoras se procesa solo para generar el resultado solicitado y no se almacena en nuestros servidores permanentes.</p>
      
      <h2>2. Cookies y Publicidad</h2>
      <p>Utilizamos cookies para mejorar su experiencia, recordar sus preferencias y analizar el tráfico del sitio a través de Google Analytics. También mostramos anuncios a través de Google AdSense, que puede utilizar cookies para publicar anuncios basados en sus visitas anteriores.</p>
      
      <h2>3. Guardar Resultados</h2>
      <p>Si elige &quot;Guardar Resultado&quot;, esta información se almacena <strong>localmente en su navegador</strong> (Local Storage). No tenemos acceso a estos datos guardados en su dispositivo.</p>
      
      <h2>4. Enlaces Externos</h2>
      <p>Nuestro sitio puede contener enlaces a sitios externos que no son operados por nosotros. No tenemos control sobre el contenido y las prácticas de estos sitios y no podemos aceptar responsabilidad por sus respectivas políticas de privacidad.</p>
      
      <h2>5. Seguridad</h2>
      <p>Empleamos medidas de seguridad estándar para proteger nuestro sitio y sus visitantes contra el acceso no autorizado o la alteración de datos.</p>
      
      <p className="mt-12 text-sm text-slate-500">Última actualización: 06 de mayo de 2026.</p>
    </div>
  )
}
