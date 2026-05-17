/* ═══════════════════════════════════════════
   RUNFUERZA — data/ejercicios.js
   Pool de ejercicios separado de la lógica.
   Para agregar ejercicios: añade un objeto al
   array correspondiente siguiendo el formato:
   {
     name:  'Nombre del ejercicio',
     badge: '3×12'  o  '45seg',
     desc:  'Descripción de ejecución...',
     tag:   'Músculo · Grupo',
     // imagen: 'assets/images/nombre.jpg',  ← a futuro
   }
   ═══════════════════════════════════════════ */

const ENFOQUES = [
  { id: 'fuerza',    name: 'Fuerza',         icon: '💪', desc: 'Tren inferior y superior',             color: '#f5a623' },
  { id: 'movilidad', name: 'Movilidad',       icon: '🔄', desc: 'Rango de movimiento y flexibilidad',   color: '#42c8f5' },
  { id: 'propio',    name: 'Propiocepción',   icon: '⚖️', desc: 'Equilibrio y estabilidad',             color: '#c842f5' },
  { id: 'core',      name: 'Core',            icon: '🧱', desc: 'Zona media y estabilidad lumbar',       color: '#f54272' },
  { id: 'mix',       name: 'Mix Completo',    icon: '🔥', desc: 'Todo mezclado, máxima variedad',        color: '#c8f542' },
];

/* ──────────────────────────────────────────
   CALENTAMIENTOS (5 min, por enfoque)
   ────────────────────────────────────────── */
const CALENTAMIENTOS = {

  fuerza: [
    { name: 'Sentadilla de activación',  badge: '2×10',      desc: 'Sentadilla suave sin peso, enfocada en activar glúteos y cuádriceps. Baja lento 3 seg, sube 1 seg.', tag: 'Activación' },
    { name: 'Puente de glúteo',          badge: '2×12',      desc: 'Tumbado boca arriba, pies apoyados, elevas cadera hasta alinear con hombros. Aprieta glúteos en la cima.', tag: 'Activación' },
    { name: 'Estocada de activación',    badge: '2×8/lado',  desc: 'Estocada estática hacia adelante alternando piernas. Movimiento controlado, rodilla trasera cerca del suelo.', tag: 'Activación' },
    { name: 'Círculos de cadera',        badge: '1min',      desc: 'De pie, manos en caderas, realiza círculos amplios hacia ambos lados. Moviliza la articulación coxofemoral.', tag: 'Movilidad' },
    { name: 'Rotaciones de hombro',      badge: '30seg/lado',desc: 'Brazos estirados, realiza círculos completos hacia adelante y atrás. Activa el manguito rotador.', tag: 'Movilidad' },
  ],

  movilidad: [
    { name: 'Cat-Cow',                       badge: '10 rep',    desc: 'En cuadrupedia, alterna entre arquear y redondear la columna de forma fluida. Sincroniza con respiración.', tag: 'Columna' },
    { name: 'Rotación torácica',             badge: '8/lado',    desc: 'En cuadrupedia, una mano detrás de la cabeza. Rota el codo hacia el techo. Mantén cadera quieta.', tag: 'Tórax' },
    { name: 'Estiramiento de cadera 90/90',  badge: '45seg/lado',desc: 'Sentado en suelo con ambas rodillas a 90°. Inclínate hacia el lado delantero sintiendo la apertura de cadera.', tag: 'Cadera' },
    { name: 'Círculos de tobillo',           badge: '30seg/pie', desc: 'Sentado o de pie en un pie, realiza círculos amplios con el tobillo. Clave para runners.', tag: 'Tobillo' },
    { name: 'Apertura de pecho en pared',    badge: '3×20seg',   desc: 'Apoya el antebrazo en la pared, gira el cuerpo hacia afuera. Abre pectoral y hombro anterior.', tag: 'Movilidad' },
  ],

  propio: [
    { name: 'Equilibrio unipodal',           badge: '30seg/pie', desc: 'De pie en una pierna, rodilla levemente flexionada. Mantén la postura. Progresa cerrando los ojos.', tag: 'Equilibrio' },
    { name: 'Marcha con rodilla alta',        badge: '20 pasos',  desc: 'Camina elevando las rodillas al 90°. Activa el patrón de carrera y la propiocepción del pie.', tag: 'Activación' },
    { name: 'Tobillo en punto y flexión',     badge: '15/pie',    desc: 'Sentado o de pie, alterna punta y flexión del tobillo de forma controlada. Activa los músculos estabilizadores.', tag: 'Tobillo' },
    { name: 'Transferencia de peso lateral',  badge: '10/lado',   desc: 'De pie, transfiere el peso de un pie al otro con ligera flexión de rodilla. Activa el trabajo de equilibrio.', tag: 'Equilibrio' },
  ],

  core: [
    { name: 'Respiración diafragmática', badge: '8 resp',  desc: 'Tumbado, coloca una mano en el pecho y otra en el abdomen. Inhala expandiendo solo el abdomen. Activa el core profundo.', tag: 'Core profundo' },
    { name: 'Dead Bug lento',            badge: '6/lado',  desc: 'Tumbado boca arriba, brazos y piernas en 90°. Extiende brazo y pierna opuesta sin perder la espalda baja apoyada.', tag: 'Core' },
    { name: 'Plancha isométrica suave',  badge: '20seg',   desc: 'Posición de plancha (codos o manos), activa el abdomen sin contener la respiración.', tag: 'Estabilidad' },
    { name: 'Glute bridge con pausa',    badge: '2×10',    desc: 'Puente de glúteo manteniendo 2 segundos arriba. Activa cadena posterior y core.', tag: 'Activación' },
  ],

  mix: [
    { name: 'Jumping Jacks suaves',          badge: '30seg',     desc: 'Versión lenta de jumping jacks para elevar la temperatura corporal sin impacto excesivo.', tag: 'Cardio suave' },
    { name: 'Sentadilla de activación',      badge: '10 rep',    desc: 'Sentadilla sin peso, enfocada en activar glúteos. Baja lento 3 seg, sube 1 seg.', tag: 'Activación' },
    { name: 'Cat-Cow',                       badge: '8 rep',     desc: 'En cuadrupedia, alterna entre arquear y redondear la columna. Sincroniza con respiración.', tag: 'Columna' },
    { name: 'Equilibrio unipodal',           badge: '20seg/pie', desc: 'De pie en una pierna. Mantén la postura con rodilla levemente flexionada.', tag: 'Equilibrio' },
    { name: 'Rotaciones de cadera',          badge: '1min',      desc: 'Círculos amplios de cadera hacia ambos lados. Activa la articulación.', tag: 'Movilidad' },
  ],
};

