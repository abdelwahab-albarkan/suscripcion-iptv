// Páginas legales: Aviso legal, Privacidad, Cookies y Condiciones de contratación.
// Texto informativo basado en la normativa española/UE (LSSI-CE, RGPD, LOPDGDD, TRLGDCU). Revisa con un asesor legal.
const fs = require('fs'), path = require('path');
const LD = JSON.parse(fs.readFileSync(path.join(__dirname, 'legal.json'), 'utf8'));
const MES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

module.exports = function ({ C, K, KC }) {
  const dd = C.date.split('-'), fecha = `${+dd[2]} de ${MES[+dd[1] - 1]} de ${dd[0]}`;
  const row = (l, v) => v ? `<li><strong>${l}:</strong> ${v}</li>` : '';
  const wa = `<a href="https://wa.me/${C.wa}">+${C.wa}</a>`, mail = `<a href="mailto:${C.email}">${C.email}</a>`;
  const web = `<a href="${C.domain}/">${C.domain.replace('https://', '')}</a>`;
  const wrap = (inner) => `<section><div class="wrap"><article class="prose"><p class="meta">Última actualización: ${fecha}</p>${inner}</article></div></section>`;
  const page = (file, title, desc, h1, crumb, lead, inner) => ({ file, title, desc, h1, crumb, lead, body: wrap(inner), legal: true });

  const aviso = page('aviso-legal-suscripcion-iptv.html', `Aviso Legal | ${KC}`,
    `Aviso legal de ${C.brand}: titular del sitio, condiciones de uso, propiedad intelectual y responsabilidad de nuestra suscripción IPTV.`,
    `Aviso legal de la ${K}`, 'Aviso legal', `Información legal sobre el titular de este sitio y las condiciones de uso de nuestra ${K}.`, `
<h2>Identificación del titular del sitio web</h2>
<p>En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web, que ofrece información y contratación de ${K}:</p>
<ul>${row('Titular', LD.titular)}${row('NIF/CIF', LD.nif)}${row('Domicilio', LD.domicilio)}${row('Datos registrales', LD.registro)}${row('Sitio web', web)}${row('Correo electrónico', mail)}${row('WhatsApp', wa)}</ul>
<h2>Objeto y aceptación</h2>
<p>Este aviso regula el acceso y el uso del sitio web ${web}, dedicado a informar sobre la ${K} que ofrecemos y a facilitar su contratación. Navegar por el sitio implica aceptar este aviso legal; si no estás de acuerdo, te pedimos que no lo utilices.</p>
<h2>Condiciones de uso del sitio</h2>
<p>El usuario se compromete a utilizar el sitio de forma lícita, sin dañar su funcionamiento, sin intentar acceder a zonas restringidas y sin introducir contenidos ilícitos. El acceso al sitio es gratuito, sin perjuicio del coste de la conexión a internet que tengas contratada.</p>
<h2>Propiedad intelectual e industrial</h2>
<p>Los textos, el diseño, el código y las imágenes propias de este sitio pertenecen a su titular o se utilizan con la debida autorización. Queda prohibida su reproducción o distribución sin permiso previo y por escrito.</p>
<p>Las marcas y logotipos de terceros que aparecen (por ejemplo, de fabricantes de televisores, reproductores, sistemas operativos o medios de pago) pertenecen a sus respectivos propietarios y se muestran solo para indicar compatibilidad o métodos de pago. Su aparición no implica relación, patrocinio ni afiliación con dichas marcas.</p>
<h2>Contenidos audiovisuales y derechos de emisión</h2>
<p>La disponibilidad de canales y eventos depende de los derechos de emisión de cada contenido. Este sitio no garantiza la emisión de canales de pago ni de competiciones concretas. El usuario debe utilizar la ${K} de forma responsable y conforme a la legislación vigente y a los derechos de propiedad intelectual.</p>
<h2>Responsabilidad</h2>
<p>Nos esforzamos por mantener la información actualizada, pero no garantizamos que el sitio esté libre de errores o interrupciones. No nos hacemos responsables de los daños derivados del uso del sitio ni de los contenidos de enlaces a sitios de terceros, como los servicios de mensajería externos.</p>
<h2>Protección de datos y cookies</h2>
<p>El tratamiento de tus datos personales se describe en la <a href="politica-de-privacidad-suscripcion-iptv.html">política de privacidad</a> y el uso de almacenamiento local en la <a href="politica-de-cookies-suscripcion-iptv.html">política de cookies</a>. La contratación se rige por las <a href="condiciones-contratacion-suscripcion-iptv.html">condiciones de contratación</a>.</p>
<h2>Legislación aplicable y jurisdicción</h2>
<p>Este aviso se rige por la legislación española. Si eres consumidor, podrás acudir a los juzgados y tribunales que correspondan conforme a la normativa de consumo aplicable. Para cualquier consulta sobre este aviso escribe a ${mail}.</p>`);

  const priv = page('politica-de-privacidad-suscripcion-iptv.html', `Política de Privacidad | ${KC}`,
    `Cómo tratamos tus datos personales al contactar o contratar nuestra suscripción IPTV: finalidades, derechos RGPD y conservación.`,
    `Política de privacidad de la ${K}`, 'Privacidad', `Qué datos tratamos cuando contactas o contratas tu ${K}, para qué los usamos y cuáles son tus derechos.`, `
<h2>Responsable del tratamiento</h2>
<ul>${row('Responsable', LD.titular || C.brand)}${row('NIF/CIF', LD.nif)}${row('Domicilio', LD.domicilio)}${row('Correo electrónico', mail)}${row('WhatsApp', wa)}</ul>
<p>Cumplimos el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). Esta política explica cómo tratamos los datos personales relacionados con nuestra ${K}.</p>
<h2>Qué datos tratamos y de dónde proceden</h2>
<ul><li><strong>Datos de contacto y consulta:</strong> nombre, mensaje, tipo de dispositivo y los datos que nos envíes por WhatsApp o correo electrónico.</li><li><strong>Datos de contratación:</strong> plan elegido, número de cuentas, fecha de activación e identificadores de acceso de tu ${K}.</li><li><strong>Datos de pago:</strong> los gestiona el proveedor de pago que elijas; nosotros no almacenamos números completos de tarjeta.</li></ul>
<p>Los formularios de este sitio no envían los datos a nuestros servidores: al enviarlos se abre WhatsApp con tu mensaje, que se tramita bajo las condiciones de ese servicio.</p>
<h2>Finalidades y base jurídica</h2>
<ul><li>Atender consultas y solicitudes de información: consentimiento (art. 6.1.a RGPD).</li><li>Gestionar la contratación, la activación y el soporte técnico de la ${K}: ejecución del contrato (art. 6.1.b).</li><li>Cumplir obligaciones legales, contables y fiscales: obligación legal (art. 6.1.c).</li><li>Garantizar la seguridad del servicio y prevenir usos fraudulentos: interés legítimo (art. 6.1.f).</li></ul>
<h2>Plazo de conservación</h2>
<p>Conservamos los datos mientras dure la relación y, después, durante los plazos de prescripción de las responsabilidades legales. Las conversaciones de consulta se eliminan cuando dejan de ser necesarias para atender tu solicitud.</p>
<h2>Destinatarios y transferencias</h2>
<p>No cedemos tus datos a terceros salvo obligación legal. Pueden acceder a ellos proveedores necesarios para prestar el servicio (mensajería, pasarelas de pago, alojamiento web), con los que se establecen las garantías adecuadas. Algunos de ellos pueden estar fuera del Espacio Económico Europeo; en ese caso se aplican las garantías previstas en el RGPD.</p>
<h2>Tus derechos</h2>
<p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${mail}, indicando el derecho que ejerces y un medio para identificarte. Si consideras que tus datos no se tratan correctamente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es">www.aepd.es</a>).</p>
<h2>Seguridad y menores</h2>
<p>Aplicamos medidas técnicas y organizativas razonables para proteger tus datos. El servicio está dirigido a personas mayores de edad; los menores de 14 años no deben facilitarnos datos sin la autorización de sus padres o tutores.</p>
<h2>Cambios en esta política</h2>
<p>Podemos actualizar esta política para adaptarla a cambios legales o del servicio; la fecha de la última revisión aparece al principio de la página.</p>`);

  const cook = page('politica-de-cookies-suscripcion-iptv.html', `Política de Cookies | ${KC}`,
    `Política de cookies de ${C.brand}: no usamos cookies de analítica ni publicidad en nuestra suscripción IPTV; solo una preferencia de tema.`,
    `Política de cookies de la ${K}`, 'Cookies', `Qué almacenamiento utiliza este sitio de ${K} y cómo puedes gestionarlo desde tu navegador.`, `
<h2>Qué son las cookies y el almacenamiento local</h2>
<p>Las cookies y tecnologías similares (como el almacenamiento local del navegador) permiten recordar información sobre tu visita. Esta política se ofrece conforme al artículo 22.2 de la LSSI-CE.</p>
<h2>Qué utiliza este sitio</h2>
<table class="tbl"><tr><th>Elemento</th><th>Finalidad</th><th>Tipo</th><th>Duración</th></tr>
<tr><td>Almacenamiento local «theme»</td><td>Recordar tu elección de modo claro u oscuro</td><td>Preferencia, propia</td><td>Hasta que lo borres</td></tr></table>
<p>No instalamos cookies propias de analítica, publicidad ni seguimiento en este sitio. Las fuentes se alojan en el propio sitio, por lo que no se cargan servicios de terceros al abrir una página.</p>
<h2>Enlaces a servicios externos</h2>
<p>Algunos botones, como los de contratación o contacto, te llevan a servicios de terceros (por ejemplo, WhatsApp). Cuando sales de este sitio, se aplican las políticas de cookies y privacidad de esos servicios.</p>
<h2>Cómo gestionar o eliminar el almacenamiento</h2>
<p>Puedes borrar los datos de sitios o bloquear el almacenamiento desde los ajustes de tu navegador. Si lo haces, tu preferencia de tema volverá al valor predeterminado.</p>
<h2>Cambios futuros</h2>
<p>Si en el futuro incorporamos herramientas de analítica o publicidad, actualizaremos esta política y solicitaremos tu consentimiento previo antes de instalar cookies no necesarias.</p>
<p>Más información en la <a href="politica-de-privacidad-suscripcion-iptv.html">política de privacidad</a> y el <a href="aviso-legal-suscripcion-iptv.html">aviso legal</a>.</p>`);

  const cond = page('condiciones-contratacion-suscripcion-iptv.html', `Condiciones de Contratación | ${KC}`,
    `Condiciones de contratación de la suscripción IPTV: planes, pago, activación, uso permitido, soporte y derecho de desistimiento.`,
    `Condiciones de contratación de la ${K}`, 'Condiciones de contratación', `Reglas que rigen la contratación y el uso de tu ${K}: planes, pago, activación y soporte.`, `
<h2>Objeto</h2>
<p>Estas condiciones regulan la contratación y el uso de la ${K} que ofrece ${C.brand} a través de este sitio. Antes de pagar, te recomendamos leerlas junto con el <a href="aviso-legal-suscripcion-iptv.html">aviso legal</a> y la <a href="politica-de-privacidad-suscripcion-iptv.html">política de privacidad</a>.</p>
<h2>Descripción del servicio</h2>
<p>La ${K} permite acceder a canales y contenidos bajo demanda a través de internet mediante una aplicación compatible y unos datos de acceso personales. Cada cuenta incluye una conexión simultánea. Los planes disponibles, su duración (3, 6 o 12 meses) y su precio se muestran en la <a href="suscripcion-iptv-precios.html">página de precios</a>.</p>
<h2>Precios y pago</h2>
<p>Los precios se indican en dólares estadounidenses (USD). Antes de confirmar el pago se te informará del importe total, la duración del plan y las condiciones de renovación, si existen. Los métodos de pago aceptados se muestran en el sitio y en el proceso de contratación.</p>
<h2>Activación y acceso</h2>
<p>Tras confirmar el pago recibirás los datos de acceso a tu ${K}, normalmente en pocos minutos. Eres responsable de custodiar esos datos y de no compartirlos fuera de tu hogar.</p>
<h2>Uso permitido</h2>
<ul><li>El servicio es de uso personal y doméstico; no está autorizado su uso comercial ni la emisión ante público en locales.</li><li>No puedes revender, redistribuir ni compartir tu acceso más allá del número de conexiones contratadas.</li><li>Debes respetar la legislación vigente y los derechos de propiedad intelectual de los contenidos.</li></ul>
<p>El incumplimiento grave de estas reglas puede dar lugar a la suspensión del acceso.</p>
<h2>Disponibilidad, contenidos y soporte</h2>
<p>La disponibilidad de canales y eventos depende de los derechos de emisión y de terceros, por lo que puede variar. Ofrecemos soporte técnico por WhatsApp (${wa}) y correo (${mail}) para ayudarte a configurar y usar tu ${K}.</p>
<h2>Derecho de desistimiento</h2>
<p>Si eres consumidor, con carácter general dispones de 14 días naturales para desistir de un contrato a distancia. No obstante, conforme al artículo 103 del Real Decreto Legislativo 1/2007 (TRLGDCU), no procede el desistimiento en el suministro de contenido digital sin soporte material cuando la ejecución ha comenzado con tu consentimiento previo y expreso y con el reconocimiento de que pierdes ese derecho. Si tienes dudas, escríbenos a ${mail} antes de contratar.</p>
<h2>Responsabilidad y garantías</h2>
<p>Prestamos el servicio con la diligencia razonable, pero no garantizamos su funcionamiento ininterrumpido: puede verse afectado por la red del usuario, por mantenimiento o por causas ajenas a nosotros. Esto no limita los derechos que la ley reconoce a los consumidores.</p>
<h2>Modificaciones y legislación aplicable</h2>
<p>Podemos actualizar estas condiciones; las contrataciones ya realizadas se rigen por las vigentes en el momento de la compra. Estas condiciones se rigen por la legislación española. Para cualquier reclamación puedes escribirnos a ${mail}.</p>`);

  return [aviso, priv, cook, cond];
};
