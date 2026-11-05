# Tema 10: Nivel de Transporte (UDP y TCP) — Solucionario Completo Explicado

> **Documento PDF consolidado asociado**: [`00_Todos_Ejercicios_Tema_10.pdf`](./00_Todos_Ejercicios_Tema_10.pdf)

---

## 10.3 Protocolo UDP: Ejemplo de Llamada VoIP SIP/RTP y Programación de Sockets
- **PDF del subtema**: [`10.3_Protocolo_UDP_Ejemplo_Llamada_SIP_y_Socket.pdf`](./10.3_Protocolo_UDP_Ejemplo_Llamada_SIP_y_Socket.pdf) | **Solución individual**: [`10.3_Protocolo_UDP_Ejemplo_Llamada_SIP_y_Socket.md`](./10.3_Protocolo_UDP_Ejemplo_Llamada_SIP_y_Socket.md)
- **Diapositivas**: 22, 23, 24

### 1. Enunciado de los Ejemplos (Diapositivas 22–24)
1. **Llamada telefónica SIP/RTP sobre UDP (Diap. 22)**: Analizar los puertos y protocolos que intervienen cuando **Alicia (`147.156.12.24`)** llama a **Luis (`154.42.13.26`)**.
2. **Cliente UDP en C con Sockets de Berkeley (Diap. 23–24)**: Explicar la secuencia de llamadas al sistema (`socket`, `sendto`, `select`, `recvfrom`, `close`).

### 2. Explicación Técnica ("¿Por qué es así?")
- **¿Por qué la señalización SIP usa el puerto fijo `5060` pero el audio RTP usa puertos dinámicos distintos (`38060` y `48753`) sobre UDP?**
  - Para que Alicia pueda encontrar a Luis y hacer sonar su teléfono, el proceso SIP de Luis debe estar escuchando en un **puerto bien conocido (`UDP 5060`)**.
  - Dentro del mensaje `INVITE` (y del `200 OK`), el protocolo SDP negocia dinámicamente dos datos: el **puerto efímero UDP** donde cada extremo recibirá el flujo de voz RTP (`38060` en Alicia con códec G.711 $\mu$-law `RTP/AVP 0`, y `48753` en Luis con códec GSM `RTP/AVP 3`).
  - **¿Por qué el audio va sobre UDP y nunca sobre TCP?** Porque en voz en tiempo real un paquete perdido o retrasado más de $150\text{ ms}$ ya no sirve. Si usáramos TCP, al perderse un paquete la capa de transporte detendría la entrega a la aplicación esperando la retransmisión (*Head-of-Line Blocking*), congelando la conversación.
- **¿Por qué el cliente UDP usa `select()` antes de `recvfrom()` (Diap. 24)?**
  - Como UDP no es fiable, el datagrama de petición o la respuesta del servidor puede perderse. Si el cliente llamase directamente a `recvfrom()` bloqueante sin un temporizador (`select` con `&timeout`), la aplicación se quedaría colgada indefinidamente esperando un paquete que nunca llegará.

---

## 10.4 Protocolo TCP: Cálculo del Tamaño Máximo Teórico de un Segmento TCP
- **PDF del subtema**: [`10.4_Protocolo_TCP_Pregunta_Tamano_Maximo_de_Segmento.pdf`](./10.4_Protocolo_TCP_Pregunta_Tamano_Maximo_de_Segmento.pdf) | **Solución individual**: [`10.4_Protocolo_TCP_Pregunta_Tamano_Maximo_de_Segmento.md`](./10.4_Protocolo_TCP_Pregunta_Tamano_Maximo_de_Segmento.md)
- **Diapositivas**: 32

### 1. Enunciado de la Pregunta (Diapositiva 32)
**Pregunta**: El tamaño máximo de un segmento TCP es de **$65.515\text{ octetos}$**. ¿De dónde viene exactamente ese valor?

### 2. Solución y Explicación ("¿Por qué es así?")
- Todo segmento TCP viaja encapsulado como carga útil (*payload*) dentro de un **datagrama IPv4**.
- En la cabecera IPv4, el campo **Longitud Total** tiene **16 bits**, por lo que el tamaño máximo absoluto de un datagrama IPv4 (incluyendo cabecera IP + datos) es:
  $$2^{16} - 1 = 65.535\text{ octetos (bytes)}$$
- Como la cabecera IPv4 mínima (sin opciones) ocupa **$20\text{ octetos}$**, el espacio máximo disponible para el segmento TCP completo es:
  $$\text{Tamaño máx. segmento TCP} = 65.535 - 20 = \mathbf{65.515\text{ octetos}}$$
- *(Nota adicional: Si nos preguntasen por los **datos de aplicación máximos** dentro de ese segmento TCP, como la cabecera TCP mínima ocupa otros $20\text{ octetos}$, serían $65.515 - 20 = 65.495\text{ octetos}$).*

---

## 10.6 Protocolo TCP: Límite de Caudal por Desbordamiento del Número de Secuencia (PAWS)
- **PDF del subtema**: [`10.6_Protocolo_TCP_Pregunta_Numero_de_Secuencia_y_Caudal.pdf`](./10.6_Protocolo_TCP_Pregunta_Numero_de_Secuencia_y_Caudal.pdf) | **Solución individual**: [`10.6_Protocolo_TCP_Pregunta_Numero_de_Secuencia_y_Caudal.md`](./10.6_Protocolo_TCP_Pregunta_Numero_de_Secuencia_y_Caudal.md)
- **Diapositivas**: 58

