// Banco completo de Cuestionarios por Tema (Temas 1 al 11), Flashcards y Formulario de Referencia
window.DATOS_CUESTIONARIOS = {
  1: [
    {
      id: "q1-1",
      dificultad: "Media",
      ref: "Tema 1 - Diap. 29-31",
      pregunta: "En el ejemplo del modelo de capas de los artistas (Valencia y Moscú), si se sustituye el telégrafo entre París y Copenhague por un teletipo, ¿qué capas deben modificarse en Valencia y Moscú?",
      opciones: [
        "Ninguna en las capas superiores (Artista y Traductor), porque el cambio queda encapsulado en las capas inferiores de los nodos intermedios.",
        "La capa 3 (Traductor) debe cambiar el idioma francés por otro compatible con teletipo.",
        "Todas las capas (1 a 4) deben renegociar su interfaz local.",
        "La capa 4 (Artista) debe acortar las frases por tener menor MTU."
      ],
      correcta: 0,
      explicacion: "Por el principio de independencia del modelo de capas, cada capa n solo usa los servicios de la n-1 a través de su interfaz local. Cambiar la tecnología de capa 1/2 en un enlace intermedio es totalmente transparente para las capas 3 y 4."
    },
    {
      id: "q1-2",
      dificultad: "Media",
      ref: "Tema 1 - Diap. 37-39",
      pregunta: "Cuando el traductor reparte los mensajes entre dos telegrafistas en paralelo (multiplexado inverso) enviando M1 (10 s) y M3 (12 s) por el Telegrafista 1 y M2 (50 s) por el Telegrafista 2, ¿qué problema ocurre y quién debe resolverlo?",
      opciones: [
        "M3 llega en el segundo 22 antes que M2 (segundo 50); los traductores (capa 3) deben numerar los mensajes para reordenarlos.",
        "Se produce una colisión eléctrica en el hilo telegráfico que destruye M2 y M3.",
        "El artista receptor descarta M3 por llegar fuera de orden y pide retransmisión.",
        "No ocurre ningún problema porque el código Morse reordena las letras automáticamente."
      ],
      correcta: 0,
      explicacion: "En el multiplexado inverso una entidad reparte su flujo entre varias entidades de la capa inferior. Como M1+M3 tardan 10+12 = 22 s y M2 tarda 50 s, llegan desordenados (M1, M3, M2). La capa que hace el reparto (el traductor) debe añadir números de secuencia para restaurar el orden."
    },
    {
      id: "q1-3",
      dificultad: "Baja",
      ref: "Tema 1 - Diap. 41",
      pregunta: "¿Por qué disminuye el rendimiento porcentual de la red cuando se envían mensajes de aplicación muy pequeños (como pulsaciones de teclado individuales)?",
      opciones: [
        "Porque cada capa añade una cabecera de control de tamaño prácticamente constante, disparando el overhead relativo.",
        "Porque los routers procesan más despacio los bits de paquetes cortos que los de paquetes largos.",
        "Porque la velocidad de propagación de la luz disminuye cuando la trama es pequeña.",
        "Porque las cabeceras solo se añaden a los paquetes pequeños y no a los grandes."
      ],
      correcta: 0,
      explicacion: "La información de control (cabeceras de capa 4, 3 y 2) tiene un tamaño fijo (p. ej. 20 B TCP + 20 B IP + 18 B Ethernet = 58 B). Si enviamos solo 1 byte de datos, el overhead supera el 98%."
    },
    {
      id: "q1-4",
      dificultad: "Media",
      ref: "Tema 1 - Diap. 81",
      pregunta: "¿Cuál es la filosofía de diseño de la arquitectura de Internet respecto al uso de servicios con conexión y sin conexión?",
      opciones: [
        "Hasta el nivel de red (IP e inferiores) se usan servicios sin conexión; en el nivel de transporte se ofrecen ambos (TCP con conexión y UDP sin conexión).",
        "Todas las capas desde la física hasta la de aplicación son orientadas a conexión para garantizar fiabilidad.",
        "El nivel de red (IP) es orientado a conexión mediante circuitos virtuales, y el transporte (TCP) es sin conexión.",
        "Solo el nivel de enlace (Ethernet) utiliza establecimiento de conexión previo."
      ],
      correcta: 0,
      explicacion: "Internet mantiene el núcleo de la red sencillo y sin estado (Ethernet e IP operan sin conexión, paquete a paquete), delegando la fiabilidad y el estado de la conexión a los extremos en la capa de transporte (TCP) cuando la aplicación lo requiere."
    },
    {
      id: "q1-5",
      dificultad: "Baja",
      ref: "Tema 1 - Diap. 32",
      pregunta: "¿Cuáles son las cuatro condiciones que definen a un 'servicio fiable' en comunicaciones?",
      opciones: [
        "Que los mensajes se reciban todos (sin pérdidas), sin errores, sin duplicados y en el mismo orden en que se entregaron.",
        "Que el canal tenga ancho de banda garantizado, retardo constante, cifrado simétrico y ruta única.",
        "Que utilice fibra óptica, conectores redundantes, código Morse y confirmación visual.",
        "Que ningún paquete supere la MTU ni requiera fragmentación en ruta."
      ],
      correcta: 0,
      explicacion: "Un servicio fiable en la capa n garantiza entrega íntegra (sin errores), completa (sin pérdidas), única (sin duplicados) y ordenada, apoyándose en confirmaciones (ACK), números de secuencia y retransmisiones aunque la capa n-1 sea no fiable."
    }
  ],
  2: [
    {
      id: "q2-1",
      dificultad: "Media",
      ref: "Tema 2 - Diap. 326-328",
      pregunta: "Según la regla aproximada de la Ley de Shannon (Eficiencia ≈ SR_dB / 3), si mejoramos la relación señal/ruido de un canal analógico en +6 dB, ¿cuántos bits adicionales por símbolo podemos añadir a la modulación?",
      opciones: [
        "2 bits más por símbolo (1 bit por cada 3 dB de mejora en la relación señal/ruido).",
        "6 bits más por símbolo.",
        "3 bits más por símbolo.",
        "Ninguno, porque la capacidad de Shannon solo depende del ancho de banda en Hz."
      ],
      correcta: 0,
      explicacion: "De C ≈ BW · (SR_dB / 3) se deduce que la eficiencia espectral máxima (bits/Hz) aumenta en 1 bit/símbolo por cada 3 dB de mejora en la SNR. Por tanto, +6 dB permiten añadir 2 bits/símbolo (p. ej., pasar de 64-QAM a 256-QAM)."
    },
    {
      id: "q2-2",
      dificultad: "Alta",
      ref: "Tema 2 - Diap. 327",
      pregunta: "Aplicando la Ley de Shannon a un canal telefónico clásico de BW = 3,3 kHz y relación señal/ruido de 36 dB, ¿cuál es su eficiencia espectral y su capacidad máxima aproximada?",
      opciones: [
        "Eficiencia ≈ 12 bits/Hz y Capacidad ≈ 39,4 kb/s.",
        "Eficiencia ≈ 36 bits/Hz y Capacidad ≈ 118,8 kb/s.",
        "Eficiencia ≈ 4 bits/Hz y Capacidad ≈ 13,2 kb/s.",
        "Eficiencia ≈ 15,3 bits/Hz y Capacidad ≈ 122,2 Mb/s."
      ],
      correcta: 0,
      explicacion: "Con SR = 36 dB (10^3,6 = 3981), la eficiencia es 36 / 3 = 12 bits/Hz y la capacidad máxima es 3,3 kHz × 12 bits/Hz = 39,4 kb/s."
    },
    {
      id: "q2-3",
      dificultad: "Media",
      ref: "Tema 2 - Diap. 250",
      pregunta: "En el cálculo de atenuación WiFi a 2,4 GHz, si a 25 metros la pérdida en espacio libre (FSPL) es de -68 dB y la señal atraviesa además un muro de ladrillo de -6 dB, ¿a qué distancia en espacio libre sin obstáculos equivale esa atenuación total de -74 dB?",
      opciones: [
        "A 50 metros (porque una caída de 6 dB equivale a duplicar la distancia en el espacio libre).",
        "A 31 metros (25 m + 6 m).",
        "A 100 metros (cuadruplicar la distancia).",
        "A 250 metros (multiplicar por 10 la distancia)."
      ],
      correcta: 0,
      explicacion: "En el espacio libre la potencia decae con el cuadrado de la distancia: al duplicar la distancia de 25 m a 50 m la señal cae 20·log10(2) = 6 dB, pasando de -68 dB a -74 dB. Por tanto, un muro de ladrillo de 6 dB reduce el alcance a la mitad."
    },
    {
      id: "q2-4",
      dificultad: "Media",
      ref: "Tema 2 - Diap. 270",
      pregunta: "En un puente inalámbrico exterior de larga distancia (ej. 10 km), ¿por qué no basta con que haya visión óptica en línea recta entre las dos antenas?",
      opciones: [
        "Porque debe estar despejada al menos la primera Zona de Fresnel (un elipsoide de hasta 35 m de anchura a 2,4 GHz) para evitar difracción e interferencia destructiva.",
        "Porque las ondas de radio se curvan hacia arriba al salir de la antena parabólica.",
        "Porque a 5 GHz la zona de Fresnel es más ancha que a 2,4 GHz.",
        "Porque el protocolo CSMA/CA exige una separación lateral de 50 m."
      ],
      correcta: 0,
      explicacion: "Cualquier obstáculo dentro de la primera Zona de Fresnel difracta y refleja las ondas de radio provocando desfases que cancelan la señal en la antena receptora. A menor frecuencia (mayor longitud de onda), más ancha es la zona de Fresnel (35 m a 2,4 GHz frente a 24 m a 5 GHz en 10 km)."
    },
    {
      id: "q2-5",
      dificultad: "Alta",
      ref: "Tema 2 - Diap. 337-341",
      pregunta: "En el análisis real del router ADSL con modulación DMT (4.000 símbolos/s por bin), ¿qué hace el módem cuando detecta una fuerte interferencia de una emisora AM en la frecuencia del bin 64 (0x40), y qué ocurre al subir el caudal contratado de 4 Mb/s a 8 Mb/s?",
      opciones: [
        "Pone 0 bits en ese bin específico sin afectar a los demás; al subir a 8 Mb/s usa modulaciones de hasta 12 bits/bin reduciendo el margen de ruido (Noise Margin) de 20,5 dB a 10,5 dB y aumentando los errores CRC.",
        "Desactiva toda la línea ADSL porque DMT requiere usar la misma modulación QAM en los 256 bins.",
        "Aumenta la potencia de transmisión a 50 dBm para superar a la emisora AM.",
        "Cambia los bins ascendentes por descendentes dinámicamente."
      ],
      correcta: 0,
      explicacion: "DMT evalúa la SNR de cada subportadora (bin de 4,3125 kHz) en el arranque: si un bin tiene ruido severo, le asigna 0 bits. Si se exige más caudal sobre el mismo par de cobre (cuya atenuación fija es de 30 dB), el módem apura más bits por símbolo a costa de reducir su margen de ruido de 20,5 dB a 10,5 dB."
    }
  ],
  3: [
    {
      id: "q3-1",
      dificultad: "Media",
      ref: "Tema 3 - Diap. 26-31",
      pregunta: "En el ejemplo del código CRC donde se quiere transmitir el número 302 usando un CRC de 1 dígito decimal y generador G = 3, ¿qué valor se transmite por la línea y por qué?",
      opciones: [
        "Se transmite 3021, porque entre 3020..3029 el 3021 es el primer número divisible exactamente por 3 (3021 / 3 = 1007, resto 0).",
        "Se transmite 3023, porque siempre se concatena el número generador al final de los datos.",
        "Se transmite 3020, porque 302 dividido entre 3 da resto 0.",
        "Se transmite 906, porque se multiplica el mensaje por el generador."
      ],
      correcta: 0,
      explicacion: "El emisor añade un dígito x formando 302x y busca que sea múltiplo del generador 3. Con x=0 (3020) el resto es 2; con x=1 (3021) la suma de cifras es 3+0+2+1=6, divisible por 3. El receptor divide 3021 entre 3, comprueba que el resto es 0 y extrae 302."
    },
    {
      id: "q3-2",
      dificultad: "Media",
      ref: "Tema 3 - Diap. 50-52",
      pregunta: "Al ejecutar 'tracert cern.ch' desde Valencia se observa que el RTT salta de 7 ms en Madrid a 29 ms en Milán (incremento de 22 ms). Sabiendo que la velocidad de la luz en fibra es de ~200.000 km/s, ¿cuál es la longitud aproximada del tendido de fibra óptica entre Madrid y Milán?",
      opciones: [
        "Unos 2.200 km (a razón de 100 km de distancia de enlace por cada 1 ms de RTT de ida y vuelta).",
        "Unos 4.400 km (22 ms × 200 km/ms).",
        "Unos 1.200 km, que es la distancia geográfica en línea recta.",
        "Unos 6.600 km, usando la velocidad de la luz en el vacío (300.000 km/s)."
      ],
      correcta: 0,
      explicacion: "En 1 ms la luz en fibra recorre 200 km en total (100 km de ida y 100 km de vuelta). Por tanto, 22 ms de RTT corresponden a 22 × 100 = 2.200 km de fibra real (bastante más que los 1.200 km en línea recta debido al trazado terrestre)."
    },
    {
      id: "q3-3",
      dificultad: "Alta",
      ref: "Tema 3 - Diap. 66-70",
      pregunta: "En un protocolo de enlace de Parada y Espera sobre una línea con ruido, ¿por qué se necesita numerar las tramas con al menos 1 bit (0 y 1) aunque nunca haya más de una trama en vuelo?",
      opciones: [
        "Porque si se pierde el ACK de una trama recibida correctamente, el emisor la retransmitirá por timeout y sin ese bit de secuencia el receptor entregaría la trama duplicada al nivel de red.",
        "Para poder ordenar hasta 8 tramas que adelanten a otras por caminos distintos.",
        "Porque el problema de los dos ejércitos se resuelve enviando un ACK del ACK sin numerar.",
        "Para indicar si la trama lleva datos (1) o es un ACK (0)."
      ],
      correcta: 0,
      explicacion: "Si la trama T0 llega bien a B pero se pierde el ACK de vuelta, A agota su timeout y vuelve a enviar T0. Al llevar el número 0 (cuando B ya espera la 1), B detecta que es un duplicado, la descarta y vuelve a enviar el ACK0."
    },
    {
      id: "q3-4",
      dificultad: "Alta",
      ref: "Tema 3 - Diap. 77",
      pregunta: "En un enlace de 1 Gb/s con tiempo de propagación τ = 0,556 μs y tramas de 512 bits (t_trans = 0,512 μs), ¿cuál es el tamaño mínimo entero de ventana deslizante (W) para alcanzar el 100% de ocupación (suponiendo ACK de tamaño despreciable)?",
      opciones: [
        "W = 4 tramas (ya que W = 2·τ·caudal / tamaño_trama + 1 = 3,18 → redondeando por exceso a 4).",
        "W = 1 trama (Parada y Espera ya da el 100%).",
        "W = 2 tramas.",
        "W = 8 tramas."
      ],
      correcta: 0,
      explicacion: "Aplicando W = (2 × 0,556 μs × 10^9 b/s) / 512 bits + 1 = 1112 / 512 + 1 = 2,17 + 1 = 3,17 tramas. Como el tamaño de ventana debe ser un número entero de tramas que supere 3,17 para no parar, la ventana mínima es de 4 tramas."
    },
    {
      id: "q3-5",
      dificultad: "Alta",
      ref: "Tema 3 - Diap. 78",
      pregunta: "Si el campo Número de Secuencia de un protocolo de ventana deslizante tiene 3 bits (valores 0 a 7), ¿cuál es el tamaño máximo de ventana permitido en Retroceso-N (Go-Back-N) y en Repetición Selectiva?",
      opciones: [
        "7 tramas en Retroceso-N (2^3 - 1) y 4 tramas en Repetición Selectiva (2^3 / 2).",
        "8 tramas en Retroceso-N y 8 tramas en Repetición Selectiva.",
        "4 tramas en Retroceso-N y 7 tramas en Repetición Selectiva.",
        "3 tramas en Retroceso-N y 1,5 en Repetición Selectiva."
      ],
      correcta: 0,
      explicacion: "Con 3 bits hay 8 números de secuencia (0..7). En Retroceso-N la ventana máxima es N_sec - 1 = 7 para evitar solapamiento si se pierden todos los ACKs. En Repetición Selectiva, como el receptor también mantiene una ventana de recepción de tamaño W para guardar tramas fuera de orden, debe cumplirse 2W ≤ 8 → W_máx = 4."
    }
  ],
  4: [
    {
      id: "q4-1",
      dificultad: "Baja",
      ref: "Tema 4 - Ethernet e IEEE 802.3",
      pregunta: "¿Por qué en Ethernet clásica (CSMA/CD) se estableció una longitud mínima de trama de 64 bytes (512 bits)?",
      opciones: [
        "Para garantizar que el emisor siga transmitiendo cuando le llegue la señal de una posible colisión producida en el extremo más lejano de la red (2·τ < t_trans).",
        "Porque la cabecera IP de 20 bytes más la cabecera TCP de 20 bytes ya suman 64 bytes.",
        "Para que los conmutadores tengan tiempo de consultar el servidor DNS.",
        "Porque las tarjetas de red no pueden contar menos de 512 bits."
      ],
      correcta: 0,
      explicacion: "En CSMA/CD el emisor solo detecta la colisión si esta llega a su interfaz mientras aún está transmitiendo la trama. Por eso el tiempo de transmisión de la trama mínima (51,2 μs a 10 Mb/s, correspondiente a 512 bits = 64 bytes) debe ser mayor que el RTT máximo de propagación del dominio de colisión."
    },
    {
      id: "q4-2",
      dificultad: "Media",
      ref: "Tema 4 - Ethernet e IEEE 802.3",
      pregunta: "En una dirección MAC Ethernet de 48 bits, ¿qué indica el bit menos significativo del primer byte transmitido (bit I/G)?",
      opciones: [
        "Si vale 0 es una dirección Unicast (individual) y si vale 1 es una dirección Multicast (de grupo; y si los 48 bits son 1 es Broadcast).",
        "Indica si la tarjeta de red funciona a 100 Mb/s (0) o a 1 Gb/s (1).",
        "Indica si la trama lleva etiqueta VLAN 802.1Q.",
        "Siempre vale 0 en todas las tramas Ethernet."
      ],
      correcta: 0,
      explicacion: "El bit I/G (Individual/Group) es el bit de menor peso del primer octeto de la MAC (por ejemplo, en 0x21 = 00100001_2 vale 1, indicando dirección multicast, propiedad usada en el truco CAM-ARP del Tema 8)."
    },
    {
      id: "q4-3",
      dificultad: "Baja",
      ref: "Tema 4 - Ethernet DIX vs IEEE 802.3",
      pregunta: "¿Cómo distingue una tarjeta de red si una trama recibida utiliza el formato Ethernet DIX (Ethernet II) o el formato IEEE 802.3 con LLC?",
      opciones: [
        "Mirando los 2 bytes siguientes a la MAC de origen: si su valor es ≤ 1500 (0x05DC) indica la Longitud (IEEE 802.3), y si es ≥ 1536 (0x0600) indica el Ethertype (Ethernet DIX, ej. 0x0800 IP, 0x0806 ARP).",
        "Por el preámbulo de la trama, que mide 16 bytes en DIX y 4 bytes en 802.3.",
        "Mirando el último byte del CRC.",
        "No pueden coexistir en el mismo cable Ethernet."
      ],
      correcta: 0,
      explicacion: "Como la carga útil máxima es de 1.500 bytes, cualquier valor hasta 1.500 expresa longitud de datos (802.3), mientras que los códigos de protocolo Ethertype empiezan por encima de 1536 (0x0600), permitiendo que ambos formatos convivan sin ambigüedad."
    },
    {
      id: "q4-4",
      dificultad: "Media",
      ref: "Tema 4 - Ethernet Full-Dúplex",
      pregunta: "En las redes Ethernet modernas conmutadas con enlaces punto a punto en modo Full-Dúplex, ¿qué ocurre con el algoritmo CSMA/CD y la limitación de distancia por colisiones?",
      opciones: [
        "Se desactiva CSMA/CD porque ya no pueden producirse colisiones (hay canales separados para transmitir y recibir), por lo que la longitud de los enlaces solo queda limitada por la atenuación/dispersión física del medio.",
        "Se mantiene activo CSMA/CD con ranuras de tiempo más grandes.",
        "Se sustituye CSMA/CD por el envío de mensajes RTS/CTS.",
        "El tamaño mínimo de trama sube a 1.500 bytes."
      ],
      correcta: 0,
      explicacion: "Al unir cada host con un puerto de un switch mediante pares de cobre o fibras independientes para Tx y Rx en modo full-dúplex, desaparece el medio compartido y las colisiones son físicamente imposibles."
    }
  ],
  5: [
    {
      id: "q5-1",
      dificultad: "Media",
      ref: "Tema 5 - Diap. 51-52",
      pregunta: "En el protocolo Spanning Tree (IEEE 802.1D), si dos puentes conectados a una misma LAN tienen exactamente el mismo coste acumulado hacia el Puente Raíz (ej. coste 19), ¿cuál de los dos es elegido como Puerto Designado (D) de esa LAN?",
      opciones: [
        "El puerto perteneciente al puente que tenga el menor identificador (Bridge ID más bajo).",
        "El puente que tenga el mayor identificador (Bridge ID más alto).",
        "Se dejan ambos puertos activos para repartir la carga de la LAN al 50%.",
        "Se bloquean ambos puertos y la LAN queda aislada."
      ],
      correcta: 0,
      explicacion: "En STP siempre gana el menor valor numérico: primero menor Coste acumulado a la raíz; en caso de empate, menor Bridge ID del puente; y si ambos puertos son del mismo puente, menor Port ID."
    },
    {
      id: "q5-2",
      dificultad: "Alta",
      ref: "Tema 5 - Diap. 60-62",
      pregunta: "En el ejercicio de Spanning Tree con los puentes ID 23 (Raíz), ID 37, ID 41 e ID 29 (Diap. 60-61), cuando subimos la velocidad de LAN X de 10 Mb/s (coste 100) a 100 Mb/s (coste 19) pero dejamos LAN Z a 10 Mb/s (coste 100), ¿por qué NO cambia el árbol de expansión en el puente ID 29?",
      opciones: [
        "Porque desde ID 29 ambas rutas hacia la raíz empatan con coste 119 (100+19 por ID 37 y 19+100 por ID 41), y el desempate lo gana el vecino con menor ID (37 < 41).",
        "Porque Spanning Tree nunca recalcula el árbol una vez elegido el puente raíz.",
        "Porque una LAN de 100 Mb/s tiene mayor coste que una de 10 Mb/s.",
        "Porque el puente raíz pasa a ser el ID 41."
      ],
      correcta: 0,
      explicacion: "El coste en ID 29 por LAN Y es 100 (de ID 37) + 19 = 119. Por LAN Z, aunque ID 41 bajó su coste a 19, el propio puerto de ID 29 en LAN Z sigue a 10 Mb/s (coste 100), sumando 19 + 100 = 119. Ante el empate a 119, ID 29 prefiere al vecino ID 37 antes que a ID 41 (37 < 41)."
    },
    {
      id: "q5-3",
      dificultad: "Media",
      ref: "Tema 5 - Diap. 63",
      pregunta: "Si una red conmutada tiene m = 4 conmutadores, n = 8 puertos conectados en total y p = 1 bucle elemental, ¿cuántos Puertos Raíz (R), Puertos Bloqueados (B) y Puertos Designados (D) habrá tras converger Spanning Tree?",
      opciones: [
        "3 Puertos Raíz (m - 1), 1 Puerto Bloqueado (p) y 4 Puertos Designados (n - (m - 1) - p).",
        "4 Puertos Raíz, 2 Puertos Bloqueados y 2 Puertos Designados.",
        "1 Puerto Raíz, 3 Puertos Bloqueados y 4 Puertos Designados.",
        "4 Puertos Raíz, 1 Puerto Bloqueado y 3 Puertos Designados."
      ],
      correcta: 0,
      explicacion: "De los m = 4 conmutadores, 1 es el Puente Raíz (no tiene puerto raíz) y los otros m - 1 = 3 tienen exactamente 1 Puerto Raíz cada uno. Para romper p = 1 bucle se bloquea exactamente p = 1 puerto. Los restantes 8 - 3 - 1 = 4 son Puertos Designados."
    },
    {
      id: "q5-4",
      dificultad: "Baja",
      ref: "Tema 5 - Diap. 28",
      pregunta: "Al unir el router de la Universidad de Valencia con RedIRIS mediante 2 enlaces Gigabit Ethernet en paralelo usando agregación de enlaces (Link Aggregation), ¿cómo los trata Spanning Tree?",
      opciones: [
        "Como una única interfaz lógica de mayor capacidad, sin bloquear ninguno de los dos cables físicos.",
        "Bloquea uno de los dos enlaces dejando solo 1 Gb/s útil.",
        "Envía los bits pares de cada trama por el cable 1 y los bits impares por el cable 2.",
        "Duplica todas las tramas enviando dos copias idénticas por ambos cables."
      ],
      correcta: 0,
      explicacion: "La agregación de enlaces (802.3ad / LACP) agrupa varios enlaces físicos en un único canal lógico para el nivel 2, logrando sumar sus anchos de banda y ofreciendo tolerancia a fallos sin que STP lo considere un bucle."
    }
  ],
  6: [
    {
      id: "q6-1",
      dificultad: "Media",
      ref: "Tema 6 - Diap. 24",
      pregunta: "¿Cómo descubre puntos de acceso el programa NetStumbler mediante 'escaneo activo genérico' y qué APs no responden a este método?",
      opciones: [
        "Envía tramas Probe Request con el SSID vacío (null/broadcast) en cada canal; no descubre los APs configurados para ocultar su SSID porque estos ignoran los Probe Request con SSID null.",
        "Escucha pasivamente las tramas Beacon durante 10 segundos por canal.",
        "Envía paquetes ping a la dirección 255.255.255.255.",
        "Envía tramas RTS en todos los canales esperando recibir CTS."
      ],
      correcta: 0,
      explicacion: "En el escaneo activo genérico el cliente transmite un Probe Request con SSID en blanco. Los APs normales responden con un Probe Response anunciando su SSID, salvo los que tienen activada la ocultación de SSID."
    },
    {
      id: "q6-2",
      dificultad: "Media",
      ref: "Tema 6 - Diap. 70-72",
      pregunta: "En el problema de la estación oculta (donde A y C ven al punto de acceso B, pero A y C no se escuchan entre sí), ¿cómo evita la colisión el mecanismo RTS/CTS?",
      opciones: [
        "A envía un RTS a B indicando la duración de la transmisión; aunque C no oye el RTS de A, sí oye el CTS de respuesta emitido por B, por lo que C carga su temporizador NAV y guarda silencio.",
        "A aumenta su potencia de transmisión al triple cuando envía datos para que C la escuche.",
        "El punto de acceso B desconecta a C mientras A está asociada.",
        "C escucha el ACK final de B antes de que A empiece a transmitir."
      ],
      correcta: 0,
      explicacion: "Tanto el RTS como el CTS incluyen el campo Duration (tiempo que durará el envío de la trama más su ACK). Al emitir B el CTS, todas las estaciones al alcance de B (incluida C, que estaba oculta para A) leen esa duración y activan su NAV (Virtual Carrier Sense)."
    },
    {
      id: "q6-3",
      dificultad: "Alta",
      ref: "Tema 6 - Diap. 76",
      pregunta: "En una celda WiFi con un AP y 6 estaciones (A, B, C, D, E, F) donde todas se escuchan entre sí excepto A y F (que no se oyen mutuamente), ¿dónde se debe activar el envío de RTS/CTS por configuración?",
      opciones: [
        "Únicamente en las estaciones A y F (y en ningún caso hace falta activarlo en el AP, ya que el AP siempre responde con CTS a cualquier RTS que recibe).",
        "Solo en el Punto de Acceso (AP) y en ninguna estación cliente.",
        "En las estaciones B, C, D y E porque están en el centro.",
        "Si desaparece F y solo queda A, hay que seguir manteniendo RTS/CTS activo en A."
      ],
      correcta: 0,
      explicacion: "Solo las transmisiones iniciadas por A o por F corren peligro de no ser oídas por la otra estación extrema. Las estaciones B..E y el propio AP son escuchados físicamente por todos los nodos de la celda, por lo que activar RTS/CTS en ellos solo añadiría overhead innecesario."
    },
    {
      id: "q6-4",
      dificultad: "Baja",
      ref: "Tema 6 - Diap. 73-75",
      pregunta: "¿Por qué muchas tarjetas WiFi permiten configurar un umbral de tamaño de trama (RTS Threshold) para usar RTS/CTS solo en tramas grandes?",
      opciones: [
        "Porque los mensajes RTS/CTS añaden latencia y sobrecoste fijo; en tramas pequeñas es más rentable arriesgarse a retransmitirlas que pagar el peaje de RTS/CTS en cada envío.",
        "Porque las tramas de más de 500 bytes no llevan CRC en 802.11.",
        "Porque el estándar prohíbe enviar RTS para tramas de más de 1.500 bytes.",
        "Porque las tramas pequeñas viajan a mayor velocidad de la luz."
      ],
      correcta: 0,
      explicacion: "Si colisiona una trama muy corta se pierde muy poco tiempo de canal, mientras que si colisiona una trama grande de 1.500-2.312 bytes se desperdicia mucho tiempo. Ajustar el umbral de RTS permite usar RTS/CTS solo cuando el beneficio supera a su overhead."
    }
  ],
  7: [
    {
      id: "q7-1",
      dificultad: "Media",
      ref: "Tema 7 - Diap. 18-19",
      pregunta: "Según la fórmula del Tiempo de Servicio Ts = p / (v - c), ¿cuál es el Ts de un paquete de 500 bytes (4.000 bits) en una línea de 64 kb/s que se encuentra al 50% de ocupación (c = 32 kb/s)?",
      opciones: [
        "125 ms (exactamente el mismo Ts que tendría en una línea de 32 kb/s sin tráfico).",
        "62,5 ms (igual al tiempo de transmisión sin cola).",
        "250 ms.",
        "15,6 ms."
      ],
      correcta: 0,
      explicacion: "Sustituyendo p = 4.000 bits, v = 64.000 b/s y c = 32.000 b/s: Ts = 4.000 / (64.000 - 32.000) = 4.000 / 32.000 = 0,125 s = 125 ms (62,5 ms de espera en cola + 62,5 ms de transmisión)."
    },
    {
      id: "q7-2",
      dificultad: "Alta",
      ref: "Tema 7 - Diap. 25-26",
      pregunta: "En el ejercicio del enlace Valencia-Milán de v = 512 kb/s con tiempo de propagación τ = 20 ms y paquetes de 500 bytes (4.000 bits), si la telefonía IP exige un retardo total (Ts + τ) ≤ 150 ms y cada llamada ocupa 80 kb/s, ¿cuál es el caudal máximo y cuántas llamadas caben?",
      opciones: [
        "Caudal máximo c = 481 kb/s (94% de ocupación), lo que permite hasta 6 conversaciones simultáneas (480 kb/s).",
        "Caudal máximo c = 512 kb/s (100% de ocupación), permitiendo 6 conversaciones y sobrando 32 kb/s.",
        "Caudal máximo c = 400 kb/s (78% de ocupación), permitiendo 5 conversaciones.",
        "Caudal máximo c = 256 kb/s (50% de ocupación), permitiendo 3 conversaciones."
      ],
      correcta: 0,
      explicacion: "Como τ = 20 ms y el total no puede pasar de 150 ms, el tiempo de servicio máximo es Ts = 130 ms = 0,13 s. Despejando c = v - p/Ts = 512.000 - (4.000 / 0,13) = 512.000 - 30.769 = 481.230 b/s ≈ 481 kb/s (94%). Dividiendo 481 / 80 = 6,01 → caben 6 llamadas (480 kb/s)."
    },
    {
      id: "q7-3",
      dificultad: "Alta",
      ref: "Tema 7 - Diap. 38-42",
      pregunta: "En el ejercicio de routing estático basado en el flujo (triángulo A, B, C), la ruta indirecta A-C-B daba un Ts medio simple menor (44,4 ms frente a 45,1 ms), pero al calcular el Ts medio ponderado resultó mejor la ruta directa A-B (34,5 ms frente a 37,4 ms). ¿Por qué?",
      opciones: [
        "Porque el flujo A-B es muy pequeño (10 kb/s) y desviarlo por C recarga el enlace B-C que ya va muy lleno (400 de 512 kb/s), perjudicando al 78% del tráfico total de la empresa.",
        "Porque la ruta directa A-B tiene más ancho de banda que el enlace B-C.",
        "Porque en los enlaces rápidos el tiempo de propagación es infinito.",
        "Porque los paquetes se duplican al pasar por el nodo C."
      ],
      correcta: 0,
      explicacion: "La media aritmética simple trata igual a los tres enlaces sin importar cuántos paquetes pasan por cada uno. Al ponderar por la matriz de tráfico normalizada, se ve que empeorar en +3,5 ms los 400 kb/s de B-C daña mucho más al promedio global que lo que se ahorra en los escasos 10 kb/s de A-B."
    },
    {
      id: "q7-4",
      dificultad: "Media",
      ref: "Tema 7 - Diap. 46",
      pregunta: "En el ejemplo del algoritmo Vector Distancia en el router ID: 4 (donde llegar al vecino n cuesta +7 y llegar al vecino m cuesta +2), si para el destino 3 el vecino n anuncia distancia 0 y el vecino m anuncia distancia 3, ¿qué ruta elige el router 4 hacia el destino 3?",
      opciones: [
        "Elige salir por la interfaz m (o k) con distancia total 3 + 2 = 5, aunque el nodo 3 sea vecino directo por la interfaz n (cuyo coste directo es 0 + 7 = 7).",
        "Elige salir siempre por la interfaz n porque conecta directamente con el router 3 sin saltos intermedios.",
        "Suma ambos caminos y anota distancia 12.",
        "Descarta el paquete por bucle de enrutamiento."
      ],
      correcta: 0,
      explicacion: "El algoritmo de Bellman-Ford minimiza la suma (coste al vecino + distancia anunciada por ese vecino). Por m cuesta 2 + 3 = 5, que es menor que el enlace directo lento por n (7 + 0 = 7)."
    },
    {
      id: "q7-5",
      dificultad: "Media",
      ref: "Tema 7 - Diap. 48-55",
      pregunta: "¿Por qué los protocolos de Estado del Enlace (como OSPF con el algoritmo de Dijkstra) no sufren el problema de la 'cuenta a infinito' de los protocolos de Vector Distancia (como RIP)?",
      opciones: [
        "Porque en Estado del Enlace cada router dispone del mapa topológico completo de la red (los LSP de todos los nodos) y calcula localmente el árbol completo de caminos más cortos sin depender de rumores a ciegas de sus vecinos.",
        "Porque OSPF limita el diámetro de la red a 15 saltos como máximo.",
        "Porque el algoritmo de Dijkstra nunca cambia las rutas cuando cae un enlace.",
        "Porque OSPF solo funciona en redes sin bucles físicos."
      ],
      correcta: 0,
      explicacion: "La cuenta a infinito ocurre en Vector Distancia porque un router no sabe qué camino sigue su vecino para llegar al destino (y le compra una ruta que en realidad pasaba por él mismo). Con Dijkstra cada router conoce el grafo completo de enlaces y reconstruye el árbol desde la raíz."
    }
  ],
  8: [
    {
      id: "q8-1",
      dificultad: "Media",
      ref: "Tema 8 - Diap. 77",
      pregunta: "En el ejemplo de Broadcast Dirigido (Diap. 77), la LAN del host B tiene asignado el bloque 20.0.2.0/23 y el host B tiene la IP 20.0.2.255/23. Si desde Internet alguien ejecuta 'ping 20.0.2.255' y el router Y tiene desactivado el broadcast dirigido, ¿qué ocurre?",
      opciones: [
        "Se recibe 1 respuesta del host B, porque con máscara /23 el rango va de 20.0.2.0 a 20.0.3.255 y por tanto 20.0.2.255 NO es una dirección de broadcast, sino una IP unicast de host perfectamente válida.",
        "El router Y descarta el paquete por ser un broadcast dirigido.",
        "Responden todos los ordenadores de la red 20.0.2.0/23.",
        "Responde únicamente el router Y."
      ],
      correcta: 0,
      explicacion: "Con máscara /23 (255.255.254.0) los últimos 9 bits son de host. En 20.0.2.255 el bit de menor peso del tercer octeto vale 0 y los 8 del cuarto octeto valen 1 (0.11111111_2), luego no todos los bits de host son 1 (el broadcast es 20.0.3.255). Es una dirección unicast normal."
    },
    {
      id: "q8-2",
      dificultad: "Alta",
      ref: "Tema 8 - Diap. 84",
      pregunta: "En el Ejercicio 3 de detección de errores en un router (Diap. 84), ¿por qué son erróneas la IP de interfaz '194.125.1.63/26' y la entrada de ruta 'A 160.87.34.0/21 por 195.100.1.1'?",
      opciones: [
        "Porque 194.125.1.63/26 es la dirección de broadcast de la subred 194.125.1.0/26 (sus 6 bits de host están a 1), y en 160.87.34.0/21 la parte de host no es cero (34 = 00100010_2; la red /21 debería ser 160.87.32.0/21).",
        "Porque las máscaras /26 y /21 no existen en el estándar CIDR.",
        "Porque 194.125.1.63 es una dirección privada y 160.87.34.0 es de clase D multicast.",
        "Porque el siguiente salto 195.100.1.1 tiene que terminar siempre en .254."
      ],
      correcta: 0,
      explicacion: "En /26 los bloques son de 64 direcciones (0..63), por lo que .63 es el broadcast y no puede asignarse a una interfaz. En /21 los bloques en el tercer octeto avanzan de 8 en 8 (0, 8, 16, 24, 32, 40...); como 34 no es múltiplo de 8, tiene un bit de host a 1 y es inválida como dirección de red."
    },
    {
      id: "q8-3",
      dificultad: "Alta",
      ref: "Tema 8 - Diap. 130-132",
      pregunta: "En el ejercicio 'Alimento para la mente' (Interacción CAM-ARP con truco), dos servidores C y D comparten la IP 20.0.0.1 y responden a los ARP poniendo su MAC física real en la cabecera Ethernet pero una MAC diferente (21:20:20:20:20:00) dentro del paquete ARP. ¿Qué efecto produce esto?",
      opciones: [
        "El cliente envía sus tramas a 21:20:20:20:20:00; como esa MAC nunca aparece como MAC de origen Ethernet, no está en la tabla CAM del switch (y además es multicast), por lo que el switch inunda las tramas entregándolas simultáneamente a ambos servidores C y D (útil para clústeres de balanceo de carga).",
        "El switch bloquea los puertos 3 y 4 por violación de seguridad ARP.",
        "El cliente A borra su caché ARP cada 2 segundos.",
        "Solo el servidor D recibe los paquetes porque el puerto 4 es mayor que el 3."
      ],
      correcta: 0,
      explicacion: "El switch aprende en su tabla CAM leyendo la MAC origen de la trama Ethernet (0C en puerto 3 y 0D en puerto 4), mientras que el host A llena su caché ARP leyendo el payload ARP (21:20...00). Al no estar 21:20...00 asociada a un puerto único en la CAM, el switch hace flooding y ambos servidores del clúster reciben el tráfico."
    },
    {
      id: "q8-4",
      dificultad: "Media",
      ref: "Tema 8 - Diap. 134-138",
      pregunta: "En alta disponibilidad de routers (VRRP / HSRP), ¿por qué el router activo y el de respaldo comparten una dirección MAC Virtual (MACv) además de la IP virtual del gateway?",
      opciones: [
        "Para que cuando caiga el router activo y el de standby tome el relevo, ningún host de la LAN tenga que actualizar su caché ARP (que tardaría hasta 15 min en caducar); solo se actualiza al instante la tabla CAM del switch.",
        "Porque una tarjeta Ethernet no puede cambiar su dirección IP sin cambiar antes su dirección MAC.",
        "Para duplicar el ancho de banda hacia Internet cuando ambos routers están encendidos.",
        "Para evitar que los switches ejecuten Spanning Tree."
      ],
      correcta: 0,
      explicacion: "Con VRRP todos los hosts apuntan en su caché ARP a la MAC virtual (MACv). Cuando el router B toma el relevo de A, emite una trama con origen MACv y el switch actualiza el puerto de salida en su tabla CAM en milisegundos, de forma totalmente transparente para los hosts."
    },
    {
      id: "q8-5",
      dificultad: "Alta",
      ref: "Tema 8 - Diap. 152-155",
      pregunta: "En el Problema 3.4 (donde LAN X y LAN Y están unidas a la vez por un router arriba y un puente transparente abajo, pero A tiene máscara /24 [202.1.1.2/24] y B tiene máscara /25 [202.1.1.130/25]), ¿qué camino siguen el Ping de ida (A→B) y el Pong de vuelta (B→A)?",
      opciones: [
        "A la ida A cree que B está en su misma red (/24) y le envía el Ping directamente a través del puente; a la vuelta B ve que A está fuera de su subred (/25) y envía el Pong a través del router.",
        "Tanto la ida como la vuelta van directamente por el puente sin tocar el router.",
        "Tanto la ida como la vuelta van a través del router sin cruzar el puente.",
        "El Ping no recibe respuesta porque las máscaras de A y B son distintas."
      ],
      correcta: 0,
      explicacion: "Cada host decide si el destino es local aplicando su propia máscara: para A (/24, rango .1 a .254), .130 es local y le hace ARP directo cruzando el puente. Para B (/25, rango .129 a .254), .2 es remoto y se lo entrega a su router por defecto (202.1.1.129)."
    }
  ],
  9: [
    {
      id: "q9-1",
      dificultad: "Media",
      ref: "Tema 9 - Diap. 42-44",
      pregunta: "Para impedir que desde dentro de la red de una universidad (ej. 147.156.0.0/16) un atacante envíe paquetes hacia Internet suplantando la IP de otra organización (IP Spoofing), ¿qué filtro anti-spoofing (RFC 2267) debe aplicarse en el router de borde?",
      opciones: [
        "No aceptar hacia Internet paquetes salientes cuya IP de origen NO pertenezca al rango 147.156.0.0/16, y no aceptar desde Internet paquetes entrantes cuya IP de origen SÍ pertenezca a 147.156.0.0/16.",
        "Bloquear todos los paquetes ICMP Echo Request y Echo Reply en ambos sentidos.",
        "Desactivar el protocolo ARP en el router de borde.",
        "Obligar a que todos los paquetes tengan el bit DF = 1."
      ],
      correcta: 0,
      explicacion: "El filtrado ingress (RFC 2267 / BCP 38) verifica que la IP de origen sea coherente con la interfaz por la que entra el paquete: desde dentro solo pueden salir paquetes con origen propio, y desde fuera nunca pueden entrar paquetes que finjan tener origen interno."
    },
    {
      id: "q9-2",
      dificultad: "Alta",
      ref: "Tema 9 - Diap. 63-64",
      pregunta: "En OSPF, el costo de una ruta se calcula sumando los costos de las interfaces de SALIDA. En el ejemplo de la Diap. 63, ¿por qué el router X prefiere ir hacia LAN B pasando por dos enlaces de 256 kb/s (vía Z) en lugar de usar el enlace directo X-Y de 128 kb/s?",
      opciones: [
        "Porque en OSPF el costo de 128 kb/s es ⌊10^8 / 128.000⌋ = 781 (total 781+1 = 782), mientras que cada enlace de 256 kb/s tiene costo ⌊10^8 / 256.000⌋ = 390 y dos saltos suman 390+390+1 = 781 < 782.",
        "Porque OSPF siempre prefiere las rutas con mayor número de routers intermedios.",
        "Porque OSPF reparte los paquetes al 50% cuando los costos son 781 y 782.",
        "Porque el enlace directo de 128 kb/s está bloqueado por Spanning Tree."
      ],
      correcta: 0,
      explicacion: "Debido al redondeo por truncamiento entero de 10^8 / BW, el enlace de 256 kb/s vale 390 (en vez de 390,625) y dos saltos suman 780 (+1 de la LAN = 781), superando por 1 punto al enlace directo de 128 kb/s (781 + 1 = 782). OSPF solo balancea carga si los costos son exactamente idénticos."
    },
    {
      id: "q9-3",
      dificultad: "Alta",
      ref: "Tema 9 - Diap. 77 y 85",
      pregunta: "Un router aprende tres rutas hacia un destino: una por OSPF (distancia administrativa 110) hacia 20.0.0.0/16, otra por RIP (d.a. 120) hacia 20.0.0.0/24 y una ruta estática (d.a. 130) hacia 20.0.0.0/25. ¿Cuáles se instalan en la tabla de rutas y por cuál sale un paquete hacia 20.0.0.1?",
      opciones: [
        "Se instalan las tres en la tabla de rutas (por tener máscaras distintas /16, /24 y /25), y el paquete hacia 20.0.0.1 sale por la ruta estática /25 por ser la de máscara más larga.",
        "Solo se instala la de OSPF (/16) por tener la menor distancia administrativa (110).",
        "Se instalan las tres pero el paquete sale por OSPF (/16) porque 110 < 130.",
        "El router descarta la ruta estática porque su métrica es 0."
      ],
      correcta: 0,
      explicacion: "Rutas con distinta longitud de máscara se consideran destinos distintos y no compiten por distancia administrativa: se instalan las tres. A la hora de enrutar un paquete, manda siempre la coincidencia de máscara más larga (/25 > /24 > /16)."
    },
    {
      id: "q9-4",
      dificultad: "Alta",
      ref: "Tema 9 - Diap. 115-117",
      pregunta: "Un fragmento IP de 1.500 bytes (1.480 bytes de datos) llega a un router que debe encaminarlo por un enlace PPP con MTU = 296 bytes. ¿De qué tamaño total serán los primeros sub-fragmentos generados y cuánto avanzará el campo Fragment Offset en cada uno?",
      opciones: [
        "Longitud total de 292 bytes (20 B cabecera IP + 272 B datos, ya que 276 no es múltiplo de 8 y el mayor múltiplo de 8 ≤ 276 es 272), avanzando el Offset en 272 / 8 = 34 unidades.",
        "Longitud total de 296 bytes (20 B cabecera IP + 276 B datos), avanzando el Offset en 34,5.",
        "Longitud total de 280 bytes (260 B datos), avanzando el Offset en 30.",
        "El router PPP reensambla primero los 3 fragmentos Ethernet y luego los divide."
      ],
      correcta: 0,
      explicacion: "Con MTU = 296 B, quitando los 20 B de cabecera IP cabrían 276 B de datos, pero la carga de datos de todo fragmento (salvo el último) debe ser obligatoriamente múltiplo de 8 bytes. El mayor múltiplo de 8 ≤ 276 es 272 B (34 × 8), dando fragmentos de 272 + 20 = 292 B."
    },
    {
      id: "q9-5",
      dificultad: "Alta",
      ref: "Tema 9 - Diap. 125",
      pregunta: "¿Por qué cuando hay fragmentación IPv4 y se usa un TTL de 64 segundos un host no debe enviar más de 1.024 paquetes por segundo (pps) hacia un mismo destino y protocolo?",
      opciones: [
        "Porque el campo Identificación de IPv4 tiene solo 16 bits (65.535 valores) y no puede repetirse el mismo identificador mientras un fragmento antiguo pueda seguir vivo (65.535 / 64 = 1.024 pps).",
        "Porque la memoria RAM de los routers solo admite 1.024 fragmentos por segundo.",
        "Porque el campo Fragment Offset tiene 10 bits (2^10 = 1.024).",
        "Porque el protocolo ICMP bloquea el tráfico al superar 1.000 pps."
      ],
      correcta: 0,
      explicacion: "Para evitar que fragmentos rezagados de un datagrama antiguo se mezclen en el reensamblado con fragmentos de un datagrama nuevo, los 65.535 valores del campo Identificación (16 bits) no pueden reutilizarse antes de TTL segundos: Caudal máx = 65.535 / TTL."
    }
  ],
  10: [
    {
      id: "q10-1",
      dificultad: "Media",
      ref: "Tema 10 - Diap. 32 y 58",
      pregunta: "¿Por qué el tamaño máximo teórico de un segmento TCP es de 65.515 bytes y por qué el número de secuencia de 32 bits limita el caudal a 286 Mb/s cuando el TTL es de 120 s (sin usar PAWS)?",
      opciones: [
        "65.515 B proviene de restar los 20 B de cabecera IP mínima a los 65.535 B máximos del datagrama IPv4 (16 bits); y 286 Mb/s resulta de dividir los 2^32 bytes (×8 bits) del contador de secuencia entre los 120 s de vida máxima de un segmento.",
        "Porque el campo longitud de TCP tiene 16 bits y su cabecera mide 20 bytes.",
        "Porque Ethernet no permite tramas mayores de 65.515 bits.",
        "Porque la ventana de congestión inicial es siempre de 286 Mb/s."
      ],
      correcta: 0,
      explicacion: "El datagrama IPv4 mide como máximo 2^16 - 1 = 65.535 B; quitando 20 B de cabecera IP quedan 65.515 B para el segmento TCP. A su vez, 2^32 bytes = 4,295 GB = 34,36 Gbits; dividido entre 120 s da 286,3 Mb/s antes de que el número de secuencia dé la vuelta."
    },
    {
      id: "q10-2",
      dificultad: "Media",
      ref: "Tema 10 - Diap. 63-64",
      pregunta: "En un router con filtro de paquetes sin estado (stateless firewall), ¿qué condición exacta permite bloquear el inicio de conexiones TCP entrantes desde Internet permitiendo a la vez las conexiones TCP iniciadas desde dentro?",
      opciones: [
        "Descartar los paquetes entrantes desde Internet que tengan Protocolo IP = 6 (TCP) y los flags SYN = 1 y ACK = 0.",
        "Descartar todos los paquetes entrantes que tengan el flag SYN = 1 (tanto con ACK = 0 como con ACK = 1).",
        "Bloquear todos los puertos superiores al 1024 en la interfaz externa.",
        "Descartar los paquetes que tengan el flag FIN = 1."
      ],
      correcta: 0,
      explicacion: "El primer segmento de solicitud de conexión es el único de toda la sesión TCP que lleva la combinación SYN = 1 y ACK = 0. La respuesta del servidor externo a una conexión iniciada desde dentro vuelve con SYN = 1 y ACK = 1, por lo que pasa el filtro."
    },
    {
      id: "q10-3",
      dificultad: "Alta",
      ref: "Tema 10 - Diap. 96-97",
      pregunta: "Un host en Ethernet (MTU 1.500 B) envía un segmento TCP con MSS = 1.460 B (sin Path MTU Discovery) y en la ruta atraviesa un enlace con MTU = 760 bytes. ¿Cuántos fragmentos y de qué tamaño total llegan al host de destino?",
      opciones: [
        "Llegan 3 fragmentos de 756 bytes, 756 bytes y 28 bytes (porque 760 - 20 = 740 no es múltiplo de 8; el múltiplo de 8 es 736 B de datos + 20 B IP = 756 B, y sobran 8 B de datos + 20 B IP = 28 B).",
        "Llegan 2 fragmentos de 760 bytes y 760 bytes.",
        "Llegan 2 fragmentos de 750 bytes y 750 bytes.",
        "Llegan 3 fragmentos de 760 bytes, 760 bytes y 20 bytes."
      ],
      correcta: 0,
      explicacion: "El datagrama original lleva 1.480 B de carga IP (20 B cab. TCP + 1.460 B datos). En MTU 760 caben como máximo 740 B de carga IP, pero al exigir múltiplo de 8 bytes se envían 92 × 8 = 736 B de carga (+20 B cab. IP = 756 B) en los dos primeros fragmentos (sumando 1.472 B de carga) y los últimos 8 B (+20 B cab. IP = 28 B) en el tercero."
    },
    {
      id: "q10-4",
      dificultad: "Media",
      ref: "Tema 10 - Diap. 102-110",
      pregunta: "En una sesión interactiva Telnet con eco remoto y Timer de ACK Retrasado de 200 ms, ¿cuántos segmentos TCP se intercambian por cada tecla pulsada en el caso más habitual (usuario lento que tarda >200 ms entre teclas y servidor rápido que responde en <200 ms)?",
      opciones: [
        "3 segmentos: (1) tecla del cliente al servidor, (2) eco del carácter + ACK piggybacked del servidor al cliente, y (3) ACK vacío del cliente al servidor al agotarse los 200 ms sin que el usuario pulse otra tecla.",
        "2 segmentos en todos los casos.",
        "4 segmentos en todos los casos.",
        "1 solo segmento por tecla."
      ],
      correcta: 0,
      explicacion: "Como el servidor responde en menos de 200 ms, envía juntos el eco y el ACK en un solo paquete. Pero cuando el cliente recibe ese eco, como el usuario humano tarda más de 200 ms en pulsar la siguiente letra, vence el timer de ACK retrasado del cliente y envía un tercer segmento con el ACK vacío."
    },
    {
      id: "q10-5",
      dificultad: "Alta",
      ref: "Tema 10 - Diap. 153-160",
      pregunta: "En el algoritmo de Van Jacobson para el cálculo del timeout de retransmisión TCP (RTO = SRTT + 4·RTTVAR), si en el instante n-1 teníamos SRTT = 230 ms y RTTVAR = 115 ms, y medimos un nuevo RTT = 294 ms (con α = 7/8 y β = 3/4), ¿cuáles son los nuevos SRTT, RTTVAR y RTO?",
      opciones: [
        "SRTT = 238,00 ms, RTTVAR = 102,25 ms y RTO = 647,00 ms.",
        "SRTT = 294,00 ms, RTTVAR = 64,00 ms y RTO = 550,00 ms.",
        "SRTT = 262,00 ms, RTTVAR = 115,00 ms y RTO = 722,00 ms.",
        "SRTT = 230,00 ms, RTTVAR = 100,00 ms y RTO = 630,00 ms."
      ],
      correcta: 0,
      explicacion: "SRTT_2 = (7/8)·230 + (1/8)·294 = 201,25 + 36,75 = 238 ms. La desviación absoluta es |230 - 294| = 64 ms, luego RTTVAR_2 = (3/4)·115 + (1/4)·64 = 86,25 + 16 = 102,25 ms. Finalmente, RTO_2 = 238 + 4 × 102,25 = 647 ms."
    },
    {
      id: "q10-6",
      dificultad: "Alta",
      ref: "Tema 10 - Diap. 176-178 y 199-204",
      pregunta: "En una sesión TCP sobre una red LFN con ancho de banda BW = 100 Mb/s y RTT = 20 ms sin opción de Factor de Escala (Window Scale), ¿cuál es el caudal máximo alcanzable por una conexión y por qué?",
      opciones: [
        "26,2 Mb/s, porque la ventana máxima de 16 bits es de 65.535 bytes (524.280 bits) y solo se puede enviar una ventana cada 0,02 s (524.280 / 0,02 = 26,2 Mb/s).",
        "100 Mb/s, porque el RTT de 20 ms es pequeño.",
        "12,2 Mb/s, igual que en el caso del CERN.",
        "65,5 Mb/s."
      ],
      correcta: 0,
      explicacion: "El caudal máximo limitado por ventana es W_máx / RTT = (65.535 × 8 bits) / 0,02 s = 26.214.000 bits/s ≈ 26,2 Mb/s. Para aprovechar los 100 Mb/s haría falta negociar un Factor de Escala de al menos 2 (multiplicar la ventana por 4)."
    }
  ],
  11: [
    {
      id: "q11-1",
      dificultad: "Media",
      ref: "Tema 11 - Diap. 9-12",
      pregunta: "En un router con NAPT (PAT) dinámico que comparte una única IP pública (206.245.160.1), ¿qué ocurre si dos ordenadores internos (192.168.0.2 y 192.168.0.3) abren conexiones TCP hacia Internet eligiendo casualmente el mismo puerto efímero de origen (1108)?",
      opciones: [
        "El router NAPT asigna un puerto público de origen distinto a cada sesión en su lado externo (ej. 61001 y 61002) y guarda ambas tuplas en su tabla NAPT para distinguir las respuestas al regresar.",
        "La conexión del segundo ordenador es rechazada por colisión de puertos.",
        "El router cambia la dirección IP del segundo ordenador mediante DHCP.",
        "Las respuestas llegan a ambos ordenadores en broadcast."
      ],
      correcta: 0,
      explicacion: "NAPT traduce simultáneamente la dirección IP y el número de puerto de transporte (TCP/UDP), permitiendo multiplexar decenas de miles de conexiones internas sobre una única IP pública sin colisión."
    },
    {
      id: "q11-2",
      dificultad: "Media",
      ref: "Tema 11 - Diap. 13",
      pregunta: "Si una empresa solo dispone de UNA dirección IP pública (206.245.160.1) pero tiene DOS servidores web internos (192.168.0.4:80 y 192.168.0.5:80) que deben ser accesibles desde Internet, ¿cómo se configura en la tabla NAPT estática?",
      opciones: [
        "Se asocia el puerto público 80 al primer servidor (192.168.0.4:80) y otro puerto público distinto (ej. 8080) al puerto 80 del segundo servidor (192.168.0.5:80).",
        "Se asocia el puerto público 80 a ambos servidores simultáneamente en la tabla NAPT.",
        "Es imposible publicar dos servidores web con una sola IP pública.",
        "Se usa NAT básico dinámico sin traducción de puertos."
      ],
      correcta: 0,
      explicacion: "Mediante NAPT estático (Port Forwarding) el router redirige las peticiones entrantes a 206.245.160.1:80 hacia 192.168.0.4:80 y las dirigidas a 206.245.160.1:8080 hacia 192.168.0.5:80, traduciendo tanto la IP destino como el puerto destino."
    },
    {
      id: "q11-3",
      dificultad: "Media",
      ref: "Tema 11 - Diap. 11-19",
      pregunta: "Cuando un paquete TCP o UDP atraviesa un router NAPT, ¿qué sumas de comprobación (checksums) está obligado a recalcular el router antes de reenviar el paquete?",
      opciones: [
        "Tanto el Checksum de la cabecera IP como el Checksum de la cabecera TCP/UDP (porque el checksum TCP/UDP incluye una pseudo-cabecera con las direcciones IP y los puertos modificados).",
        "Únicamente el Checksum de la cabecera IPv4.",
        "Únicamente el CRC de 32 bits de la trama Ethernet.",
        "Ninguno, porque el checksum solo cubre los datos de aplicación."
      ],
      correcta: 0,
      explicacion: "Al modificar la IP de origen/destino cambia el checksum IPv4; y como TCP y UDP calculan su checksum incluyendo la pseudo-cabecera IP (IP origen, IP destino, protocolo y longitud) además de los puertos TCP/UDP, el router NAPT también debe recalcular el checksum de nivel 4."
    }
  ]
};

