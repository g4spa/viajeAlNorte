/* ═══════════════════════════════════════════
   VIAJE AL NORTE ARGENTINO · data.js
   Todos los datos del viaje. Sin lógica.
   ═══════════════════════════════════════════ */

const days = [
  {
    n: 1,
    date: '14/09',
    title: 'Salta → Purmamarca',
    sub: 'RN9 escénica · ~4 hs',
    sleep: 'Purmamarca',
    acts: [
      'Retiro auto 10hs en aeropuerto Salta',
      'Miradores RN9 camino a Jujuy',
      'Almuerzo liviano en ruta',
      'Check-in Purmamarca 15hs',
      'Cerro de los 7 Colores',
      'Paseo Los Colorados',
    ],
    planb: 'Paseo pueblo + feria artesanal + miradores cortos',
  },
  {
    n: 2,
    date: '15/09',
    title: 'Salinas Grandes (day trip)',
    sub: 'RN52 · Cuesta de Lipán · ~2 hs ida',
    sleep: 'Purmamarca',
    acts: [
      'Salir 8:30–9:00 hs',
      'Paradas y miradores en Cuesta de Lipán',
      'La Yesera',
      'Llegar a Salinas Grandes 11–12 hs',
      'Check-out alojamiento 8am del 16/09',
    ],
    planb: 'Si mal clima: La Yesera + paseo tranquilo por Purmamarca',
  },
  {
    n: 3,
    date: '16/09',
    title: 'Purmamarca → Tilcara',
    sub: '~30 min · RN9',
    sleep: 'Tilcara',
    acts: [
      'Check-in Tilcara 9am',
      'Cuevas del Wayra',
      'Garganta del Diablo',
      'Castillos de Huichaira',
      'Brunch lento + cena temprana',
    ],
    planb: 'Día relax Tilcara + Pucará de Tilcara + cafés del pueblo',
  },
  {
    n: 4,
    date: '17/09',
    title: 'Tilcara → Humahuaca / Hornocal',
    sub: 'RN9 · paradas en Uquía y Humahuaca',
    sleep: 'Tilcara',
    acts: [
      'Check-out 9am',
      'Uquía — Iglesia de Santa Bárbara',
      'Humahuaca — Monumento a la Independencia',
      'Serranía del Hornocal (14 Colores) — tarde',
    ],
    planb: 'Quebrada de las Señoritas + paseo Uquía/Humahuaca sin Hornocal',
  },
  {
    n: 5,
    date: '18/09',
    title: 'Tilcara → San Francisco',
    sub: '~5 hs · transición quebrada → selva',
    sleep: 'San Francisco',
    acts: [
      'Quebrada de las Señoritas (si no se hizo antes)',
      'Ruta panorámica quebrada → yungas',
      'Check-in San Francisco',
      'Miradores del Cóndor',
      'Cascada La Toma',
    ],
    planb: 'Llegar temprano + recorrer pueblo + descanso tranquilo',
  },
  {
    n: 6,
    date: '19/09',
    title: 'Yungas full day',
    sub: 'RP83 · Parque Nacional Calilegua',
    sleep: 'San Francisco',
    acts: [
      'Parque Nacional Calilegua',
      'Mirador del Cóndor',
      'Senderos de helechos y selva',
      'Avistaje de fauna',
      'Picnic en ruta RP83',
    ],
    planb: 'Solo ruta escénica + picnic + miradores suaves sin trekking largo',
  },
  {
    n: 7,
    date: '20/09',
    title: 'Termas del Río Jordán → San Pedro de Jujuy',
    sub: 'Trekking 5–6 hs ida y vuelta con guía',
    sleep: 'San Pedro de Jujuy',
    acts: [
      'Termas del Río Jordán — piletones turquesa',
      'Fuente del Jaguar',
      'Cañón de los Loros',
      'Refugio del Tapir',
      'Salida hacia el sur — San Pedro de Jujuy',
    ],
    planb: 'Si cansancio: senderos suaves en Calilegua + cascadas',
  },
  {
    n: 8,
    date: '21/09',
    title: 'Ruta a Cachi',
    sub: 'Cuesta del Obispo · Los Cardones · ~4-5 hs',
    sleep: 'Cachi',
    acts: [
      'Piedra del Molino',
      'Parque Nacional Los Cardones',
      'Recta del Tin Tin',
      'Llegada a Cachi — paseo tranquilo por el pueblo',
    ],
    planb: 'Si vienen muy cansados: saltar Cachi y volver directo a Salta',
  },
  {
    n: 9,
    date: '22/09',
    title: 'Cachi → Salta',
    sub: 'Ruta panorámica de regreso',
    sleep: 'Salta',
    acts: [
      'Mañana tranquila en Cachi',
      'Miradores Cuesta del Obispo',
      'Llegada a Salta ciudad',
    ],
    planb: 'Día slow + spa / café / cena linda en Salta',
  },
  {
    n: 10,
    date: '23/09',
    title: 'Devolución auto + Salta ciudad',
    sub: 'Sin auto desde las 10hs',
    sleep: 'Salta',
    acts: [
      'Devolver auto Hertz 10:00 hs',
      'Cerro San Bernardo (teleférico)',
      'Plaza 9 de Julio',
      'Museo MAAM (arqueología de alta montaña)',
      'Casco histórico',
      'Peña folklórica nocturna',
    ],
    planb: '',
  },
  {
    n: 11,
    date: '24/09',
    title: 'Salta libre → vuelo de regreso',
    sub: 'Vuelo 16:00 hs · llegar aeropuerto 13:30–14:00',
    sleep: '✈ Vuelo a Buenos Aires',
    acts: [
      'Brunch tranquilo en Salta',
      'Compras y regalos finales',
      'Paseo relajado por el centro',
      'Aeropuerto 13:30 hs',
      'Vuelo 16:00 hs',
    ],
    planb: '',
  },
];