### 1. Enunciado de la Pregunta (Diapositiva 58)
**Pregunta**: ¿De qué manera afecta el tamaño del campo **Número de Secuencia** (32 bits) al caudal máximo de una conexión TCP según el `TTL` utilizado ($120\text{ s}$ o $255\text{ s}$)?

### 2. Cálculo Paso a Paso y Explicación ("¿Por qué es así?")
- En TCP cada byte de datos transmitido consume un número de secuencia. Como el campo **Número de Secuencia** tiene **32 bits**, existen exactamente:
  $$2^{32} = 4.294.967.296\text{ números de secuencia posibles (bytes)} = 34.359.738.368\text{ bits}$$
- **Condición de no ambigüedad**: Mientras un segmento antiguo pueda seguir vivo vagando por Internet (cuyo tiempo máximo de vida es el **MSL / TTL** en segundos), el emisor **no puede dar la vuelta completa al contador de 32 bits (*wrap-around*) y reutilizar el mismo número de secuencia**, pues si llegara un segmento viejo retrasado con ese mismo número de secuencia, el receptor lo tomaría por datos nuevos válidos.
- Por tanto, el caudal máximo sin ambigüedad es:
  $$\text{Caudal máximo} = \frac{2^{32}\text{ bytes} \times 8\text{ bits/byte}}{\text{TTL (s)}}$$
  1. **Para $\text{TTL} = 120\text{ s}$ (MSL estándar de TCP)**:
     $$\text{Caudal máx.} = \frac{4.294.967.296 \times 8}{120\text{ s}} = 286.331.153\text{ b/s} \approx \mathbf{286\text{ Mb/s}}$$
  2. **Para $\text{TTL} = 255\text{ s}$ (máximo valor del campo TTL de 8 bits en IPv4)**:
     $$\text{Caudal máx.} = \frac{4.294.967.296 \times 8}{255\text{ s}} = 134.744.072\text{ b/s} \approx \mathbf{135\text{ Mb/s}}$$
- **¿Cómo supera TCP moderno esta barrera en redes de $1\text{ Gb/s}$ o $100\text{ Gb/s}$?** Mediante la opción **TCP Timestamps (PAWS — *Protection Against Wrapped Sequences*, RFC 1323/7323)**, que adjunta un sello de tiempo de 32 bits en cada segmento para distinguir al instante un segmento actual de uno antiguo aunque el número de secuencia haya dado la vuelta.

---

## 10.7 Protocolo TCP: Saludo de 3 Vías (SYN) y Ejercicio de Regla de Cortafuegos
- **PDF del subtema**: [`10.7_Protocolo_TCP_Ejemplo_Secuencia_y_Ejercicio_Cortafuegos.pdf`](./10.7_Protocolo_TCP_Ejemplo_Secuencia_y_Ejercicio_Cortafuegos.pdf) | **Solución individual**: [`10.7_Protocolo_TCP_Ejemplo_Secuencia_y_Ejercicio_Cortafuegos.md`](./10.7_Protocolo_TCP_Ejemplo_Secuencia_y_Ejercicio_Cortafuegos.md)
- **Diapositivas**: 61, 62, 63, 64

### 1. Enunciado del Ejemplo y Ejercicio (Diapositivas 61–64)
1. **Análisis de las 4 primeras cabeceras de una sesión Telnet (Diap. 61–62)**: Explicar por qué los números de secuencia y de ACK evolucionan como `16421121` $\to$ `16421122` y `390272001` $\to$ `390272002` $\to$ `390272014`.
2. **Ejercicio de Cortafuegos Básico (*Packet Filter*, Diap. 63–64)**: Se quiere configurar en el router de borde una regla sin estado (*stateless ACL*) que **impida que desde Internet se abran conexiones TCP hacia la red interna, pero que permita a los usuarios internos abrir conexiones TCP hacia Internet y recibir las respuestas**. ¿Qué campos exactos debe filtrar el router?

### 2. Solución y Explicación ("¿Por qué es así?")
1. **Evolución de Números de Secuencia en el *Three-Way Handshake* (Diap. 61–62)**:
   - **Segmento 1 (`Cliente → Servidor`, `Flags = 0x02 [SYN]`)**: El cliente elige su número de secuencia inicial (`ISN = 16421121`) y anuncia `MSS = 1460`.
   - **Segmento 2 (`Servidor → Cliente`, `Flags = 0x12 [SYN, ACK]`)**: El servidor elige su propio `ISN = 390272001` y confirma el `SYN` del cliente poniendo **`ACK = 16421121 + 1 = 16421122`**. *¿Por qué suma 1 si el segmento 1 llevaba 0 bytes de datos?* Porque **el flag `SYN` (al igual que el flag `FIN`) consume lógicamente 1 número de secuencia** para garantizar que pueda ser confirmado de forma fiable y retransmitido si se pierde.
   - **Segmento 3 (`Cliente → Servidor`, `Flags = 0x10 [ACK]`)**: El cliente envía `Seq = 16421122` y confirma el `SYN` del servidor con **`ACK = 390272001 + 1 = 390272002`**.
   - **Segmento 4 (`Servidor → Cliente`, `Flags = 0x18 [PSH, ACK]`, $12\text{ bytes}$ de datos `"UNIX Login: "`)**: Sale con `Seq = 390272002`, `ACK = 16421122`. El cliente lo confirma en el siguiente segmento con **`ACK = 390272002 + 12 = 390272014`**.