window.DATOS_FLASHCARDS = [
  { tema: 1, frente: "¿Qué es el Multiplexado vs. Multiplexado Inverso?", dorso: "Multiplexado: varias entidades de capa n comparten una entidad de capa n-1 ('juntos pero no revueltos'). Multiplexado inverso: una entidad de capa n reparte sus mensajes entre varias de capa n-1 en paralelo (exige numerar mensajes por si llegan desordenados)." },
  { tema: 2, frente: "Fórmula exacta y aproximada de la Ley de Shannon", dorso: "Exacta: C = BW · log2(1 + SR) [bits/s]. Aproximada: Eficiencia (bits/Hz) ≈ SR_dB / 3. Cada +3 dB de mejora en SNR permite añadir 1 bit/símbolo a la modulación." },
  { tema: 2, frente: "Regla de los 6 dB en propagación inalámbrica (FSPL)", dorso: "En espacio libre, duplicar la distancia entre antenas reduce la potencia recibida en 6 dB (cuarta parte de potencia). Un muro de ladrillo que atenúa 6 dB reduce el alcance máximo a la mitad." },
  { tema: 3, frente: "Relación entre RTT en fibra óptica y distancia física", dorso: "La luz en fibra viaja a ~200.000 km/s (200 km/ms). Por tanto, 1 ms de RTT (ida y vuelta) equivale a ~100 km de longitud real de cable de fibra óptica: Distancia (km) ≈ 100 × RTT (ms)." },
  { tema: 3, frente: "Tamaño mínimo de ventana deslizante (W) para 100% de eficiencia", dorso: "W = (2 · τ · Caudal / Tamaño_trama) + 1 = RTT / t_trans. Con k bits de secuencia: W_máx = 2^k - 1 en Retroceso-N y W_máx = 2^(k-1) en Repetición Selectiva." },
  { tema: 5, frente: "Orden de desempate en Spanning Tree (IEEE 802.1D)", dorso: "1º Menor coste acumulado hacia el Puente Raíz (10 Mb/s = 100, 100 Mb/s = 19, 1 Gb/s = 4). 2º Menor Bridge ID del puente vecino. 3º Menor Port ID." },
  { tema: 5, frente: "Fórmula de cómputo de puertos en Spanning Tree (m switches, n puertos, p bucles)", dorso: "Puentes raíz = 1; Puertos Raíz (R) = m - 1; Puertos Bloqueados (B) = p; Puertos Designados (D) = n - (m - 1) - p." },
  { tema: 6, frente: "¿Cuándo y dónde activar RTS/CTS en IEEE 802.11?", dorso: "Solo en las estaciones clientes alejadas que sufran el problema de la estación oculta (no se oigan entre sí). Nunca hace falta activarlo en el AP porque el AP siempre responde automáticamente con CTS a todo RTS." },
  { tema: 7, frente: "Fórmula del Tiempo de Servicio (Ts) en un enlace con cola M/M/1", dorso: "Ts = T_espera + T_trans = p / (v - c), donde p es el tamaño del paquete en bits, v la capacidad de la línea (b/s) y c el caudal real (b/s). Equivale a una línea vacía de velocidad (v - c)." },
  { tema: 7, frente: "¿Por qué usar Ts Medio Ponderado en lugar de Ts Medio Simple?", dorso: "Porque la media simple da igual importancia a un enlace con muy poco tráfico que a un enlace troncal saturado. El Ts medio ponderado multiplica cada Ts por la fracción del tráfico total que circula por esa ruta." },
  { tema: 8, frente: "Regla de oro del protocolo ARP cuando el destino es remoto", dorso: "Un host NUNCA pide por ARP la MAC de una IP que esté fuera de su propia subred. Si el destino es remoto, el host pide por ARP la MAC de su Router por Defecto (Default Gateway)." },
  { tema: 8, frente: "¿Para qué sirve poner distinta MAC en la cabecera Ethernet y en el paquete ARP?", dorso: "Para que la MAC anunciada en ARP no entre nunca en la tabla CAM del switch, forzando al switch a enviar los paquetes a todos los servidores de un clúster de alta disponibilidad / balanceo de carga." },
  { tema: 9, frente: "Jerarquía entre Métrica, Distancia Administrativa y Máscara Más Larga", dorso: "1) Dentro de un mismo protocolo y misma máscara: gana menor Métrica. 2) Entre distintos protocolos y misma máscara: gana menor Distancia Administrativa (OSPF 110 < RIP 120). 3) Al enrutar cada paquete en la tabla: gana SIEMPRE la Máscara Más Larga." },
  { tema: 9, frente: "Regla de los 8 bytes en Fragmentación IPv4", dorso: "Como el campo Fragment Offset tiene 13 bits y la Longitud Total tiene 16 bits, el desplazamiento se mide en bloques de 8 bytes. Todo fragmento (salvo el último) debe llevar un número de bytes de datos múltiplo exacto de 8." },
  { tema: 10, frente: "Algoritmo de Van Jacobson para el Timeout TCP (RTO)", dorso: "SRTT_n = (7/8)·SRTT_{n-1} + (1/8)·RTT_n; RTTVAR_n = (3/4)·RTTVAR_{n-1} + (1/4)·|SRTT_{n-1} - RTT_n|; RTO_n = SRTT_n + 4·RTTVAR_n. Usa potencias de 2 para calcularse con desplazamientos de bits." },
  { tema: 10, frente: "Caudal máximo de una conexión TCP limitado por ventana (Redes LFN)", dorso: "Caudal_máx = Ventana / RTT. Sin factor de escala, W_máx = 65.535 B = 524.280 bits. Con opción Window Scale (S ≤ 14), W_efectiva = W × 2^S (hasta 1 GB)." },
  { tema: 11, frente: "Diferencia entre NAT Básico y NAPT (PAT)", dorso: "NAT Básico traduce solo direcciones IP (1 a 1). NAPT traduce simultáneamente IP + Puerto TCP/UDP, permitiendo que cientos de hosts salgan con 1 sola IP pública o publicar varios servidores internos en distintos puertos." }
];

