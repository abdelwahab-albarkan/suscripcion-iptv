// Datos reales y estables (ciudades, provincias, clubes, canales TDT, dispositivos y apps).
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// provincia -> comunidad
const PROV = {
  'A Coruña': 'Galicia', 'Lugo': 'Galicia', 'Ourense': 'Galicia', 'Pontevedra': 'Galicia',
  'Álava': 'País Vasco', 'Bizkaia': 'País Vasco', 'Gipuzkoa': 'País Vasco',
  'Albacete': 'Castilla-La Mancha', 'Ciudad Real': 'Castilla-La Mancha', 'Cuenca': 'Castilla-La Mancha', 'Guadalajara': 'Castilla-La Mancha', 'Toledo': 'Castilla-La Mancha',
  'Alicante': 'Comunidad Valenciana', 'Castellón': 'Comunidad Valenciana', 'Valencia': 'Comunidad Valenciana',
  'Almería': 'Andalucía', 'Cádiz': 'Andalucía', 'Córdoba': 'Andalucía', 'Granada': 'Andalucía', 'Huelva': 'Andalucía', 'Jaén': 'Andalucía', 'Málaga': 'Andalucía', 'Sevilla': 'Andalucía',
  'Asturias': 'Asturias', 'Baleares': 'Islas Baleares', 'Cantabria': 'Cantabria', 'La Rioja': 'La Rioja', 'Madrid': 'Comunidad de Madrid', 'Murcia': 'Región de Murcia', 'Navarra': 'Navarra',
  'Ávila': 'Castilla y León', 'Burgos': 'Castilla y León', 'León': 'Castilla y León', 'Palencia': 'Castilla y León', 'Salamanca': 'Castilla y León', 'Segovia': 'Castilla y León', 'Soria': 'Castilla y León', 'Valladolid': 'Castilla y León', 'Zamora': 'Castilla y León',
  'Badajoz': 'Extremadura', 'Cáceres': 'Extremadura',
  'Barcelona': 'Cataluña', 'Girona': 'Cataluña', 'Lleida': 'Cataluña', 'Tarragona': 'Cataluña',
  'Las Palmas': 'Canarias', 'Santa Cruz de Tenerife': 'Canarias',
  'Huesca': 'Aragón', 'Teruel': 'Aragón', 'Zaragoza': 'Aragón',
};
// televisión autonómica pública (solo las que existen con certeza)
const REGTV = {
  'Andalucía': ['Canal Sur', 'Andalucía TV'], 'Aragón': ['Aragón TV'], 'Asturias': ['TPA'], 'Islas Baleares': ['IB3'],
  'Canarias': ['Televisión Canaria'], 'Castilla-La Mancha': ['CMM TV'], 'Cataluña': ['TV3', '3/24'], 'Comunidad Valenciana': ['À Punt'],
  'Comunidad de Madrid': ['Telemadrid', 'laOtra'], 'Galicia': ['TVG', 'TVG2'], 'País Vasco': ['ETB 1', 'ETB 2'], 'Navarra': ['Navarra Televisión'],
  'Región de Murcia': ['7 Región de Murcia'], 'Extremadura': ['Canal Extremadura'],
};
const CITIES_RAW = `A Coruña: A Coruña, Santiago de Compostela, Ferrol, Narón, Oleiros, Arteixo, Carballo, Ribeira
Álava: Vitoria-Gasteiz, Llodio
Albacete: Albacete, Hellín, Villarrobledo, Almansa
Alicante: Alicante, Elche, Torrevieja, Orihuela, Benidorm, Alcoy, Elda, San Vicente del Raspeig, Denia, Villena, Santa Pola, Petrer, Calpe, Jávea
Almería: Almería, El Ejido, Roquetas de Mar, Níjar, Adra, Vera
Asturias: Oviedo, Gijón, Avilés, Siero, Langreo, Mieres
Ávila: Ávila
Badajoz: Badajoz, Mérida, Don Benito, Almendralejo, Villanueva de la Serena
Baleares: Palma, Ibiza, Manacor, Mahón, Calvià, Inca, Llucmajor
Barcelona: Barcelona, L'Hospitalet de Llobregat, Badalona, Terrassa, Sabadell, Mataró, Santa Coloma de Gramenet, Granollers, Cornellà de Llobregat, Sant Cugat del Vallès, Manresa, Rubí, Vilanova i la Geltrú, Viladecans, Castelldefels, El Prat de Llobregat, Sant Boi de Llobregat, Cerdanyola del Vallès, Mollet del Vallès, Esplugues de Llobregat, Vic
Burgos: Burgos, Miranda de Ebro
Cáceres: Cáceres, Plasencia, Navalmoral de la Mata
Cádiz: Cádiz, Jerez de la Frontera, Algeciras, San Fernando, El Puerto de Santa María, Chiclana de la Frontera, La Línea de la Concepción, Sanlúcar de Barrameda, Puerto Real, Rota
Cantabria: Santander, Torrelavega, Castro Urdiales, Camargo
Castellón: Castellón de la Plana, Vila-real, Benicarló, Burriana, Vinaròs
Ciudad Real: Ciudad Real, Puertollano, Tomelloso, Alcázar de San Juan, Valdepeñas
Córdoba: Córdoba, Lucena, Puente Genil, Montilla, Priego de Córdoba
Cuenca: Cuenca
Girona: Girona, Figueres, Blanes, Lloret de Mar, Salt
Granada: Granada, Motril, Almuñécar, Baza, Guadix, Armilla, Maracena
Guadalajara: Guadalajara, Azuqueca de Henares
Gipuzkoa: San Sebastián, Irún, Eibar, Errenteria, Zarautz
Huelva: Huelva, Lepe, Almonte, Isla Cristina
Huesca: Huesca, Monzón, Barbastro
Jaén: Jaén, Linares, Andújar, Úbeda, Martos
La Rioja: Logroño, Calahorra, Arnedo
Las Palmas: Las Palmas de Gran Canaria, Telde, Arrecife, Santa Lucía de Tirajana, Puerto del Rosario, San Bartolomé de Tirajana
León: León, Ponferrada, San Andrés del Rabanedo
Lleida: Lleida, Balaguer, Tàrrega
Lugo: Lugo, Monforte de Lemos, Viveiro
Madrid: Madrid, Móstoles, Alcalá de Henares, Fuenlabrada, Leganés, Getafe, Alcorcón, Torrejón de Ardoz, Parla, Alcobendas, Las Rozas de Madrid, San Sebastián de los Reyes, Pozuelo de Alarcón, Rivas-Vaciamadrid, Coslada, Valdemoro, Majadahonda, Collado Villalba, Aranjuez, Arganda del Rey, Boadilla del Monte, Pinto, San Fernando de Henares
Málaga: Málaga, Marbella, Vélez-Málaga, Fuengirola, Mijas, Benalmádena, Torremolinos, Estepona, Rincón de la Victoria, Antequera, Ronda, Nerja
Murcia: Murcia, Cartagena, Lorca, Molina de Segura, Alcantarilla, Torre-Pacheco, Águilas, Yecla, Cieza, Jumilla
Navarra: Pamplona, Tudela, Barañáin, Burlada
Ourense: Ourense
Palencia: Palencia
Pontevedra: Vigo, Pontevedra, Vilagarcía de Arousa, Redondela, Marín
Salamanca: Salamanca
Santa Cruz de Tenerife: Santa Cruz de Tenerife, San Cristóbal de La Laguna, Arona, Adeje, Santa Cruz de La Palma, Puerto de la Cruz, Los Realejos
Segovia: Segovia
Sevilla: Sevilla, Dos Hermanas, Alcalá de Guadaíra, Utrera, Mairena del Aljarafe, Écija, Morón de la Frontera, La Rinconada, Carmona
Soria: Soria
Tarragona: Tarragona, Reus, Tortosa, Salou, Cambrils, Valls
Teruel: Teruel
Toledo: Toledo, Talavera de la Reina, Illescas, Seseña
Valencia: Valencia, Torrent, Gandía, Paterna, Sagunto, Alzira, Mislata, Burjassot, Ontinyent, Xàtiva, Cullera, Sueca, Manises, Aldaia
Valladolid: Valladolid, Medina del Campo, Laguna de Duero
Bizkaia: Bilbao, Barakaldo, Getxo, Portugalete, Santurtzi, Basauri, Sestao, Leioa
Zamora: Zamora, Benavente
Zaragoza: Zaragoza, Calatayud, Utebo, Ejea de los Caballeros`;
const CITIES = [];
CITIES_RAW.split('\n').forEach(l => { const [p, rest] = l.split(': '); rest.split(', ').forEach(c => CITIES.push({ name: c, prov: p, com: PROV[p], slug: slug(c) })); });