2. **Solución al Ejercicio del Cortafuegos (Diapositivas 63–64)**:
   - El router debe **descartar (DENY)** todo datagrama que **entre desde Internet por la interfaz serie** y cumpla simultáneamente:
     1. En la cabecera IP: **`Protocolo == 6` (TCP)**.
     2. En la cabecera TCP: **`Flag SYN == 1` y `Flag ACK == 0`**.
   - **¿Por qué funciona esta regla sin bloquear las conexiones salientes?**
     - Porque el **primer segmento** de solicitud de apertura de cualquier conexión TCP es **el único de toda la vida de la conexión que tiene `SYN = 1` y `ACK = 0`**.
     - Cuando un host de Internet intenta iniciar una conexión hacia adentro, su primer paquete entra con `SYN = 1, ACK = 0` y el router lo destruye.
     - En cambio, cuando un usuario interno inicia una conexión hacia Internet, su `SYN = 1, ACK = 0` **sale** hacia afuera (permitido), y la respuesta del servidor externo entra desde Internet con **`SYN = 1, ACK = 1`** (y los paquetes siguientes con `SYN = 0, ACK = 1`), por lo que atraviesan el filtro sin problema.

---

## 10.9 Protocolo TCP: Análisis de Captura Wireshark de Conexión, Datos HTTP y Desconexión
- **PDF del subtema**: [`10.9_Protocolo_TCP_Ejemplo_Conexion_Datos_y_Desconexion.pdf`](./10.9_Protocolo_TCP_Ejemplo_Conexion_Datos_y_Desconexion.pdf) | **Solución individual**: [`10.9_Protocolo_TCP_Ejemplo_Conexion_Datos_y_Desconexion.md`](./10.9_Protocolo_TCP_Ejemplo_Conexion_Datos_y_Desconexion.md)
- **Diapositivas**: 74

### 1. Enunciado y Análisis de la Captura Wireshark (Diapositiva 74)
Se muestra una captura real en Wireshark de una conexión HTTP desde el cliente `147.156.135.22` al servidor web `147.156.1.4` (puerto 80) que sufre una redirección (`HTTP/1.0 302`), se cierra y abre una segunda conexión TCP para descargar la página.

### 2. Explicación Técnica ("¿Por qué es así?")
- **Las 3 fases visibles en la primera conexión (Puerto cliente `2378 ↔ 80`)**:
  1. **Establecimiento (Tramas 1–3)**: Saludo de 3 vías (`SYN` $\to$ `SYN, ACK` $\to$ `ACK`) en apenas $0,65\text{ ms}$.
  2. **Transferencia de datos (Tramas 4–6)**: El cliente envía `GET / HTTP/1.1`, el servidor responde con un `HTTP 302 Redirect` ($664\text{ bytes}$, `Seq=1, Ack=215`) y el cliente lo confirma (`Ack=665`).
  3. **Desconexión ordenada con `FIN` (Tramas 7–9)**: El servidor inicia el cierre enviando `FIN, ACK` (`Seq=664`), el cliente confirma y envía su propio `FIN, ACK` (`Seq=215, Ack=665`), y el servidor envía el último `ACK` (`Seq=665, Ack=216`, ya que el flag `FIN` también consume 1 número de secuencia).
- **¿Por qué aparecen `Seq = 0` y `Ack = 1` en lugar de números de 32 bits aleatorios?**
  Porque por comodidad visual **Wireshark muestra por defecto "Números de Secuencia Relativos"** restando a todos los paquetes el valor del `ISN` inicial de cada sentido. En el paquete real que viaja por el cable (panel inferior de la captura) va el número de 32 bits completo.

---

## 10.14 Negociación de MSS/MTU: Pregunta Conceptual y Ejercicio de Fragmentación de Segmento TCP
- **PDF del subtema**: [`10.14_Negociacion_MTU_Pregunta_y_Ejercicio_Fragmentacion_TCP.pdf`](./10.14_Negociacion_MTU_Pregunta_y_Ejercicio_Fragmentacion_TCP.pdf) | **Solución individual**: [`10.14_Negociacion_MTU_Pregunta_y_Ejercicio_Fragmentacion_TCP.md`](./10.14_Negociacion_MTU_Pregunta_y_Ejercicio_Fragmentacion_TCP.md)
- **Diapositivas**: 95, 96, 97

### 1. Enunciado de la Pregunta y del Ejercicio (Diapositivas 95–97)
1. **Pregunta conceptual (Diap. 95)**: ¿Debe TCP preocuparse de reordenar los fragmentos de un datagrama IP?
2. **Ejercicio numérico (Diap. 96–97)**:
   - Un host conectado a Ethernet ($	ext{MTU} = 1.500\text{ bytes}$) envía segmentos TCP del tamaño máximo permitido.
   - El otro extremo ha anunciado en el handshake un **$	ext{MSS} = 1.460\text{ bytes}$**.
   - **No** se utiliza Descubrimiento de la MTU del Trayecto (*Path MTU Discovery*, por lo que `DF = 0`).
   - La ruta atraviesa una red intermedia cuya **$	ext{MTU} = 760\text{ bytes}$**.
   - **Se pide**: Calcular cuántos datagramas (fragmentos) y de cuántos bytes recibe el nivel de red en el host de destino por cada segmento enviado.

---

### 2. Solución Paso a Paso y Explicación ("¿Por qué es así?")
1. **Respuesta a la Pregunta Conceptual (Diap. 95)**:
   - **NO**. La fragmentación y el reensamblado son responsabilidad exclusiva del **nivel de red (IP)**. El nivel IP del host receptor retiene todos los fragmentos en su búfer y reconstruye el datagrama original completo antes de entregar el segmento a TCP. De hecho, **TCP no podría reordenar fragmentos aunque quisiera**, porque la cabecera TCP (con los puertos y el número de secuencia) **solo viaja en el primer fragmento**; los demás fragmentos solo tienen cabecera IP seguida de datos puros.

