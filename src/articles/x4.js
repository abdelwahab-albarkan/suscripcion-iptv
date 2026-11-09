// Secciones ampliadas (batch 4: deporte, dispositivos y aplicaciones).
const K = 'suscripción IPTV';
const li = (...a) => `<ul>${a.map(x => `<li>${x}</li>`).join('')}</ul>`;
const ol = (...a) => `<ol>${a.map(x => `<li>${x}</li>`).join('')}</ol>`;
module.exports = {
'preparar-dia-de-partido': [
  [`Rutina de la semana previa`, `${ol('Comprueba que tu aplicación está actualizada.', 'Haz una prueba de velocidad en la franja del partido.', 'Revisa qué emisor retransmite el encuentro.', 'Deja listo un dispositivo alternativo.')}<p>Prepararte con días de margen reduce el estrés el día del evento.</p>`],
  [`Qué hacer en el descanso`, `<p>No toques ajustes durante el partido. Si hubo cortes, anótalos con la hora y revisa después con calma tu ${K}: reiniciar el router o cambiar de canal en el descanso suele ser suficiente.</p>`]],

'ver-deporte-en-movil-fuera-de-casa': [
  [`Kit básico para ver deporte fuera de casa`, `${li('Batería externa con cable corto.', 'Auriculares cómodos.', 'Soporte para apoyar el móvil.', 'Tarifa de datos con margen o wifi conocido.')}`],
  [`Cómo adaptar la calidad al entorno`, `<p>En cafeterías y estaciones, el wifi suele estar saturado: baja a SD si ves cortes. En casa de amigos con fibra, puedes subir a HD. Ajustar la calidad es parte de usar bien tu ${K} en el móvil.</p>`]],

'segunda-pantalla-estadisticas': [
  [`Cómo montar tu centro de seguimiento`, `${ol('Televisor para la imagen principal.', 'Tablet o móvil para estadísticas y alineaciones.', 'Notificaciones silenciadas para evitar espóilers.')}`],
  [`Cuidado con el ancho de banda`, `<p>Cada pantalla suma consumo. Si el wifi se resiente, deja las estadísticas en el móvil con datos y reserva la red de casa para la ${K} en el televisor.</p>`]],

'ver-champions-requisitos-conexion': [
  [`Lista de comprobación para noches de máxima audiencia`, `${ol('Prueba el canal con 30 minutos de margen.', 'Cierra descargas y actualizaciones automáticas.', 'Conecta el televisor por cable si es posible.', 'Ten a mano un canal alternativo.')}`],
  [`Qué hacer si el canal no aparece`, `<p>Revisa la guía por si el evento se emite en otro canal. Los derechos se reparten entre emisores y cambian entre temporadas; no es un fallo de tu ${K}.</p>`]],

'calendario-deportivo-organizar': [
  [`Ejemplo de calendario mensual`, `<p>Crea un calendario con tres colores: competiciones que siempre sigues, eventos puntuales y recordatorios de configuración. Revisa el domingo la semana siguiente y deja preparadas las alertas.</p>`],
  [`Herramientas que ayudan`, `${li(`Recordatorios de la guía EPG de tu ${K}.`, 'Calendarios del móvil con alertas.', 'Aplicaciones oficiales de cada competición.')}`.replace(`${K}`, K)]],

'f1-fin-de-semana-gran-premio-conexion': [
  [`Plan para un fin de semana de Gran Premio`, `${ol('Viernes: sesiones libres con calma para comprobar la conexión.', 'Sábado: clasificación en directo.', 'Domingo: carrera con todo preparado y sin descargas.')}`],
  [`Detalles que marcan la diferencia`, `<p>La carrera es larga y la conexión debe aguantar. Deja el televisor por cable, evita actualizaciones en segundo plano y usa una segunda pantalla para tiempos y neumáticos sin saturar la red de tu ${K}.</p>`]],

'ciclismo-etapas-conexion': [
  [`Cómo seguir una etapa de montaña`, `<p>Consulta el perfil y decide en qué kilómetros empiezas a ver con atención. Deja la aplicación abierta en el canal y vuelve cuando llegue la parte decisiva.</p>`],
  [`Evita cortes en sesiones largas`, `${li('Reinicia la aplicación antes de empezar.', 'Mantén la batería del móvil cargada.', 'Desactiva el ahorro agresivo de energía durante la emisión.')}<p>Una ${K} estable hace más disfrutable cada etapa.</p>`]],

'tenis-grand-slam-conexion': [
  [`Estrategia para dos semanas de torneo`, `${ol('Consulta cada mañana el orden de juego.', 'Elige los partidos clave y programa recordatorios.', 'Aprovecha el catch-up si no puedes verlos en directo.')}`],
  [`Cuidado con la fatiga de dispositivo`, `<p>Tras muchas horas seguidas, reinicia el reproductor y comprueba el espacio libre. Un dispositivo descansado mantiene tu ${K} fluida durante todo el torneo.</p>`]],

'baloncesto-nba-madrugada': [
  [`Cómo ver de madrugada sin molestar`, `${li('Auriculares inalámbricos con buen aislamiento.', 'Volumen bajo y subtítulos si hacen falta.', 'Modo noche en la imagen.')}`],
  [`Si no puedes madrugar`, `<p>Busca resúmenes o repeticiones al día siguiente y evita las redes sociales hasta entonces para no perder la emoción. Con tu ${K} puedes dejar programados los recordatorios de los partidos clave.</p>`]],

'bar-en-casa-ver-partido-con-amigos': [
  [`Organiza la tarde sin sorpresas`, `${ol('Comprueba la conexión una hora antes.', 'Coloca el sonido y la imagen.', 'Pide a los invitados que usen datos propios.', 'Ten un plan B para la imagen.')}`],
  [`Recuerda el uso doméstico`, `<p>Ver el partido en casa con amigos es un uso doméstico. Si planeas abrir el evento al público o cobrar, necesitas licencias específicas; consulta las opciones profesionales. Tu ${K} está pensada para el hogar.</p>`]],

'mejor-tv-para-streaming-2026': [
  [`Cómo comparar modelos sin perderte en cifras`, `${li('Prioriza sistema operativo y actualizaciones.', 'Revisa memoria y procesador.', 'Comprueba puertos HDMI y Ethernet.', 'Mira opiniones sobre la fluidez del sistema.')}`],
  [`Cuándo basta con un televisor sencillo`, `<p>Si tu televisor actual tiene buena imagen pero es lento, un stick económico le da una segunda vida y ofrece la mejor experiencia con tu ${K} sin cambiar de pantalla.</p>`]],

'tv-box-vs-stick-vs-smart-tv': [
  [`Guía de elección por perfil de usuario`, `${li('<strong>Uso básico:</strong> stick económico.', '<strong>Uso intensivo y 4K:</strong> caja con Ethernet.', '<strong>Sin cables extra:</strong> Smart TV reciente.')}`],
  [`Cuándo reemplazar tu reproductor`, `<p>Si tarda en abrir la aplicación, se calienta o no recibe actualizaciones, es buen momento. Un reproductor ágil mejora más tu ${K} que cualquier ajuste de red.</p>`]],

'firestick-vs-chromecast-vs-apple-tv': [
  [`Lo que debes mirar antes de comprar`, `${ol('Compatibilidad con la aplicación que usas.', 'Mando y facilidad de uso.', 'Soporte de 4K y HDR.', 'Precio total, incluyendo accesorios.')}`],
  [`Ecosistema y futuro`, `<p>Elegir dentro de tu ecosistema (Google, Amazon o Apple) simplifica el uso diario y las actualizaciones. Comprueba que tu ${K} funciona con una aplicación disponible en ese sistema.</p>`]],

'android-tv-vs-google-tv': [
  [`Cómo saber qué sistema tiene tu televisor`, `<p>Entra en Ajustes y busca «Acerca de»: aparece el nombre del sistema y la versión. Con eso sabrás qué aplicaciones puedes instalar para tu ${K} y qué actualizaciones esperan.</p>`],
  [`Qué esperar de las actualizaciones`, `${li('Los dispositivos nuevos suelen traer la última versión.', 'Los antiguos pueden quedarse sin soporte.', 'Si el sistema es lento, un stick resuelve el problema.')}`]],

'mejor-reproductor-app-criterios': [
  [`Prueba comparativa en un fin de semana`, `${ol('Instala dos aplicaciones.', `Carga la misma lista de tu ${K} en ambas.`, 'Compara arranque, guía y cambio de canal.', 'Quédate con la más cómoda.')}`.replace(`${K}`, K)],
  [`Señales de una aplicación poco fiable`, `${li('Pide permisos que no necesita.', 'No se actualiza desde hace tiempo.', 'Muestra publicidad intrusiva.')}`]],

'tivimate-vs-smarters-comparativa': [
  [`Cuándo elegir cada aplicación`, `${li('<strong>TiviMate:</strong> si usas Android TV o Fire TV y valoras una guía muy cuidada.', '<strong>IPTV Smarters Pro:</strong> si necesitas la misma aplicación en televisor, móvil y ordenador.')}<p>Ambas funcionan con los datos de tu ${K}.</p>`],
  [`Consejos para empezar bien`, `<p>Introduce los datos sin espacios, espera a que se cargue la guía y crea tus favoritos. Si una aplicación no te convence, prueba la otra: tus credenciales son las mismas.</p>`]],

'vlc-para-iptv-ventajas': [
  [`Cómo mejorar la experiencia con VLC`, `${li('Usa un archivo de lista bien formado.', 'Añade la guía si tu proveedor la ofrece.', 'Activa la aceleración por hardware.')}`],
  [`VLC como plan B`, `<p>Tenerlo instalado en el ordenador es útil como alternativa cuando tu reproductor principal da problemas. Así compruebas si el fallo está en la aplicación o en tu ${K}.</p>`]],

'kodi-pvr-guia-basica': [
  [`Consejos para que Kodi vaya fluido`, `${li('Mantén Kodi y los complementos actualizados.', 'No instales extensiones innecesarias.', 'Usa solo repositorios oficiales y de confianza.')}`],
  [`Qué hacer si la lista no carga`, `<p>Revisa la dirección de la lista, reinicia el cliente PVR y comprueba la conexión. Si el problema persiste, prueba tu ${K} en otra aplicación para descartar un fallo del complemento.</p>`]],

'instalar-apk-seguro': [
  [`Verificación básica antes de instalar un archivo`, `${ol('Comprueba que procede del sitio oficial del desarrollador.', 'Compara el nombre y la versión con los de la tienda.', 'Revisa los permisos que solicita.', 'Analízalo con una herramienta de seguridad.')}`],
  [`Cuando la tienda oficial no tiene la aplicación`, `<p>Busca una alternativa disponible en la tienda para tu ${K}. Instalar fuera de la tienda es un último recurso que expone tu dispositivo y tus datos.</p>`]],

'permisos-aplicaciones-seguridad': [
  [`Revisión rápida de permisos en el móvil`, `${ol('Entra en Ajustes y Aplicaciones.', 'Abre la aplicación reproductora.', 'Revisa los permisos concedidos.', 'Revoca los que no sean necesarios.')}`],
  [`Qué hacer si un permiso es obligatorio`, `<p>Si la aplicación de tu ${K} exige un permiso sospechoso para funcionar, desconfía y busca una alternativa. Una aplicación fiable pide solo lo imprescindible.</p>`]],

'ordenador-como-centro-multimedia': [
  [`Configuración recomendada de un mini PC`, `${li('Sistema ligero y actualizado.', 'Salida HDMI 2.0 o superior.', 'Conexión por cable de red.', 'Mando inalámbrico cómodo.')}`],
  [`Mantenimiento sencillo`, `<p>Actualiza el sistema y el reproductor una vez al mes y limpia el polvo cada pocos meses. Un equipo cuidado mantiene la estabilidad de tu ${K} durante años.</p>`]],

'nas-y-red-local-streaming': [
  [`Cómo empezar con un NAS paso a paso`, `${ol('Conecta el NAS al router con cable.', 'Crea usuarios y contraseñas fuertes.', 'Organiza tus carpetas.', 'Instala el cliente en tus dispositivos.')}`],
  [`Seguridad básica`, `<p>No expongas el NAS a internet sin protección, activa las actualizaciones automáticas y realiza copias de seguridad. Mantener el NAS separado de tu ${K} evita que un fallo de uno afecte al otro.</p>`]],

'tv-en-habitacion-cocina-segunda-pantalla': [
  [`Cómo elegir pantalla para una habitación pequeña`, `${li('Televisor de 24 a 32 pulgadas.', 'Soporte de pared o brazo articulado.', 'Stick con mando fácil.')}`],
  [`Consejos de uso`, `<p>Si va a verse a menudo, conecta por cable o mejora la cobertura de la estancia. Recuerda que cada pantalla activa de tu ${K} cuenta como una conexión simultánea.</p>`]],

'gaming-y-streaming-misma-red': [
  [`Ajustes de red que benefician a ambos`, `${ol('Conecta consola y televisor por cable.', 'Activa la priorización de tráfico en el router.', 'Programa actualizaciones de juegos fuera del horario de visionado.')}`],
  [`Cuándo ampliar la tarifa`, `<p>Si, tras optimizar, la red sigue quedándose corta, valora una tarifa con más velocidad real. Las partidas y la ${K} en 4K a la vez exigen un ancho de banda considerable.</p>`]],

'checklist-hogar-listo-iptv': [
  [`Cómo puntuar tu hogar`, `<p>Marca cada punto de la lista y cuenta cuántos cumples. Con la red y el dispositivo resueltos, tu ${K} funcionará bien casi siempre; los demás puntos son mejoras progresivas.</p>`],
  [`Prioridades si tienes poco presupuesto`, `${ol('Cable de red al televisor principal.', 'Reproductor ágil y actualizado.', 'Router bien colocado y reiniciado con regularidad.')}`]],
};