// clubes: nombre, ciudad (debe existir en CITIES), estadio
const TEAMS = [
  ['Real Madrid', 'Madrid', 'Santiago Bernabéu'], ['Atlético de Madrid', 'Madrid', 'Metropolitano'], ['Rayo Vallecano', 'Madrid', 'Estadio de Vallecas'], ['Getafe CF', 'Getafe', 'Coliseum'], ['CD Leganés', 'Leganés', 'Butarque'],
  ['FC Barcelona', 'Barcelona', 'Spotify Camp Nou'], ['RCD Espanyol', 'Barcelona', 'RCDE Stadium'], ['Girona FC', 'Girona', 'Montilivi'],
  ['Sevilla FC', 'Sevilla', 'Ramón Sánchez-Pizjuán'], ['Real Betis', 'Sevilla', 'Benito Villamarín'], ['Málaga CF', 'Málaga', 'La Rosaleda'], ['Granada CF', 'Granada', 'Nuevo Los Cármenes'], ['Cádiz CF', 'Cádiz', 'Nuevo Mirandilla'], ['UD Almería', 'Almería', 'Power Horse Stadium'], ['Córdoba CF', 'Córdoba', 'El Arcángel'],
  ['Valencia CF', 'Valencia', 'Mestalla'], ['Levante UD', 'Valencia', 'Ciutat de València'], ['Villarreal CF', 'Vila-real', 'Estadio de la Cerámica'], ['Elche CF', 'Elche', 'Martínez Valero'], ['CD Castellón', 'Castellón de la Plana', 'Castalia'],
  ['Athletic Club', 'Bilbao', 'San Mamés'], ['Real Sociedad', 'San Sebastián', 'Reale Arena'], ['SD Eibar', 'Eibar', 'Ipurua'], ['Deportivo Alavés', 'Vitoria-Gasteiz', 'Mendizorroza'], ['CA Osasuna', 'Pamplona', 'El Sadar'],
  ['Celta de Vigo', 'Vigo', 'Balaídos'], ['RC Deportivo', 'A Coruña', 'Riazor'], ['Real Oviedo', 'Oviedo', 'Carlos Tartiere'], ['Sporting de Gijón', 'Gijón', 'El Molinón'], ['Racing de Santander', 'Santander', 'El Sardinero'],
  ['RCD Mallorca', 'Palma', 'Son Moix'], ['UD Las Palmas', 'Las Palmas de Gran Canaria', 'Estadio de Gran Canaria'], ['Real Valladolid', 'Valladolid', 'José Zorrilla'], ['Burgos CF', 'Burgos', 'El Plantío'], ['Cultural Leonesa', 'León', 'Reino de León'],
  ['Real Zaragoza', 'Zaragoza', 'La Romareda'], ['SD Huesca', 'Huesca', 'El Alcoraz'], ['Albacete Balompié', 'Albacete', 'Carlos Belmonte'], ['CD Mirandés', 'Miranda de Ebro', 'Anduva'], ['Real Murcia', 'Murcia', 'Nueva Condomina'],
  ['CD Tenerife', 'Santa Cruz de Tenerife', 'Heliodoro Rodríguez López'], ['Real Racing Club de Ferrol', 'Ferrol', 'A Malata'], ['Real Jaén', 'Jaén', 'La Victoria'], ['Real Betis Féminas', 'Sevilla', 'Estadio Benito Villamarín'], ['Hércules CF', 'Alicante', 'José Rico Pérez'],
  ['CD Lugo', 'Lugo', 'Anxo Carro'], ['CE Sabadell', 'Sabadell', 'Nova Creu Alta'], ['UD Logroñés', 'Logroño', 'Las Gaunas'],
].filter(t => !t[0].includes('Féminas'));