2. **Resolución Numérica del Ejercicio (Diapositivas 96–97)**:
   - **Paso 1 — Tamaño del datagrama emitido por el host origen**:
     - Datos TCP máximos = $	ext{MSS} = 1.460\text{ bytes}$.
     - Segmento TCP = $1.460\text{ B datos} + 20\text{ B cabecera TCP} = \mathbf{1.480\text{ bytes}}$.
     - Datagrama IP = $1.480\text{ B payload IP} + 20\text{ B cabecera IP} = \mathbf{1.500\text{ bytes}}$.
   - **Paso 2 — Fragmentación en el router con $	ext{MTU} = 760\text{ bytes}$**:
     - Cada fragmento que salga por ese enlace puede medir como máximo $760\text{ B}$ en total. Quitando los **$20\text{ bytes}$ de cabecera IP**, quedan como máximo $760 - 20 = 740\text{ bytes}$ para datos IP.
     - **Condición obligatoria de múltiplo de 8 bytes**: ¿Es $740$ divisible por $8$?
       $$\frac{740}{8} = 92,5 \implies \text{¡NO es múltiplo de 8!}$$
     - El mayor múltiplo de $8$ menor o igual a $740$ es:
       $$92 \times 8 = \mathbf{736\text{ bytes de carga IP por fragmento}}$$
     - Por tanto, la longitud total de cada fragmento lleno será:
       $$736\text{ B (carga IP)} + 20\text{ B (cabecera IP)} = \mathbf{756\text{ bytes}}$$
   - **Paso 3 — Reparto de los $1.480\text{ bytes}$ de carga IP (los $20\text{ B}$ de cabecera TCP + $1.460\text{ B}$ de datos)**:
     - **Fragmento 1**: Lleva $736\text{ B}$ de carga IP ($20\text{ B}$ de cabecera TCP + $716\text{ B}$ de datos TCP) $+ 20\text{ B}$ de cabecera IP = **$756\text{ bytes}$** (`MF = 1`, `Offset = 0`).
     - **Fragmento 2**: Lleva otros $736\text{ B}$ de datos TCP $+ 20\text{ B}$ de cabecera IP = **$756\text{ bytes}$** (`MF = 1`, `Offset = 92`). Hasta aquí hemos enviado $736 + 736 = 1.472\text{ bytes}$ de la carga IP original de $1.480\text{ B}$.
     - **Fragmento 3**: Lleva los últimos $1.480 - 1.472 = \mathbf{8\text{ bytes}}$ de datos TCP restantes $+ 20\text{ B}$ de cabecera IP = **$28\text{ bytes}$** (`MF = 0`, `Offset = 184`).
   - **Resultado final**: El nivel de red del destino recibe **3 datagramas (fragmentos) de $756\text{ B}$, $756\text{ B}$ y $28\text{ B}$** (totalizando $1.540\text{ bytes}$ en la red debido a los $40\text{ bytes}$ extra de las dos cabeceras IP adicionales).

---

## 10.16 Flujo de Datos Interactivos en TCP: Casos 1 a 4 en Telnet y ACK Retrasado
- **PDF del subtema**: [`10.16_Flujo_Datos_Interactivos_Ejemplo_Telnet_Casos_1_a_4.pdf`](./10.16_Flujo_Datos_Interactivos_Ejemplo_Telnet_Casos_1_a_4.pdf) | **Solución individual**: [`10.16_Flujo_Datos_Interactivos_Ejemplo_Telnet_Casos_1_a_4.md`](./10.16_Flujo_Datos_Interactivos_Ejemplo_Telnet_Casos_1_a_4.md)
- **Diapositivas**: 102, 103, 104, 105, 106, 107, 108, 109, 110

### 1. Enunciado del Problema (Diapositivas 102–110)
En una sesión **Telnet** con eco remoto, cada tecla pulsada debe viajar al servidor y volver para mostrarse en pantalla. El protocolo TCP aplica un **Temporizador de ACK Retrasado (*Delayed ACK Timer*) de $200\text{ ms}$**: cuando recibe datos, espera hasta $200\text{ ms}$ antes de mandar un ACK vacío por si la aplicación genera datos en sentido contrario y puede enviar el ACK "a caballo" (**piggybacked**).
Con un $\text{RTT} = 100\text{ ms}$ ($50\text{ ms}$ de ida y $50\text{ ms}$ de vuelta), explicar por qué se generan **2, 3 o 4 segmentos TCP por cada tecla pulsada** en los 4 casos:
- **Caso 1**: Usuario rápido ($\le 200\text{ ms}$ entre teclas) y servidor rápido ($\le 200\text{ ms}$ de respuesta).
- **Caso 2**: Usuario lento ($> 200\text{ ms}$ entre teclas) y servidor rápido.
- **Caso 3**: Usuario rápido y servidor lento ($> 200\text{ ms}$).
- **Caso 4**: Usuario lento y servidor lento.

---

### 2. Análisis Paso a Paso de los 4 Casos ("¿Por qué cambia el número de segmentos?")