/* ──────────────────────────────────────────
   EJERCICIOS PRINCIPALES
   ────────────────────────────────────────── */
const EJERCICIOS = {

  fuerza: [
    { name: 'Sentadilla con mancuernas',         badge: '3×12',     desc: 'Mancuernas en los hombros o colgando a los costados. Pies a ancho de hombros, baja hasta muslos paralelos. Empuja desde los talones.', tag: 'Cuádriceps · Glúteos' },
    { name: 'Peso muerto rumano',                badge: '3×10',     desc: 'Mancuernas frente a las piernas, bisagra de cadera manteniendo espalda neutra. Baja hasta sentir tensión en isquiotibiales. Clave para corredores.', tag: 'Isquios · Glúteos' },
    { name: 'Estocada búlgara',                  badge: '3×8/lado', desc: 'Pie trasero sobre una silla o banco, mancuernas en manos. Baja la rodilla trasera sin que toque el suelo. Excelente para desequilibrios laterales.', tag: 'Cuádriceps · Glúteos' },
    { name: 'Paso lateral con mancuerna',        badge: '3×10/lado',desc: 'Sujeta una mancuerna en el centro. Da un paso lateral amplio y flexiona la rodilla del lado que avanza. Trabaja el glúteo medio, clave en runners.', tag: 'Glúteo medio · Aductores' },
    { name: 'Hip Thrust con mancuerna',          badge: '3×12',     desc: 'Espalda apoyada en un banco o sofá, mancuerna sobre las caderas. Eleva la cadera hasta alinear con hombros y rodillas. Máximo activador de glúteo mayor.', tag: 'Glúteos' },
    { name: 'Step Up con mancuernas',            badge: '3×10/lado',desc: 'Sube a una silla o escalón con una pierna, empujando desde el talón. Alterna piernas. Simula el gesto de la carrera.', tag: 'Cuádriceps · Glúteos' },
    { name: 'Prensa de hombro con mancuernas',   badge: '3×10',     desc: 'Sentado o de pie, mancuernas a altura de hombros, empuja hacia arriba sin bloquear los codos. Controla la bajada.', tag: 'Hombros · Tríceps' },
    { name: 'Remo con mancuerna',                badge: '3×10/lado',desc: 'Apoya una mano y rodilla en el banco, la otra mano jala la mancuerna hacia la cadera. Espalda plana durante todo el movimiento.', tag: 'Dorsal · Bíceps' },
    { name: 'Press de banca con mancuernas',     badge: '3×10',     desc: 'Tumbado en el suelo o banco, mancuernas a los lados del pecho. Empuja hacia arriba y acerca las mancuernas en la cima sin chocarlas.', tag: 'Pecho · Tríceps' },
    { name: 'Curl de bíceps',                    badge: '3×12',     desc: 'De pie, mancuernas con palmas hacia arriba. Flexiona el codo sin mover el hombro. Controla la bajada (2 seg).', tag: 'Bíceps' },
    { name: 'Extensión de tríceps sobre la cabeza', badge: '3×12', desc: 'Sujeta una mancuerna con las dos manos por encima de la cabeza, codos cerca de las orejas. Flexiona y extiende.', tag: 'Tríceps' },
    { name: 'Elevación de talones con mancuernas', badge: '3×15',  desc: 'De pie con mancuernas en manos, sube en puntillas lentamente. Trabajo de gemelos y sóleo. Clave para prevenir lesiones en runners.', tag: 'Gemelos · Sóleo' },
    { name: 'Face Pull',                         badge: '3×12',     desc: 'Con banda elástica o mancuerna ligera, lleva las manos hacia la cara separando los codos. Trabaja la parte posterior del hombro.', tag: 'Hombro posterior · Trapecio' },
    { name: 'Split squat con mancuernas',        badge: '3×10/lado',desc: 'Como la estocada estática pero con más énfasis en la pierna delantera. Mantén el torso erguido y baja controlado.', tag: 'Cuádriceps · Isquios' },
    { name: 'Curl de isquiotibiales en suelo',   badge: '3×10',     desc: 'Tumbado boca abajo, mancuerna entre los tobillos. Flexiona las rodillas llevando los talones hacia los glúteos. Clave para proteger las rodillas.', tag: 'Isquiotibiales' },
  ],

  movilidad: [
    { name: 'Estiramiento del psoas en estocada', badge: '45seg/lado', desc: 'Estocada al frente, rodilla trasera en el suelo. Empuja la cadera hacia adelante sin arquear la espalda. El psoas tenso es el enemigo del corredor.', tag: 'Psoas · Flexor de cadera' },
    { name: 'Paloma en suelo',                    badge: '60seg/lado', desc: 'Desde cuadrupedia, lleva una rodilla hacia la mano del mismo lado y extiende la pierna trasera. Abre la cadera profundamente.', tag: 'Glúteo · Rotadores externos' },
    { name: 'Estiramiento de isquiotibiales',     badge: '3×30seg/lado',desc: 'De pie, pie sobre una silla o escalón. Con la espalda recta, inclínate hacia la pierna elevada. No redondees la espalda.', tag: 'Isquiotibiales' },
    { name: 'Apertura de cadena posterior',       badge: '45seg/lado', desc: 'Tumbado boca arriba, sujeta una pierna desde el muslo y estírala hacia el techo. La otra pierna en el suelo.', tag: 'Isquios · Lumbar' },
    { name: 'Rotación espinal en suelo',          badge: '8/lado',      desc: 'Tumbado, rodillas dobladas. Deja caer las rodillas hacia un lado mientras el torso permanece mirando al techo. Excelente para la columna lumbar.', tag: 'Columna' },
    { name: 'Movilidad de tobillo en pared',      badge: '10/tobillo',  desc: 'De pie frente a una pared, toca la pared con la rodilla sin levantar el talón. Avanza el pie si es fácil. Fundamental para runners.', tag: 'Tobillo · Pantorrilla' },
    { name: 'Estiramiento de IT Band',            badge: '45seg/lado',  desc: 'De pie, cruza una pierna detrás de la otra y lleva el brazo opuesto hacia el lado. Siente el estiramiento en la cadera y muslo lateral.', tag: 'IT Band · TFL' },
    { name: 'Movilidad torácica',                 badge: '10 rep',      desc: 'Tumbado boca arriba con un rodillo o toalla enrollada bajo los omóplatos. Extiende los brazos hacia atrás y abre el pecho.', tag: 'Tórax' },
    { name: 'Apertura de cadera en mariposa',     badge: '60seg',       desc: 'Sentado, plantas de los pies juntas, empuja suavemente las rodillas hacia el suelo. Mantén la espalda recta.', tag: 'Aductores · Cadera' },
    { name: 'Estiramiento de gemelos en pared',   badge: '45seg/lado',  desc: 'Apoya la punta del pie en la pared manteniendo el talón en el suelo. Inclínate hacia adelante. Clave post-rodaje.', tag: 'Gemelo · Sóleo' },
    { name: 'Movilidad de cadera en cuadrupedia', badge: '10/lado',     desc: 'En cuadrupedia, lleva la rodilla hacia afuera y hacia atrás describiendo un círculo. Abre la articulación coxofemoral.', tag: 'Cadera' },
    { name: 'Estiramiento de cuádriceps de pie',  badge: '45seg/lado',  desc: 'De pie (usa una pared si necesitas), dobla la rodilla y sujeta el pie por detrás. Rodillas juntas, no arquees la espalda.', tag: 'Cuádriceps' },
    { name: 'Squat asiático profundo',            badge: '60seg',       desc: 'Pies a ancho de hombros, baja hasta la posición de cuclillas más profunda posible. Si es difícil, apoya los talones en algo.', tag: 'Cadera · Tobillo · Rodilla' },
    { name: 'Rotaciones cervicales',              badge: '8/lado',      desc: 'Sentado erguido, gira la cabeza hacia cada lado de forma lenta y controlada. Libera tensión del cuello que acumulas corriendo.', tag: 'Cervical' },
  ],

  propio: [
    { name: 'Equilibrio unipodal con ojos cerrados', badge: '30seg/pie', desc: 'De pie en una pierna, cierra los ojos. El desafío cognitivo aumenta el estímulo propioceptivo. Avanza a superficie inestable.', tag: 'Equilibrio' },
    { name: 'Single Leg Deadlift (peso corporal)',    badge: '3×8/lado',  desc: 'De pie en una pierna, inclina el torso hacia adelante mientras la pierna libre se eleva hacia atrás. Mantén la cadera nivelada.', tag: 'Equilibrio · Glúteos · Isquios' },
    { name: 'Single Leg Deadlift con mancuerna',     badge: '3×8/lado',  desc: 'Versión con carga de la anterior. Mancuerna en la mano opuesta a la pierna de apoyo. Control total del movimiento.', tag: 'Equilibrio · Fuerza' },
    { name: 'Caminata talón-punta en línea',         badge: '2×10m',     desc: 'Camina poniendo el talón justo frente a la punta del otro pie, como en una cuerda floja. Activa la propiocepción de tobillo.', tag: 'Tobillo · Equilibrio' },
    { name: 'Salto unipodal y aterrizaje estable',   badge: '3×6/lado',  desc: 'Salta desde una pierna y aterriza en la misma, absorbiendo el impacto con rodilla flexionada. Mantén 2-3 seg sin perder el equilibrio.', tag: 'Aterrizaje · Estabilidad' },
    { name: 'Equilibrio con lanzamiento de mancuerna', badge: '3×8/lado',desc: 'De pie en una pierna, lanza una mancuerna ligera hacia arriba y atrápala. El desequilibrio desafía al sistema propioceptivo.', tag: 'Equilibrio dinámico' },
    { name: 'Pistol squat parcial',                  badge: '3×6/lado',  desc: 'De pie en una pierna, baja lo que puedas manteniendo el control. Usa una silla como referencia al inicio. Avanza la profundidad.', tag: 'Fuerza · Propiocepción' },
    { name: 'Paso de valla lateral imaginaria',      badge: '3×10/lado', desc: 'Eleva la rodilla lateralmente como si pasaras sobre una valla. Trabaja la estabilidad de cadera y el equilibrio dinámico.', tag: 'Cadera · Equilibrio' },
    { name: 'Equilibrio con inclinación de torso',   badge: '30seg/lado',desc: 'De pie en una pierna, inclina el torso hacia adelante y mantén. Los brazos pueden ir laterales para ayudar al equilibrio.', tag: 'Equilibrio estático' },
    { name: 'Marcha de guerrero con mancuerna',      badge: '3×10/lado', desc: 'Camina elevando la rodilla hasta 90° mientras llevas una mancuerna ligera por encima de la cabeza. Desafío multidimensional.', tag: 'Equilibrio dinámico · Core' },
    { name: 'Equilibrio en superficie inestable',    badge: '3×30seg',   desc: 'De pie en un cojín, toalla enrollada o colchoneta doblada. El terreno inestable potencia la propiocepción de tobillo y rodilla.', tag: 'Tobillo · Rodilla · Equilibrio' },
    { name: 'Zancada con giro de torso',             badge: '3×8/lado',  desc: 'Estocada al frente, en la posición baja gira el torso hacia la pierna delantera. Mancuerna opcional. Trabaja el equilibrio en movimiento.', tag: 'Equilibrio dinámico' },
  ],

  core: [
    { name: 'Plancha frontal',                    badge: '3×30-45seg', desc: 'En posición de plancha sobre codos o manos. Cuerpo recto como una tabla, activa glúteos y abdomen. No dejes caer la cadera.', tag: 'Core global' },
    { name: 'Plancha lateral',                    badge: '3×25seg/lado',desc: 'Apoyo en un codo, cuerpo alineado. Eleva la cadera y mantén. Trabaja el cuadrado lumbar y el oblicuo, clave para la estabilidad lateral en carrera.', tag: 'Oblicuos · Cuadrado lumbar' },
    { name: 'Dead Bug',                           badge: '3×8/lado',   desc: 'Tumbado boca arriba, brazos y piernas a 90°. Extiende brazo y pierna opuesta juntos sin perder el contacto de la espalda baja con el suelo.', tag: 'Core profundo' },
    { name: 'Bird Dog',                           badge: '3×8/lado',   desc: 'En cuadrupedia, extiende brazo y pierna opuesta simultáneamente. Mantén la cadera nivelada. 2 seg en la posición extendida.', tag: 'Estabilidad · Core' },
    { name: 'Hollow Body',                        badge: '3×20seg',    desc: 'Tumbado, baja la espalda al suelo, eleva ligeramente piernas y hombros. Zona media totalmente activada. Si es muy difícil, dobla las rodillas.', tag: 'Core global' },
    { name: 'Crunch de bicicleta',                badge: '3×12/lado',  desc: 'Tumbado, lleva el codo hacia la rodilla opuesta alternando. Control total, no jalones de cuello. Trabaja los oblicuos profundos.', tag: 'Oblicuos' },
    { name: 'Superman',                           badge: '3×10, 3seg', desc: 'Tumbado boca abajo, eleva brazos y piernas simultáneamente. Mantén 3 seg. Fortalece la cadena posterior (extensores de espalda).', tag: 'Cadena posterior · Lumbar' },
    { name: 'Russian Twist con mancuerna',        badge: '3×12/lado',  desc: 'Sentado con el torso inclinado 45°, gira el torso de lado a lado con la mancuerna. Pies pueden estar elevados para más dificultad.', tag: 'Oblicuos · Rotadores' },
    { name: 'Pallof Press',                       badge: '3×10/lado',  desc: 'De pie o arrodillado, sostén la banda o mancuerna frente al pecho y extiende los brazos. Resiste la rotación. Trabaja el core anti-rotacional.', tag: 'Core anti-rotacional' },
    { name: 'Stir the Pot',                       badge: '3×10/lado',  desc: 'En plancha sobre codos, realiza pequeños círculos con los antebrazos. El movimiento desafía la estabilidad del core de forma dinámica.', tag: 'Core dinámico' },
    { name: 'Elevación de piernas rectas',        badge: '3×10',       desc: 'Tumbado boca arriba, piernas juntas y rectas. Eleva hasta 90° y baja lentamente sin que los pies toquen el suelo. Activa el recto abdominal inferior.', tag: 'Abdominal inferior' },
    { name: 'Plancha con toque de hombro',        badge: '3×10/lado',  desc: 'En posición de plancha alta (brazos extendidos), lleva una mano al hombro opuesto manteniendo la cadera estable. No rotes.', tag: 'Core · Estabilidad' },
    { name: 'McGill Curl-Up',                     badge: '3×10',       desc: 'Tumbado, una rodilla doblada y la otra extendida. Manos bajo la zona lumbar. Eleva levemente cabeza y hombros. Sin flexión completa de columna. Seguro para la espalda.', tag: 'Abdominal · Lumbar seguro' },
    { name: 'Hip Thrust a una pierna',            badge: '3×10/lado',  desc: 'Puente de glúteo elevando una pierna estirada. La estabilidad del core debe mantener la cadera nivelada. Clave para runners.', tag: 'Glúteos · Core' },
  ],
};

