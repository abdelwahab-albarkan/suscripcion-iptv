// Secciones ampliadas (batch 3: compra, seguridad y legalidad). Orientativo; no constituye asesoramiento jurídico.
const K = 'suscripción IPTV';
const li = (...a) => `<ul>${a.map(x => `<li>${x}</li>`).join('')}</ul>`;
const ol = (...a) => `<ol>${a.map(x => `<li>${x}</li>`).join('')}</ol>`;
module.exports = {
'como-detectar-estafas': [
  [`Lista de verificación antes de pagar tu ${K}`, `${ol('Busca el nombre del servicio junto a la palabra «opiniones» y compara varias fuentes.', 'Comprueba que el sitio muestra datos de contacto y condiciones claras.', 'Confirma por escrito el precio, la duración y lo que incluye.', 'Elige un método de pago con protección al comprador.', 'Guarda capturas de la oferta y del comprobante.')}`],
  [`Cómo reclamar si has sido víctima`, `<p>Reúne las pruebas (conversaciones, comprobante, anuncio) y contacta primero con el vendedor. Si no responde, solicita la retrocesión del cargo a tu entidad de pago y valora denunciar ante las autoridades de consumo o las fuerzas de seguridad. Cambia las contraseñas que hayas compartido con el servicio.</p>`]],

'senales-proveedor-fiable': [
  [`Preguntas que debes hacer antes de contratar`, `${li('¿Cuánto tarda en activarse y cómo recibo los datos?', '¿Cuántas conexiones incluye cada plan?', '¿Cómo funciona el soporte y en qué horario?', '¿Cuáles son las condiciones de renovación?')}<p>Un proveedor serio responde con claridad y por escrito.</p>`],
  [`Cómo valorar la respuesta del soporte`, `<p>Escribe una consulta real y observa el tiempo de respuesta, el tono y la precisión. Esa primera impresión anticipa cómo te atenderán cuando necesites ayuda con tu ${K}.</p>`]],

'metodos-de-pago-seguro': [
  [`Cómo comprobar que una pasarela de pago es segura`, `${ol('Verifica que la dirección empieza por https y muestra el candado.', 'Comprueba que el nombre del dominio es el esperado.', 'No introduzcas datos de tarjeta en páginas a las que llegas por mensajes no solicitados.', 'Revisa el importe antes de confirmar.')}`],
  [`Qué hacer tras el pago`, `<p>Conserva el comprobante y revisa tu extracto bancario en los días siguientes. Si aparece un cargo que no reconoces, contacta de inmediato con tu entidad. Pagar con cuidado es parte de contratar una ${K} con tranquilidad.</p>`]],

'que-hacer-si-no-funciona-tras-pagar': [
  [`Mensaje modelo para soporte`, `<p>Incluye: nombre con el que contrataste, fecha y hora del pago, plan elegido, dispositivo y aplicación que usas, y una captura del error. Con esa información, el equipo identifica tu cuenta y resuelve más rápido tu ${K}.</p>`],
  [`Plazos razonables y siguientes pasos`, `${li('Hasta una hora: espera la respuesta tras el primer mensaje.', 'Pasadas varias horas sin respuesta: reenvía el mensaje por otro canal.', 'Si hay silencio prolongado: documenta y reclama al medio de pago.')}`]],

'contrato-sin-permanencia-que-significa': [
  [`Diferencia entre permanencia y duración del plan`, `<p>Un plan de 3, 6 o 12 meses es un periodo de servicio que pagas por adelantado; la permanencia es una obligación de seguir pagando bajo penalización. Ambas cosas son distintas: puedes elegir un plan largo y no tener permanencia.</p>`],
  [`Preguntas clave antes de elegir el plan`, `${ol('¿Se renueva automáticamente al terminar?', '¿Puedo cambiar de plan al renovar?', '¿Hay devolución de periodos no usados?')}<p>Pedir estas respuestas por escrito protege tu contratación de ${K}.</p>`]],

'renovacion-y-cancelacion': [
  [`Calendario sencillo para no olvidar la fecha`, `<p>Anota la fecha de fin de tu plan y añade un recordatorio unos días antes. Así decides con calma si renuevas, cambias de duración o añades cuentas, sin cortes en el servicio.</p>`],
  [`Buenas prácticas al dejar de usar el servicio`, `${li('Confirma por escrito la fecha de finalización.', 'Cierra la sesión en todos tus dispositivos.', 'Elimina la aplicación si ya no la necesitas.')}`]],

'comparar-precios-mes-real': [
  [`Comparar por pantalla, no solo por plan`, `<p>Divide el precio mensual entre las cuentas incluidas. Una ${K} con varias cuentas puede salir más barata por pantalla aunque el total sea mayor. Es la forma más justa de comparar para un hogar con varios televisores.</p>`],
  [`Costes que suelen olvidarse`, `${li('El dispositivo para reproducir el servicio.', 'Un cable de red o un adaptador si necesitas mejor conexión.', 'El tiempo dedicado a configurar y cambiar de proveedor.')}`]],

'plan-3-6-o-12-meses': [
  [`Cómo decidir en cinco preguntas`, `${ol('¿Llevo tiempo usando un servicio parecido?', '¿Mi conexión cumple los requisitos que necesito?', '¿Cuántas pantallas verán a la vez?', '¿Voy a usarlo todo el año o por temporadas?', '¿Prefiero flexibilidad o ahorro?')}<p>Las respuestas te orientan hacia el plan de tu ${K} más adecuado.</p>`],
  [`Escenarios típicos`, `${li('<strong>Una persona, uso ocasional:</strong> 3 meses con una cuenta.', '<strong>Pareja con hábitos estables:</strong> 6 meses con dos cuentas.', '<strong>Familia con varios televisores:</strong> 12 meses con tres o cuatro cuentas.')}`]],

'cuanto-cuesta-ver-tv-por-internet-2026': [
  [`Cómo calcular tu gasto total anual`, `${ol('Suma lo que pagas hoy por televisión de pago y plataformas.', 'Añade el coste del dispositivo, si necesitas uno.', `Calcula el precio anual de tu ${K} según el plan.`, 'Compara los totales de ambos escenarios.')}`.replace(`${K}`, K)],
  [`Cuándo no compensa cambiar`, `<p>Si ves solo un par de canales generalistas y no necesitas más, la TDT gratuita puede ser suficiente. Cambiar compensa cuando buscas variedad, varias pantallas o la flexibilidad de verlo en cualquier dispositivo.</p>`]],

'ahorrar-factura-tv-hogar': [
  [`Ejemplo de auditoría de suscripciones`, `<p>Anota cada servicio, su coste mensual y cuántas veces lo usaste en el último mes. Si algo se usó menos de dos veces, es candidato a cancelar. Después compara con lo que costaría reunir lo imprescindible en una sola ${K}.</p>`],
  [`Evita estos errores`, `${li('Mantener servicios por inercia.', 'Cambiar sin comprobar qué contenidos echarás de menos.', 'Olvidar que cada pantalla simultánea necesita su cuenta.')}`]],

'tdt-vs-iptv-comparativa': [
  [`Cómo combinar TDT y televisión por internet`, `<p>Muchos hogares mantienen la antena para los canales generalistas y añaden una ${K} para variedad y deportes. Si falla internet, la TDT sigue funcionando. Es una combinación práctica y de bajo coste.</p>`],
  [`Requisitos de cada opción`, `${li('<strong>TDT:</strong> antena en buen estado y sintonizador integrado.', '<strong>Televisión por internet:</strong> conexión estable, dispositivo compatible y aplicación.')}`]],

'cable-vs-iptv': [
  [`Qué comprobar antes de dar de baja el cable`, `${ol('Lista los canales que realmente ves.', 'Comprueba que la oferta alternativa los cubre.', 'Revisa permanencias y penalizaciones del cable.', `Programa la baja cuando tu ${K} esté probada y funcionando.`)}`.replace(`${K}`, K)],
  [`Transición sin sobresaltos`, `<p>Durante unas semanas puedes mantener ambos servicios para comparar estabilidad y comodidad. Cuando estés seguro, da de baja el que no uses y evita pagar por duplicado.</p>`]],

'plataformas-streaming-vs-iptv': [
  [`Cuántas plataformas necesitas de verdad`, `<p>Muchos hogares conservan una o dos plataformas bajo demanda para series concretas y se apoyan en una ${K} para el directo. Revisa cada trimestre cuál usas y cancela las que no abras.</p>`],
  [`Diferencias que influyen en tu elección`, `${li('Contenido propio y exclusivo frente a catálogo variado.', 'Directo y deportes frente a bajo demanda.', 'Aplicaciones propias frente a reproductores de terceros.')}`]],

'legalidad-uso-responsable': [
  [`Hábitos de uso responsable`, `${li('Utiliza el servicio solo en tu hogar y con las cuentas contratadas.', 'No difundas ni grabes contenidos para redistribuirlos.', 'Consulta las condiciones del servicio antes de contratar.')}<p>Estos criterios generales ayudan a usar tu ${K} con tranquilidad; ante dudas concretas, consulta con un profesional jurídico.</p>`],
  [`Cómo comprobar la información que ofrece un proveedor`, `<p>Un proveedor responsable informa con claridad de lo que ofrece, de quién lo presta y de cómo contactar. Desconfía de promesas absolutas, como «todos los canales y partidos a precio de risa».</p>`]],

'derechos-de-autor-que-debes-saber': [
  [`Ejemplo de por qué un canal cambia`, `<p>Si un evento pasa de un canal a otro entre temporadas, suele deberse a un cambio en los derechos de emisión. No indica un fallo de tu ${K}: refleja que cada competición se licencia por periodos.</p>`],
  [`Cómo comportarte como usuario informado`, `${ol('Comprueba qué emisor tiene los derechos del evento.', 'Contrata servicios que informen con transparencia.', 'Evita ofertas que prometan lo imposible.')}`]],

'uso-en-bares-licencias': [
  [`Alternativas legítimas para un local`, `<p>Los establecimientos pueden contratar servicios profesionales con licencias de comunicación pública. Consulta con los emisores y con un asesor especializado en hostelería para elegir la opción adecuada.</p>`],
  [`Qué no hacer`, `${li('Mostrar contenidos de una cuenta doméstica ante clientes.', 'Cobrar entradas o consumiciones ligadas a una emisión sin licencia.', 'Ignorar los avisos de los titulares de derechos.')}<p>Tu ${K} doméstica está pensada para el hogar.</p>`]],

'privacidad-datos-personales': [
  [`Ejercer tus derechos de protección de datos`, `<p>Puedes pedir acceso, rectificación o supresión de tus datos escribiendo al proveedor. Si no obtienes respuesta, puedes acudir a la Agencia Española de Protección de Datos. Un servicio serio explica cómo ejercer esos derechos.</p>`],
  [`Datos que no deberías facilitar`, `${li('Documentos de identidad por mensajería.', 'Contraseñas de otros servicios.', 'Datos bancarios fuera de la pasarela de pago.')}`]],

'contrasenas-seguras-cuenta': [
  [`Cómo crear una contraseña memorable y fuerte`, `<p>Une cuatro o cinco palabras sin relación entre sí y añade un número y un símbolo. Es larga, fácil de recordar y difícil de adivinar. Evita que sea la misma que usas en tu correo o en tu ${K}.</p>`],
  [`Revisión de seguridad cada año`, `${ol('Cambia las contraseñas más antiguas.', 'Elimina cuentas que ya no usas.', 'Activa la verificación en dos pasos donde exista.')}`]],

'phishing-y-falsos-soportes': [
  [`Cómo reconocer un mensaje falso en tres segundos`, `${li('Urgencia exagerada («tu cuenta caduca hoy»).', 'Enlaces con dominios que imitan al original.', 'Peticiones de contraseña o de instalar programas de control remoto.')}`],
  [`Cómo contactar con el soporte legítimo`, `<p>Usa siempre los canales que figuran en el sitio oficial de tu ${K}, no los de mensajes recibidos. Si dudas, escribe tú primero por el canal oficial.</p>`]],

'primeras-24-horas-tras-contratar': [
  [`Cómo registrar tus observaciones del primer día`, `<p>Apunta en una nota los canales que has probado, las horas y cualquier incidencia. Esa lista te sirve para valorar tu ${K} y, si hace falta, para que soporte te ayude con precisión.</p>`],
  [`Siguiente paso: ajustar y personalizar`, `${ol('Crea tus favoritos y oculta categorías.', 'Ajusta la calidad a tu conexión.', 'Configura el control parental si hay menores.', 'Anota tus datos de acceso en un lugar seguro.')}`]],

'opiniones-resenas-fiables': [
  [`Cómo verificar una reseña en tres pasos`, `${ol('Comprueba que describe una experiencia concreta con fechas.', 'Busca si el mismo texto aparece en otros perfiles.', 'Contrasta con fuentes independientes.')}`],
  [`Cómo dar una buena reseña tú mismo`, `<p>Cuenta qué dispositivo usas, cómo es tu conexión y qué te gustó o no. Una reseña detallada ayuda a otros usuarios a decidir sobre su ${K}.</p>`]],

'garantia-y-devoluciones': [
  [`Qué documentación guardar para una reclamación`, `${li('Comprobante de pago y condiciones vigentes.', 'Capturas de los errores con fecha y hora.', 'Conversaciones con el soporte.')}`],
  [`Vías de reclamación`, `<p>Primero, reclama por escrito al proveedor. Si no hay solución, puedes acudir a tu entidad de pago y a los organismos de consumo. Conservar la documentación acelera cualquier trámite relacionado con tu ${K}.</p>`]],

'facturas-y-comprobantes': [
  [`Cómo organizar tus comprobantes`, `<p>Crea una carpeta con nombre claro, por ejemplo «Servicios digitales», y guarda ahí facturas, condiciones y datos de acceso. Haz una copia en otra ubicación para no perderlos al cambiar de dispositivo.</p>`],
  [`Cuándo necesitarás tus comprobantes`, `${li('Al renovar o cambiar de plan.', 'Ante una incidencia o reclamación.', 'Para justificar gastos, si procede.')}`]],

'soporte-tecnico-que-esperar': [
  [`Plantilla para reportar un problema`, `${ol('Dispositivo y aplicación.', 'Qué ocurre y desde cuándo.', 'Canal o contenido afectado.', 'Qué has probado ya.')}<p>Con estos cuatro datos, la atención a tu ${K} es más rápida.</p>`],
  [`Señales de un soporte de calidad`, `${li('Responde con claridad y sin plantillas vacías.', 'Pide solo la información necesaria.', 'Hace seguimiento hasta resolver.')}`]],

'glosario-iptv': [
  [`Más términos útiles`, `${li('<strong>Servidor:</strong> equipo que distribuye la señal.', `<strong>Credenciales:</strong> usuario y contraseña de acceso a tu ${K}.`, '<strong>Stream:</strong> flujo de vídeo que recibes en tiempo real.', '<strong>Conexión simultánea:</strong> reproducción a la vez con una misma cuenta.')}`.replace(`${K}`, K)],
  [`Cómo usar este glosario`, `<p>Consúltalo cuando una guía mencione un término desconocido. Entender el vocabulario básico facilita configurar la aplicación y explicar tu problema al soporte de la ${K}.</p>`]],
};