| Caso | Velocidad Usuario | Velocidad Servidor | Segmentos por Tecla | Secuencia Exacta de Segmentos |
| :--- | :---: | :---: | :---: | :--- |
| **Caso 1** (Diap. 104, 109) | Rápido ($150\text{ ms}$) | Rápido ($80\text{ ms}$) | **2 segmentos** | 1) Cliente envía `'m'` (`seq=92, ack=109`).<br>2) El servidor tarda $80\text{ ms} < 200\text{ ms}$ en hacer eco, por lo que devuelve `'m'` con el **`ACK` piggybacked** (`seq=109, ack=93, 'm'`).<br>*(A los $150\text{ ms}$ de recibir el eco, antes de que venza su timer de $200\text{ ms}$, el usuario ya pulsa la `'o'` y aprovecha para confirmar el eco de la `'m'` en el mismo paquete: `seq=93, ack=110, 'o'`)*. |
| **Caso 2** (Diap. 106, 110) | Lento ($420\text{ ms}$) | Rápido ($80\text{ ms}$) | **3 segmentos** | 1) Cliente envía `'m'`.<br>2) Servidor responde rápido en $80\text{ ms}$ con `'m' + ACK` juntos.<br>3) Como el usuario tarda más de $200\text{ ms}$ en pulsar la siguiente tecla, **vence el timer de $200\text{ ms}$ en el cliente** y su TCP se ve obligado a enviar un **3er segmento con un `ACK` vacío** (`seq=93, ack=110`). *(Es el caso más habitual en la práctica).* |
| **Caso 3** (Diap. 107) | Rápido | Lento ($300\text{ ms}$) | **3 segmentos** | 1) Cliente envía `'m'`.<br>2) Como el servidor está sobrecargado y tarda $300\text{ ms} > 200\text{ ms}$ en devolver el eco, a los $200\text{ ms}$ **vence el timer del servidor** y envía un **`ACK` vacío** (`seq=109, ack=93`).<br>3) $100\text{ ms}$ después el servidor envía el eco `'m'` en otro segmento separado (que el cliente rápido confirma junto con su siguiente letra `'o'`). |
| **Caso 4** (Diap. 108) | Lento | Lento | **4 segmentos** | Vencen los timers de $200\text{ ms}$ en ambos lados:<br>1) Cliente envía `'m'`.<br>2) Servidor envía `ACK` vacío (a los $200\text{ ms}$).<br>3) Servidor envía el eco de `'m'`.<br>4) Cliente envía `ACK` vacío (a los $200\text{ ms}$). |

---

## 10.22 Timer de Retransmisión en TCP: Algoritmo de Jacobson (SRTT, RTTVAR y RTO)
- **PDF del subtema**: [`10.22_Timer_Retransmision_Calculo_SRTT_RTTVAR_y_RTO.pdf`](./10.22_Timer_Retransmision_Calculo_SRTT_RTTVAR_y_RTO.pdf) | **Solución individual**: [`10.22_Timer_Retransmision_Calculo_SRTT_RTTVAR_y_RTO.md`](./10.22_Timer_Retransmision_Calculo_SRTT_RTTVAR_y_RTO.md)
- **Diapositivas**: 153, 154, 155, 156, 157, 158, 159, 160, 161

### 1. Enunciado y Fórmulas del Algoritmo de Van Jacobson (Diapositivas 153–161)
Explicar cómo calcula TCP el tiempo de espera antes de dar un segmento por perdido y retransmitirlo (**$	ext{RTO}$, *Retransmission TimeOut***) a partir de las mediciones sucesivas de $\text{RTT}_n$, y verificar los cálculos de la tabla de evolución para $N = 1..15$ (Diapositiva 160).

### 2. Marco Teórico y Fórmulas Exactas ("¿Por qué no basta con la media del RTT?")
- **¿Por qué sería un desastre fijar $\text{RTO} = k \cdot \text{SRTT}$ (un múltiplo fijo de la media)?**
  - Como muestran las gráficas de la Diapositiva 155, cuando una red está descargada todos los RTT están muy juntos (varianza casi nula), pero cuando la red se congestiona las colas de los routers fluctúan enormemente y **la dispersión (varianza) del RTT se multiplica mucho más rápido que su media**.
  - Por tanto, Van Jacobson demostró en 1988 que el $\text{RTO}$ debe adaptarse tanto a la **media suavizada ($\text{SRTT}$)** como a la **desviación media suavizada ($\text{RTTVAR}$)**:
  1. **Media móvil exponencial del RTT ($	ext{SRTT}_n$, con $\alpha = 7/8 = 0,875$ y $1 - \alpha = 1/8 = 0,125$)**:
     $$\text{SRTT}_n = \frac{7}{8}\,\text{SRTT}_{n-1} + \frac{1}{8}\,\text{RTT}_n$$
  2. **Media móvil exponencial de la desviación ($	ext{RTTVAR}_n$, con $\beta = 3/4 = 0,75$ y $1 - \beta = 1/4 = 0,25$)**:
     $$\text{RTTVAR}_n = \frac{3}{4}\,\text{RTTVAR}_{n-1} + \frac{1}{4}\,\big|\text{SRTT}_{n-1} - \text{RTT}_n\big|$$
  3. **Cálculo del Timeout de Retransmisión ($	ext{RTO}_n$)**:
     $$\text{RTO}_n = \text{SRTT}_n + 4 \cdot \text{RTTVAR}_n$$
- **¿Por qué se eligen exactamente los coeficientes $1/8$, $1/4$ y $4$?**
  Porque son **potencias enteras de $2$ ($2^{-3}, 2^{-2}, 2^2$)**. Esto permite que el kernel del sistema operativo calcule $\text{SRTT}$, $\text{RTTVAR}$ y $\text{RTO}$ para miles de paquetes por segundo usando simples **desplazamientos de bits en registros enteros (`>> 3`, `>> 2`, `<< 2`)** en una sola instrucción de CPU sin usar coma flotante.