// competiciones
const COMPS = [
  ['LaLiga', 'fútbol', 'jornada semanal de fin de semana'], ['Segunda División', 'fútbol', 'jornadas de viernes a lunes'], ['Copa del Rey', 'fútbol', 'eliminatorias a partido único y doble'], ['Supercopa de España', 'fútbol', 'formato de torneo corto'],
  ['UEFA Champions League', 'fútbol', 'jornadas entre semana por la noche'], ['UEFA Europa League', 'fútbol', 'jueves por la tarde y noche'], ['UEFA Conference League', 'fútbol', 'jueves en doble horario'], ['Premier League', 'fútbol', 'jornadas de fin de semana y entre semana'],
  ['Serie A', 'fútbol', 'jornadas de fin de semana'], ['Bundesliga', 'fútbol', 'sábados por la tarde'], ['Ligue 1', 'fútbol', 'viernes, sábado y domingo'], ['Liga F', 'fútbol femenino', 'partidos de fin de semana'],
  ['Liga ACB', 'baloncesto', 'jornadas de fin de semana'], ['Euroliga', 'baloncesto', 'jornadas entre semana'], ['NBA', 'baloncesto', 'partidos de madrugada en horario español'], ['Fórmula 1', 'motor', 'fin de semana de Gran Premio'],
  ['MotoGP', 'motor', 'fin de semana de Gran Premio'], ['Roland Garros', 'tenis', 'quincena de tierra batida'], ['Tour de Francia', 'ciclismo', 'tres semanas en julio'], ['La Vuelta a España', 'ciclismo', 'tres semanas entre agosto y septiembre'],
];