const aloj = [
  { dest: 'Purmamarca',          nights: 2, dates: '14 y 15/09', note: 'Check-in 15hs del 14. Check-out 8am del 16.' },
  { dest: 'Tilcara',             nights: 2, dates: '16 y 17/09', note: 'Check-in 9am del 16. Check-out 9am del 18.' },
  { dest: 'San Francisco · Yungas', nights: 2, dates: '18 y 19/09', note: 'Base para Calilegua y las Termas.' },
  { dest: 'San Pedro de Jujuy',  nights: 1, dates: '20/09',      note: 'Tras el trekking a las Termas del Río Jordán.' },
  { dest: 'Cachi',               nights: 1, dates: '21/09',      note: 'Llegar cruzando Cuesta del Obispo y Los Cardones.' },
  { dest: 'Salta ciudad',        nights: 2, dates: '22 y 23/09', note: 'Check-out 23/09. Devolución auto 10hs.' },
];

const routes = [
  { from: 'Salta (aeropuerto)',     to: 'Purmamarca',             km: '~65 km',              hrs: '~1h 40min',  route: 'RN9 escénica',                           dot: 'start' },
  { from: 'Purmamarca',            to: 'Salinas Grandes',         km: '~75 km',              hrs: '~2 hs',      route: 'RN52 · Cuesta de Lipán',                 dot: '' },
  { from: 'Purmamarca',            to: 'Tilcara',                 km: '~22 km',              hrs: '~30 min',    route: 'RN9',                                    dot: '' },
  { from: 'Tilcara',               to: 'Serranía del Hornocal',   km: '~65 km',              hrs: '~1h 30min',  route: 'RN9 + acceso Hornocal',                  dot: '' },
  { from: 'Tilcara',               to: 'San Francisco (Yungas)',  km: '~200 km',             hrs: '~5 hs',      route: 'RN9 sur + conexión Yungas',              dot: '' },
  { from: 'San Francisco',         to: 'Parque Calilegua',        km: '~30 km',              hrs: '~40 min',    route: 'RP83',                                   dot: '' },
  { from: 'San Francisco',         to: 'Termas del Río Jordán',   km: '~20 km + trekking',   hrs: 'Full day',   route: 'Acceso + caminata con guía obligatorio', dot: '' },
  { from: 'San Francisco',         to: 'San Pedro de Jujuy',      km: '~170 km',             hrs: '~2h 30min',  route: 'Bajada desde Yungas',                    dot: '' },
  { from: 'San Pedro de Jujuy',    to: 'Cachi',                   km: '~280 km',             hrs: '~4–5 hs',    route: 'Cuesta del Obispo · Los Cardones · Tin Tin', dot: '' },
  { from: 'Cachi',                 to: 'Salta ciudad',            km: '~160 km',             hrs: '~3 hs',      route: 'Misma ruta panorámica de regreso',       dot: '' },
  { from: 'Salta ciudad',          to: 'Aeropuerto SLA',          km: '~7 km',               hrs: '~15 min',    route: 'Ciudad → aeropuerto',                    dot: 'end' },
];