---

### 3. Comprobación Paso a Paso de las Primeras Filas de la Tabla (Diapositiva 160)
- **Para $N = 1$ ($	ext{RTT}_1 = 230\text{ ms}$, inicialización RFC 2988/6298)**:
  - $\text{SRTT}_1 = \text{RTT}_1 = \mathbf{230,00\text{ ms}}$
  - $\text{RTTVAR}_1 = \frac{\text{RTT}_1}{2} = \frac{230}{2} = \mathbf{115,00\text{ ms}}$
  - $\text{RTO}_1 = 230 + 4 \times 115 = \mathbf{690,00\text{ ms}}$
- **Para $N = 2$ ($	ext{RTT}_2 = 294\text{ ms}$)**:
  - Diferencia respecto a la media anterior: $|230 - 294| = 64\text{ ms}$.
  - $\text{SRTT}_2 = \frac{7}{8}(230) + \frac{1}{8}(294) = 201,25 + 36,75 = \mathbf{238,00\text{ ms}}$.
  - $\text{RTTVAR}_2 = \frac{3}{4}(115) + \frac{1}{4}(64) = 86,25 + 16,00 = \mathbf{102,25\text{ ms}}$.
  - $\text{RTO}_2 = 238,00 + 4 \times 102,25 = 238 + 409 = \mathbf{647,00\text{ ms}}$.
- **Para $N = 3$ ($	ext{RTT}_3 = 264\text{ ms}$)**:
  - Diferencia: $|238 - 264| = 26\text{ ms}$.
  - $\text{SRTT}_3 = \frac{7}{8}(238) + \frac{1}{8}(264) = 208,25 + 33,00 = \mathbf{241,25\text{ ms}}$.
  - $\text{RTTVAR}_3 = \frac{3}{4}(102,25) + \frac{1}{4}(26) = 76,6875 + 6,50 = \mathbf{83,19\text{ ms}}$.
  - $\text{RTO}_3 = 241,25 + 4 \times 83,1875 = \mathbf{574,00\text{ ms}}$.

---

## 10.23 y 10.24 Control de Congestión en TCP: Reparto Equitativo y Ejercicio con 10% de Pérdida
- **PDF del subtema**: [`10.23_y_10.24_Control_Congestion_TCP_Ejemplo_y_Ejercicio_Resuelto.pdf`](./10.23_y_10.24_Control_Congestion_TCP_Ejemplo_y_Ejercicio_Resuelto.pdf) | **Solución individual**: [`10.23_y_10.24_Control_Congestion_TCP_Ejemplo_y_Ejercicio_Resuelto.md`](./10.23_y_10.24_Control_Congestion_TCP_Ejemplo_y_Ejercicio_Resuelto.md)
- **Diapositivas**: 167, 176, 177, 178

### 1. Enunciado del Ejemplo y del Ejercicio Resuelto (Diapositivas 167 y 176–178)
1. **Reparto equitativo de ancho de banda (Diap. 167)**: Tres conexiones TCP (`A—X`, `B—Y`, `C—Z`) comparten un enlace troncal de $1\text{ Gb/s}$, pero el host `C` se conecta a través de un acceso de $100\text{ Mb/s}$. Explicar cómo se reparte el enlace de $1\text{ Gb/s}$ a medida que se activan las conexiones.
2. **Ejercicio de Control de Congestión sobre medio con errores (Diap. 176–178)**:
   Una conexión TCP (con segmentos de $1\text{ KB}$ y opción **SACK** negociada) opera sobre un medio físico ruidoso que **pierde exactamente 1 trama de cada 10** (las tramas `10, 20, 30, 40, 50...`). El nivel de enlace descarta las tramas con CRC erróneo sin retransmitirlas.
   - Detallar en una tabla la evolución de la **ventana de congestión (`cwnd`)**, las **tramas enviadas**, los **segmentos transportados** y el **umbral de peligro (`ssthresh`)**, partiendo de `cwnd = 1 KB` y `ssthresh = 64 KB`.
   - Estimar si la merma de rendimiento será menor del $10\%$, alrededor del $10\%$ o **mucho mayor del $10\%$**, y cómo influye el $\text{RTT}$.

---

### 2. Solución Paso a Paso y Explicación ("¿Por qué TCP se hunde ante errores físicos de radio/fibra?")

#### A. Reparto Equitativo (Diapositiva 167)
- Cuando solo transmite `A—X`, ocupa el $100\%$ ($1\text{ Gb/s}$).
- Cuando entra `B—Y`, el algoritmo AIMD (*Additive Increase, Multiplicative Decrease*) hace converger a ambos hacia la igualdad: **$500\text{ Mb/s}$ para `A—X` y $500\text{ Mb/s}$ para `B—Y`**.
- Cuando entra `C—Z`, una división en tercios le daría $333\text{ Mb/s}$, pero `C` está limitado físicamente por su acceso de **$100\text{ Mb/s}$**. Por tanto, `C—Z` toma $100\text{ Mb/s}$ y los $900\text{ Mb/s}$ sobrantes se reparten a partes iguales entre `A—X` (**$450\text{ Mb/s}$**) y `B—Y` (**$450\text{ Mb/s}$**) (*Max-Min Fairness*).

