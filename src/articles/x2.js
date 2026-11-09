// Secciones ampliadas (batch 2: uso y configuración).
const K = 'suscripción IPTV';
const li = (...a) => `<ul>${a.map(x => `<li>${x}</li>`).join('')}</ul>`;
const ol = (...a) => `<ol>${a.map(x => `<li>${x}</li>`).join('')}</ol>`;
module.exports = {
'que-es-epg-guia-programacion': [
  [`Cómo sacar partido a la EPG en el día a día`, `${ol('Abre la guía y filtra por la categoría que te interesa.', 'Marca los programas que no quieres perderte con un recordatorio.', 'Consulta la sinopsis antes de decidir qué ver.', 'Usa la cuadrícula para comparar qué emiten varios canales a la vez.')}<p>Con ese hábito, tu ${K} se convierte en una parrilla personal en lugar de una lista interminable.</p>`],
  [`Problemas frecuentes de la guía y cómo resolverlos`, `${li('Horarios desfasados: revisa la zona horaria del dispositivo.', 'Canal sin programación: puede no estar emparejado con su guía.', 'Guía vacía tras reinstalar: fuerza una actualización y espera unos minutos.')}`]],

'favoritos-y-categorias-organizar': [
  [`Un sistema de tres listas que funciona`, `<p>Divide tus favoritos en tres grupos: <strong>diario</strong> (informativos y canales habituales), <strong>deporte y cine</strong> (eventos y películas) y <strong>ocasional</strong> (infantil, música, internacional). Con tres listas cortas encuentras lo que buscas en pocos clics.</p>`],
  [`Errores al organizar una lista de canales`, `${li('Guardar demasiados favoritos hasta que la lista vuelve a ser inmanejable.', 'No ocultar las categorías de idiomas que no usas.', 'Cambiar el orden cada semana en lugar de por hábitos estables.')}<p>Una buena organización hace que tu ${K} resulte cómoda para toda la familia.</p>`]],

'control-parental-paso-a-paso': [
  [`Cómo elegir un buen PIN y gestionarlo`, `<p>Evita fechas de nacimiento o secuencias evidentes. Cambia el PIN si un menor lo averigua y no lo compartas por mensajería. Anótalo en un lugar seguro para recuperarlo si lo olvidas.</p>`],
  [`Combinar varias capas de protección`, `${ol(`Activa el control parental de la aplicación de tu ${K}.`, 'Crea un perfil infantil en el dispositivo cuando exista.', 'Bloquea la tienda de aplicaciones con PIN.', 'Limita horarios desde el router si tu equipo lo permite.')}<p>Ninguna capa es perfecta por sí sola; juntas ofrecen una protección razonable.</p>`.replace(`${K}`, K)]],

'perfiles-familiares': [
  [`Ejemplo de reparto de perfiles en una familia`, `${li('Perfil de los adultos con deporte, noticias y cine.', 'Perfil infantil con canales de dibujos y control parental.', 'Perfil de invitados con una lista corta y sencilla.')}<p>Cada perfil mantiene su historial y sus favoritos, lo que evita que las recomendaciones de unos molesten a otros en tu ${K}.</p>`],
  [`Qué hacer si la aplicación no admite perfiles`, `<p>Si tu reproductor no incluye perfiles, puedes usar categorías de favoritos con nombre por persona o instalar una segunda aplicación configurada con otra lista. Recuerda que cada reproducción simultánea cuenta como una conexión del plan.</p>`]],

'catch-up-y-grabacion': [
  [`Cómo planificar tu visionado con catch-up`, `${ol('Localiza en la guía el programa que te perdiste.', 'Comprueba el icono de catch-up en el canal.', 'Reprodúcelo dentro del plazo disponible.', 'Si el canal no lo ofrece, busca el contenido en el catálogo bajo demanda.')}`],
  [`Límites que debes tener presentes`, `<p>El catch-up no existe en todos los canales ni en todos los horarios, y los plazos son limitados. Para eventos deportivos importantes, no cuentes con verlos más tarde: organiza tu ${K} para el directo y usa el catch-up solo como apoyo.</p>`]],

'subtitulos-y-audio-original': [
  [`Configurar subtítulos legibles`, `${li('Elige un tamaño cómodo para la distancia a la que ves.', 'Prefiere texto claro sobre fondo oscuro semitransparente.', 'Evita colores brillantes que cansan la vista.')}`],
  [`Qué hacer cuando los subtítulos no coinciden`, `<p>Si van desfasados, prueba otra pista de subtítulos o ajusta el retraso si la aplicación lo permite. Si ocurre en un canal concreto de tu ${K}, anota el programa y avisa a soporte.</p>`]],

'aprender-idiomas-con-television': [
  [`Un plan de estudio semanal con televisión`, `${ol('Lunes y miércoles: noticias de 15 minutos con subtítulos en tu idioma.', 'Martes y jueves: un episodio corto de serie en versión original.', 'Viernes: repasa vocabulario anotado durante la semana.', 'Fin de semana: un documental sin subtítulos.')}<p>La constancia pesa más que la cantidad, y tu ${K} te da el material cada día.</p>`],
  [`Cómo anotar vocabulario sin interrumpir`, `<p>Pausa solo cuando aparezca una expresión nueva importante, escríbela con su contexto y sigue viendo. Revisa la lista al terminar y repite las frases en voz alta para mejorar la pronunciación.</p>`]],

'ver-tv-en-viaje-extranjero': [
  [`Lista de comprobación antes de viajar`, `${ol(`Instala y prueba la aplicación de tu ${K} en el móvil o tablet.`, 'Descarga la guía con wifi estable.', 'Lleva el cargador y un adaptador HDMI si usarás el televisor del alojamiento.', 'Comprueba qué dispositivos podrás conectar.')}`.replace(`${K}`, K)],
  [`Qué esperar de la conexión en el destino`, `<p>La calidad dependerá del wifi del alojamiento y de la distancia a los servidores. Baja la calidad si ves cortes y evita usar datos en roaming para vídeo. Si un canal no está disponible, probablemente sea una restricción por derechos y no un fallo de tu ${K}.</p>`]],

'usar-en-segunda-vivienda': [
  [`Cómo repartir las cuentas entre dos casas`, `<p>Cada cuenta permite una reproducción simultánea. Si usáis el servicio en ambas viviendas a la vez, elige un plan con al menos dos cuentas; si solo lo usa una persona que se desplaza, una cuenta es suficiente.</p>`],
  [`Dejar la casa lista para tu llegada`, `${li('Deja el stick o la caja conectados y con la aplicación actualizada.', 'Comprueba el router antes de cada temporada.', 'Anota los datos de acceso en un lugar seguro.')}<p>Así tu ${K} funciona desde el primer minuto en cada visita.</p>`]],

'uso-en-hotel-o-apartamento': [
  [`Cómo acelerar la conexión en un alojamiento`, `${li('Conéctate en horarios de menor ocupación.', 'Si hay varias redes, elige la de 5 GHz.', 'Evita descargas mientras ves el partido.')}`],
  [`Privacidad en redes compartidas`, `<p>Las redes de hoteles son compartidas con muchos huéspedes. No introduzcas datos sensibles sin necesidad y cierra la sesión en el televisor al marcharte. Tu ${K} no debe quedarse configurada en dispositivos ajenos.</p>`]],

'personas-mayores-configurar-facil': [
  [`Guía de papel para dejar a mano`, `<p>Escribe en una hoja grande los pasos básicos: encender, abrir la aplicación, elegir un canal favorito y volver al inicio. Pégala junto al televisor. Es un recurso sencillo que evita muchas llamadas.</p>`],
  [`Mantenimiento a distancia`, `${li('Programa una revisión mensual por videollamada.', 'Comprueba que la aplicación se abre sola al encender.', `Deja un contacto de soporte visible para dudas con la ${K}.`)}`.replace(`${K}`, K)]],

'mudanza-reinstalar-servicio': [
  [`Lista de tareas para el primer día en la nueva casa`, `${ol('Conecta el router y comprueba la velocidad.', 'Coloca el televisor y conecta el reproductor.', `Abre la aplicación e introduce los datos de tu ${K}.`, 'Comprueba un canal en directo y la guía.')}`.replace(`${K}`, K)],
  [`Si cambias de operador al mudarte`, `<p>Tu servicio no depende de tu operador, pero la velocidad de la nueva línea sí. Mide la conexión en cuanto esté instalada y ajusta la calidad de reproducción a lo que obtengas.</p>`]],

'cambiar-de-televisor-migrar': [
  [`Cómo migrar sin perder tus favoritos`, `<p>Antes de apagar el televisor viejo, captura pantallas de tus favoritos y categorías. Si la aplicación permite exportar una copia, guárdala. En el televisor nuevo, vuelve a crear el orden con calma.</p>`],
  [`Primeros ajustes del televisor nuevo`, `${li('Actualiza el sistema antes de instalar la aplicación.', 'Elige el modo de imagen adecuado.', 'Conecta por cable si es posible.', 'Comprueba el audio con tu barra de sonido.')}<p>Con eso, tu ${K} queda lista en un rato.</p>`]],

'compartir-cuenta-riesgos': [
  [`Cómo explicar a la familia las reglas de uso`, `<p>Deja claro cuántas pantallas pueden ver a la vez y quién gestiona los datos de acceso. Un acuerdo sencillo evita bloqueos y discusiones.</p>`],
  [`Qué hacer si sospechas que tus datos se han filtrado`, `${ol('Avisa a soporte para renovar tus credenciales.', 'Cambia las contraseñas que reutilizabas.', 'Revisa los dispositivos donde has iniciado sesión.')}<p>Cuidar el acceso de tu ${K} protege tu cuenta y la estabilidad del servicio.</p>`]],

'cuantas-conexiones-necesitas': [
  [`Ejercicio rápido para calcular tus cuentas`, `${ol('Anota los televisores y dispositivos que se usan a la vez en horas punta.', 'Suma los móviles y tablets que ven contenido a la vez.', 'Redondea al alza una cuenta de margen.')}<p>Ese número es el de tu ${K} ideal.</p>`],
  [`Cuándo conviene una cuenta de más`, `<p>Si en casa conviven aficiones distintas y suele haber coincidencias de horario, una cuenta extra cuesta menos que los conflictos. Si usáis el servicio de forma muy ocasional, puedes empezar con menos y subir al renovar.</p>`]],

'guia-chromecast-castear': [
  [`Solución de problemas al transmitir`, `${li('El Chromecast no aparece: comprueba que móvil y dispositivo están en la misma red wifi.', 'La imagen se corta: acerca el Chromecast al router o usa la banda de 5 GHz.', 'Se desconecta al bloquear el móvil: desactiva el ahorro de batería de la aplicación.')}`],
  [`Cuándo conviene instalar la aplicación en el televisor`, `<p>Si usas tu ${K} a diario, instalar la aplicación directamente en el televisor o en un stick ofrece más estabilidad que depender del móvil. Transmitir es ideal para usos ocasionales o para invitados.</p>`]],

'mirroring-airplay': [
  [`Consejos para una duplicación estable`, `${li('Mantén el iPhone o iPad cerca del televisor.', 'Usa la banda de 5 GHz.', 'Desactiva el modo de bajo consumo mientras duplicas.')}`],
  [`Alternativas a AirPlay`, `<p>Si la duplicación te da problemas, instala la aplicación de tu ${K} directamente en un Apple TV o en el propio televisor, si lo permite. Obtendrás más calidad y evitarás que el móvil se quede ocupado.</p>`]],

'usar-altavoz-barra-sonido': [
  [`Cómo ajustar el sonido tras conectar la barra`, `${ol('Selecciona la salida de audio correcta en el televisor.', 'Prueba un canal con voces claras.', 'Ajusta graves y modo de sonido según el contenido.', 'Comprueba que no hay retraso entre imagen y voz.')}`],
  [`Qué hacer si no hay sonido`, `<p>Revisa que el cable esté en la entrada ARC, activa el control por HDMI y comprueba que el formato de audio de tu reproductor es compatible. Si el sonido aparece en la aplicación pero no en la barra, cambia el formato a estéreo para tu ${K}.</p>`]],

'mejor-calidad-audio-dolby': [
  [`Cómo comprobar tu configuración de audio`, `<p>Reproduce un contenido con sonido envolvente y verifica que tu barra o receptor muestra el formato recibido. Si ves siempre «estéreo», revisa los ajustes de salida del reproductor.</p>`],
  [`Equilibrio entre calidad y compatibilidad`, `${li('Usa automático si todo tu equipo es moderno.', 'Fuerza estéreo si alguna conexión da problemas.', 'Evita pasar el audio por varios aparatos intermedios.')}<p>Un buen sonido completa la experiencia de tu ${K}.</p>`]],

'ver-en-movil-sin-gastar-datos': [
  [`Rutina para ver contenido en el móvil con wifi`, `${ol('Activa el wifi y conéctate a redes conocidas.', 'Descarga la guía solo con wifi.', 'Fija la calidad manualmente.', 'Desactiva la reproducción automática en datos.')}`],
  [`Consejos si no tienes más remedio que usar datos`, `<p>Reduce la calidad a SD, limita la duración y activa el aviso de consumo del móvil. Con una ${K} en el móvil, un par de horas en HD pueden agotar buena parte de una tarifa modesta.</p>`]],

'modo-ahorro-datos-movil': [
  [`Cómo verificar el ahorro real`, `<p>Anota el uso de datos de la aplicación antes y después de activar el modo ahorro durante una semana. Si la diferencia es pequeña, combina el ajuste con una calidad fija más baja.</p>`],
  [`Cuándo desactivarlo`, `<p>Si ves en casa con wifi, no necesitas el modo ahorro y puede limitar la calidad. Actívalo solo cuando uses datos móviles para ver tu ${K}.</p>`]],

'modo-noche-y-brillo': [
  [`Ajustes recomendados para ver de noche`, `${li('Brillo moderado y contraste equilibrado.', 'Temperatura de color cálida.', 'Luz ambiente suave tras el televisor.', 'Descansos breves en sesiones largas.')}`],
  [`Cuidar la vista con tu ${K}`, `<p>Evita ver en habitaciones totalmente a oscuras con el brillo alto y mantén cierta distancia con la pantalla. Si notas cansancio, baja el brillo y date una pausa; la comodidad importa tanto como la calidad.</p>`]],

'atajos-mando-a-distancia': [
  [`Rutina de atajos para ahorrar tiempo`, `${ol('Aprende el botón de canal anterior para alternar entre dos canales.', 'Asigna favoritos a los botones de colores si la aplicación lo permite.', 'Usa la búsqueda por voz para encontrar títulos.')}`],
  [`Mandos que mejoran la experiencia`, `<p>Un mando con teclado retroiluminado o un mando universal bien configurado hace más cómodo el uso diario de tu ${K}, sobre todo en habitaciones con poca luz.</p>`]],

'mando-universal-configurar': [
  [`Qué comprobar tras programar el mando`, `${ol('Encendido y apagado del televisor.', 'Volumen y silencio de la barra de sonido.', 'Navegación del reproductor.', 'Cambio de entrada HDMI.')}`],
  [`Si el mando no responde a todo`, `<p>Prueba otro código de la misma marca o usa la función de aprendizaje botón a botón. En muchos casos, activar HDMI-CEC en el televisor resuelve el control de tu ${K} con el mando original.</p>`]],

'voz-asistente-controlar-tv': [
  [`Comandos útiles para el día a día`, `${li('«Abre» seguido del nombre de la aplicación.', '«Busca» más el título o el género.', '«Pausa», «continúa» o «sube el volumen».')}`],
  [`Privacidad y control de voz`, `<p>Revisa los ajustes del micrófono del mando y del asistente, y desactiva el almacenamiento de grabaciones si no lo necesitas. El control por voz es una ayuda cómoda, pero tu ${K} se maneja igual de bien con el mando tradicional.</p>`]],
};