// canales de TDT en abierto (nacionales, autonómicos y generalistas) — nombre, grupo, tipo
const CHANNELS = [
  ['La 1', 'RTVE', 'generalista'], ['La 2', 'RTVE', 'cultural y documental'], ['24 Horas', 'RTVE', 'noticias'], ['Teledeporte', 'RTVE', 'deportes'], ['Clan', 'RTVE', 'infantil'],
  ['Antena 3', 'Atresmedia', 'generalista'], ['laSexta', 'Atresmedia', 'generalista'], ['Neox', 'Atresmedia', 'juvenil'], ['Nova', 'Atresmedia', 'series y entretenimiento'], ['Mega', 'Atresmedia', 'entretenimiento'], ['Atreseries', 'Atresmedia', 'series'],
  ['Telecinco', 'Mediaset', 'generalista'], ['Cuatro', 'Mediaset', 'generalista'], ['FDF', 'Mediaset', 'series y humor'], ['Divinity', 'Mediaset', 'entretenimiento'], ['Energy', 'Mediaset', 'entretenimiento'], ['Boing', 'Mediaset', 'infantil'], ['Be Mad', 'Mediaset', 'cine y series'],
  ['Real Madrid TV', null, 'deportes'], ['DMAX', null, 'documentales'], ['Paramount Network', null, 'cine y series'], ['TEN', null, 'entretenimiento'], ['Bom Cine', null, 'cine'], ['13 TV', null, 'generalista'], ['Trece', null, 'generalista'], ['Kiss TV', null, 'música'], ['Ten', null, 'entretenimiento'], ['Gol Play', null, 'deportes'],
  ['Telemadrid', 'Telemadrid', 'autonómico'], ['laOtra', 'Telemadrid', 'autonómico'], ['Canal Sur', 'RTVA', 'autonómico'], ['Andalucía TV', 'RTVA', 'autonómico'], ['TV3', 'CCMA', 'autonómico'], ['3/24', 'CCMA', 'autonómico y noticias'], ['ETB 2', 'EiTB', 'autonómico'], ['ETB 1', 'EiTB', 'autonómico'], ['TVG', 'CRTVG', 'autonómico'], ['TVG2', 'CRTVG', 'autonómico'],
  ['Aragón TV', 'CARTV', 'autonómico'], ['À Punt', 'À Punt Mèdia', 'autonómico'], ['TPA', 'RTPA', 'autonómico'], ['IB3', 'IB3', 'autonómico'], ['CMM TV', 'CMM', 'autonómico'], ['Televisión Canaria', 'RTVC', 'autonómico'], ['Canal Extremadura', 'CEXMA', 'autonómico'], ['7 Región de Murcia', '7RM', 'autonómico'], ['Navarra Televisión', 'NTV', 'autonómico'],
  ['Euronews', null, 'noticias internacionales'], ['France 24', null, 'noticias internacionales'], ['DW', null, 'noticias internacionales'], ['Al Jazeera English', null, 'noticias internacionales'], ['CNN International', null, 'noticias internacionales'], ['BBC News', null, 'noticias internacionales'],
].filter(c => !['Ten', 'Trece', 'Gol Play'].includes(c[0]));

