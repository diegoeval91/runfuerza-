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