#### B. Tabla Completa de Evolución de `cwnd` y `ssthresh` cuando se pierde 1 de cada 10 tramas (Diapositiva 177)
*Nota clave*: Se pierden las **tramas `10, 20, 30, 40, 50`** en el cable. Como se usa **SACK (*Selective ACK*)**, cuando en una ráfaga se pierde una sola trama (p. ej. la trama 10 que lleva el segmento 10), los demás segmentos de esa misma ventana (`11..15`) **sí llegan y quedan guardados en el receptor**, por lo que al expirar el timeout TCP solo tiene que retransmitir el segmento perdido (`10`) y luego continúa desde el `16`:

| Fase | `cwnd` (KB) | Nº de Trama en la Línea (en negrita la perdida) | Nº de Segmento TCP Enviado | `ssthresh` (Umbral Peligro, KB) | Explicación de lo que ocurre en cada RTT |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **S.S.** | `1` | `1` | `1` | `64` | Arranque lento inicial (*Slow Start*). Llega OK. |
| **S.S.** | `2` | `2, 3` | `2, 3` | `64` | Se duplica `cwnd`. Llegan OK. |
| **S.S.** | `4` | `4, 5, 6, 7` | `4, 5, 6, 7` | `64` | Se duplica `cwnd`. Llegan OK. |
| **S.S.** | `8` | `8, 9,` **`10`**, `11, 12, 13, 14, 15` | `8, 9,` **`10`**, `11, 12, 13, 14, 15` | `64` | **¡Falla la Trama 10 (Segm. 10)!** Los segmentos `11..15` se salvan gracias a SACK. Al fallar con `cwnd=8`, el nuevo umbral cae a la mitad: **`ssthresh = 8 / 2 = 4 KB`** y **`cwnd` se reinicia a `1 KB`**. |
| **S.S.** | `1` | `16` | `10` *(retransm.)* | `4` | Se retransmite el Segmento `10` en la Trama `16`. |
| **S.S.** | `2` | `17, 18` | `16, 17` | `4` | Sigue en Slow Start ($2 < 4$). Envía segmentos nuevos `16, 17`. |
| **S.S.** | `4` | `19,` **`20`**, `21, 22` | `18,` **`19`**, `20, 21` | `4` | Alcanza `cwnd = 4`. **¡Falla la Trama 20 (Segm. 19)!** `ssthresh` vuelve a caer a la mitad: **`ssthresh = 4 / 2 = 2 KB`** y **`cwnd = 1 KB`**. |
| **S.S.** | `1` | `23` | `19` *(retransm.)* | `2` | Retransmite el Segmento `19`. |
| **S.S.** | `2` | `24, 25` | `22, 23` | `2` | Al llegar a `cwnd = 2 == ssthresh`, termina Slow Start y pasa a **Evitación de Congestión (C.A., crecimiento lineal $+1\text{ KB}$ por RTT)**. |
| **C.A.** | `3` | `26, 27, 28` | `24, 25, 26` | `2` | Crece linealmente a `3`. Llegan OK. |
| **C.A.** | `4` | `29,` **`30`**, `31, 32` | `27,` **`28`**, `29, 30` | `2` | Crece a `4`. **¡Falla la Trama 30 (Segm. 28)!** `ssthresh = 4 / 2 = 2 KB`, `cwnd = 1 KB`. |
| **S.S.** | `1` | `33` | `28` *(retransm.)* | `2` | Retransmite el Segmento `28` y el ciclo periódico (`1 → 2 → 3 → 4 → fallo`) se repite indefinidamente: Trama **`40`** (Segm. **`37`**), Trama **`50`** (Segm. **`46`**)... |

#### C. ¿Por qué la pérdida de rendimiento es MUCHO MAYOR del 10% (Diapositiva 178)?
- **Respuesta**: **Opción C (Mayor del 10%)**.
- **¿Por qué?** Porque el diseño de TCP asume que **toda pérdida de paquete se debe a congestión en las colas de los routers**, nunca a ruido físico en el cable. Por eso, cada vez que el ruido destruye 1 de cada 10 tramas, TCP no solo pierde ese $10\%$ de tramas, sino que **espera a que expire el timeout (o duplicados) y hunde su ventana de congestión a `cwnd = 1 KB` y su umbral a `2 KB`**, quedando atrapado permanentemente en una ventana ridículamente pequeña (media de $\approx 2,5\text{ KB}$ por RTT) que le impide llenar la tubería del enlace.
- **Influencia del RTT**: Cuanto **mayor sea el RTT**, **muchísimo peor será el rendimiento**, porque tras cada error TCP tarda varios RTTs en recuperar la ventana y permanece parado durante el RTO. Solo en el caso hipotético e irreal de $\text{RTT} = 0$ la merma sería exactamente del $10\%$.

---

## 10.26 Factor de Escala en Redes LFN: Caso Real IFIC-CERN y Ejercicio Resuelto
- **PDF del subtema**: [`10.26_Factor_de_Escala_Problema_LFN_Ejemplo_CERN_y_Ejercicio_Resuelto.pdf`](./10.26_Factor_de_Escala_Problema_LFN_Ejemplo_CERN_y_Ejercicio_Resuelto.pdf) | **Solución individual**: [`10.26_Factor_de_Escala_Problema_LFN_Ejemplo_CERN_y_Ejercicio_Resuelto.md`](./10.26_Factor_de_Escala_Problema_LFN_Ejemplo_CERN_y_Ejercicio_Resuelto.md)
- **Diapositivas**: 197, 198, 199, 200, 201, 202, 203, 204