// dispositivos y plataformas
const DEVICES = [
  ['Samsung Smart TV', 'tizen', 'Smart Hub', 'televisor'], ['LG Smart TV', 'webos', 'LG Content Store', 'televisor'], ['Android TV', 'androidtv', 'Google Play Store', 'televisor'], ['Google TV', 'androidtv', 'Google Play Store', 'televisor'],
  ['Amazon Fire TV Stick', 'fireos', 'Amazon Appstore', 'stick'], ['Xiaomi TV Stick', 'androidtv', 'Google Play Store', 'stick'], ['Nvidia Shield TV', 'androidtv', 'Google Play Store', 'caja'], ['Sony Bravia', 'androidtv', 'Google Play Store', 'televisor'],
  ['TCL TV', 'androidtv', 'Google Play Store', 'televisor'], ['Philips TV', 'androidtv', 'Google Play Store', 'televisor'], ['Apple TV', 'tvos', 'App Store', 'caja'], ['iPhone', 'ios', 'App Store', 'móvil'],
  ['iPad', 'ios', 'App Store', 'tablet'], ['Móvil Android', 'android', 'Google Play Store', 'móvil'], ['Tablet Android', 'android', 'Google Play Store', 'tablet'], ['Windows PC', 'windows', 'Microsoft Store o web oficial de la app', 'ordenador'], ['Mac', 'macos', 'Mac App Store', 'ordenador'],
];
// apps: nombre, plataformas, método de acceso
const APPS = [
  ['IPTV Smarters Pro', ['androidtv', 'fireos', 'android', 'ios', 'tvos', 'windows', 'macos', 'tizen', 'webos'], 'xtream'],
  ['TiviMate', ['androidtv', 'fireos', 'android'], 'xtream'],
  ['Smart IPTV', ['tizen', 'webos', 'androidtv'], 'm3u'],
  ['SS IPTV', ['tizen', 'webos', 'androidtv'], 'm3u'],
  ['VLC', ['androidtv', 'fireos', 'android', 'ios', 'tvos', 'windows', 'macos'], 'm3u'],
  ['Kodi', ['androidtv', 'fireos', 'android', 'windows', 'macos'], 'm3u'],
  ['IPTV Extreme', ['android', 'androidtv', 'fireos'], 'm3u'],
  ['GSE Smart IPTV', ['ios', 'tvos', 'android', 'androidtv', 'fireos'], 'm3u'],
  ['Televizo', ['android', 'androidtv', 'fireos'], 'm3u'],
  ['OTT Navigator', ['android', 'androidtv', 'fireos'], 'm3u'],
  ['Perfect Player', ['android', 'androidtv', 'fireos'], 'm3u'],
  ['XCIPTV Player', ['android', 'androidtv', 'fireos'], 'xtream'],
  ['Flix IPTV', ['tizen', 'webos', 'android', 'androidtv'], 'm3u'],
  ['iPlayTV', ['ios', 'tvos', 'macos'], 'm3u'],
  ['Lazy IPTV', ['android', 'androidtv', 'fireos'], 'm3u'],
];
const seen = new Set(CITIES.map(c => c.slug));
require('fs').readFileSync(require('path').join(__dirname, 'cities2.txt'), 'utf8').split(/\r?\n/).filter(Boolean).forEach(l => { const [p, rest] = l.split(': '); rest.split(', ').forEach(c => { const s = slug(c); if (!seen.has(s) && PROV[p]) { seen.add(s); CITIES.push({ name: c, prov: p, com: PROV[p], slug: s }); } }); });
module.exports = { slug, PROV, REGTV, CITIES, TEAMS, COMPS, CHANNELS, DEVICES, APPS };
