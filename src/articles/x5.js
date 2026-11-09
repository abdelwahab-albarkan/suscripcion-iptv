// Ampliación profunda (batch 5): artículos prioritarios, +3 secciones de ~100 palabras cada una.
const K = 'suscripción IPTV';
const li = (...a) => `<ul>${a.map(x => `<li>${x}</li>`).join('')}</ul>`;
const ol = (...a) => `<ol>${a.map(x => `<li>${x}</li>`).join('')}</ol>`;
module.exports = {
'por-que-se-corta-la-imagen': [
  [`Cortes solo en directos deportivos`, `<p>Si tu ${K} funciona bien con series y falla en partidos, la causa suele ser la demanda simultánea. Los directos concentran a miles de usuarios y exigen más estabilidad que el contenido bajo demanda. Conecta por cable, reduce un escalón la calidad y evita actualizaciones o descargas en segundo plano durante el evento. Si aun así se corta siempre en el mismo minuto, anota el canal y la hora para que soporte lo revise.</p>`],
  [`Cortes que aparecen solo por la noche`, `<p>Entre las 20:00 y las 23:00 se concentra el mayor tráfico de internet. Si fuera de esa franja todo va bien, es probable que la saturación esté en la red de tu operador. Haz pruebas de velocidad a distintas horas durante una semana, guarda los resultados y reclama con datos. Mientras tanto, baja la calidad en esa franja para mantener la fluidez.</p>`],
  [`Cuándo cambiar de dispositivo`, `<p>Un reproductor antiguo, con poca memoria o sin actualizaciones, puede provocar cortes aunque tu red sea excelente. Si el sistema tarda en abrir la aplicación, se calienta o se reinicia, valora un stick o una caja nueva. Es una inversión pequeña que suele mejorar más tu ${K} que cualquier ajuste de wifi.</p>`]],

'velocidad-internet-necesaria-4k': [
  [`Diferencia entre velocidad de bajada y estabilidad`, `<p>Un resultado alto en una prueba puntual no garantiza una buena reproducción. Lo que importa para ver 4K es que la velocidad se mantenga estable durante horas. Si la prueba varía mucho entre mediciones, tendrás cortes aunque el máximo parezca suficiente. Repite la medición varios días y prioriza las franjas en las que sueles ver tu ${K}.</p>`],
  [`Qué papel juega el códec`, `<p>Los códecs modernos comprimen mejor y permiten ver 4K con menos ancho de banda, pero exigen un dispositivo capaz de decodificarlos. Un televisor o stick antiguo puede no soportarlos y forzar versiones más pesadas. Revisa la ficha técnica de tu reproductor y mantén actualizada la aplicación.</p>`],
  [`Recomendaciones según tu tarifa`, `${li('<strong>Hasta 30 Mbps reales:</strong> HD en una pantalla.', '<strong>50 a 100 Mbps:</strong> Full HD en varias pantallas o 4K en una.', '<strong>300 Mbps o más:</strong> varias pantallas 4K con margen.')}<p>Ajusta siempre la calidad a la velocidad real, no a la anunciada.</p>`]],

'wifi-o-cable-para-iptv': [
  [`Qué tipo de cable elegir`, `<p>Para tu ${K} basta un cable Ethernet de categoría 5e o 6. Los cables más caros no mejoran la reproducción en una vivienda normal. Fíjate en que los conectores estén bien fijados y en que el cable no esté aplastado por puertas o muebles, ya que los daños internos provocan cortes difíciles de detectar.</p>`],
  [`Cómo saber si tu televisor admite conexión por cable`, `<p>Busca en la parte trasera un puerto RJ45 con la etiqueta LAN. Si tu televisor no lo tiene, un adaptador USB a Ethernet compatible o un reproductor externo con puerto de red resuelve el problema. Consulta el manual para confirmar qué adaptadores funcionan.</p>`],
  [`Cuándo el wifi es la mejor opción`, `<p>Para móviles, tablets y portátiles, el wifi es más práctico. En una vivienda pequeña, con el router cerca del televisor y una banda de 5 GHz limpia, puede dar un resultado excelente. La clave es medir: si por wifi obtienes velocidad y estabilidad suficientes, no necesitas cable.</p>`]],

'que-es-buffering': [
  [`Diferencia entre buffering y bloqueo de la aplicación`, `<p>El buffering es una pausa para cargar datos y se recupera sola. Un bloqueo, en cambio, deja la aplicación sin respuesta. Si la imagen no vuelve tras varios segundos, cierra la aplicación, límpiala y, si hace falta, reinicia el dispositivo. Distinguir ambos casos evita cambios innecesarios en tu ${K}.</p>`],
  [`Cómo afecta el tamaño del búfer`, `<p>Un búfer mayor reduce las pausas, pero aumenta el tiempo de inicio y el retraso respecto al directo. Para películas y series conviene un búfer generoso; para partidos, uno moderado. Algunas aplicaciones permiten ajustarlo en sus opciones de reproducción.</p>`],
  [`Cuándo escribir a soporte`, `<p>Si el buffering ocurre solo en un canal, el origen puede estar inestable y soporte puede sustituirlo. Si ocurre en todos, revisa antes tu red y tu dispositivo. Aporta la hora, el canal y el tipo de conexión para acelerar la respuesta.</p>`]],

'tdt-vs-iptv-comparativa': [
  [`Calidad de imagen y estabilidad`, `<p>La TDT ofrece una señal estable, sin depender de internet, aunque su calidad máxima suele ser inferior a la de un servicio en 4K. La televisión por internet puede igualar o superar esa calidad, pero depende de tu conexión. Por eso muchos hogares usan ambas: TDT como respaldo y una ${K} para variedad.</p>`],
  [`Coste total a lo largo de un año`, `<p>La TDT es gratuita, salvo el mantenimiento de la antena. Un servicio por internet tiene una cuota, pero sustituye a otras suscripciones y permite ver en varias pantallas. Calcula el coste anual por pantalla y compáralo con lo que pagas hoy en televisión y plataformas.</p>`],
  [`Cuándo no necesitas cambiar`, `<p>Si ves pocos canales generalistas y tu antena funciona bien, la TDT puede bastar. Una ${K} compensa cuando buscas deportes, series, canales internacionales o la libertad de ver en el móvil y en varios televisores.</p>`]],

'como-detectar-estafas': [
  [`Señales en el propio mensaje de venta`, `<p>Los anuncios fraudulentos suelen mezclar urgencia, precios irreales y promesas absolutas. Frases como «solo hoy» o «todo ilimitado para siempre» deben hacerte desconfiar. Un vendedor serio explica qué incluye el servicio, cuánto dura y cómo se activa, sin presionar para pagar al instante.</p>`],
  [`Cómo verificar la identidad del vendedor`, `<p>Busca un sitio web con información de contacto real, condiciones legibles y un historial coherente. Escribe una consulta y observa cómo responde. Si el contacto es anónimo o cambia de perfil constantemente, es mejor no seguir adelante con tu ${K}.</p>`],
  [`Qué hacer si ya has pagado y sospechas`, `<p>Guarda todas las pruebas, contacta con el vendedor y solicita a tu entidad de pago la retrocesión del cargo. Cambia las contraseñas que hayas compartido y vigila tus movimientos. Cuanto antes actúes, más posibilidades tienes de resolver el problema.</p>`]],

'plan-3-6-o-12-meses': [
  [`Cómo afecta la duración al coste por mes`, `<p>Los planes largos reducen el precio mensual de forma notable. Con una cuenta, el de 12 meses sale en torno a la mitad por mes que el de 3 meses. Esa diferencia compensa si estás seguro de que usarás tu ${K} durante todo el periodo.</p>`],
  [`Cómo elegir el número de cuentas`, `<p>Cada cuenta permite una reproducción simultánea. Cuenta cuántas pantallas verán a la vez en horas punta y suma una de margen si hay mucha coincidencia. Si dudas, empieza con menos y amplía al renovar.</p>`],
  [`Cuándo conviene empezar por un plan corto`, `<p>Si es tu primera experiencia con este tipo de servicio o tu conexión es justa, el plan de 3 meses te permite comprobar la estabilidad con poco compromiso. Después puedes pasar a un plan más largo con más información.</p>`]],

'tivimate-vs-smarters-comparativa': [
  [`Rendimiento en dispositivos modestos`, `<p>En equipos con poca memoria, la aplicación más ligera suele ofrecer mejor fluidez. Prueba ambas con la misma lista y observa el tiempo de arranque, la carga de la guía y el cambio de canal. La diferencia que notes en tu dispositivo vale más que cualquier comparativa genérica de tu ${K}.</p>`],
  [`Gestión de la guía y de los favoritos`, `<p>Una buena guía de programación es clave para el uso diario. Comprueba que se actualiza sola, que permite buscar y que conserva tus favoritos tras reiniciar. Si una aplicación pierde tus ajustes con frecuencia, probablemente no sea la mejor para ti.</p>`],
  [`Compatibilidad entre plataformas`, `<p>Si usas el servicio en televisor, móvil y ordenador, una aplicación disponible en todos tus dispositivos te ahorra configuraciones. Si solo usas un stick, puedes elegir la que mejor se adapte a ese sistema.</p>`]],

'tv-box-vs-stick-vs-smart-tv': [
  [`Rendimiento en 4K`, `<p>Para reproducir 4K con fluidez conviene un procesador capaz y memoria suficiente. Las cajas suelen ir sobradas; los sticks económicos pueden quedarse justos con tu ${K} en la máxima calidad. Revisa que el dispositivo admita la resolución y el códec que necesitas.</p>`],
  [`Conectividad y puertos`, `<p>Una caja con puerto Ethernet permite conexión por cable, la opción más estable. Los sticks dependen casi siempre del wifi, salvo que uses un adaptador. Comprueba también los puertos USB y el tipo de HDMI si piensas conectar más equipos.</p>`],
  [`Facilidad de uso y actualizaciones`, `<p>Prioriza sistemas que reciban actualizaciones y que tengan una tienda de aplicaciones amplia. Un dispositivo sin soporte acaba dejando de ser compatible con aplicaciones modernas.</p>`]],

'firestick-vs-chromecast-vs-apple-tv': [
  [`Experiencia de uso diaria`, `<p>El mando, la rapidez de los menús y la facilidad para instalar aplicaciones marcan el día a día más que las especificaciones. Si puedes, prueba cada sistema en casa de un conocido antes de elegir el reproductor de tu ${K}.</p>`],
  [`Precio frente a prestaciones`, `<p>El Fire TV Stick ofrece muy buena relación calidad-precio; Chromecast con Google TV destaca por su interfaz limpia; Apple TV ofrece el mayor rendimiento a un precio superior. Elige según tu presupuesto y tu ecosistema.</p>`],
  [`Compatibilidad con aplicaciones`, `<p>Antes de comprar, comprueba que la aplicación que usas con tu ${K} está disponible en el sistema elegido. Una aplicación compatible es más importante que cualquier diferencia de potencia.</p>`]],

'legalidad-uso-responsable': [
  [`Qué significa que un contenido esté autorizado`, `<p>Un contenido autorizado es el que un titular de derechos o un distribuidor con licencia ofrece de forma legítima. Un servicio responsable informa de qué canales ofrece y por qué medios. Esta guía es orientativa y no sustituye a un asesor jurídico.</p>`],
  [`Cómo reducir riesgos como usuario`, `${li('Contrata servicios que se identifiquen con claridad.', 'Lee las condiciones antes de pagar.', 'Desconfía de promesas absolutas y de precios irreales.')}<p>Usar tu ${K} de forma responsable te protege a ti y al servicio.</p>`],
  [`Dónde informarte`, `<p>Consulta la normativa de propiedad intelectual y de consumo, o pregunta a un profesional. Si dudas sobre un servicio concreto, pide por escrito que te expliquen qué contenidos ofrece y con qué licencias.</p>`]],

'preparar-dia-de-partido': [
  [`Qué hacer la noche anterior`, `<p>Comprueba que no hay actualizaciones pendientes en el televisor y en el router, que el dispositivo tiene espacio libre y que sabes qué canal emitirá el partido. Dejar todo revisado la noche anterior evita sorpresas con tu ${K} el día del evento.</p>`],
  [`Qué hacer si el canal falla en pleno partido`, `<p>Cambia a un canal alternativo, espera unos segundos y, si persiste, pasa a la segunda pantalla. Después del partido, escribe a soporte con la hora exacta y el canal. Mantén la calma: casi todos los cortes se resuelven con un cambio rápido.</p>`],
  [`Cómo organizar la sala`, `<p>Coloca el televisor a la altura de los ojos, ajusta el sonido y deja el mando a mano. Si vienen invitados, pídeles que desconecten el wifi de sus móviles para no saturar tu red durante la emisión.</p>`]],
};