const acts = [
  { dest: 'Purmamarca',           items: ['Cerro de los 7 Colores', 'Paseo Los Colorados', 'Feria artesanal del pueblo', 'Miradores RN9 en llegada'] },
  { dest: 'Salinas Grandes',      items: ['Salineras · fotos y caminata', 'Cuesta de Lipán con paradas', 'La Yesera'] },
  { dest: 'Tilcara',              items: ['Cuevas del Wayra', 'Garganta del Diablo', 'Castillos de Huichaira', 'Pucará de Tilcara', 'Cafés y bares del centro'] },
  { dest: 'Humahuaca / Hornocal', items: ['Serranía del Hornocal — 14 Colores', 'Monumento a la Independencia', 'Iglesia de Santa Bárbara · Uquía', 'Quebrada de las Señoritas'] },
  { dest: 'San Francisco · Yungas', items: ['Miradores del Cóndor', 'Cascada La Toma', 'Senderos de helechos'] },
  { dest: 'Parque Calilegua',     items: ['Mirador del Cóndor', 'Senderos de selva', 'Avistaje de fauna — pumas, tapires', 'Picnic en ruta RP83'] },
  { dest: 'Termas del Río Jordán', items: ['Trekking 5–6 hs con guía (obligatorio)', 'Piletones naturales turquesa', 'Fuente del Jaguar', 'Cañón de los Loros', 'Refugio del Tapir'] },
  { dest: 'Cachi',                items: ['Cuesta del Obispo', 'Piedra del Molino', 'Parque Nacional Los Cardones', 'Recta del Tin Tin', 'Paseo tranquilo por el pueblo'] },
  { dest: 'Salta ciudad',         items: ['Cerro San Bernardo — teleférico o caminata', 'Plaza 9 de Julio', 'Museo MAAM', 'Casco histórico', 'Peña folklórica nocturna'] },
];

const checks = [
  'Vuelos comprados',
  'Auto Hertz reservado (Citroen C3 Automático)',
  'Alojamiento Purmamarca confirmado',
  'Alojamiento Tilcara confirmado',
  'Alojamiento San Francisco confirmado',
  'Alojamiento San Pedro de Jujuy confirmado',
  'Alojamiento Cachi confirmado',
  'Alojamiento Salta confirmado',
  'Guía para Termas del Río Jordán reservado',
  'Mapas offline descargados (Google Maps / Maps.me)',
  'Efectivo preparado para el viaje',
  'Ropa por capas lista (rompeviento + traje de baño)',
  'Toallas microfibra',
  'Franquicia y depósito auto consultados',
  'Cuotas Mercado Pago revisadas',
  'Bus MdP–Buenos Aires (ida) comprado',
  'Bus Buenos Aires–MdP (vuelta) comprado',
  'Revisar clima Hornocal 48hs antes del día 4',
  'Revisar clima Termas 48hs antes del día 7',
];