/* ──────────────────────────────────────────
   MENTE — Respiración, Meditación, Yoga, Relajación
   ────────────────────────────────────────── */

const ENFOQUES_MENTE = [
  { id: 'respiracion', name: 'Respiración', icon: '🌬️', desc: 'Control del aliento y energía', color: '#42f5c8' },
  { id: 'meditacion',  name: 'Meditación',  icon: '🧘', desc: 'Atención plena paso a paso',    color: '#c8a4f5' },
  { id: 'yoga',        name: 'Yoga',        icon: '🌿', desc: 'Secuencias accesibles en suelo', color: '#7ad97a' },
  { id: 'relajacion',  name: 'Relajación',  icon: '🌙', desc: 'Bajar revoluciones y recuperar', color: '#f5d442' },
];

const TIEMPOS_MENTE = [7, 15, 25];

const PRACTICAS_MENTE = {

  respiracion: {
    7: {
      name: 'Box Breathing',
      ciclos: '8 ciclos',
      intro: 'Inhala 4s → Sostén 4s → Exhala 4s → Sostén 4s. Repite 8 veces. Ideal para pausas laborales o antes de entrenar.',
      pasos: [
        { texto: 'Inhala lentamente por la nariz contando 4 segundos.', duracion: 4 },
        { texto: 'Sostén el aire contando 4 segundos.', duracion: 4 },
        { texto: 'Exhala por la boca contando 4 segundos.', duracion: 4 },
        { texto: 'Sostén vacío contando 4 segundos. Repite desde el paso 2.', duracion: 4 },
      ],
    },
    15: {
      name: 'Box Breathing',
      ciclos: '18 ciclos',
      intro: 'La misma técnica cuadrada pero con más repeticiones. Perfecto para calmar la mente antes de una sesión larga.',
      pasos: [
        { texto: 'Inhala lentamente por la nariz contando 4 segundos.', duracion: 4 },
        { texto: 'Sostén el aire contando 4 segundos.', duracion: 4 },
        { texto: 'Exhala por la boca contando 4 segundos.', duracion: 4 },
        { texto: 'Sostén vacío contando 4 segundos. Repite desde el paso 2.', duracion: 4 },
      ],
    },
    25: {
      name: 'Box Breathing',
      ciclos: '30 ciclos',
      intro: 'Versión extendida. A este ritmo la mente entra en un estado de calma profunda. No te apures.',
      pasos: [
        { texto: 'Inhala lentamente por la nariz contando 4 segundos.', duracion: 4 },
        { texto: 'Sostén el aire contando 4 segundos.', duracion: 4 },
        { texto: 'Exhala por la boca contando 4 segundos.', duracion: 4 },
        { texto: 'Sostén vacío contando 4 segundos. Repite desde el paso 2.', duracion: 4 },
      ],
    },

    respiracion_478_7: {
      name: 'Respiración 4-7-8',
      ciclos: '6 ciclos',
      intro: 'Inhala 4s → Sostén 7s → Exhala 8s. Activa el sistema nervioso parasimpático. Ideal para bajar el pulso.',
      pasos: [
        { texto: 'Tumbado o sentado. Coloca la punta de la lengua detrás de los dientes superiores.', duracion: 20 },
        { texto: 'Inhala silenciosamente por la nariz contando 4 segundos.', duracion: 4 },
        { texto: 'Sostén el aire contando 7 segundos.', duracion: 7 },
        { texto: 'Exhala completamente por la boca con un suave sonido, contando 8 segundos.', duracion: 8 },
        { texto: 'Repite desde el paso 2.', duracion: 3 },
      ],
    },
  },

  meditacion: {
    7: {
      name: 'Mindfulness básico',
      ciclos: '7 min',
      intro: 'Foco en la respiración. Cuando la mente se vaya, vuelves sin juzgarte. Eso es todo. No hay forma de hacerlo mal.',
      pasos: [
        { texto: 'Siéntate con la espalda recta. Manos sobre las rodillas. Cierra los ojos.', duracion: 30 },
        { texto: 'Respira normal. Nota el aire entrando por la nariz. Solo observa, no controles.', duracion: 60 },
        { texto: 'Si la mente se fue a otro lado, está bien. Solo vuelve suavemente a la respiración.', duracion: 60 },
        { texto: 'Siente el pecho o el abdomen subir y bajar. Ancla tu atención ahí.', duracion: 90 },
        { texto: 'Sigue respirando. Cada vez que te distraigas, vuelves. Sin frustración.', duracion: 90 },
        { texto: 'Lleva atención a todo tu cuerpo brevemente. ¿Cómo estás ahora mismo?', duracion: 40 },
        { texto: 'Respira profundo, mueve los dedos, abre los ojos despacio.', duracion: 30 },
      ],
    },
    15: {
      name: 'Escaneo corporal',
      ciclos: '15 min',
      intro: 'Atención progresiva desde los pies hasta la cabeza. Ideal cuando la mente no para — le das algo concreto en qué enfocarse.',
      pasos: [
        { texto: 'Tumbado boca arriba, brazos a los costados, ojos cerrados. Respira profundo 3 veces.', duracion: 30 },
        { texto: 'Lleva tu atención a los pies. ¿Sientes tensión, calor, hormigueo? Solo observa.', duracion: 90 },
        { texto: 'Sube a las pantorrillas y espinillas. Suéltalas conscientemente con cada exhala.', duracion: 90 },
        { texto: 'Rodillas y muslos. Si hay tensión, respira hacia allí y deja que se disuelva.', duracion: 90 },
        { texto: 'Cadera y glúteos. Zona que acumula mucha tensión en runners. Suelta.', duracion: 90 },
        { texto: 'Abdomen y espalda baja. Permite que se expanda con cada inhalación.', duracion: 90 },
        { texto: 'Pecho y espalda alta. Nota el ritmo del corazón si puedes.', duracion: 90 },
        { texto: 'Hombros, brazos, manos. Déjalos caer pesados hacia el suelo.', duracion: 90 },
        { texto: 'Cuello, mandíbula, rostro. Suelta la tensión de los ojos y la frente.', duracion: 90 },
        { texto: 'Todo el cuerpo relajado. Quédate aquí unos momentos. Respira libremente.', duracion: 60 },
        { texto: 'Mueve suavemente los dedos, estira, abre los ojos despacio.', duracion: 30 },
      ],
    },
    25: {
      name: 'Visualización de carrera',
      ciclos: '25 min',
      intro: 'Te imaginas corriendo tu próxima ruta con todos los sentidos. Los atletas de élite usan esto. Es entrenamiento mental real.',
      pasos: [
        { texto: 'Siéntate o túmbate cómodo. Cierra los ojos. Respira profundo 5 veces.', duracion: 40 },
        { texto: 'Imagina que estás en el punto de partida de tu ruta favorita. ¿Qué ves? ¿Qué hueles? ¿Qué temperatura hace?', duracion: 120 },
        { texto: 'Comienzas a correr. Siente tus pies tocando el suelo. El ritmo de tu respiración. Estás bien.', duracion: 120 },
        { texto: 'Llega un momento difícil — la cuesta, el kilómetro duro. Sientes el esfuerzo pero sigues. Tu mente está fuerte.', duracion: 150 },
        { texto: 'Superas el punto difícil. El cuerpo encuentra su ritmo. Te sientes fluido, ligero.', duracion: 120 },
        { texto: 'Estás en los últimos kilómetros. Ves la meta. Tu cuerpo da todo. Te sientes orgulloso.', duracion: 150 },
        { texto: 'Cruzas. Respira profundo. Siente lo que sientes en ese momento. Grábalo.', duracion: 120 },
        { texto: 'Vuelve al presente. Respira. Mueve el cuerpo. Abre los ojos. Esa carrera ya está en ti.', duracion: 80 },
      ],
    },
  },

  yoga: {
    7: {
      name: 'Despertar — 7 posturas',
      ciclos: '7 posturas',
      intro: 'Secuencia suave para activar el cuerpo. Ideal en la mañana o antes de entrenar. Sin experiencia previa necesaria.',
      pasos: [
        { texto: '🏔️ Montaña: De pie, pies juntos, brazos a los costados. Respira profundo y siente el suelo. 5 respiraciones.', duracion: 40 },
        { texto: '🙌 Brazos al cielo: Inhala y sube los brazos. Mira hacia arriba. Estira toda la columna. 5 respiraciones.', duracion: 40 },
        { texto: '🙇 Flexión hacia adelante: Exhala y dobla el torso. Rodillas levemente flexionadas. Cuelga. 5 respiraciones.', duracion: 40 },
        { texto: '🐕 Perro boca abajo: Manos al suelo, camina los pies atrás. Cadera arriba. Talones hacia el suelo. 5 respiraciones.', duracion: 40 },
        { texto: '🐍 Cobra: Baja al suelo, manos bajo los hombros. Empuja el pecho hacia arriba. Codos semi-flexionados. 5 respiraciones.', duracion: 40 },
        { texto: '🧒 Postura del niño: Siéntate sobre los talones, estira los brazos al frente, frente al suelo. Suelta todo. 8 respiraciones.', duracion: 55 },
        { texto: '⭐ Savasana: Tumbado boca arriba, brazos a los costados. No hagas nada. Solo respira y siente.', duracion: 45 },
      ],
    },
    15: {
      name: `Runner's Yoga — 15 posturas`,
      ciclos: '15 posturas',
      intro: 'Secuencia diseñada para lo que más sufre corriendo: cadera, isquiotibiales y espalda baja. Tómate el tiempo en cada postura.',
      pasos: [
        { texto: '🏔️ Montaña: De pie, pies a ancho de cadera. Respira y enraíza. 4 respiraciones.', duracion: 35 },
        { texto: '☀️ Saludo al sol A: Brazos arriba → flexión → medio levantamiento → plancha → cobra → perro boca abajo. Fluye.', duracion: 60 },
        { texto: '⚔️ Guerrero I: Pie derecho adelante, pie izquierdo atrás en diagonal. Brazos arriba. Rodilla delantera a 90°. 5 respiraciones. Repite otro lado.', duracion: 70 },
        { texto: '⚔️ Guerrero II: Desde Guerrero I, abre los brazos paralelos al suelo. Mira la mano delantera. 5 respiraciones. Repite otro lado.', duracion: 70 },
        { texto: '📐 Triángulo: Piernas abiertas, inclina el torso hacia la pierna delantera. Mano al tobillo o suelo. Otro brazo al cielo. 5 resp. cada lado.', duracion: 70 },
        { texto: '🏹 Estocada baja: Rodilla trasera en el suelo. Cadera hacia adelante. Abre el flexor de cadera. 6 respiraciones cada lado.', duracion: 80 },
        { texto: '🕊️ Paloma: Desde cuadrupedia, rodilla derecha hacia la mano derecha. Extiende la pierna izquierda atrás. Inclínate. 8 resp. cada lado.', duracion: 100 },
        { texto: '🐕 Perro boca abajo: Cadera al cielo, talones al suelo. Pedalea los pies para soltar pantorrillas.', duracion: 45 },
        { texto: '📋 Tabla: Plancha alta. Cuerpo recto. Activa el abdomen. 5 respiraciones.', duracion: 40 },
        { texto: '🐍 Cobra: Manos bajo hombros. Pecho arriba. Codos semi-flexionados. 5 respiraciones.', duracion: 40 },
        { texto: '🌀 Torsión en suelo: Tumbado, rodilla derecha al pecho, crúzala al lado izquierdo. Brazo derecho extendido. 6 resp. cada lado.', duracion: 80 },
        { texto: '🌉 Puente: Tumbado, pies apoyados, eleva la cadera. Activa glúteos. 8 respiraciones.', duracion: 55 },
        { texto: '🤗 Rodillas al pecho: Abraza ambas rodillas. Rueda suave de lado a lado. Masajea la espalda baja.', duracion: 40 },
        { texto: '🌀 Torsión supina: Tumbado, lleva ambas rodillas al pecho y déjalas caer a un lado. Abre los brazos. 6 resp. cada lado.', duracion: 75 },
        { texto: '⭐ Savasana: Tumbado, completamente inmóvil. Deja que el cuerpo absorba la práctica. 2 minutos.', duracion: 120 },
      ],
    },
    25: {
      name: 'Yoga completo — Mente y cuerpo',
      ciclos: 'Flujo completo',
      intro: 'Combina respiración consciente, movimiento y relajación. Más tiempo en cada postura para ir más profundo.',
      pasos: [
        { texto: '🌬️ Respiración inicial: Sentado, 10 respiraciones profundas. Inhala 4s, exhala 6s. Llega al momento presente.', duracion: 120 },
        { texto: '🏔️ Montaña: De pie. Escanea tu cuerpo de pies a cabeza. ¿Dónde hay tensión hoy?', duracion: 50 },
        { texto: '☀️ Saludo al sol A × 3: Fluye tres veces seguidas conectando movimiento y respiración.', duracion: 120 },
        { texto: '⚔️ Guerrero I y II: Secuencia completa en cada lado. Tómate 6 respiraciones en cada postura.', duracion: 120 },
        { texto: '🏹 Estocada baja profunda: Rodilla trasera en suelo, ambos brazos arriba. Abre la cadera. 8 resp. cada lado.', duracion: 100 },
        { texto: '📐 Triángulo + Pirámide: Triángulo 6 resp. luego flexión hacia la pierna. Cada lado.', duracion: 100 },
        { texto: '🕊️ Paloma larga: La postura más importante para runners. Quédate 10 respiraciones en cada lado. Suelta.', duracion: 140 },
        { texto: '🐕 Perro boca abajo: Recupera. Pedalea, mueve la cadera. Vuelve a centrar.', duracion: 50 },
        { texto: '🌀 Torsiones en suelo: Ambos lados. Siente la columna alargarse con cada exhala.', duracion: 100 },
        { texto: '🌉 Puente + variación una pierna: Puente estándar 6 resp, luego eleva una pierna. Cada lado.', duracion: 100 },
        { texto: '🧒 Postura del niño: Descansa. Brazos extendidos o a los costados. 10 respiraciones.', duracion: 75 },
        { texto: '🤗 Rodillas al pecho: Masajea la espalda baja rodando suave.', duracion: 45 },
        { texto: '⭐ Savasana: Tumbado completamente quieto. 3-4 minutos. No hagas nada. Solo sé.', duracion: 220 },
      ],
    },
  },

  relajacion: {
    7: {
      name: 'Respiración y naturaleza',
      ciclos: '7 min',
      intro: 'Combina respiración lenta con visualizar un lugar tranquilo. Ideal para pausas laborales o cuando necesitas resetear.',
      pasos: [
        { texto: 'Cierra los ojos. Respira profundo 3 veces. Suelta cualquier tensión de los hombros.', duracion: 30 },
        { texto: 'Imagina un lugar natural que te genere paz. Puede ser real o inventado. Un bosque, el mar, una montaña.', duracion: 45 },
        { texto: 'Inhala 4s imaginando que respiras el aire de ese lugar. Exhala 6s soltando el estrés.', duracion: 90 },
        { texto: 'Siente la temperatura, los sonidos, la textura del suelo bajo tus pies en ese lugar.', duracion: 75 },
        { texto: 'Sigue respirando lento. Estás seguro, tranquilo, en paz. No hay nada que resolver ahora.', duracion: 75 },
        { texto: 'Lleva una mano al pecho. Siente tu ritmo cardíaco. Agradécele al cuerpo.', duracion: 45 },
        { texto: 'Respira profundo. Mueve los dedos. Abre los ojos despacio. Trae esa calma contigo.', duracion: 30 },
      ],
    },
    15: {
      name: 'Relajación muscular progresiva',
      ciclos: '15 min',
      intro: 'Tensas y sueltas cada grupo muscular. Es imposible seguir estresado después de esto. Ideal post-entreno o antes de dormir.',
      pasos: [
        { texto: 'Tumbado boca arriba. Cierra los ojos. Respira profundo 5 veces para entrar en modo reposo.', duracion: 40 },
        { texto: '🦶 Pies: Aprieta fuerte los dedos del pie durante 5 segundos. Suelta. Siente la diferencia.', duracion: 30 },
        { texto: '🦵 Pantorrillas: Apunta los pies hacia ti tensando. 5 segundos. Suelta y observa.', duracion: 30 },
        { texto: '🦵 Muslos: Aprieta los cuádriceps fuerte. 5 segundos. Suelta.', duracion: 30 },
        { texto: '🍑 Glúteos: Aprieta fuerte. 5 segundos. Suelta. Siente el peso caer.', duracion: 30 },
        { texto: '🫁 Abdomen: Contrae el abdomen. 5 segundos. Suelta y permite que se expanda.', duracion: 30 },
        { texto: '✊ Manos y brazos: Cierra los puños fuerte. 5 segundos. Suelta. Deja los brazos pesados.', duracion: 30 },
        { texto: '💪 Bíceps: Flexiona los brazos tensando. 5 segundos. Suelta.', duracion: 30 },
        { texto: '🙆 Hombros: Súbelos hacia las orejas. 5 segundos. Suéltalos de golpe.', duracion: 30 },
        { texto: '😬 Mandíbula: Aprieta los dientes suave. 5 segundos. Suelta. Deja la boca entreabierta.', duracion: 30 },
        { texto: '😤 Rostro: Arruga toda la cara. 5 segundos. Suelta y deja el rostro completamente flojo.', duracion: 30 },
        { texto: 'Todo el cuerpo relajado. Escanea de pies a cabeza. ¿Queda algo de tensión? Suéltalo.', duracion: 90 },
        { texto: 'Respira libremente. No tienes que hacer nada. Quédate aquí.', duracion: 120 },
        { texto: 'Cuando estés listo, mueve suavemente los dedos y abre los ojos.', duracion: 30 },
      ],
    },
    25: {
      name: 'Yoga Nidra',
      ciclos: '25 min',
      intro: 'Estado entre el sueño y la vigilia. 20 minutos de Yoga Nidra equivalen a 2 horas de sueño profundo. Solo sigue la voz interior.',
      pasos: [
        { texto: 'Tumbado boca arriba. Prepara el espacio. Que nada te interrumpa. Cierra los ojos.', duracion: 30 },
        { texto: 'Establece tu sankalpa (intención): una frase corta y positiva. Ej: "Estoy en paz" o "Soy suficiente". Repítela 3 veces internamente.', duracion: 60 },
        { texto: 'Rotación de conciencia — lado derecho: Pulgar → índice → medio → anular → meñique → palma → dorso → muñeca → codo → hombro → axila → costado derecho → cadera → muslo → rodilla → pantorrilla → tobillo → talón → planta → dedos del pie derecho.', duracion: 90 },
        { texto: 'Rotación de conciencia — lado izquierdo: Repite el mismo recorrido en el lado izquierdo. Ve despacio.', duracion: 90 },
        { texto: 'Espalda completa: Omóplato derecho → izquierdo → columna vertebral → toda la espalda → glúteos.', duracion: 60 },
        { texto: 'Frente → cuero cabelludo → rostro completo → garganta → pecho → abdomen. Todo el cuerpo como una unidad.', duracion: 60 },
        { texto: 'Visualización 1: Imagina un cielo despejado al atardecer. Colores naranjas y rosados. Estás flotando.', duracion: 90 },
        { texto: 'Visualización 2: Un lago quieto al amanecer. La superficie perfectamente inmóvil. Tú eres ese lago.', duracion: 90 },
        { texto: 'Visualización 3: Una llama de vela. Quieta. Constante. Cálida. Esa llama eres tú.', duracion: 90 },
        { texto: 'Vuelve al cuerpo. Siente el peso en el suelo. Escucha los sonidos del ambiente sin reaccionar.', duracion: 60 },
        { texto: 'Repite tu sankalpa 3 veces. Con convicción. Plántalo en tu subconsciente.', duracion: 45 },
        { texto: 'Comienza a despertar despacio. Mueve los dedos. Las manos. Los pies. Estira.', duracion: 60 },
        { texto: 'Rueda hacia un lado. Quédate un momento. Abre los ojos cuando estés listo. No hay prisa.', duracion: 45 },
      ],
    },
  },
};
/* ──────────────────────────────────────────
   JOURNALING
   ────────────────────────────────────────── */