### 1. Enunciado del Caso Real (IFIC Valencia – CERN Ginebra) y del Ejercicio (Diapositivas 197–204)
1. **Caso Real IFIC–CERN (Diap. 199–202)**: Entre Valencia y el CERN (Ginebra) hay enlaces de **$100\text{ Mb/s}$** de capacidad y un **$\text{RTT} = 43\text{ ms}$** (medido con `ping cern.ch`). Sin embargo, al hacer una transferencia FTP se observa que **no pasa de $9–12,2\text{ Mb/s}$**, mientras que si se lanzan varias transferencias FTP en paralelo sí se alcanzan los $100\text{ Mb/s}$.
   - Demostrar matemáticamente por qué ocurre esto y calcular qué **Factor de Escala de Ventana (*TCP Window Scale*, RFC 1323)** se necesita para saturar los $100\text{ Mb/s}$ con una sola conexión.
2. **Ejercicio Resuelto LFN (Diap. 204)**: Una sesión TCP opera sobre un enlace con $\text{BW} = 100\text{ Mb/s}$ y $\text{RTT} = 20\text{ ms}$. Calcular el **caudal máximo aprovechable** si el factor de escala no está disponible.

---

### 2. Solución Paso a Paso y Explicación ("¿Por qué el campo Ventana de 16 bits frena las redes rápidas?")

#### A. La Ecuación Fundamental del Producto Ancho de Banda por Retardo ($	ext{BDP} = \text{BW} \times \text{RTT}$)
En la cabecera TCP clásica, el campo **Ventana de Recepción (`Window`)** tiene solo **16 bits**, por lo que el número máximo de bytes que el emisor puede enviar sin parar a esperar un ACK es:
$$W_{\text{máx}} = 2^{16} - 1 = 65.535\text{ bytes} \approx 65.536\text{ B} = \mathbf{524.288\text{ bits}}$$
Como el emisor solo puede enviar una ventana $W$ por cada tiempo de ida y vuelta ($	ext{RTT}$), el **caudal máximo alcanzable por una única conexión TCP** está acotado por:
$$\text{Caudal máximo} = \frac{W}{\text{RTT}}$$

#### B. Análisis del Caso Real Valencia–CERN ($	ext{RTT} = 43\text{ ms} = 0,043\text{ s}$, Diap. 202)
1. **Sin Factor de Escala ($W = 64\text{ KB} = 524.288\text{ bits}$)**:
   $$\text{Caudal máx.} = \frac{524.288\text{ bits}}{0,043\text{ s}} = 12.192.744\text{ b/s} \approx \mathbf{12,2\text{ Mb/s}}$$
   *(¡Por eso una sola sesión FTP jamás podía superar los $\approx 12\text{ Mb/s}$ aunque la fibra estuviera vacía a $100\text{ Mb/s}$, mientras que 8 sesiones FTP en paralelo sumaban $8 \times 12,2 \approx 97,6\text{ Mb/s}$!).*
2. **Activando la opción *Window Scale* en el segmento `SYN` ($W_{\text{efectiva}} = W \times 2^S$)**:

| Factor de Escala ($S$) | Multiplicador ($2^S$) | Tamaño de Ventana ($\text{bits}$) | Caudal Máximo ($W / 0,043\text{ s}$) |
| :---: | :---: | :---: | :---: |
| **`0`** (sin escala) | $1\times$ | $524.288\text{ bits}$ ($64\text{ KB}$) | **$12,2\text{ Mb/s}$** |
| **`1`** | $2\times$ | $1.048.576\text{ bits}$ ($128\text{ KB}$) | **$24,4\text{ Mb/s}$** |
| **`2`** | $4\times$ | $2.097.152\text{ bits}$ ($256\text{ KB}$) | **$48,8\text{ Mb/s}$** |
| **`3`** | $8\times$ | $4.194.304\text{ bits}$ ($512\text{ KB}$) | **$97,5\text{ Mb/s}$** ($pprox 100\text{ Mb/s}$) |
| **`4`** | $16\times$ | $8.388.608\text{ bits}$ ($1\text{ MB}$) | **$195,1\text{ Mb/s}$** (cubre el $100\%$ de la interfaz de $100\text{ Mb/s}$) |

- **Límite máximo del Factor de Escala (Diap. 203)**: El desplazamiento máximo permitido por el estándar es **$S = 14$** (multiplicar por $2^{14} = 16.384$), lo que eleva la ventana máxima a **$2^{16 + 14} = 2^{30}\text{ bytes} = 1\text{ GB}$**. Incluso esa ventana de $1\text{ GB}$ ($8\text{ Gbits}$) se queda corta hoy en día en un enlace transoceánico de $100\text{ Gb/s}$ con $\text{RTT} = 86\text{ ms}$ ($	ext{BDP} = 100\text{ Gb/s} \times 0,086\text{ s} = 8,6\text{ Gbits} > 8\text{ Gbits}$).

#### C. Resolución del Ejercicio de la Diapositiva 204 ($	ext{BW} = 100\text{ Mb/s}$, $\text{RTT} = 20\text{ ms}$)
Sustituyendo $W = 65.535\text{ bytes} \times 8 = 524.280\text{ bits}$ y $\text{RTT} = 0,02\text{ s}$:
$$\text{Caudal máximo aprovechable} = \frac{W}{\text{RTT}} = \frac{65.535 \times 8\text{ bits}}{0,02\text{ s}} = 26.214.000\text{ b/s} \approx \mathbf{26,2\text{ Mb/s}}$$
*(Se desaprovecha el $73,8\%$ de la línea de $100\text{ Mb/s}$ por no usar Window Scaling).*

---