window.DATOS_FORMULARIO = [
  {
    categoria: "Capa Física y Medios (Tema 2)",
    items: [
      { nombre: "Ley de Shannon (Exacta)", formula: "C = BW · log₂(1 + S/R) = BW · log₁₀(1 + S/R) / 0,301", desc: "Capacidad máxima en bits/s de un canal con ancho de banda BW (Hz) y relación señal/ruido lineal S/R." },
      { nombre: "Ley de Shannon (Aproximada)", formula: "Eficiencia (bits/Hz) ≈ SR_dB / 3   →   C ≈ BW · (SR_dB / 3)", desc: "Por cada +3 dB de mejora en la relación señal/ruido se puede añadir 1 bit/símbolo." },
      { nombre: "Conversión dB / dBm", formula: "SR_dB = 10 · log₁₀(S/R)   |   P(dBm) = 10 · log₁₀(P_mW)", desc: "0 dBm = 1 mW; +20 dBm = 100 mW; +3 dB = ×2 potencia; -6 dB = ×1/4 potencia (doble de distancia FSPL)." },
      { nombre: "Caudal en ADSL DMT", formula: "Caudal = (Σ bits_por_bin) × 4.000 símbolos/s", desc: "256 bins de 4,3125 kHz cada uno (ascendente: bins 7–29; descendente: bins 38–243)." }
    ]
  },
  {
    categoria: "Capa de Enlace y Conmutación (Temas 3 y 5)",
    items: [
      { nombre: "Tiempos de Transmisión y Propagación", formula: "t_trans = p / v   |   τ = d / v_prop   |   RTT ≈ t_trans + 2·τ", desc: "En fibra/cobre v_prop ≈ 200.000 km/s (1 ms de RTT ≈ 100 km de fibra). En aire v_prop = 300.000 km/s." },
      { nombre: "Eficiencia en Parada y Espera", formula: "η = t_trans / RTT = t_trans / (t_trans + 2·τ)", desc: "Fracción del tiempo en que el canal está enviando bits útiles." },
      { nombre: "Ventana Mínima (100% Ocupación)", formula: "W_mín = ⌈ (2 · τ · v) / p + 1 ⌉ = ⌈ RTT / t_trans ⌉", desc: "Número de tramas necesarias para llenar la tubería sin detener la transmisión." },
      { nombre: "Ventana Máxima según Secuencia (k bits)", formula: "Retroceso-N: W_máx = 2^k - 1   |   Repetición Selectiva: W_máx = 2^(k-1)", desc: "Con k = 3 bits (8 números): máx. 7 en Go-Back-N y máx. 4 en Selective Repeat." },
      { nombre: "Cómputo de Puertos Spanning Tree", formula: "Raíz = 1  |  R = m - 1  |  B = p  |  D = n - (m - 1) - p", desc: "Para m switches, n puertos activos y p bucles elementales. Costes 802.1D: 10M→100, 100M→19, 1G→4." }
    ]
  },
  {
    categoria: "Nivel de Red, Tiempo de Servicio y Routing (Temas 7, 8 y 9)",
    items: [
      { nombre: "Tiempo de Servicio (Cola M/M/1)", formula: "Ts = T_esp + T_t = p / (v - c)   →   c_máx = v - (p / Ts_máx)", desc: "p = paquete (bits), v = velocidad enlace (b/s), c = caudal actual (b/s). Retardo total ruta = Σ Ts + τ." },
      { nombre: "Costo de Interfaz en OSPF", formula: "Costo = ⌊ 10⁸ / Ancho_de_banda (b/s) ⌋", desc: "100 Mb/s → 1; 10 Mb/s → 10; 256 kb/s → 390; 128 kb/s → 781; 64 kb/s → 1562." },
      { nombre: "Subredes IPv4 y Hosts Útiles", formula: "Total IPs = 2^(32 - prefijo)   |   Hosts útiles = 2^(32 - prefijo) - 2", desc: "/24 → 254 útiles; /25 → 126; /26 → 62; /27 → 30; /28 → 14; /29 → 6; /30 → 2 útiles." },
      { nombre: "Fragmentación IPv4 y Límite de pps", formula: "Datos_frag = múltiplo de 8 ≤ (MTU - 20)   |   Offset = Byte_inicio / 8   |   pps_máx = 65.535 / TTL", desc: "Todo fragmento con MF=1 debe llevar una cantidad de bytes de datos divisible por 8." }
    ]
  },
  {
    categoria: "Nivel de Transporte TCP (Tema 10)",
    items: [
      { nombre: "Tamaño Máx. Segmento y Límite Secuencia", formula: "Seg_máx = 65.535 - 20 = 65.515 B   |   Caudal_máx_seq = (2³² × 8) / TTL", desc: "Con TTL = 120 s → máx. 286 Mb/s; con TTL = 255 s → máx. 135 Mb/s (sin opción Timestamp/PAWS)." },
      { nombre: "Timer Retransmisión (Van Jacobson)", formula: "SRTT = 7/8·SRTT + 1/8·RTT  |  RTTVAR = 3/4·RTTVAR + 1/4·|SRTT - RTT|  |  RTO = SRTT + 4·RTTVAR", desc: "Inicialización (N=1): SRTT₁ = RTT₁, RTTVAR₁ = RTT₁ / 2, RTO₁ = 3 · RTT₁." },
      { nombre: "Rendimiento TCP en Redes LFN", formula: "Caudal_máx = W_efectiva / RTT   |   W_efectiva = W_16bits × 2^S (con S ≤ 14)", desc: "Sin factor de escala, W_máx = 65.535 B = 524.280 bits." }
    ]
  }
];