const CATEGORIAS_JOURNAL = [
  { id: 'reflexion',   name: 'Reflexión',   icon: '🪞', desc: 'Preguntas sobre ti y tu momento', color: '#42c8f5' },
  { id: 'gratitud',    name: 'Gratitud',    icon: '🌱', desc: 'Lo bueno que ya existe',           color: '#7ad97a' },
  { id: 'emociones',   name: 'Emociones',   icon: '🌊', desc: 'Entender qué sientes y por qué',  color: '#c8a4f5' },
  { id: 'metas',       name: 'Metas',       icon: '🎯', desc: 'Intención, dirección y propósito', color: '#f5a623' },
  { id: 'hipoteticos', name: 'Hipotéticos', icon: '🎲', desc: 'Preguntas creativas y divertidas', color: '#f54272' },
];

const PROMPTS_JOURNAL = {
  reflexion: [
    'Describe con detalle el último sueño que recuerdes, aunque sea un fragmento.',
    'Mira tus manos ahora mismo. ¿Qué historia cuentan?',
    '¿Qué canción está sonando en tu cabeza en este momento? ¿Por qué crees que es esa?',
    'Describe el camino que hiciste hoy desde que te levantaste hasta donde estás ahora.',
    '¿Qué decisión tomaste hoy, así sea pequeña, de la que te sientes bien?',
    'Si pudieras hablar 5 minutos con alguien que ya no está en tu vida, ¿quién sería y qué le dirías?',
    '¿Qué le dirías a tu yo de hace 5 años sobre lo que viene?',
    'Describe tu estado de ánimo como si fuera un clima. ¿Qué tiempo hace hoy dentro de ti?',
    '¿Qué fue lo último que te hizo reír de verdad?',
    '¿Qué estás evitando hacer? ¿Por qué?',
    'Si hoy fuera el último día del mes, ¿cómo lo describirías?',
    '¿Qué te preocupa en este momento? Escríbelo sin filtro.',
  ],
  gratitud: [
    'Escribe una cosa positiva que hiciste por alguien hoy, así sea pequeña.',
    '¿Quién te ayudó esta semana, así sea con algo mínimo? Descríbelo.',
    'Describe tu desayuno de hoy con el mayor detalle posible. ¿Lo disfrutaste?',
    '¿Qué parte de tu cuerpo funcionó bien hoy y normalmente das por sentada?',
    'Escribe algo que tienes hoy que hace un año no tenías.',
    '¿Qué persona en tu vida merece un gracias que aún no le has dado?',
    'Describe un momento de los últimos 3 días donde te sentiste en paz.',
    '¿Qué habilidad tuya usaste hoy aunque sea sin darte cuenta?',
    '¿Qué objeto de tu casa te hace la vida más fácil? Descríbelo.',
    'Escribe algo bueno que pasó hoy que no tenías planeado.',
    'Mira hacia tu derecha. Describe el primer objeto que veas y por qué está ahí.',
    '¿Qué sabor, olor o sonido de hoy fue agradable?',
  ],
  emociones: [
    '¿Cómo llegaste a este momento? Describe los últimos 30 minutos.',
    '¿Hay algo que te molestó hoy? Descríbelo sin justificarlo ni racionalizarlo.',
    '¿Qué emoción has sentido más veces hoy? ¿Dónde la sientes en el cuerpo?',
    'Escribe algo que querías decirle a alguien hoy y no dijiste.',
    '¿Hubo un momento hoy donde te sentiste fuera de lugar? ¿Qué pasó?',
    '¿Qué expectativa tenías hoy que no se cumplió?',
    'Describe una conversación de hoy que te dejó pensando.',
    '¿Qué estás cargando emocionalmente que no es tuyo?',
    '¿Cuándo fue la última vez que te sentiste orgulloso de ti? Descríbelo.',
    'Escribe sobre algo que te da miedo y que nadie sabe.',
    '¿Cómo te trató la gente hoy? ¿Cómo te trataste tú?',
    '¿Qué necesitas en este momento que no estás pidiendo?',
  ],
  metas: [
    '¿Qué es lo único que si haces hoy, el día habrá valido la pena?',
    '¿Qué llevas días postergando? ¿Qué necesitarías para hacerlo mañana?',
    'Describe cómo quieres sentirte al final de esta semana.',
    '¿Qué hábito pequeño quisieras tener en 30 días? ¿Cuál sería el primer paso hoy?',
    '¿A qué le estás diciendo sí últimamente que debería ser un no?',
    '¿Qué aprendiste esta semana, así sea algo pequeño?',
    'Si tuvieras una hora libre mañana sin obligaciones, ¿qué harías?',
    '¿Qué conversación importante has estado evitando tener?',
    'Escribe el mejor y el peor escenario de algo que te preocupa.',
    '¿Qué versión de ti mismo quieres ser dentro de un año? Descríbela en detalle.',
    '¿Qué le recomendarías a un amigo que está pasando por lo que tú estás pasando?',
    '¿Qué pequeña acción de hoy te acerca a donde quieres estar?',
  ],
  hipoteticos: [
    '¿Qué le dirías a Michael Jackson si te lo encuentras en el supermercado?',
    'Si tu mascota pudiera hablar, ¿qué crees que diría de ti?',
    'Describe por qué elegiste la ropa que tienes puesta hoy.',
    'Si tuvieras que mudarte mañana a otra ciudad, ¿a cuál irías y por qué?',
    '¿Cuál sería tu último desayuno si supieras que es el último?',
    'Si pudieras cenar con cualquier persona viva o muerta, ¿quién sería y qué pedirías?',
    'Imagina que dentro de 10 años alguien escribe un libro sobre tu vida. ¿Cómo se llamaría el capítulo de este mes?',
    '¿Qué superpoder elegirías y cómo lo usarías hoy específicamente?',
    'Si tuvieras que describir tu semana como una película, ¿de qué género sería?',
    'Escribe una carta de recomendación para ti mismo como si fuera otra persona.',
    '¿Qué objeto de tu casa dice más de ti de lo que crees?',
    'Si el clima de hoy fuera una metáfora de tu vida, ¿qué significaría?',
  ],
};
