import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Crear usuarios
  await prisma.user.create({
    data: {
      name: 'Admin Relojería',
      email: 'admin@relojeria.com',
      password: 'admin123',
      role: 'ADMIN',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Juan Pérez',
      email: 'juan@cliente.com',
      password: 'cliente123',
    },
  });

  // Crear productos
  await prisma.product.createMany({
    data: [
      {
        title: "MS 194 T",
        description: "Motosierra de gasolina MS 194 T: para un mantenimiento eficaz de los \u00e1rboles con cortes precisosLa motosierra a gasolina STIHL MS 194 T es una potentesierra arborista profesionalque es igualmente impresionante para elmantenimiento de copas, as\u00ed como para la eliminaci\u00f3n de madera muerta, reto\u00f1os y brotes de agua. Los especialistas en el mantenimiento de \u00e1rboles podr\u00e1n realizar tareas de mantenimiento de forma eficaz con esta motosierra de gasolina. El dise\u00f1o compacto de la motosierra STIHL MS 194 T y su bajo peso le permiten trabajar de manera eficiente incluso en espacios reducidos.https://www.youtube.com/watch?v=JNQDqsDUgfUManual",
        manualUrl: "https://drive.google.com/file/d/1LrgrONGqHv2vtLiZoLXraZFWG4P86u1M/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "MS 170",
        description: "Motosierra compacta a gasolina de 1.8 hpPr\u00e1ctica motosierra introductoria para entresacar madera, serrar le\u00f1a y talar \u00e1rboles peque\u00f1os de hasta 30 cm de di\u00e1metro aproximadamente. Ligera y f\u00e1cil de manejar. C\u00f3modo mando principal monopalanca. Disponible con espada de 30 cm.Manual",
        manualUrl: "https://drive.google.com/file/d/1qf-tSQOLx_cy_CYC397lwIKY1rwaNwwY/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "MS 250",
        description: "MS 250 \u2013 Multifuncional motosierra para diferentes tipos de tarea.Un paso por encima de la MS 230, la MS 250 es lo suficientemente ligera como para realizar peque\u00f1as tareas de desbroce o limpieza, pero lo suficientemente potente como para cortar peque\u00f1as ramas y \u00e1rboles. Una combinaci\u00f3n de caracter\u00edsticas y una alta relaci\u00f3n potencia-peso la convierten en una de las mejores motosierras para el hogar del mercado. Disponible con espada de 14\u2033/35cm, 16\u2033/40cm o 18\u2033/45cm.Manual",
        manualUrl: "https://drive.google.com/file/d/1QZXo8hdwfyhulBUQK_88Q9CqKczg9vXo/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "MS 361",
        description: "Motosierra muy robusta para las m\u00e1ximas exigencias.Extraordinaria relaci\u00f3n potencia-peso, tecnolog\u00eda de vanguardia y excepcional velocidad de corte y par motor. Equipada de serie con la cadena RSC de STIHL que absorbe las vibraciones. Los niveles de vibraciones m\u00e1s bajos de su clase. Disponible en tama\u00f1os de espada de 16\u2033/40cm a 20\u2033/50cm.Manual",
        manualUrl: "https://drive.google.com/file/d/1PT29ycS-sl16yse9HknIXI1GtYAYLBDx/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "PG 10",
        description: "Tijeras de jardinero PG 10: modelo b\u00e1sico para trabajos de corte en el jard\u00ednLas tijeras de podar bypass STIHL PG 10 est\u00e1n dise\u00f1adas para el mantenimiento del jard\u00edn dom\u00e9stico. Consisten en un cuerpo de aluminio conasas plastificadas. Puede esperar uncorte de precisi\u00f3ncon las tijeras de podar STIHL PG 10 y el filo tambi\u00e9n se puedereafilar si es necesario. El cierre seguro con un pr\u00e1ctico cierre con una sola mano se abre f\u00e1cilmente con el pulgar. Tambi\u00e9n puedes utilizarla muesca de cortede las tijeras de podar bypass PG 10 paracortar cables.Saca a\u00fan m\u00e1s partido a tus trabajos en el jard\u00edn con pr\u00e1cticos accesorios para tijeras de podar , tijeras de podar, sierras de podar y podadoras de jard\u00edn, por ejemplo, una ri\u00f1onera STIHL a juego para guardarla de forma segura y proteger la hoja de sus tijeras de podar.",
        manualUrl: "",
        price: 100.0,
        stock: 10
      },
      {
        title: "PB 20",
        description: "Tijera de poda bypass PB 20: corte preciso con gran comodidadCon la tijera de podar bypass STIHL PB 20 podr\u00e1s realizaresquejes precisos de las plantas sin aplastarlas. Las tijeras son ideales para su uso en vi\u00f1edos y huertos y seguramente tambi\u00e9n ser\u00e1n apreciadas por los jardineros y guardaparques profesionales que se ocupan decortes particularmente finos.Las tijeras de podar tienen una precisi\u00f3n de primera calidad. Hoja de acero rectificado para unborde afilado duradero. El cabezal de corte siempre puede funcionar sin problemas gracias a lalubricaci\u00f3nde un dep\u00f3sito de aceite interno. Con unalongitud de 80 cm, el gran brazo de palanca del PB20 le permitecortar c\u00f3modamente ramas de hasta 42 mm de di\u00e1metro. La hoja se puede cambiar si es necesario. Losamortiguadores respetuosos con las articulacioneshacen que la tijera de podar bypass STIHL PB 20 seaextremadamente c\u00f3moda de usar, incluso durante largos periodos de trabajo. Laranura de savia profundadel yunque cromado garantiza uncorte limpio de las plantas. El STIHL bypass PB 20 tambi\u00e9n convence por suvida \u00fatilespecialmente larga y su duradera protecci\u00f3n contra la corrosi\u00f3n.",
        manualUrl: "",
        price: 100.0,
        stock: 10
      },
      {
        title: "BG 86",
        description: "Potente sopladorEl soplador a gasolina STIHL BG 86 pesa s\u00f3lo4,4 kg, lo que lo hacef\u00e1cil de manejar yversatil de usar. Si usted espropietario de una casa, cuidador, jardinero paisajista o trabajador municipal,puede utilizar esta herramienta el\u00e9ctrica para limpiar eficazmentehojas y recortes de c\u00e9sped de \u00e1reas exteriores. Puedes trabajar con laboquilla redondau optar por laboquilla plana, que ofrece un amplio chorro de aire para trabajar cerca del suelo. De este modo, con el soplador de hojas BG 86 tambi\u00e9n se puedenlimpiar superficies m\u00e1s grandes. Graciasal filtro HD2, el soplador STIHL BG 86 tambi\u00e9n es adecuado para trabajar en ambientes polvorientos.Manual",
        manualUrl: "https://drive.google.com/file/d/1oF2OMxXuoukIwMXngfPuv1GzYcZfWG5l/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "BG 50",
        description: "Soplador a gasolina ligero y manejable con caracter\u00edsticas b\u00e1sicas fiables de probada calidad STIHL. Con tubo soplador de una pieza, control de velocidad infinitamente variable, palanca de estrangulamiento y bomba de combustible manual. Ideal para su uso en el hogar y el jard\u00edn.Manual",
        manualUrl: "https://drive.google.com/file/d/1T7GkIJQiWjYLUE9K9p77hlVRWJYMVq0p/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "FR 235",
        description: "FR 235 \u2013 Motoguada\u00f1a de mochilaIdeal para cortar con herramientas de metal o cabezal de corte con hilo de nylon. Empu\u00f1adura multifuncional, sistema de transporte acolchado.Manual",
        manualUrl: "https://drive.google.com/file/d/1gWy3y-CkJQacxuxW2BmTHRY7kGc210id/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "HSA 45",
        description: "Ligero cortasetos con bater\u00eda integradaEl cortasetos a bater\u00eda STIHL HSA 45 forma parte de la l\u00ednea STIHL AI y tiene undise\u00f1o compacto y ergon\u00f3mico. Este cortasetos a bater\u00eda esespecialmente ligero, lo que lo hace ideal para usuarios privados que realizan peque\u00f1os trabajos espont\u00e1neos en el jard\u00edn. Incluyendo la bater\u00eda de ions de litio permanentemente integrada, la STIHL HSA 45 pesas\u00f3lo 2,3 kg. Si nota que el nivel de carga de la bater\u00eda es bajo, puede cargar la herramienta el\u00e9ctrica utilizando elcable suministrado. El pr\u00e1ctico grupo de LED de la herramienta le permite ver el nivel de carga directamente. Gracias a su motor el\u00e9ctrico, el cortasetos a bater\u00eda STIHL HSA 45 es tan silencioso que podr\u00e1s utilizarlo incluso en zonassensibles al ruido. Lacuchilla de corte de un solo ladotambi\u00e9n le ayuda a trabajar de forma eficiente. Laprotecci\u00f3n contra cortesintegrada favorece un trabajo seguro, mientras que laprotecci\u00f3n de punta atornilladaprotege el equipo de corte cuando se trabaja cerca del suelo. Elempu\u00f1adura blandacon palanca de cambios es muy c\u00f3modo de sujetar y elmando a dos manosfavorece un trabajo seguro. Nuestro \u00fatil v\u00eddeo le muestra c\u00f3mo podar setos con la STIHL HSA 45.https://youtu.be/iXCHuK1SwL0Manual",
        manualUrl: "https://drive.google.com/file/d/1JHpUwaozqlQokC1nX_g79U7MdIIhx774/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "HS 45",
        description: "Cortasetos ligero y b\u00e1sicoEl cortasetos b\u00e1sico STIHL HS 45 es idealpara arbustosy el mantenimiento de setos a la altura del pecho. Sudise\u00f1o ligeroy suf\u00e1cil manejopermiten a los propietarios de jardines realizar los trabajos de mantenimiento de forma r\u00e1pida y eficaz. Gracias a STIHL ElastoStart, el STIHL HS 45 se puede arrancar sin problemas, ya que se reducen las sacudidas. Adem\u00e1s, labomba de combustible manualreduce el n\u00famero de golpes necesarios para el arranque, acelerando as\u00ed el proceso de arranque y facilitando que puedas continuar con tus trabajos de jardiner\u00eda. Elfuncionamiento con una sola palancapermite un manejo c\u00f3modo del cortasetos a gasolina STIHL HS 45, ya que se puede acceder a todas las funciones de la herramienta desde la palanca de control. Lageometr\u00eda de corte especialde lascuchillas de corte de doble carapermiteun corte preciso, tanto en horizontal como en vertical, e incluso en las esquinas.https://youtu.be/TBnIOPiHlAAManual",
        manualUrl: "https://drive.google.com/file/d/1s7c6m090nTL63UCu_yo0AmEYitcbwYW5/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "HS 82",
        description: "HS 82 R Cortasetos profesional para la poda con motor 2-MIXEl cortasetos a gasolina STIHL HS 82 R ha sido sistem\u00e1ticamentedise\u00f1ado para tareas de poda. La transmisi\u00f3n est\u00e1 especialmente dise\u00f1ada para bajas velocidades del motor, lo que da como resultado altas fuerzas con bajas velocidades de la hoja. Esto resulta especialmente beneficioso para losprofesionales de la horticultura y el paisajismo y los trabajadores de las autoridades locales. La geometr\u00eda de su hoja, su gran espacio entre dientes y su relaci\u00f3n de transmisi\u00f3n generan unaalta fuerza de corte. Gracias a lascuchillas de corte de doble cara, tambi\u00e9n podr\u00e1s realizar podas precisasen elmantenimiento de matas y arbustos, as\u00ed como en el recorte de setos, para que puedas afrontar tusgrandes- trabajos de corte en volumen de forma r\u00e1pida y eficaz.https://youtu.be/tA-0lh3490kManual",
        manualUrl: "https://drive.google.com/file/d/10TK1Z6JpSztWMO7SoaXPcP8L4heGZO_i/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "FSA 45",
        description: "Ligera guada\u00f1a con bater\u00eda integradaComo modelo b\u00e1sico, la motoguada\u00f1a a bater\u00eda STIHL FSA 45 esideal para trabajos de poda y limpieza en el jard\u00edn de su casa y espacios dom\u00e9sticos al aire libre. El cortac\u00e9sped dispone de una bater\u00eda de iones de litio integrada permanentemente, cuyo nivel de carga se puede leer directamente en el aparato mediante varios LED. Puede cargar la bater\u00eda cuando sea necesario utilizando el cable suministrado. El motor el\u00e9ctrico funciona tan silenciosamente que no es necesario usar protecci\u00f3n auditiva durante el uso, lo que hace que esta motoguada\u00f1a sea ideal parauso en \u00e1reas sensibles al ruido.https://youtu.be/M2tiRrdwFG4Manual",
        manualUrl: "https://drive.google.com/file/d/1KnVhJM_AqUb0fZCFaTYOqptHrZ4uC7sK/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "MH 710",
        description: "Motocultivadora potente para suelos pesadosLa Motocultivadora STIHL MH 710 tiene las m\u00e1s altas prestaciones. Esta m\u00e1quina realiza con extrema facilidad incluso los trabajos del suelo m\u00e1s intensivos y exigentes. Mientras el motor extremadamente potente remueve el suelo, usted se beneficia de un alto grado de confort al manejar el motocultivador. El accionamiento con engranaje helicoidal genera vibraciones m\u00ednimas durante el funcionamiento. Los componentes reforzados garantizan un rendimiento sobresaliente, incluso en los trabajos m\u00e1s duros en los terrenos m\u00e1s dif\u00edciles.Manual",
        manualUrl: "https://drive.google.com/file/d/1S2VRQaNDCUfmwNJzFuY-g4dx-7bUgfNV/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "FS 351",
        description: "Motoguada\u00f1a FS 351 robusta y vers\u00e1tilLa versatilidad y robustez de la sierra desbrozadora STIHL FS 351 le ayuda en sutrabajo de horticultura, paisajismo y agricultura. Con esta sierra de limpieza de gasolina, puedecortar o eliminar arbustos o malezas demanera r\u00e1pida y eficiente.El potente\u00a0motor STIHL 2-MIX\u00a0le ofrece una buena relaci\u00f3n entre rendimiento de corte y un consumo de combustible particularmente bajo. El arranque de la sierra de desbroce de gasolina STIHL FS 351 es m\u00e1s f\u00e1cil gracias a lav\u00e1lvula de descompresi\u00f3n, que reduce la fuerza de tracci\u00f3n requerida en el cable de arranque.https://youtu.be/KNKCGwWDurQManual",
        manualUrl: "https://drive.google.com/file/d/15sMyluW3FkTlIzj2VR7OtFXhV02u8cQL/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "FS 38",
        description: "Ligera y ergon\u00f3micaComo lamotoguada\u00f1a m\u00e1s ligera de STIHL, la FS 38 es la herramienta el\u00e9ctrica b\u00e1sica ideal para propietarios de jardines. La motoguada\u00f1aligera de 4,2 kges perfecta para recortar bordes de c\u00e9sped y cortar c\u00e9sped peque\u00f1o. Este cortac\u00e9sped compacto y maniobrable elimina de forma fiable el c\u00e9sped y las malas hierbas, incluso en caminos y escaleras. Elempu\u00f1adura multifunci\u00f3n con una sola manofacilita el manejo, ya que se puede acceder a todos los controles del motor con una sola mano. La motoguada\u00f1a a gasolina STIHL FS 38 tiene un mango en forma de bucle que permiteun guiado preciso con la otra mano. Otras ventajas de este cortac\u00e9sped de gasolina incluyen el motor STIHL 2-MIX, que combina un alto rendimiento con un consumo econ\u00f3mico de combustible.Manual",
        manualUrl: "https://drive.google.com/file/d/12MmrmJEujWiTG1p3Ydfy6zKytpQecjCj/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "FS 120",
        description: "Robusta motoguada\u00f1a con motor de gran aceleraci\u00f3n. Manillar abierto para un manejo de la m\u00e1quina ergon\u00f3mico y sin esfuerzo.Manual",
        manualUrl: "https://drive.google.com/file/d/199NJvjkDD451rIOoW0OmHS2tS-AsBzeq/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "FS 235",
        description: "Impresionante rendimiento de siega. Siega y recogida de hierba y matorrales. Robusta y dotada de un rendimiento bien conocido. Sistema STIHL antivibraci\u00f3n de 1 punto, descompresi\u00f3n autom\u00e1tica, motor 2-MIX y empu\u00f1adura multifunci\u00f3n.Manual",
        manualUrl: "https://drive.google.com/file/d/1XlF7HUzwzYep63FyEEa6xcSP82vRKUIs/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "FS 250",
        description: "Potente motoguada\u00f1a con 2,2 CVPara trabajos de siega exigentes y de gran tama\u00f1o. Sistema antivibraci\u00f3n STIHL de 1 punto, STIHL ElastoStart, mango multifunci\u00f3n, manillar tipo ciclista, ajuste del mango sin herramientas.Manual",
        manualUrl: "https://drive.google.com/file/d/1Ce9ZUPsmQo7zkLJhFxMJL9doo8VFHbyK/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "FS 380",
        description: "Potencia, robustez y confort. STIHL Motoguada\u00f1a FS 380 es recomendada para profesionales que necesitan trabajar de manera continua.Desmalezadora a Nafta. Peso muy reducido, excelente equilibrio. ElastoStart para facilitar el arranque.Empu\u00f1adura doble ajustable a la estructura del operarioPalanca multifuncional especialmente pr\u00e1ctica con acelerador y pasador combinado integrado para las funciones gas de arranque, funcionamiento normal y stop.Transmisi\u00f3n por eje de acero a caja de engranajes helicoidales en ba\u00f1o de grasa lubricante.Manual",
        manualUrl: "https://drive.google.com/file/d/1BCKP9WsnqMJBbrnoRW66kTQz1s7p7C9Y/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "FS 220",
        description: "Potente guada\u00f1a para trabajo pesadoPotente motoguada\u00f1a para trabajar en grandes superficies de hierba dura. Sistema antivibraci\u00f3n, empu\u00f1adura multifunci\u00f3n, manillar tipo ciclista.Manual",
        manualUrl: "https://drive.google.com/file/d/1Uj7noKyd_pPh_B2vr7OcTMa42ZL1jEfl/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "FS 350",
        description: "Inestimable para cortar el c\u00e9sped m\u00e1s dif\u00edcil, matorrales o despejar la vegetaci\u00f3n. El sistema ElastoStart garantiza un arranque suave y sencillo. El sistema antivibraci\u00f3n de 4 puntos y el manillar totalmente ajustable garantizan el m\u00e1ximo confort del operador. El sistema de filtro de larga duraci\u00f3n con compensador y efecto autolimpiante prolonga considerablemente los intervalos entre cambios para un tiempo de trabajo \u00f3ptimo.MANUAL",
        manualUrl: "https://drive.google.com/file/d/1-I-3hGp8t74DXfPHmeLv_BmxhiQ4sbK3/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "FS 460",
        description: "Motoguada\u00f1a de gasolina: duradera y robustaEl motor STIHL 2-MIX de 2,2 kW (3,0 CV) de la motoguada\u00f1a a gasolina STIHL FS 460 le proporcionaun excelente rendimiento de corte, mientras que la robusta cuchilla para cepillos STIHL 300-3 suministrada de serie puedes abordar tareas sin esfuerzo. Esta motoguada\u00f1a a gasolina est\u00e1 equipada con STIHL ErgoStart para facilitar el arranque. STIHL M-Tronic tambi\u00e9n ofrece un rendimiento \u00f3ptimo del motor y una velocidad m\u00e1xima constante para esta herramienta el\u00e9ctrica. El FS 460 est\u00e1 equipado con unmango tipo bicicleta ergon\u00f3micoque permite un movimiento natural de corte, lo que significa que puedes trabajar c\u00f3modamente incluso durante per\u00edodos de tiempo m\u00e1s largos. Adem\u00e1s cuenta con elsistema antivibraciones STIHLpara aliviar tus m\u00fasculos y articulaciones. Elempu\u00f1adura multifunci\u00f3n con una sola manose puede utilizar para operar todas las funciones de control del motor, lo que facilita su trabajo.Manual",
        manualUrl: "https://drive.google.com/file/d/19VFWMCPUlMMmeGyamXRII3t6wshvK6O2/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "WP 300",
        description: "Motobomba WP 300: Para la distribuci\u00f3n de agua con un volumen de desplazamiento moderadoLa bomba de agua STIHL WP 300 ofrece un apoyo eficiente para eltransporte de agua. Por ejemplo, en agricultura puedestomar agua dulce de aguas superficiales como lagos, r\u00edos, acequias o estanquespara regar cultivos. Tambi\u00e9n se pueden eliminar lasacumulaciones de aguano deseadas. La STIHL WP 300 para caudal medio trabaja con uncaudal m\u00e1ximo de 616 l/mincon unaaltura m\u00e1xima de aspiraci\u00f3n de hasta 7 my uncaudal total altura de hasta 33 m.Manual",
        manualUrl: "https://drive.google.com/file/d/1-VnvVlttFh6E_rtnYIVJ5IdMavjEtpez/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "WP 600",
        description: "Motobomba WP 600: Transporte eficaz de agua con gran volumen de desplazamientoCon uncaudal m\u00e1ximo de 1.050 l/min, la bomba de agua STIHL WP 600 proporciona un apoyo eficiente para eltransporte de agua. En agricultura, por ejemplo, puedestomar agua dulce de lagos, r\u00edos, pozos o dep\u00f3sitos de aguao tambi\u00e9n eliminaracumulaciones de aguano deseadas. La STIHL WP 600 tiene unaaltura m\u00e1xima de succi\u00f3n de hasta 7 my unaaltura de entrega total de hasta 31 m.La robusta bomba de agua STIHL WP 600 es propulsado por un potente motor de gasolina de 4 tiempos. En fr\u00edo, puedesimplificar el arranque del motor accionando el estrangulador una vez.Manual",
        manualUrl: "https://drive.google.com/file/d/1_QqJK-0CkvpyxA887QsWGzYtjLoKS538/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "RE 90",
        description: "Hidrolimpiadora El\u00e9ctrica: Potencia compacta para zonas residencialesLa hidrolimpiadora el\u00e9ctrica STIHL RE 90 es unaherramienta ligera y c\u00f3moda para limpiar la casa y el jard\u00edn. Con esta hidrolimpiadora podr\u00e1s limpiar eficazmente terrazas, escaleras y muebles de jard\u00edn de tu hogar.Manual",
        manualUrl: "https://drive.google.com/file/d/1FGEQnf4S5C345DemRZ17mtYPSRsAtJeV/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "RB 400",
        description: "Hidrolavadora de alta presi\u00f3n a gasolinaCon la limpiadora de alta presi\u00f3n de gasolina STIHL RB 400 podr\u00e1 limpiar a fondo y c\u00f3modamente superficies y objetos en el hogar y el jard\u00edn. Dise\u00f1ada para uso dom\u00e9stico, la limpiadora cuenta con un potente motor de gasolina de 4,8 kW (6,5 CV) que puede generar una presi\u00f3n m\u00e1xima de trabajo de 185 bares.Manual",
        manualUrl: "https://drive.google.com/file/d/17zWfYwUIjhQJI77PGt5gp_-Auip91ZcP/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GX35",
        description: "Motor multiprop\u00f3sito de 1.6 HP con libre manejo de 360 grados sin afectar el funcionamiento de la m\u00e1quina. Utilizado en las motoguada\u00f1as Honda UMR435T y UMK435T.Ficha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1WhIvmREnYx0Eof84QvNMocy48toCaTUL/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GX50",
        description: "Motor de cuatro tiempos de 2.2 HP de potencia m\u00e1xima.\u00a0 Cuenta con una correa de distribuci\u00f3n silenciosa que permite que sea ligero y compacto para una f\u00e1cil maniobrabilidad a 360\u00b0. Adem\u00e1s tiene un escape de gran capacidad para la reducci\u00f3n del nivel de ruido.Ficha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1HY9TnRcZFlUaKb3pz5L1X9fGNl9u-UyJ/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GP160",
        description: "Motor multiprop\u00f3sito de cuatro tiempos de 5.5 HP de potencia m\u00e1xima. Los motores GP son ideales para aplicaciones de baja vibraci\u00f3n como en maquinarias agr\u00edcolas estacionarias.Tipo de aplicacionesPulverizadora EstacionariaMotobombaDespulpadora de Caf\u00e9Ficha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1I2pyIsfOJ99tF8WE5uXuIsblQrHhvjKS/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GX160",
        description: "Motor estacionario cuatro tiempos de combusti\u00f3n interna cuenta con una potencia m\u00e1xima de 5.5 HP que permite un rendimiento superior.Tipo de aplicacionesDespulpadora de Caf\u00e9Pulverizadora EstacionariaMotobombasFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1tA12fOBe5MAraEo2h63t_jgSadxUa5gJ/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GX200 MEGA",
        description: "Motor para aplicaci\u00f3n en transporte fluvial de 6.5 HP de potencia m\u00e1xima, cuatro tiempos y eje de salida chavetero recto. Las superficies de este motor est\u00e1n cromadas o recubiertas con una pintura especial que evita la corrosi\u00f3n. Cuenta con un filtro de aireTipo de aplicacionesTransporte FluvialFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1p2Lix5Kr-A9LdlSrNzSM2r_idjRJFGad/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GX200T2 S\u00daPER",
        description: "Motor multiprop\u00f3sito de 6.5 HP de potencia m\u00e1xima, cuatro tiempos y eje de salida chavetero recto. Cuenta con una reducci\u00f3n que permite valores altos de torque con bajo consumo de combustible. Ideal para aplicaciones como m\u00e1quinas agr\u00edcolas y transporte\u00a0fluvial.Ficha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1MuxWvviUu20tQHdBBIucMgx2WLJLyeKo/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GP200",
        description: "Motor multiprop\u00f3sito de cuatro tiempos de 6.5 HP de potencia m\u00e1xima. Los motores GP son ideales para aplicaciones de baja vibraci\u00f3n como en maquinarias agr\u00edcolas estacionarias.Tipo de aplicacionesPulverizadora EstacionariaMotobombaDespulpadora de Caf\u00e9Ficha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1hVHcoMWSfEU4AIkLZfJ5iNCHE5zQrGMn/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GX120T3",
        description: "Los motores GX120 pueden ser utilizados en m\u00faltiples aplicaciones industriales: motocultores, generadores, soldadores, bombas, etc.Ficha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1i_XW2ot4ML80Yskf51a5KsyJV7sQAq6i/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GXR120RT",
        description: "Motor multiprop\u00f3sito de 4HP que gracias a su dise\u00f1o puede soportar altas vibraciones. De uso en diversas aplicaciones del sector industrial y de construcci\u00f3n especialmente en vibroapisonadoras.Ficha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1cYp2UusuNocXcKfWb1tLrxWKUhYJKR9C/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GX270",
        description: "Motor multiprop\u00f3sito de 9 HP de potencia m\u00e1xima, cuatro tiempos y eje de salida chavetero recto. Ideal para aplicaciones con sistemas de transmisi\u00f3n y acople directo en cualquier zona del pa\u00eds.Ficha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1nnjCDqvOgh7sa0GyezfoIzUi5O5efkit/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GX390",
        description: "Motor multiprop\u00f3sito de cuatro tiempos de 13 HP de potencia m\u00e1xima. Ideal para aplicaciones industriales como maquinas aserradoras, mezcladoras y cortadoras de concreto.Tipo de aplicacionesCortadorasAserradorasApisonadorasFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1nQNFmhS0WYPiOPzzk1NgZ_kQeTLWerAG/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GX390 MEGA",
        description: "Nuevo motor especial para transporte fluvial de 16 HP de potencia m\u00e1xima. Este motor cuatro tiempos permite un mayor ahorro operativo y una menor contaminaci\u00f3n. Asimismo, cuenta con superficies que est\u00e1n cromadas o recubiertas con una pintura especial, la cual evita la corrosi\u00f3n.Tipo de aplicacionesTransporte FluvialFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1ny3ury9byFfuvsozZfl84VM3f_bNiBkC/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "GX630",
        description: "Motor de 4 tiempos bicil\u00edndrico y multiprop\u00f3sito de 23 HP de potencia m\u00e1xima y con un eje de salida en dos tipos (chavetero y c\u00f3nico). No incluye: Bater\u00eda, tanque de combustible y silenciador.Tipo de aplicacionesGrupo electr\u00f3genoCortadoraFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1cmcAUNoB9gXzWb88GnBYMjEmdDU5S-4K/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "WT30XK4",
        description: "La motobomba WT30 pertenece a la l\u00ednea de equipos para uso en Aguas Turbias, cuenta con una capacidad m\u00e1xima de bombeo de 1200 lts/min, con un di\u00e1metro de 3\u2019\u2019 tanto para la succi\u00f3n, como para la descarga.Ficha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1vNF0PqqUVxpKbsIfEZVFMWRBf5E0fm_o/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "WX10T",
        description: "Motobomba con di\u00e1metro de succi\u00f3n y descarga de 1 pulgada. Ideal para traslado de l\u00edquidos con pocos elementos s\u00f3lidos. Gracias al motor de cuatro tiempos GX25 acoplado se pueden realizar labores en terrenos inclinados.Tipo de aplicacionesTraslado de l\u00edquidosBombeo de aguasFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1hMkuZsiilNZ7kE8KGuYebA5FwSTLxA_f/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "WL20XH",
        description: "Motobomba con di\u00e1metro de succi\u00f3n y descarga de 2 pulgadas. Ideal para aplicaciones de riego y succi\u00f3n de aguas empozadas. Acoplada a un motor de cuatro tiempos GP160.Tipo de aplicacionesTraslado de l\u00edquidosBombeo de aguasFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1OYVpPZu7Q_KmMIZF0ZZD-wraggluQLNJ/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "WB30XH2",
        description: "Motobomba WB30XH2 con di\u00e1metro de succi\u00f3n y descarga de 3 pulgadas. Ideal para aplicaciones de riego municipal y succi\u00f3n de aguas empozadas. Acoplada a un motor de cuatro tiempos GX160.Tipo de aplicacionesTraslado de l\u00edquidosBombeo de aguasFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1J_OsCHDJeYeN2WbXf0p2BNX7PkehxPPr/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "WH20XT",
        description: "Motobomba autocebante de media presi\u00f3n con di\u00e1metro de succi\u00f3n y descarga de 2 pulgadas. Ideal para trabajos de riego que requieran una mayor presi\u00f3n y traslados de l\u00edquidos a larga distancia. Acoplada a un motor Honda GX160 de 5.5 HP de potencia m\u00e1xima.Tipo de aplicacionesTraslado a larga distanciaFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/10pR9oTO_To5h1o_9V9Wi2tI-KPydQ4uy/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "WT40XK3",
        description: "Motobomba autocebante con di\u00e1metro de succi\u00f3n y descarga de 4 pulgadas. Cuenta con la potencia ideal para el bombeo de aguas turbias con solidos. Acoplada a un motor Honda GX390 de 13 hp.Tipo de aplicacionesAguas turbiasFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/11UhwblchvPHcEBEJnjBNSOTuXcETsWiq/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "HRN216 VKAA",
        description: "La cortadora de c\u00e9sped Deluxe de Honda cuenta con el sistema MicroCut\u00ae exclusivo de una cuchilla con cuatro superficies de corte que optimizan el trabajo. Incorpora un motor fiable y f\u00e1cil de arrancar con eficiencia en el consumo de combustible. Este modelo Deluxe incluye tambi\u00e9n un sistema Smart Drive Control que a\u00f1ade tracci\u00f3n al movimiento de la cortadora.Tipo de aplicacionesMantenimiento EstablecimientosMantenimiento de Jard\u00ednFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1UFhYUfQjCM6mZncC-KMQGGxfGVQZUK_P/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "WJR4025T",
        description: "Motofumigadora con bomba tipo \u00e9mbolo acoplada a un motor cuatro tiempos GX35. Incluye un tanque de 25 litros y una lanza recta para fumigaci\u00f3n de 1 boquilla. Dise\u00f1ada ergon\u00f3micamente para distribuir de manera eficiente el peso del l\u00edquido y brindar comodidad gracias a correas acolchadas de la mochila de carga.Tipo de aplicacionesRiegoFumigaci\u00f3nDesinfecci\u00f3nFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1zE3RnKIibupNcUW4kHCha4DCPlEMR__1/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "UMR435T",
        description: "Motoguada\u00f1a de eje flexible con motor de 4 tiempos GX35 de 1.6 HP de potencia m\u00e1xima. Ideal para cultivar y desmalezar de manera c\u00f3moda en zona de pendientes con eficiencia en el consumo de combustible. Acoplable con diferentes herramientas de corte. Incluye arn\u00e9s, llaves, cuchilla de tres puntas y cabezal de nylonTipo de aplicacionesMaleza gruesaMantenimiento \u00e1reas verdesCosechasFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1O_JFI57TXi4GwEdmglp7p_2ya835njTb/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "UMK435T",
        description: "Motoguada\u00f1a de eje recto con motor de 4 tiempos GX35 de 1.6 HP de potencia m\u00e1xima. Ideal para cultivar y desmalezar en cualquier zona del pa\u00eds con eficiencia en el consumo de combustible. Acoplable con diferentes herramientas de corte. Incluye arn\u00e9s, llaves, cuchilla de tres puntas y cabezal de nylon.Tipo de aplicacionesMaleza gruezaMantenimiento de \u00e1reas verdesCosechasFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/19il9gF_Zxb-yajq37VPubhsh6GBgaBQG/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "UMK450T",
        description: "Motoguada\u00f1a de eje recto con motor de 4 tiempos GX50 de 2.2 HP de potencia m\u00e1xima. Ideal para cultivar y desmalezar en cualquier zona del pa\u00eds con eficiencia en el consumo de combustible. Acoplable con diferentes herramientas de corte. Incluye arn\u00e9s, llaves, cuchilla de tres puntas y cabezal de nylon.Tipo de aplicacionesMaleza GruesaMantenimiento \u00e1reas verdesCosechasFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1P07fC7C6YhOSjpq9Gx1mCliuTzrEcjES/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "EU10IT1 \u2013 1KVA",
        description: "Generador monof\u00e1sico de 1.0 KVA de potencia y salida de alimentaci\u00f3n de 220V. Incluye dos tomas de corriente AC. La regulaci\u00f3n de voltaje se realiza a trav\u00e9s de un sistema digital inverter. Adem\u00e1s, cuenta con tecnolog\u00eda Eco Throttle que permite aumentar la eficiencia en el consumo de gasolina y reducir la emisi\u00f3n de ruido.Tipo de aplicacionesDispositivos M\u00f3vilesFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1mqdLYs8_srSnENqwPFw0IR19ZJi21Ozt/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "EG1000 \u2013 1KVA",
        description: "Generador monof\u00e1sico de 1 KVA de potencia, 5.5 horas aproximadamente de operaci\u00f3n y alimentaci\u00f3n de 220V. Incluye una toma de corriente AC, con regulaci\u00f3n de voltaje capacitivo que permite un \u00f3ptimo\u00a0funcionamiento.Tipo de aplicacionesHerramientasElectrodom\u00e9sticosFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/10W4Xr4oq09eLZe99qIw2MJL9bd1uEtDc/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "EU22IT \u2013 2.2KVA",
        description: "Generador monof\u00e1sico de 2.2 KVA de potencia y salida de alimentaci\u00f3n de 220V. Incluye dos tomas de corriente AC y dos bornes DC para carga de bater\u00eda. Con regulaci\u00f3n de voltaje realizada a trav\u00e9s de un sistema digital Inverter. Adem\u00e1s, cuenta con tecnolog\u00eda Eco Throttle que permite aumentar la eficiencia en el consumo de gasolina y reducir la emisi\u00f3n de ruido.Ficha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1UaSPFbo7vqDjVBM2w-1g1I767MVbXCo5/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "EZ3000CX \u2013 3KVA",
        description: "Generador monof\u00e1sico de 6.5 HP y 3000 KVA de potencia m\u00e1xima salida de 220V en corriente continua , de muy bajo consumo de combustible, sistema de arranque. Su f\u00e1cil arranque y operaci\u00f3n sencilla hacen que este equipo sea una herramienta ideal para uso domiciliario y profesional.Tipo de aplicacionesHerramientasElectrodom\u00e9sticosFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/17NPl9ou-YsUuU5if4l9JEvPAFuaiohfm/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "EG5000CX \u2013 5KVA",
        description: "Generador monof\u00e1sico de 5 KVA de potencia m\u00e1xima, con de alimentaci\u00f3n de 120V y 240V. Incluye dos tomas de corriente AC y dos bornes DC para carga de bater\u00eda. Con regulaci\u00f3n de voltaje a trav\u00e9s de un sistema AVR digital y alternador acoplado a un motor cuatro tiempos GX340.Ficha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1fZLlN9TgUYAjGH-V0HnmLAZsGasgWB9w/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "EZ6500CXS \u2013 6.5KVA",
        description: "Generador monof\u00e1sico de 13 HP Y 6500 KVA de potencia m\u00e1xima salida de 220V en corriente continua, de muy bajo consumo de combustible,\u00a0 sistema de arranque dual (el\u00e9ctrico y arranque retr\u00e1ctil), bajo nivel de ruido. Equipado con alerta de aceite, que detiene el equipo en caso de falta de aceite. Ideal para el uso domiciliario y profesional.\u00a0Fotos referenciales. Generador no incluye bater\u00eda.Tipo de aplicacionesCompresora de aireHerramientas de tallerRotomartilloFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1QZccQ4Ch_G4iUXKBGQLEFUkvugpi52wr/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "EG6500CXS \u2013 6.5KVA",
        description: "Generador monof\u00e1sico de 13 hp y 6.5 KVA de potencia m\u00e1xima, con regulaci\u00f3n autom\u00e1tica de tensi\u00f3n con sistema \u00abD-AVR\u00bb, (regulador autom\u00e1tico de voltaje digital). Equipado con arranque el\u00e9ctrico y manual, sistema de alerta de aceite y temperatura que detiene el equipo en caso de falla. Por su f\u00e1cil arranque y operaci\u00f3n sencilla hacen a este equipo una herramienta ideal para uso domiciliario y profesional.Ficha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1nzqXErfj2wByotIv5S2ObtJeDnMlsSSo/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "EM10000-LDH \u2013 10KVA",
        description: "Generador monof\u00e1sico de 10 KVA de potencia m\u00e1xima y regulaci\u00f3n autom\u00e1tica de tensi\u00f3n con sistema \u00abD-AVR\u00bb. Con sistema de arranque dual (el\u00e9ctrico y arranque retr\u00e1ctil) y bajo nivel de ruido.Tipo de aplicacionesConstrucci\u00f3nIluminaci\u00f3nHerramientas el\u00e9ctricasFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1qJ6qJIungQCVzGntXX8IfmL5Km1lw8pU/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "SE 33",
        description: "Aspiradoras en seco y h\u00famedo con funci\u00f3n de soplado para espacios dom\u00e9sticosEl aspirador compacto de seco y h\u00famedo SE 33 limpia sin esfuerzo casas, s\u00f3tanos o coches. Para ello se han combinado de forma \u00f3ptima el rendimiento y la comodidad de este dispositivo. Gracias a sualta potencia de 1,4 kW, el SE 33 genera suficiente potencia de aspiraci\u00f3n paranumerosos fines de limpieza. Conla manguera de aspiraci\u00f3n de 2 m de longitudy eltubo de aspiraci\u00f3n de dos piezaspodr\u00e1s llegar incluso a los rincones m\u00e1s dif\u00edciles sin tener que cambiar frecuentemente de posici\u00f3n. Incluso los peque\u00f1os pasos no suponen ning\u00fan problema para la m\u00e1quina gracias a las ruedas delanteras giratorias.Manual",
        manualUrl: "https://drive.google.com/file/d/18_T7v2TMkfKBTYNzv2u0nU1RfW7bhfBE/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "SE 62",
        description: "Aspiradora de l\u00edquidos y s\u00f3lidos SE 62El aspirador el\u00e9ctrico de seco y h\u00famedo STIHL SE 62 es una herramienta de limpieza compacta y vers\u00e1til paratareas de limpieza profesional en talleres, servicios de limpieza y entornos industriales. El aspirador industrial aspirapolvo, suciedad y l\u00edquidos tanto en el interior como en el exterior. Muy pr\u00e1ctico: gracias a lafunci\u00f3n de sopladotambi\u00e9n se puede eliminar elpolvo de dif\u00edcil accesode las grietas y rincones. Para convertirlo en soplado, basta condesplazar el tubo de aspiraci\u00f3n hasta la conexi\u00f3n de aire de escape. El tubo manual es f\u00e1cil de conectar mediante un acoplamiento de liberaci\u00f3n r\u00e1pida. Gracias a la boquilla combinada para pisos STIHL intercambiable, la boquilla de succi\u00f3n universal STIHL y la boquilla para rincones STIHL que vienen de serie con la STIHL SE 62, usted est\u00e1equipado para una amplia gama de aplicaciones. La suciedad se recoge en uncontenedor de 20 litrosy adem\u00e1s pasa a trav\u00e9s de un filtro.https://www.youtube.com/watch?v=aM9Y6WL-xNQManual",
        manualUrl: "https://drive.google.com/file/d/1XhGUbP6rdp8TTVx40MDfMQI6jHJGqQQU/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "SR 420",
        description: "Potente fumigadoraLa potente y vers\u00e1til fumigadora STIHL es una verdadera profesional en los vi\u00f1edos, frutales y huertas. Su dise\u00f1o ergon\u00f3mico se adapta a la forma del cuerpo y su acolchado minimiza la presi\u00f3n de la m\u00e1quina, incluso en largos periodos de utilizaci\u00f3n. Dispone de serie, de un dep\u00f3sito de l\u00edquidos de 13 l, indicador de nivel de llenado, dosificador en la boquilla y tres rejillas deflectoras diferentes.Manual",
        manualUrl: "https://drive.google.com/file/d/15ZandEOL9gTRBEnNlKHOgutC32ditKQq/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "SR 430",
        description: "C\u00f3moda fumigadoraEl fumigador a gasolina STIHL SR 430 ofrece afruticultores, en\u00f3logos y agricultoresunrango de pulverizaci\u00f3n especialmente ampliopara pulverizar l\u00edquidos. Elfumigador de mochilatiene un dise\u00f1o compacto, pesa 12,2 kg y viene con unc\u00f3modo sistema de transportecon un panel trasero en el que se montan varios cojines adicionales. Puede manejar el motor STIHL 2-MIX y la v\u00e1lvula para el suministro de agente pulverizador con una sola mano utilizandoel mango multifunci\u00f3n con una sola mano. Elmotor se puede arrancar r\u00e1pidamente cuando est\u00e1 fr\u00edo gracias a la sencilla l\u00f3gica de arranque con control \u00fanico del estrangulador y bomba de combustible manual, lo que garantiza que puedas ponerte a trabajar sin demora.https://www.youtube.com/watch?v=0V-I3F2JXVYManual",
        manualUrl: "https://drive.google.com/file/d/1zy_Z5LKwnOGiFZVOpxvqsjIX8II-DrlJ/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "BT 131",
        description: "Ahoyadora profesional de un operario con motor 4-MIX\u00aeLa Ahoyadora STIHL BT 131 se puede utilizar para perforaragujeros de hasta 300 mmde di\u00e1metro, lo que hace que el taladro unipersonal BT 131 sea ideal parajardineros y paisajistas, as\u00ed como para quienes trabajan en huertos y en la industria de la construcci\u00f3n, para colocar postes, cavar hoyos para plantaciones y pozos de drenaje o tomar muestras de suelo. Las afiladas brocas de la Ahoyadora y los husillos con cuchillas cortantespenetran eficazmente incluso en superficies pedregosas.https://www.youtube.com/watch?v=zd8bkvk51scManual",
        manualUrl: "https://drive.google.com/file/d/1BvfZSLp99F0XkoIqirmZj3IBqiN-3qxi/view?usp=drive_link",
        price: 100.0,
        stock: 10
      },
      {
        title: "GTA 26",
        description: "Podadora de jard\u00edn con bater\u00eda GTA 26Incluido en el set:Este conjunto le permite comenzar apodar \u00e1rboles y arbustos en aplicaciones dom\u00e9sticasde inmediato. Los potentes cortes de la cadena de sierra STIHL 1/4\u2033 PM3 tambi\u00e9n permitentriturar esquejes verdes.u otros trabajos con madera mucho m\u00e1s f\u00e1ciles. Unmango de control antideslizantehace que esta podadora de jard\u00edn sea muy ergon\u00f3mica y unaprotecci\u00f3n protectora flexibleprotege sus manos. El cuidado y mantenimiento de la podadora de jard\u00edn es muy f\u00e1cil, ya que latapa de pi\u00f1\u00f3ny la palomilla de la STIHL GTA 26 facilitan elcambio de cadena sin necesidad de herramientas.1 podadora de jard\u00edn a bater\u00eda STIHL GTA 26 con flexible protector1 bater\u00eda de ions de litio STIHL AS 21 cargador est\u00e1ndar AL 11 espada STIHL Rollomatic Light para GTA 261 cadena de sierra STIHL 1/4\u2033 PM3, 10 cm1 Multioil Bio, 50 ml1 bolsa de transporte negra/naranja con ojales para montaje en paredManual",
        manualUrl: "https://drive.google.com/file/d/1JOiixE-E0klAp4y2PhedsvK5__rryh3w/view?usp=drive_link",
        price: 100.0,
        stock: 10
      },
      {
        title: "MS 382",
        description: "Fuerte y robusta motosierra para trabajos forestales y agr\u00edcolasIdeal para trabajar en puestos de baja y media densidad. Tensor de cadena lateral para un tensado seguro y f\u00e1cil de la cadena, tapones de combustible sin herramientas para un repostaje sencillo y seguro.https://www.youtube.com/watch?v=-B8pnodQr48Manual",
        manualUrl: "https://drive.google.com/file/d/10vAWNN-CC7e4tPbkBh7JI7TfywBGXnUa/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "MS 661",
        description: "Motosierra de alto rendimiento con la m\u00e1s moderna tecnolog\u00eda 2-MIX. Buena relaci\u00f3n peso-potencia y sistema antivibraci\u00f3n STIHL con un 50% menos de vibraciones que su predecesor. Con sistema de filtro de aire de alta duraci\u00f3n, captor de cadena de rodillo, tuercas de tapaespada imperdibles, v\u00e1lvula de descompresi\u00f3n, STIHL Elastostart, compensador. Una gran opci\u00f3n para los trabajos forestales m\u00e1s exigentes.https://www.youtube.com/watch?v=d2KTtFKJaB4Manual",
        manualUrl: "https://drive.google.com/file/d/1IYKapQBZeZ6afv02zJIuyd24AIGXIkyC/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "FS 291",
        description: "Motoguada\u00f1a FS 291La versatilidad y robustez de la potente desbrozadora STIHL FS 291 le ayuda en sustrabajos de horticultura, paisajismo y agricultura. Esta desbrozadora est\u00e1equipada con un eje extendido para unam\u00e1xima comodidad al trabajar. Con esta desbrozadora de gasolina, puedecortar o eliminar arbustos y malezas demanera r\u00e1pida y eficiente.ManualFicha T\u00e9cnica",
        manualUrl: "https://drive.google.com/file/d/1fVrNoCQHiwYKy8zCchGm2lOezNELDdGU/view?usp=sharing",
        price: 100.0,
        stock: 10
      },
      {
        title: "SR 450",
        description: "Fumigadora universalEl fumigador de mochila STIHL SR 450 ofrecefruticultores, en\u00f3logos y agricultores un largo alcance al pulverizar l\u00edquidos, gr\u00e1nulos o semillas, facilitando un cuidado eficiente de las plantas. El pulverizador se puede convertir paraaplicaciones de polvoen tan solo unos sencillos pasos, con elmecanismo de conversi\u00f3n 2 en 1. La compacta STIHL SR 450 pesa 12,8 kg y es f\u00e1cil de transportar a la espalda gracias alc\u00f3modo sistema de transporte. El motor STIHL 2-MIX y la v\u00e1lvula de suministro de agente pulverizador se pueden manejar con una sola mano utilizandoel mango multifunci\u00f3n con una sola mano.https://www.youtube.com/watch?v=_IeDPz4ZPy8Manual",
        manualUrl: "https://drive.google.com/file/d/1HbIoUNJ14X3OTa0NsfOCL-KncORbLtkv/view?usp=sharing",
        price: 100.0,
        stock: 10
      }
    ],
  });

  console.log('🌱 Seeds cargados correctamente con todos los productos.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
