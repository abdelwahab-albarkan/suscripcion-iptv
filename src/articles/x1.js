// Secciones ampliadas (batch 1: red y rendimiento). Se añaden antes de la conclusión de cada artículo.
const K = 'suscripción IPTV';
const li = (...a) => `<ul>${a.map(x => `<li>${x}</li>`).join('')}</ul>`;
const ol = (...a) => `<ol>${a.map(x => `<li>${x}</li>`).join('')}</ol>`;
module.exports = {
'por-que-se-corta-la-imagen': [
  [`Método de descarte en cinco minutos para tu ${K}`, `<p>Antes de cambiar nada, aísla el problema con un orden fijo. Así evitas tocar ajustes que no tienen que ver y sabes con certeza qué solucionó el corte.</p>${ol('Anota en qué canal y a qué hora se corta.', 'Prueba el mismo canal en otro dispositivo de casa.', 'Prueba otro canal en el dispositivo que falla.', 'Repite con cable de red o acerca el dispositivo al router.', 'Si solo falla en horas concretas, apunta las franjas durante tres días.')}<p>Con esos datos, la causa suele quedar clara: canal, dispositivo, wifi o saturación de tu operador.</p>`],
  [`Errores que empeoran los cortes`, `${li('Reiniciar el televisor una y otra vez sin tocar el router.', 'Instalar varias aplicaciones reproductoras a la vez, que compiten por memoria.', 'Usar un repetidor wifi antiguo como solución definitiva.', 'Subir la calidad a 4K cuando tu conexión apenas sostiene HD.')}<p>Corregir la causa real es más eficaz que cambiar de aplicación en cada corte. Cuando hayas descartado tu red y tu dispositivo, escribe a soporte con las franjas horarias anotadas: es la información que más acelera la revisión de tu ${K}.</p>`]],

'velocidad-internet-necesaria-4k': [
  [`Cómo comprobar si tu conexión llega para 4K`, `<p>La velocidad contratada no basta: importa la que llega al televisor. Haz la medición con el mismo dispositivo que usarás para ver tu ${K}, en la franja de mayor uso, y repítela tres veces.</p>${ol('Conecta el dispositivo a la red habitual.', 'Cierra descargas y otras pantallas durante la prueba.', 'Anota velocidad de bajada, ping y variación entre pruebas.', 'Compara con 25 Mbps estables para una pantalla en 4K.')}`],
  [`Qué hacer si no llegas a los 25 Mbps`, `<p>Si el resultado se queda corto, no hace falta renunciar a la imagen nítida: Full HD con buen bitrate suele verse muy bien y exige bastante menos ancho de banda.</p>${li('Fija la calidad en Full HD desde los ajustes de la aplicación.', 'Conecta por cable para recuperar la velocidad que pierdes por wifi.', 'Pide a tu operador una revisión si la línea rinde mucho menos de lo contratado.')}<p>Elegir bien la calidad es parte de configurar una ${K} estable.</p>`]],

'consumo-datos-por-hora': [
  [`Calcula tu consumo mensual con un ejemplo real`, `<p>Imagina un hogar que ve dos horas al día en HD. Con unos 3,6 GB por hora, son 7,2 GB diarios y unos 216 GB al mes solo en televisión. Si además hay un segundo televisor encendido una hora, el total sube con rapidez.</p>${li('Multiplica horas por consumo por hora de cada pantalla.', 'Suma las pantallas que se usan a la vez.', 'Compara el resultado con el límite de tu tarifa, si lo tiene.')}`],
  [`Cuándo conviene bajar la calidad`, `<p>En el móvil, la diferencia entre HD y SD apenas se nota por el tamaño de la pantalla, pero el consumo se reduce a la mitad o más. Reserva Full HD y 4K para el televisor con wifi o fibra.</p><p>Una ${K} bien ajustada permite elegir la calidad por dispositivo y evita sorpresas en la factura de datos móviles.</p>`]],

'wifi-o-cable-para-iptv': [
  [`Cómo llevar un cable de red al televisor sin obras`, `<p>Si el router está lejos, hay soluciones discretas que no exigen picar paredes. Mide primero el recorrido real y añade un metro de margen.</p>${li('Canaletas adhesivas que siguen el rodapié o el marco de las puertas.', 'Cable plano para pasar bajo una puerta sin dañarla.', 'Adaptadores por la instalación eléctrica cuando el cableado directo no es posible.')}`],
  [`Qué mejora notarás con cable en tu ${K}`, `<p>El cambio más visible es la estabilidad en los directos: desaparecen los microcortes y la imagen mantiene la calidad durante todo el evento. También se acorta el tiempo de carga al cambiar de canal.</p><p>Si no puedes usar cable, coloca el router a la vista, usa la banda de 5 GHz y reserva el wifi para dispositivos móviles.</p>`]],

'wifi-5-vs-wifi-6': [
  [`Checklist antes de comprar un router nuevo`, `<p>Cambiar de router solo mejora tu ${K} si el problema está en el router. Comprueba antes estos puntos:</p>${ol('Mide la velocidad con cable: si es buena, la línea no es el problema.', 'Mide en el salón por wifi: si cae a la mitad, hay un problema de cobertura.', 'Prueba a recolocar el router o a usar la banda de 5 GHz.', 'Solo entonces valora un equipo con mejor cobertura o un sistema mesh.')}`],
  [`Compatibilidad de tus dispositivos`, `<p>Un router moderno solo rinde al máximo con dispositivos modernos. Muchos televisores y sticks aún usan wifi 5, así que la mejora se nota sobre todo en el conjunto de la casa: móviles, ordenadores y consolas liberan capacidad para el televisor.</p>${li('Revisa la ficha técnica del televisor o del stick.', 'Prioriza el cable en el dispositivo principal.', 'No pagues de más por prestaciones que tus equipos no aprovechan.')}`]],

'mejor-ubicacion-router': [
  [`Prueba de ubicación en tres pasos`, `${ol('Haz una medición de velocidad en el salón con el router donde está ahora.', 'Muévelo a un punto más central y elevado y repite la medición.', 'Conserva la posición que ofrezca mayor velocidad y menos variación.')}<p>Es un ajuste gratuito que a menudo resuelve cortes en la ${K} sin comprar nada.</p>`],
  [`Cuando la ubicación no basta`, `<p>Si el router debe quedarse junto a la entrada de la fibra, no luches contra la geometría de la casa: lleva la conexión al televisor por cable o con un nodo adicional.</p>${li('Un nodo mesh en la zona del salón.', 'Un punto de acceso conectado por cable al router.', 'Un adaptador por la instalación eléctrica en viviendas con cableado moderno.')}`]],

'repetidores-vs-mesh-vs-powerline': [
  [`Cómo elegir según el tipo de vivienda`, `${li('<strong>Piso pequeño:</strong> suele bastar recolocar el router o un powerline.', '<strong>Casa de dos plantas:</strong> un sistema mesh con nodos en cada planta.', '<strong>Muros gruesos o hormigón:</strong> cable o powerline antes que wifi.')}<p>La clave es llevar al televisor una señal estable; el resto de dispositivos pueden usar wifi sin problema.</p>`],
  [`Qué evitar al ampliar la cobertura`, `<p>Encadenar varios repetidores multiplica la pérdida de velocidad y la latencia. Para una ${K} en 4K, esa suma suele traducirse en cortes.</p>${li('No conectes un repetidor al final de otro repetidor.', 'No coloques los nodos en puntos donde la señal ya llega débil.', 'Comprueba siempre la velocidad real en el televisor después de instalar.')}`]],

'cambiar-dns-mejorar-carga': [
  [`Cómo medir si el cambio ha servido`, `<p>Anota cuánto tarda en abrir la guía y en cargar un canal antes del cambio. Tras aplicar el nuevo DNS, repite la prueba tres veces y compara. Si no hay diferencia apreciable, vuelve al valor automático: no pierdes nada.</p>`],
  [`Cuándo el DNS no es el problema`, `<p>Si los cortes ocurren en mitad de la reproducción, el DNS no influye: solo afecta al momento de conectar. En ese caso revisa cable, wifi y saturación en horas punta.</p>${li('Tiempos de carga largos al abrir canales: sí puede ayudar.', 'Cortes durante la emisión: revisa la red.', `Error de conexión al abrir la aplicación: comprueba los datos de acceso de tu ${K}.`)}`]],

'que-es-buffering': [
  [`Guía rápida para reducir el buffering`, `${ol('Baja un escalón la calidad de reproducción.', 'Conecta por cable o acércate al router.', 'Cierra descargas y aplicaciones en segundo plano.', 'Reinicia la aplicación y, si sigue, el router.', 'Prueba otro canal para descartar el origen.')}<p>Con esta secuencia se resuelve la mayoría de los casos sin tocar ajustes avanzados.</p>`],
  [`Buffering al inicio frente a buffering continuo`, `<p>Si el círculo aparece solo unos segundos al abrir un canal, es normal. Si se repite durante la reproducción, el problema está en la velocidad o en la estabilidad. Anota si ocurre con todos los canales de tu ${K} o solo con uno, porque eso indica si la causa está en tu red o en el origen de la señal.</p>`]],

'latencia-en-directo-por-que-llega-tarde': [
  [`Cómo convivir con el retraso en eventos deportivos`, `${li('Silencia las notificaciones del móvil mientras ves el partido.', 'Evita redes sociales hasta que termine la jugada.', 'Si sigues el marcador en otra pantalla, ten en cuenta que irá por delante.')}<p>El retraso es una característica de la televisión por internet y no un fallo de tu ${K}.</p>`],
  [`Qué influye en la magnitud del retraso`, `<p>Cada etapa del recorrido suma segundos: la codificación en origen, la distribución, la descarga y el almacenamiento temporal de tu aplicación. Reducir el tamaño del búfer, cuando la aplicación lo permite, recorta parte del retraso a cambio de menos margen ante cortes de red.</p>`]],

'bitrate-y-calidad-sd-hd-4k': [
  [`Cómo comparar la calidad real de dos canales`, `${ol('Elige un contenido con mucho movimiento, como un partido.', 'Míralo en dos canales con la misma resolución nominal.', 'Fíjate en bloques, bordes borrosos y colores planos.', 'Anota cuál ofrece más nitidez a la misma distancia.')}<p>El canal más limpio suele tener mejor bitrate, aunque ambos se anuncien igual.</p>`],
  [`Qué ajustar en tu ${K} para ganar nitidez`, `${li('Activa la mejor calidad que tu conexión sostenga sin cortes.', 'Desactiva funciones de suavizado agresivo en el televisor.', 'Usa el modo de imagen «cine» o «estándar» en lugar del modo vivo.')}<p>A veces un ajuste de imagen mejora más que subir de resolución.</p>`]],

'hdmi-hdr-dolby-4k-configuracion': [
  [`Errores habituales de configuración HDMI`, `${li('Conectar el reproductor a un puerto que no admite 4K.', 'Usar un cable antiguo que limita el ancho de banda.', 'Dejar el formato mejorado de HDMI desactivado.', 'Pasar la señal por un receptor que no soporta HDR.')}<p>Con un solo eslabón débil, toda la cadena se limita a la calidad más baja.</p>`],
  [`Prueba final de imagen para tu ${K}`, `<p>Abre un canal en 4K o un contenido de demostración y comprueba que el televisor muestra el indicador de 4K y de HDR cuando corresponde. Si no aparece, revisa primero el puerto y el cable, y después los ajustes de resolución del reproductor.</p>`]],

'reiniciar-router-cuando-y-como': [
  [`Señales de que toca reiniciar`, `${li('Páginas y canales tardan más en cargar que de costumbre.', 'La velocidad cae sin motivo aparente.', 'Varios dispositivos pierden la conexión a la vez.')}<p>Reiniciar es una medida de mantenimiento sencilla que conviene hacer antes de culpar a la ${K}.</p>`],
  [`Qué no hacer`, `<p>Evita pulsar el botón de restablecimiento de fábrica salvo que sea imprescindible: borra la configuración, las contraseñas del wifi y los ajustes que tu operador haya aplicado. Si el problema persiste tras reiniciar, apunta fecha y hora y consulta con tu operador.</p>`]],

'fibra-vs-adsl-vs-4g-para-tv': [
  [`Cómo saber qué tecnología tienes realmente`, `<p>Consulta tu factura o el panel de tu operador: allí figura si la línea es fibra hasta el hogar, ADSL o acceso inalámbrico. Una prueba de velocidad con cable te da la cifra real.</p>${li('Más de 100 Mbps estables suelen indicar fibra.', 'Entre 5 y 30 Mbps suelen indicar ADSL.', 'Variaciones fuertes con la hora apuntan a acceso móvil o radioenlace.')}`],
  [`Cómo adaptar tu ${K} a una conexión limitada`, `<p>Con ADSL o 4G puedes disfrutar del servicio ajustando la calidad: HD en una pantalla y SD en una segunda. Evita descargas simultáneas y deja la televisión como prioridad durante la emisión.</p>`]],

'varias-pantallas-a-la-vez-ancho-banda': [
  [`Ejemplo de reparto en un hogar de cuatro personas`, `<p>Un televisor en 4K (25 Mbps), otro en HD (10 Mbps), un móvil en HD (8 Mbps) y una videollamada (5 Mbps) suman unos 48 Mbps. Con un margen del 30 %, necesitas en torno a 62 Mbps reales, algo que una fibra de 300 Mbps cubre con holgura.</p>`],
  [`Reglas de convivencia para la red`, `${li('Programa las descargas pesadas de madrugada.', 'Usa cable en las pantallas fijas.', 'Reserva la mejor calidad para el televisor principal.', `Elige un plan de ${K} con tantas cuentas como pantallas simultáneas tengas.`)}`]],

'qos-router-priorizar-streaming': [
  [`Cómo comprobar que el QoS funciona`, `${ol('Con el QoS activado, inicia una descarga grande en otro dispositivo.', 'Reproduce un canal en el televisor y observa si se mantiene estable.', 'Desactiva el QoS y repite la prueba para comparar.')}<p>Si no notas diferencia, tu red tiene margen suficiente y no hace falta mantenerlo.</p>`],
  [`Ajustes habituales por fabricante`, `<p>El nombre cambia: «prioridad de tráfico», «gestión de ancho de banda» o «WMM». Busca la opción que permita priorizar un dispositivo por su dirección o nombre y asígnale prioridad alta para que tu ${K} no pierda calidad cuando la casa está ocupada.</p>`]],

'ping-jitter-perdida-paquetes': [
  [`Cómo hacer una medición de pérdida de paquetes`, `<p>Desde un ordenador conectado por cable, ejecuta un ping continuado hacia un servidor público durante varios minutos y observa el porcentaje de paquetes perdidos al final.</p>${li(`0 % a 1 %: la conexión es sana para ver tu ${K}.`, 'Entre 1 % y 3 %: pueden aparecer microcortes.', 'Más de 3 %: revisa cable, router y operador.')}`],
  [`Cómo reducir el jitter en casa`, `<p>El jitter sube cuando varios dispositivos compiten por la misma red. Usa cable para el televisor, evita las bandas saturadas de wifi y programa las tareas pesadas fuera de las horas de visionado.</p>`]],

'vpn-y-streaming-pros-y-contras': [
  [`Cuándo puede tener sentido usar una VPN`, `${li('En redes wifi públicas de hoteles o aeropuertos, para proteger tus datos.', 'Si tu operador aplica restricciones que afectan a la conexión.', 'Si quieres más privacidad en tu navegación general.')}<p>Para ver tu ${K} en casa, con una buena conexión, normalmente no es necesaria.</p>`],
  [`Cómo probar el efecto sobre la velocidad`, `${ol('Mide la velocidad sin VPN.', 'Activa la VPN y repite la medición.', 'Compara la bajada y el ping.', 'Si pierdes más de un tercio, desactívala para ver televisión.')}<p>Elige siempre servicios de reputación conocida y respeta las condiciones de uso de los contenidos.</p>`]],

'limpiar-cache-aplicacion-iptv': [
  [`Diferencia entre borrar caché y borrar datos`, `<p>Borrar la caché elimina archivos temporales sin tocar tu configuración. Borrar los datos restablece la aplicación como recién instalada: perderás favoritos, listas y ajustes, y tendrás que volver a introducir los datos de tu ${K}.</p>`],
  [`Mantenimiento recomendado`, `${li('Limpia la caché cada dos o tres meses.', 'Revisa el espacio libre del dispositivo tras cada actualización.', 'Reinstala la aplicación solo si la limpieza no resuelve el problema.')}`]],

'actualizar-firmware-televisor': [
  [`Cuándo conviene esperar a actualizar`, `<p>Si tu televisor funciona de maravilla y justo antes de un gran evento aparece una actualización, puede ser prudente esperar unos días y leer si da problemas. Actualiza con calma, no minutos antes de ver tu ${K}.</p>`],
  [`Qué comprobar después de actualizar`, `${ol('Abre la aplicación reproductora y verifica que carga la lista.', 'Revisa los ajustes de imagen, que a veces se restablecen.', 'Comprueba la conexión de red y la salida de audio.')}`]],

'sobrecalentamiento-stick-tv': [
  [`Cómo comprobar la temperatura de forma sencilla`, `<p>Tras 30 minutos de reproducción, toca la carcasa: si está muy caliente y no puedes mantener el dedo, hay un problema de ventilación o de alimentación. Desconéctalo unos minutos antes de volver a usar tu ${K}.</p>`],
  [`Accesorios que ayudan`, `${li('Alargador HDMI para sacar el stick de la zona trasera caliente.', 'Fuente de alimentación original o de calidad.', 'Un pequeño disipador adhesivo, si el fabricante lo admite.')}`]],

'almacenamiento-lleno-dispositivo-lento': [
  [`Rutina mensual de limpieza en cinco minutos`, `${ol('Abre los ajustes de almacenamiento del dispositivo.', 'Ordena las aplicaciones por tamaño.', 'Desinstala las que no uses.', 'Borra la caché de las pesadas.', 'Reinicia el dispositivo.')}`],
  [`Qué espacio libre conviene mantener`, `<p>Como referencia, mantén al menos un 15 % libre. Un dispositivo con poco margen tarda más en abrir tu ${K}, en cargar la guía y en cambiar de canal.</p>`]],

'horas-punta-saturacion-red': [
  [`Cómo documentar el problema para tu operador`, `${ol('Haz pruebas de velocidad por cable a la misma hora durante una semana.', 'Guarda capturas con fecha y resultados.', 'Presenta la reclamación con esos datos.')}<p>Con pruebas objetivas, tu operador no puede atribuir el fallo a la ${K}.</p>`],
  [`Estrategias mientras se resuelve`, `${li('Baja un escalón la calidad en horas punta.', 'Programa descargas fuera de esa franja.', 'Valora un operador con mejor red en tu zona si la saturación persiste.')}`]],

'prueba-velocidad-correcta': [
  [`Qué anotar en cada medición`, `${li('Fecha y hora.', 'Velocidad de bajada y de subida.', 'Ping y variación entre pruebas.', 'Si se midió por cable o por wifi.')}<p>Esa tabla simple te sirve para decidir calidad, plan de tu ${K} y reclamaciones.</p>`],
  [`Errores que falsean el resultado`, `<p>Medir con otras descargas en marcha, usar un dispositivo muy antiguo o hacerlo lejos del router por wifi lleva a cifras engañosas. Hazlo siempre en condiciones iguales para poder comparar.</p>`]],

'modo-5ghz-canal-wifi': [
  [`Cómo elegir el canal con una aplicación de análisis`, `<p>Muchas aplicaciones gratuitas muestran las redes cercanas y el canal que usan. Elige uno poco saturado y fíjalo en el router. Repite la comprobación si cambian tus vecinos.</p>`],
  [`Resultado esperado en tu ${K}`, `<p>Con la banda de 5 GHz y un canal limpio, la reproducción es más estable y la carga de canales más rápida. Si aun así hay cortes, el cable de red sigue siendo la mejor opción.</p>`]],
};