<<<<<<< HEAD
// ============================================================================
// BANCO ESPECIAL DE EXAMEN (examen.md — 9 Preguntas Oficiales + Ampliación + Test)
// ============================================================================
window.DATOS_EXAMEN_MD = {
  archivoRuta: "../examen.md",
  rawMarkdown: `1. ¿Cuál es la diferencia entre protocolo UDP y TCP?
 TCP (Protocolo de Control de Transmisión): Es fiable y orientado a la conexión. Garantiza que todos los paquetes lleguen en orden y sin errores (ej. navegación web, email).
 UDP (Protocolo de Datagramas de Usuario): Es rápido y no orientado a la conexión. Envía paquetes sin verificar si llegan o en qué orden (ej. streaming, juegos en línea, DNS).
2. ¿Qué característica de uso requiere un puerto del tipo bien conocido?
Los puertos bien conocidos (0-1023) son requeridos por servicios de servidor estándar y fundamentales del sistema operativo (como HTTP, FTP, SSH). Su uso permite que cualquier cliente sepa "dónde" contactar a un servicio específico en un servidor.
3. Enumere 3 servicios UDP y 3 servicio TCP.
 TCP: HTTP (Web), FTP (Transferencia de archivos), SSH (Acceso remoto seguro).
 UDP: DNS (Resolución de nombres), DHCP (Asignación de IP), NTP (Sincronización de tiempo).
4. ¿Cuál es la funcion de las banderas RST y END de TCP?
(Nota: Se asume que "END" se refiere a la bandera "FIN")
 RST (Reset): Cierra la conexión de forma abrupta e inmediata. Se usa para rechazar una conexión o en caso de un error irrecuperable.
 FIN (Finish): Inicia el cierre ordenado de una conexión. Indica que un lado ha terminado de enviar datos, pero aún puede recibir.
5. ¿En que nivel del modelo OSI trabajan el UDP?
Tanto UDP como TCP trabajan en la Capa 4 (Transporte).
6. Describa los tipos de balanceo de carga y capa en la que funcionan:
 Balanceo L4 (Capa 4 - Transporte): Es rápido y simple. Distribuye el tráfico basándose en la IP y el puerto (TCP/UDP), sin mirar el contenido del paquete.
 Balanceo L7 (Capa 7 - Aplicación): Es más inteligente y lento. Inspecciona el contenido del paquete (como URLs, cookies o cabeceras HTTP) para tomar decisiones de enrutamiento.
7. ¿Que es el HSRP?
HSRP (Hot Standby Router Protocol) es un protocolo (propietario de Cisco) que proporciona redundancia de gateway. Permite que dos o más routers compartan una IP virtual. Uno actúa como activo (gestionando el tráfico) y el otro como standby (en espera). Si el activo falla, el standby toma el control automáticamente.
8. ¿Cual es la topologia por excelencia en el Internet?
La topología de Internet es una malla híbrida y jerárquica. No es una topología pura (como estrella o anillo), sino una "red de redes" (Sistemas Autónomos) interconectadas de forma redundante y descentralizada.
9. ¿A que nivel del modelo OSI funciona el broadcast?
El broadcast funciona en dos niveles principales:
 Capa 2 (Enlace de datos): Mediante la dirección MAC de broadcast (FF:FF:FF:FF:FF:FF) dentro de un mismo segmento de red.
 Capa 3 (Red): Mediante la dirección IP de broadcast de una subred (ej. 192.168.1.255).`,

  preguntas: [
    {
      num: 1,
      id: "ex-1",
      pregunta: "1. ¿Cuál es la diferencia entre protocolo UDP y TCP?",
      temaRelacionado: "Tema 10: Nivel de Transporte (UDP y TCP)",
      respuestaOficial: [
        "TCP (Protocolo de Control de Transmisión): Es fiable y orientado a la conexión. Garantiza que todos los paquetes lleguen en orden y sin errores (ej. navegación web, email).",
        "UDP (Protocolo de Datagramas de Usuario): Es rápido y no orientado a la conexión. Envía paquetes sin verificar si llegan o en qué orden (ej. streaming, juegos en línea, DNS)."
      ],
      ampliacionCurso: "En el Tema 10 de AulaClic se detalla que UDP tiene una cabecera mínima fija de solo 8 bytes (Puerto Origen, Puerto Destino, Longitud y Checksum) sin establecimiento de sesión ni retransmisiones, ideal para tiempo real (VoIP/SIP, DNS). TCP usa una cabecera de 20 a 60 bytes, saludo en 3 vías (SYN, SYN+ACK, ACK), números de secuencia de 32 bits por byte, ventana deslizante de control de flujo y control de congestión.",
      clavesMemoria: ["TCP = Orientado a conexión, fiable, en orden, con control de flujo/congestión", "UDP = No orientado a conexión, sin acuses, baja latencia (cabecera 8 B)"],
      quiz: {
        opciones: [
          "TCP es no orientado a la conexión y rápido; UDP es orientado a la conexión y garantiza el orden de entrega.",
          "TCP es fiable y orientado a la conexión (garantiza entrega en orden y sin errores); UDP es rápido y no orientado a la conexión (sin verificar llegada ni orden).",
          "TCP trabaja en Capa 3 (Red) y UDP trabaja en Capa 2 (Enlace).",
          "UDP utiliza saludo de 3 vías (SYN, SYN-ACK, ACK) y TCP envía datagramas independientes."
        ],
        correcta: 1
      }
    },
    {
      num: 2,
      id: "ex-2",
      pregunta: "2. ¿Qué característica de uso requiere un puerto del tipo bien conocido?",
      temaRelacionado: "Tema 10: Puertos y Sockets TCP/UDP",
      respuestaOficial: [
        "Los puertos bien conocidos (0–1023) son requeridos por servicios de servidor estándar y fundamentales del sistema operativo (como HTTP, FTP, SSH).",
        "Su uso permite que cualquier cliente sepa «dónde» contactar a un servicio específico en un servidor sin negociación previa."
      ],
      ampliacionCurso: "IANA divide los 65.536 puertos (16 bits) en 3 rangos: 1) Puertos Bien Conocidos / Well-Known Ports (0 a 1023), asignados a procesos de sistema/root que escuchan pasivamente en los servidores; 2) Puertos Registrados (1024 a 49151); y 3) Puertos Dinámicos o Efímeros (49152 a 65535) que el sistema operativo asigna temporalmente al cliente como puerto origen.",
      clavesMemoria: ["Rango 0–1023 (Well-Known)", "Procesos servidor estándar del SO", "Punto de contacto universal para los clientes"],
      quiz: {
        opciones: [
          "Rango 49152–65535 asignado temporalmente a cada pestaña del navegador del cliente.",
          "Rango 0–1023 requerido por servicios de servidor estándar y fundamentales del sistema operativo (HTTP, FTP, SSH) para que cualquier cliente sepa dónde contactarlos.",
          "Rango 1024–49151 exclusivo para protocolos de enrutamiento dinámico como OSPF y BGP.",
          "Direcciones físicas de 48 bits grabadas en la tarjeta de red."
        ],
        correcta: 1
      }
    },
    {
      num: 3,
      id: "ex-3",
      pregunta: "3. Enumere 3 servicios UDP y 3 servicios TCP.",
      temaRelacionado: "Tema 10: Aplicaciones sobre TCP y UDP",
      respuestaOficial: [
        "TCP: HTTP (Web, puerto 80 / HTTPS 443), FTP (Transferencia de archivos, puertos 20/21), SSH (Acceso remoto seguro, puerto 22).",
        "UDP: DNS (Resolución de nombres, puerto 53), DHCP (Asignación dinámica de IP, puertos 67/68), NTP (Sincronización de tiempo, puerto 123)."
      ],
      ampliacionCurso: "Otros ejemplos clásicos del curso AulaClic: sobre TCP funcionan Telnet (23), SMTP (25), POP3 (110), IMAP (143) y BGP (179). Sobre UDP funcionan TFTP (69), SNMP (161/162), RIP (520) y flujos de voz/vídeo RTP/SIP.",
      clavesMemoria: ["TCP: HTTP (80), FTP (20/21), SSH (22)", "UDP: DNS (53), DHCP (67/68), NTP (123)"],
      quiz: {
        opciones: [
          "TCP: DNS, DHCP, NTP | UDP: HTTP, FTP, SSH",
          "TCP: HTTP (Web), FTP (Archivos), SSH (Acceso remoto) | UDP: DNS (Nombres), DHCP (Asignación IP), NTP (Tiempo)",
          "TCP: ARP, ICMP, IP | UDP: Ethernet, Wi-Fi, VLAN",
          "TCP: TFTP, SNMP, RIP | UDP: SMTP, POP3, Telnet"
        ],
        correcta: 1
      }
    },
    {
      num: 4,
      id: "ex-4",
      pregunta: "4. ¿Cuál es la función de las banderas RST y END (FIN) de TCP?",
      temaRelacionado: "Tema 10: Gestión de Conexión y Banderas TCP (Diapos 55-75)",
      respuestaOficial: [
        "(Nota: «END» se refiere a la bandera «FIN» de la cabecera TCP).",
        "RST (Reset): Cierra la conexión de forma abrupta e inmediata. Se usa para rechazar una conexión no autorizada/puerto cerrado o ante un error irrecuperable de sincronización.",
        "FIN (Finish): Inicia el cierre ordenado de una conexión. Indica que ese extremo ha terminado de enviar datos, aunque aún puede seguir recibiendo (semi-cierre TCP)."
      ],
      ampliacionCurso: "En el Tema 10 (ejercicio del cortafuegos y secuencia de desconexión) se estudia que una desconexión ordenada requiere 4 segmentos (FIN de A → ACK de B → FIN de B → ACK de A), permitiendo el estado Half-Close. En cambio, RST aborta instantáneamente la conexión sin esperar acuses y es usado también por cortafuegos para bloquear sesiones TCP.",
      clavesMemoria: ["RST = Cierre abrupto/inmediato (rechazo o error)", "FIN (END) = Cierre ordenado (terminó de enviar, aún puede recibir)"],
      quiz: {
        opciones: [
          "RST inicia el saludo de tres vías y FIN solicita retransmisión urgente.",
          "RST cierra la conexión de forma abrupta e inmediata (rechazo o error); FIN inicia el cierre ordenado indicando que ese lado terminó de enviar datos.",
          "RST cifra el paquete TCP y FIN fragmenta el datagrama IP.",
          "Ambas banderas sirven para negociar el tamaño máximo de ventana en redes LFN."
        ],
        correcta: 1
      }
    },
    {
      num: 5,
      id: "ex-5",
      pregunta: "5. ¿En qué nivel del modelo OSI trabaja el UDP?",
      temaRelacionado: "Tema 1 y Tema 10: Modelo OSI vs TCP/IP",
      respuestaOficial: [
        "Tanto UDP como TCP trabajan en la Capa 4 (Nivel de Transporte) del modelo OSI."
      ],
      ampliacionCurso: "La Capa 4 (Transporte) se encarga de la comunicación extremo a extremo entre procesos (identificados mediante puertos) ejecutándose en los hosts origen y destino, independientemente de cuántas subredes o routers intermedios atraviesen los paquetes en la Capa 3 (Red).",
      clavesMemoria: ["Capa 4 = Nivel de Transporte (junto con TCP)"],
      quiz: {
        opciones: [
          "Capa 2 (Enlace de Datos)",
          "Capa 3 (Nivel de Red)",
          "Capa 4 (Nivel de Transporte)",
          "Capa 7 (Nivel de Aplicación)"
        ],
        correcta: 2
      }
    },
    {
      num: 6,
      id: "ex-6",
      pregunta: "6. Describa los tipos de balanceo de carga y la capa en la que funcionan.",
      temaRelacionado: "Tema 8 (Clústeres CAM/ARP), Tema 10 y Tema 11 (NAPT)",
      respuestaOficial: [
        "Balanceo L4 (Capa 4 - Transporte): Es rápido y simple. Distribuye el tráfico basándose en la dirección IP y el puerto (TCP/UDP), sin inspeccionar el contenido de aplicación del paquete.",
        "Balanceo L7 (Capa 7 - Aplicación): Es más inteligente pero computacionalmente más costoso. Inspecciona el contenido del paquete (URLs, cabeceras HTTP, cookies, tipo de contenido) para tomar decisiones avanzadas de enrutamiento."
      ],
      ampliacionCurso: "En el Tema 8 (8.21 Alimento para la mente) también vimos cómo distribuir carga a nivel de conmutación/red mediante MAC virtual, y en el Tema 11 cómo NAPT redirige tráfico por puertos TCP/UDP (L4). Un balanceador L7 actúa como un Reverse Proxy (termina la conexión TCP/TLS del cliente, lee la petición HTTP y abre otra hacia el backend adecuado).",
      clavesMemoria: ["Balanceo L4 (Transporte) = Por IP + Puerto TCP/UDP (rápido, sin abrir payload)", "Balanceo L7 (Aplicación) = Inspecciona URLs, cookies y cabeceras HTTP (inteligente)"],
      quiz: {
        opciones: [
          "Balanceo L1 (por voltaje eléctrico) y Balanceo L2 (por cable coaxial).",
          "Balanceo L4 (Transporte: rápido, decide por IP y puerto TCP/UDP sin mirar el contenido) y Balanceo L7 (Aplicación: inteligente, inspecciona URLs, cookies o cabeceras HTTP).",
          "Balanceo OSPF y Balanceo RIP en Capa 6 (Presentación).",
          "Balanceo por CRC en Capa 2 y Balanceo por TTL en Capa 3."
        ],
        correcta: 1
      }
    },
    {
      num: 7,
      id: "ex-7",
      pregunta: "7. ¿Qué es el HSRP?",
      temaRelacionado: "Tema 8: Redundancia de Gateway — VRRP y HSRP (Diapos 152-155)",
      respuestaOficial: [
        "HSRP (Hot Standby Router Protocol) es un protocolo propietario de Cisco que proporciona redundancia de puerta de enlace (Default Gateway).",
        "Permite que dos o más routers compartan una dirección IP virtual (y MAC virtual). Uno actúa como router Activo (gestionando el tráfico) y otro como Standby (en espera). Si el activo falla, el standby asume el control automáticamente de forma transparente para los hosts."
      ],
      ampliacionCurso: "En el Tema 8 (sección 8.24, diapositivas 152–155) se estudia el estándar abierto equivalente de la IETF: VRRP (Virtual Router Redundancy Protocol, RFC 3768). Tanto HSRP (Cisco) como VRRP resuelven el mismo problema: evitar que la caída del router por defecto deje aislados a los hosts de una LAN que tienen configurada una única IP de Default Gateway.",
      clavesMemoria: ["Hot Standby Router Protocol (propietario de Cisco)", "Equivalente estándar IETF: VRRP", "IP virtual compartida entre router Activo y router Standby"],
      quiz: {
        opciones: [
          "Un protocolo de cifrado de contraseñas en switches inalámbricos 802.11.",
          "Un protocolo propietario de Cisco de redundancia de gateway donde varios routers comparten una IP virtual (uno Activo y otro Standby que toma el relevo si falla el primero).",
          "El algoritmo de encaminamiento por vector de distancias usado por RIP.",
          "Un mecanismo de fragmentación de paquetes IPv4 en enlaces serie."
        ],
        correcta: 1
      }
    },
    {
      num: 8,
      id: "ex-8",
      pregunta: "8. ¿Cuál es la topología por excelencia en el Internet?",
      temaRelacionado: "Tema 1 y Tema 9: Estructura Jerárquica de Internet y Sistemas Autónomos",
      respuestaOficial: [
        "La topología de Internet es una malla híbrida y jerárquica.",
        "No es una topología pura (como estrella, bus o anillo), sino una «red de redes» (Sistemas Autónomos) interconectadas de forma redundante y descentralizada."
      ],
      ampliacionCurso: "En el Tema 9 (secciones 9.10 a 9.13) se explica cómo Internet se organiza jerárquicamente mediante Sistemas Autónomos (AS) interconectados con BGP a través de proveedores Tier-1 (malla redundante global), Tier-2, Tier-3 y puntos neutros de intercambio (IXP / NAP), combinando mallas parciales en el núcleo con jerarquías en árbol/estrella hacia el acceso.",
      clavesMemoria: ["Malla híbrida y jerárquica", "Red de redes (Sistemas Autónomos)", "Interconexión redundante y descentralizada"],
      quiz: {
        opciones: [
          "Una topología en anillo único global gestionado por un router central.",
          "Una topología en bus compartido coaxial.",
          "Una malla híbrida y jerárquica («red de redes» compuesta por Sistemas Autónomos interconectados de forma redundante y descentralizada).",
          "Una estrella simple donde todos los hogares se conectan directamente a un único servidor raíz."
        ],
        correcta: 2
      }
    },
    {
      num: 9,
      id: "ex-9",
      pregunta: "9. ¿A qué nivel del modelo OSI funciona el broadcast?",
      temaRelacionado: "Tema 4 (MAC Broadcast) y Tema 8 (IP Broadcast Limitado y Dirigido)",
      respuestaOficial: [
        "El broadcast (difusión) funciona en dos niveles principales del modelo OSI:",
        "Capa 2 (Enlace de datos): Mediante la dirección MAC de broadcast (FF:FF:FF:FF:FF:FF) dentro de un mismo segmento de red local (dominio de difusión LAN).",
        "Capa 3 (Red): Mediante la dirección IP de broadcast de una subred (broadcast dirigido, ej. 192.168.1.255, o broadcast limitado 255.255.255.255)."
      ],
      ampliacionCurso: "En el Tema 5 y Tema 8 vimos que los switches (Capa 2) inundan las tramas con destino FF:FF:FF:FF:FF:FF por todos los puertos de la misma VLAN, mientras que los routers (Capa 3) delimitan los dominios de broadcast L2. En Capa 3, una dirección IP con todos los bits de host a 1 (ej. 194.125.1.63 en una subred /26) es el broadcast dirigido de esa subred.",
      clavesMemoria: ["Capa 2 (Enlace): MAC FF:FF:FF:FF:FF:FF (mismo segmento/VLAN)", "Capa 3 (Red): IP de broadcast de subred (todos los bits de host a 1, ej. 192.168.1.255)"],
      quiz: {
        opciones: [
          "Únicamente en la Capa 1 (Física) mediante hubs.",
          "En dos niveles principales: Capa 2 (Enlace de datos, con la MAC FF:FF:FF:FF:FF:FF en el segmento local) y Capa 3 (Red, con la IP de broadcast de la subred como 192.168.1.255).",
          "Únicamente en la Capa 7 (Aplicación) mediante servidores DNS.",
          "En la Capa 4 (Transporte) usando el puerto 65535."
        ],
        correcta: 1
      }
    }
  ]
};


=======
>>>>>>> 8ab872533583fd240d0a7a10eeb15241408a1cff