const scenarios = {
  eco: {
    items: [
      { cat: 'Alojamiento',          cls: 'cat-aloj',    det: '9 noches × ~$65.000 prom. (hostales / posadas simples)',                  val: 585000 },
      { cat: 'Comidas',              cls: 'cat-food',    det: '10 días × $28.000/día (2 pers.) — desayuno + almuerzo frugal + cena',     val: 280000 },
      { cat: 'Nafta',                cls: 'cat-nafta',   det: '~115 L × ~$2.300/L (Salta, sept 2026 estimado)',                          val: 264500 },
      { cat: 'Guía Termas',          cls: 'cat-extras',  det: '~$15.000–20.000 por persona (obligatorio)',                               val: 35000 },
      { cat: 'Entradas / actividades', cls: 'cat-extras', det: 'Calilegua, Pucará, Hornocal, etc.',                                     val: 40000 },
      { cat: 'Varios / imprevistos', cls: 'cat-extras',  det: 'Peajes, estacionamientos, snacks, artesanías',                           val: 60000 },
    ],
  },
  mid: {
    items: [
      { cat: 'Alojamiento',          cls: 'cat-aloj',    det: '9 noches × ~$105.000 prom. (hoteles 3★)',                                 val: 945000 },
      { cat: 'Comidas',              cls: 'cat-food',    det: '10 días × $45.000/día (2 pers.) — desayunos + almuerzos + cenas con vino', val: 450000 },
      { cat: 'Nafta',                cls: 'cat-nafta',   det: '~115 L × ~$2.400/L',                                                      val: 276000 },
      { cat: 'Guía Termas',          cls: 'cat-extras',  det: '~$20.000 por persona',                                                    val: 40000 },
      { cat: 'Entradas / actividades', cls: 'cat-extras', det: 'Calilegua, Pucará, Hornocal + alguna excursión extra',                   val: 65000 },
      { cat: 'Varios / imprevistos', cls: 'cat-extras',  det: 'Peajes, souvenirs, aperitivos, propinas',                                val: 90000 },
    ],
  },
  com: {
    items: [
      { cat: 'Alojamiento',          cls: 'cat-aloj',    det: '9 noches × ~$175.000 prom. (posadas boutique)',                           val: 1575000 },
      { cat: 'Comidas',              cls: 'cat-food',    det: '10 días × $65.000/día (2 pers.) — cenas en restos buenos con vino regional', val: 650000 },
      { cat: 'Nafta',                cls: 'cat-nafta',   det: '~115 L × ~$2.500/L',                                                      val: 287500 },
      { cat: 'Guía Termas',          cls: 'cat-extras',  det: 'Guía privado ~$30.000 por persona',                                       val: 60000 },
      { cat: 'Entradas / actividades', cls: 'cat-extras', det: 'Excursiones guiadas, teleférico Salta, visitas premium',                 val: 90000 },
      { cat: 'Varios / imprevistos', cls: 'cat-extras',  det: 'Peajes, spa, artesanías, regalos',                                       val: 130000 },
    ],
  },
};

const USD = 1350;

const igSlots = [
  { label: 'Quebrada de Humahuaca',  url: '' },
  { label: 'Salinas Grandes',         url: '' },
  { label: 'Hornocal — 14 Colores',   url: '' },
  { label: 'Yungas & Calilegua',      url: '' },
  { label: 'Termas del Río Jordán',   url: '' },
  { label: 'Cachi & Los Cardones',    url: '' },
];

const mapPlaces = [
  { name: 'Salta', x: 88, y: 78, weather: 'Salta' },
  { name: 'Purmamarca', x: 70, y: 28, weather: 'Purmamarca' },
  { name: 'Tilcara', x: 57, y: 20, weather: 'Tilcara' },
  { name: 'San Francisco', x: 39, y: 45, weather: 'San Francisco' },
  { name: 'Cachi', x: 62, y: 78, weather: 'Cachi' },
];
