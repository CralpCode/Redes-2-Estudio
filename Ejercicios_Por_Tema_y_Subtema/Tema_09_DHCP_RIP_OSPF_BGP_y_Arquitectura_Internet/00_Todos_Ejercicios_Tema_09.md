# Tema 9: DHCP, RIP, OSPF, BGP y Fragmentación IP — Solucionario Completo Explicado

> **Documento PDF consolidado asociado**: [`00_Todos_Ejercicios_Tema_09.pdf`](./00_Todos_Ejercicios_Tema_09.pdf)

---

## 9.5 Ataques de Spoofing: Ejemplo de IP Spoofing y Filtrado Ingress (RFC 2267)
- **PDF del subtema**: [`9.5_Ataques_de_Spoofing_Ejemplo_IP_Spoofing_y_Solucion.pdf`](./9.5_Ataques_de_Spoofing_Ejemplo_IP_Spoofing_y_Solucion.pdf) | **Solución individual**: [`9.5_Ataques_de_Spoofing_Ejemplo_IP_Spoofing_y_Solucion.md`](./9.5_Ataques_de_Spoofing_Ejemplo_IP_Spoofing_y_Solucion.md)
- **Diapositivas**: 42, 43, 44

### 1. Enunciado del Escenario (Diapositivas 42–44)
Un atacante situado en la red de la **UPV (`158.42.0.0/16`)** con IP real `158.42.4.20` envía un paquete `Ping` dirigido al servidor `147.156.1.3` de la **UV (`147.156.0.0/16`)**, pero **falsificando la dirección IP de origen (`DO: 147.156.8.3`)** para hacerse pasar por otra máquina interna de la UV.
1. Explicar el recorrido del paquete de ida y de la respuesta (`Pong`) sin filtros (Diap. 42).
2. Explicar dónde y cómo se configura el **filtro anti-spoofing (RFC 2267 / BCP 38)** para bloquear este ataque (Diap. 43–44).

### 2. Solución y Explicación ("¿Por qué es así?")
- **¿Qué ocurre sin filtros (Diap. 42)?**
  - Como los routers encaminan mirando **únicamente la IP de destino** (`147.156.1.3`), el router de la UPV, el router de RedIRIS (`EB-Valencia`) y el router de la UV dejan pasar el paquete hasta `147.156.1.3`.
  - La víctima `147.156.1.3` cree que le escribe su vecino `147.156.8.3` y le envía el `Pong` (`Echo Reply`) a `147.156.8.3` (que puede ser un servidor suplantado o una víctima de denegación de servicio por reflexión).
- **Doble Filtro Anti-Spoofing en el Router de Borde (Diap. 43–44)**:
  1. **En la interfaz externa (hacia Internet/RedIRIS)**: Se prohíbe la entrada de paquetes cuya IP de origen pertenezca a la propia red interna (`Deny DO 147.156.0.0/16` entrante desde fuera). *¿Por qué?* Porque ningún paquete legítimo nacido dentro de la UV puede venir desde Internet hacia dentro de la UV.
  2. **En la interfaz interna (hacia la LAN de la UV o en el router del ISP para cada cliente)**: Se prohíbe la salida hacia Internet de paquetes cuya IP de origen **NO** pertenezca al rango asignado a esa red (`Deny DO != 147.156.0.0/16` en la UV, y `Deny DO != 158.42.0.0/16` en la UPV). Si el router de la UPV aplica esta regla en origen, el paquete falsificado con `DO: 147.156.8.3` es destruido antes siquiera de salir a RedIRIS.

---

## 9.8 Protocolo OSPF: Cálculo de Costos, Rutas Asimétricas y Matriz LSDB
- **PDF del subtema**: [`9.8_Protocolo_OSPF_Ejemplo_de_Costos_Ruta_Asimetrica_y_LSDB.pdf`](./9.8_Protocolo_OSPF_Ejemplo_de_Costos_Ruta_Asimetrica_y_LSDB.pdf) | **Solución individual**: [`9.8_Protocolo_OSPF_Ejemplo_de_Costos_Ruta_Asimetrica_y_LSDB.md`](./9.8_Protocolo_OSPF_Ejemplo_de_Costos_Ruta_Asimetrica_y_LSDB.md)
- **Diapositivas**: 63, 64, 65, 66

### 1. Enunciado del Ejercicio OSPF (Diapositivas 63–66)
En OSPF (Cisco), el costo de una interfaz se calcula con la fórmula de referencia de $100\text{ Mb/s}$ ($10^8\text{ b/s}$):
$$\text{Costo OSPF} = \left\lfloor \frac{10^8\text{ b/s}}{\text{Ancho de banda (b/s)}} \right\rfloor$$
Se tiene una red con:
- **`LAN A` (`20.0.0.0/8`)** conectada al router **`X`** a **$10\text{ Mb/s}$** ($\text{Costo} = 10$).
- **`LAN B` (`30.0.0.0/8`)** conectada al router **`Y`** a **$100\text{ Mb/s}$** ($\text{Costo} = 1$).
- **Enlace directo `X—Y` (por interfaz `S0`)**: $128\text{ kb/s}$ ($\text{Costo} = \lfloor 10^8 / 128.000 \rfloor = \mathbf{781}$).
- **Ruta vía router intermedio `Z` (por interfaz `S1`)**:
  - **Caso 1 (Simétrico, Diap. 63)**: Tanto `X—Z` como `Z—Y` son enlaces de $256\text{ kb/s}$ ($\text{Costo} = \lfloor 10^8 / 256.000 \rfloor = \mathbf{390}$ cada uno).
  - **Caso 2 (Asimétrico, Diap. 64)**: La interfaz `S1` de `X` hacia `Z` baja su caudal configurado a $128\text{ kb/s}$ ($\text{Costo} = 781$), pero la interfaz de `Z` hacia `X` mantiene $256\text{ kb/s}$ ($\text{Costo} = 390$).

Se pide calcular los costos de las rutas desde `X` hacia `LAN B` y desde `Y` hacia `LAN A` en ambos casos, y construir la matriz **LSDB (*Link State Data Base*)**.

---

### 2. Solución Paso a Paso y Explicación ("¿Por qué es así?")
**Regla de oro de OSPF**: *El costo de una ruta se calcula sumando exclusivamente los costos de las interfaces por las que el paquete **SALE** en cada salto desde el origen hasta el destino (nunca se suma la interfaz por la que entra)*.

#### A. Caso 1: Enlaces Simétricos (Diapositiva 63)
1. **Desde `X` hacia `LAN B` (`30.0.0.0/8`)**:
   - **Por `S0` (directo `X → Y → LAN B`)**: Sale de `X` por `S0` ($781$) + sale de `Y` hacia `LAN B` ($1$) = **$782$**.
   - **Por `S1` (vía `Z`: `X → Z → Y → LAN B`)**: Sale de `X` por `S1` ($390$) + sale de `Z` hacia `Y` ($390$) + sale de `Y` hacia `LAN B` ($1$) = **$781$**.
   - **Ganador**: Como **$781 < 782$**, `X` envía **todo** el tráfico por abajo (vía `Z`), dejando el enlace directo `X—Y` sin tráfico (solo como respaldo). *(Nota: $781 \ne 782$ por el truncamiento entero de $781,25$ y $390,625$; por una sola unidad de diferencia OSPF NO balancea carga).*
2. **Desde `Y` hacia `LAN A` (`20.0.0.0/8`)**:
   - **Por `S0` (directo `Y → X → LAN A`)**: Sale de `Y` ($781$) + sale de `X` hacia `LAN A` ($10$) = **$791$**.
   - **Por `S1` (vía `Z`: `Y → Z → X → LAN A`)**: Sale de `Y` ($390$) + sale de `Z` ($390$) + sale de `X` hacia `LAN A` ($10$) = **$790$**.
   - **Ganador**: Como **$790 < 791$**, `Y` también envía todo el tráfico vía `Z`.

#### B. Caso 2: Enlace `X—Z` Asimétrico (Diapositiva 64)
1. **Desde `X` hacia `LAN B`**:
   - **Por `S0` (directo)**: $781 + 1 = \mathbf{782}$.
   - **Por `S1` (vía `Z`)**: Ahora salir de `X` hacia `Z` cuesta $781$: $781 + 390 + 1 = \mathbf{1.172}$.
   - **Ganador de ida**: `X` envía todo hacia `LAN B` por el **enlace directo `S0`** ($782 < 1.172$).
2. **Desde `Y` hacia `LAN A`**:
   - En el sentido `Y → Z → X → LAN A`, el paquete **entra** en `X` desde `Z` (no sale por la interfaz lenta de `X`), sino que **sale de `Z` hacia `X`**, cuyo costo sigue siendo **$390$**:
   - Por `S0`: $781 + 10 = 791$.
   - Por `S1` (vía `Z`): $390 + 390 + 10 = \mathbf{790}$.
   - **Ganador de vuelta**: `Y` sigue enviando todo hacia `LAN A` **a través de `Z`** ($790 < 791$). ¡Se produce una **ruta asimétrica** en OSPF!

#### C. Matriz LSDB (*Link State Database*, Diapositiva 66)
La LSDB es la matriz de adyacencia ponderada que todos los routers del área OSPF comparten idéntica en memoria:

| Desde \ Hacia | **X** | **Y** | **Z** | **LAN A** | **LAN B** |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **X** | — | $781$ | $390$ (o **$781$** en caso asim.) | $10$ | — |
| **Y** | $781$ | — | $390$ | — | $1$ |
| **Z** | $390$ | $390$ | — | — | — |
| **LAN A** | $0$ | — | — | — | — |
| **LAN B** | — | $0$ | — | — | — |

---

## 9.10 Mecanismo de Enrutado: Jerarquía entre Métrica, Distancia Administrativa y Máscara Más Larga
- **PDF del subtema**: [`9.10_Mecanismo_de_Enrutado_Ejemplos_Mascara_Distancia_y_Metrica.pdf`](./9.10_Mecanismo_de_Enrutado_Ejemplos_Mascara_Distancia_y_Metrica.pdf) | **Solución individual**: [`9.10_Mecanismo_de_Enrutado_Ejemplos_Mascara_Distancia_y_Metrica.md`](./9.10_Mecanismo_de_Enrutado_Ejemplos_Mascara_Distancia_y_Metrica.md)
- **Diapositivas**: 77, 83, 84, 85

### 1. Enunciado de las Preguntas y Ejercicios (Diapositivas 77, 83–85)
1. **Ejercicio de Máscara Más Larga (Diap. 77)**: Se configuran en un router tres rutas estáticas:
   - `a) ip route 20.0.0.0 255.255.254.0 10.0.0.1` (`/23`)
   - `b) ip route 20.0.0.0 255.255.255.0 10.0.0.2` (`/24`)
   - `c) ip route 20.0.0.0 255.255.255.128 10.0.0.3` (`/25`)
   ¿Cuáles se instalan en la tabla de rutas y por dónde sale un paquete dirigido a `20.0.0.1`?
2. **Ruta estática flotante y OSPF (`show ip route`, Diap. 83–84)**: Explicar qué significa `[110/782]` frente a `S* 0.0.0.0/0 [201/0] via 10.0.4.5`.
3. **Diagrama completo de selección e instalación de rutas (Diap. 85)**: Dados múltiples procesos de routing (RIP con d.a. 120, OSPF con d.a. 110, Rutas Estáticas con d.a. 130), explicar en qué orden exacto actúan la **Métrica**, la **Distancia Administrativa** y la **Longitud de Máscara**.

### 2. Solución y Explicación ("¿Por qué es así?")
1. **Resolución del Ejercicio de la Diapositiva 77**:
   - **¿Se instalan las tres rutas en la tabla?** **SÍ**, porque en IP dos prefijos con **distinta longitud de máscara** (`/23`, `/24`, `/25`) se consideran **destinos de red diferentes** y jamás compiten entre sí al instalarse en la tabla.
   - **¿Por dónde sale el paquete hacia `20.0.0.1`?** El paquete cumple las tres condiciones (`20.0.0.1` está dentro de `.0/23`, de `.0/24` y de `.0/25`), pero el motor de reenvío elige siempre la **coincidencia de máscara más larga (*Longest Prefix Match*)**: gana la ruta **`c)` (`/25`, 25 bits)** y se envía a **`10.0.0.3`**.
2. **Las 3 Reglas de Oro del Mecanismo de Enrutado (Diapositiva 85)**:
   Es fundamental no confundir el momento de **construir la tabla de rutas** (Plano de Control) con el momento de **reenviar un paquete** (Plano de Datos):
   - **Fase 1 — Dentro de cada protocolo de routing (**Métrica**)**: Si OSPF aprende dos rutas hacia el **mismo prefijo y misma máscara** (ej. `R5 L:24 Met:234` y `R6 L:24 Met:357`), el propio protocolo OSPF elige la de **menor métrica** (`R5`, métrica 234). Si hay empate de métrica (`R7` y `R9` con `L:16 Met:135`), instala ambas para balanceo de carga (ECMP).
   - **Fase 2 — Entre distintos protocolos hacia el MISMO prefijo y MISMA máscara (**Distancia Administrativa, d.a.**)**: Si RIP (d.a. 120), OSPF (d.a. 110) y una ruta estática (configurada con d.a. 130) ofrecen rutas para el **mismo prefijo exacto `/24`**, como las métricas de RIP (saltos) y OSPF (ancho de banda) no son comparables, el router elige al ganador por **menor Distancia Administrativa**: gana **OSPF (`d.a. 110`)** y solo se instala `R5 L:24` en la tabla de rutas.
   - **Fase 3 — Al llegar cada paquete entrante (**Máscara Más Larga**)**: Una vez que las rutas ganadoras ya están en la tabla de rutas (`R5 L:24`, `R3 L:18`, `R7/R9 L:16`, `R11 L:14`), el proceso de enrutado **ya NO mira ni la métrica ni la distancia administrativa**: busca todas las entradas de la tabla que coincidan con la IP destino del paquete y elige **exclusivamente la de máscara más larga (`L` mayor)**, aunque provenga de un protocolo con peor distancia administrativa.

---

## 9.14a Fragmentación IPv4: Ejemplos en Origen, en Ruta y Fragmentación Múltiple
- **PDF del subtema**: [`9.14a_Fragmentacion_IP_Ejemplos_en_Origen_Ruta_y_Multiple.pdf`](./9.14a_Fragmentacion_IP_Ejemplos_en_Origen_Ruta_y_Multiple.pdf) | **Solución individual**: [`9.14a_Fragmentacion_IP_Ejemplos_en_Origen_Ruta_y_Multiple.md`](./9.14a_Fragmentacion_IP_Ejemplos_en_Origen_Ruta_y_Multiple.md)
- **Diapositivas**: 113, 114, 115, 116, 117

### 1. Enunciado de los Tres Casos de Fragmentación IPv4 (Diapositivas 113–117)
Calcular el tamaño total, la carga de datos, el bit `MF` (*More Fragments*) y el campo **Desplazamiento de Fragmento (*Fragment Offset*)** en tres escenarios (cabecera IP sin opciones = $20\text{ bytes}$):
1. **Caso 1 (En origen, Diap. 113)**: Un host envía un datagrama UDP con $8.172\text{ bytes}$ de carga UDP (Datagrama IP = $8.192\text{ bytes}$) por una interfaz Ethernet ($	ext{MTU} = 1.500\text{ bytes}$).
2. **Caso 2 (En ruta, Diap. 114)**: Un host en Token Ring ($	ext{MTU} = 4.440$) envía un segmento TCP de $4.420\text{ bytes}$ (Datagrama IP = $4.440\text{ bytes}$) que atraviesa un router hacia Ethernet DIX ($	ext{MTU} = 1.500\text{ bytes}$).
3. **Caso 3 (Fragmentación múltiple en cascada, Diap. 115 y 117)**: Los fragmentos del Caso 2 llegan a otro router que los encamina por un enlace serie PPP de bajo retardo con **$	ext{MTU} = 296\text{ bytes}$**.

---

### 2. Reglas Fundamentales y Solución Paso a Paso ("¿Por qué múltiplos de 8 bytes?")
- **¿Por qué los datos de todo fragmento (excepto el último) deben ser obligatoriamente múltiplos de 8 bytes?**
  Porque en la cabecera IPv4 el campo *Longitud Total* tiene **16 bits** (mide hasta $65.535\text{ bytes}$), pero el campo ***Fragment Offset* solo dispone de 13 bits** (porque los otros 3 bits son los flags `Res`, `DF`, `MF`). Con 13 bits solo se pueden numerar $2^{13} = 8.192$ posiciones; para poder direccionar hasta $65.536\text{ bytes}$, el estándar IPv4 define la unidad de desplazamiento en **bloques de $8\text{ bytes}$** ($65.536 / 8 = 8.192$). Por tanto:
  $$\text{Offset} = \frac{\text{Primer byte de datos del fragmento}}{8}$$

#### A. Solución Caso 1: Datagrama IP de $8.192\text{ bytes}$ ($8.172\text{ B}$ de datos IP) en $	ext{MTU} = 1.500\text{ B}$
- En cada fragmento Ethernet caben como máximo $1.500 - 20 = 1.480\text{ bytes}$ de datos IP. Como $1.480 / 8 = 185$ (entero), **$1.480$ ya es múltiplo de 8**.
- Reparto de los $8.172\text{ bytes}$ de datos IP: $8.172 = 5 \times 1.480 + 772$:
  - **Fragmentos 1 al 5**: Longitud total = **$1.500\text{ B}$** ($20\text{ B cab. IP} + 1.480\text{ B datos}$), `MF = 1`, Offsets: $0, 185, 370, 555, 740$. *(Solo el Fragmento 1 lleva la cabecera UDP de 8 bytes).*
  - **Fragmento 6**: Datos restantes = $772\text{ B}$ $\implies$ Longitud total = $772 + 20 = \mathbf{792\text{ B}}$, `MF = 0`, Offset = $5 \times 185 = \mathbf{925}$.

#### B. Solución Caso 2 y Caso 3: Token Ring ($4.440\text{ B}$) $\to$ Ethernet ($1.500\text{ B}$) $\to$ PPP ($	ext{MTU} = 296\text{ B}$)
1. **Paso por Ethernet ($	ext{MTU} = 1.500\text{ B}$, máx. $1.480\text{ B}$ de datos por fragmento)**:
   El datagrama original tiene $4.420\text{ B}$ de datos ($4.420 = 2 \times 1.480 + 1.460$):
   - **Fragmento 1**: Longitud = **$1.500\text{ B}$** ($1.480\text{ B}$ datos: bloques `ABCDEF`), `MF = 1`, `Offset = 0`.
   - **Fragmento 2**: Longitud = **$1.500\text{ B}$** ($1.480\text{ B}$ datos: bloques `GHIJKL`), `MF = 1`, `Offset = 185` ($1.480 / 8$).
   - **Fragmento 3**: Longitud = **$1.480\text{ B}$** ($1.460\text{ B}$ datos: bloques `MNOPQR`), `MF = 0`, `Offset = 370` ($2.960 / 8$).
2. **Sub-fragmentación en el enlace PPP ($	ext{MTU} = 296\text{ B}$)**:
   - Capacidad máxima de datos por trama PPP: $296 - 20 = 276\text{ bytes}$.
   - **¡Atención!** ¿Es $276$ múltiplo de $8$? $276 / 8 = 34,5$ (**NO es múltiplo de 8**). El mayor múltiplo de $8 \le 276$ es **$34 \times 8 = 272\text{ bytes}$ de datos**.
   - Por tanto, cada sub-fragmento lleno tendrá **$272\text{ B}$ de datos $+ 20\text{ B}$ de cabecera IP = $292\text{ bytes}$ de longitud total** (y avanzará el Offset en $272 / 8 = \mathbf{34}$ unidades).
   - **Sub-fragmentación de `F1` (y de `F2`)**: Sus $1.480\text{ B}$ de datos se dividen en $5 \times 272 + 120 = 1.480\text{ B}$:
     - 5 fragmentos de **$292\text{ B}$** ($272\text{ B}$ datos) + 1 sexto fragmento (`F1.6` / `F2.6`) de $120 + 20 = \mathbf{140\text{ B}}$ (`MF = 1` en todos porque `F1` y `F2` tenían `MF = 1`).
   - **Sub-fragmentación de `F3` ($1.460\text{ B}$ de datos, que empieza en `Offset = 370`, Diap. 117)**:
     $1.460 = 5 \times 272 + 100$:

| Sub-fragmento | Longitud Total | `MF` | Offset (unidades de 8 B) | Bytes de Datos |
| :--- | :---: | :---: | :---: | :---: |
| **`Fragm. 3.1`** | $292\text{ B}$ | `1` | $370$ | $272\text{ B}$ (`M`) |
| **`Fragm. 3.2`** | $292\text{ B}$ | `1` | $370 + 34 = 404$ | $272\text{ B}$ (`N`) |
| **`Fragm. 3.3`** | $292\text{ B}$ | `1` | $404 + 34 = 438$ | $272\text{ B}$ (`O`) |
| **`Fragm. 3.4`** | $292\text{ B}$ | `1` | $438 + 34 = 472$ | $272\text{ B}$ (`P`) |
| **`Fragm. 3.5`** | $292\text{ B}$ | `1` | $472 + 34 = 506$ | $272\text{ B}$ (`Q`) |
| **`Fragm. 3.6`** | **$120\text{ B}$** | **`0`** | $506 + 34 = \mathbf{540}$ | **$100\text{ B}$** (`R`) |

---

## 9.14b Fragmentación IPv4: Preguntas Conceptuales y Ejercicios Resueltos (I a VI)
- **PDF del subtema**: [`9.14b_Fragmentacion_IP_Preguntas_y_Ejercicios_Resueltos_I_a_VI.pdf`](./9.14b_Fragmentacion_IP_Preguntas_y_Ejercicios_Resueltos_I_a_VI.pdf) | **Solución individual**: [`9.14b_Fragmentacion_IP_Preguntas_y_Ejercicios_Resueltos_I_a_VI.md`](./9.14b_Fragmentacion_IP_Preguntas_y_Ejercicios_Resueltos_I_a_VI.md)
- **Diapositivas**: 121, 122, 123, 124, 125, 126

### 1. Preguntas I a IV: Identificación, Campos Comunes, Opciones IP y Temporizador de Reensamblado (Diapositivas 121–124)
- **Pregunta I: ¿Se debe asignar siempre un valor al campo `Identificación` aunque el host emisor no fragmente el paquete?**
  - **Respuesta y por qué**: **SÍ, siempre**. Salvo que el bit `DF = 1` esté activo o el destino esté en la misma LAN física, el host origen desconoce qué enlaces y MTUs atravesará el datagrama en Internet. Si un router intermedio necesita fragmentarlo más adelante, usará el campo `Identificación` que puso el host origen.
- **Pregunta II: ¿Qué 5 campos de la cabecera IP deben coincidir para que el receptor reconozca que varios fragmentos pertenecen al mismo datagrama?**
  - **Respuesta**: `Versión`, `DS` (Tipo de Servicio), **`Identificación`**, **`Protocolo`** (TCP=6, UDP=17, ICMP=1...) y las **`Direcciones IP de origen y de destino`**. *(No basta con mirar solo `Identificación`, porque dos hosts distintos pueden usar casualmente el mismo número de identificación a la vez).*
- **Pregunta III: ¿Qué opciones de la cabecera IPv4 se copian en TODOS los fragmentos y cuáles SOLO en el primero?**
  - **Respuesta**: Las opciones que influyen en el **encaminamiento** (*Strict Source Route* y *Loose Source Route*) deben copiarse en **todos los fragmentos** (para que todos sigan la misma ruta obligatoria). En cambio, las opciones de **telemetría/registro** (*Record Route* y *Timestamp*) solo se copian en el **primer fragmento** para no repetir el trabajo ni multiplicar el *overhead*.
- **Pregunta IV: Si se pierde un fragmento, ¿cuánto tiempo espera el receptor antes de liberar la memoria del búfer de reensamblado?**
  - **Respuesta**: El host receptor decrementa el campo `TTL` de los fragmentos almacenados a razón de $1$ por segundo (o aplica el temporizador de reensamblado acotado por el `TTL` restante al llegar). Cuando llega a $0$, **descarta todos los fragmentos recibidos de ese datagrama** sin pedir retransmisión (pues IP no retransmite).

---

### 2. Pregunta V: Límite de Paquetes por Segundo (pps) Impuesto por el Campo `Identificación` de 16 bits (Diapositiva 125)
#### Enunciado
¿De qué manera limita el `TTL` el número máximo de paquetes por segundo (pps) que un host puede enviar a un mismo destino y protocolo cuando hay fragmentación?

#### Cálculo y Explicación ("¿Por qué es un cuello de botella grave en redes rápidas?")
- El campo `Identificación` de IPv4 tiene **16 bits**, lo que permite únicamente $2^{16} = \mathbf{65.535}$ identificadores distintos posibles.
- Como un fragmento rezagado puede permanecer vivo en la red hasta **`TTL` segundos**, el emisor **no puede reutilizar el mismo número de `Identificación` hacia el mismo par `(IP Destino, Protocolo)` antes de que transcurran `TTL` segundos** (si lo hiciera, un fragmento viejo rezagado podría mezclarse con un fragmento nuevo del mismo ID y corromper los datos).
- Por tanto, la tasa máxima de emisión de datagramas fragmentables es:
  $$\text{Tasa máxima (pps)} = \frac{65.535}{\text{TTL}}$$
  - Con **`TTL = 64`**: $\frac{65.535}{64} = \mathbf{1.024\text{ paquetes/s}}$
  - Con **`TTL = 128`**: $\frac{65.535}{128} = \mathbf{512\text{ paquetes/s}}$
  - Con **`TTL = 255`**: $\frac{65.535}{255} = \mathbf{256\text{ paquetes/s}}$
- *(Esta grave limitación —conocida en el RFC 4963 como Reassemblyazen Problem at High Data Rates— es una de las razones por las que hoy en día TCP activa siempre `DF = 1` con Path MTU Discovery y por las que IPv6 eliminó la fragmentación en ruta y amplió el campo Identification a 32 bits).*

---

### 3. Pregunta VI: Comparación de Fragmentación `TR → Eth → PPP` vs. `TR → PPP` Directo (Diapositiva 126)
#### Enunciado
Un datagrama con **$4.020\text{ bytes}$ de carga útil IP** (longitud total $4.040\text{ B}$) sale de una red Token Ring ($	ext{MTU} = 4.400\text{ B}$). Comparar los fragmentos resultantes si:
- **Caso A (`TR → Eth → PPP`)**: Pasa primero por una Ethernet DIX ($	ext{MTU} = 1.500\text{ B}$) y luego por un enlace PPP ($	ext{MTU} = 296\text{ B}$).
- **Caso B (`TR → PPP`)**: Pasa directamente de Token Ring al enlace PPP ($	ext{MTU} = 296\text{ B}$) sin pasar por Ethernet.

#### Solución Paso a Paso
En el enlace PPP ($	ext{MTU} = 296\text{ B}$), como vimos antes, cada fragmento máximo transporta **$272\text{ bytes}$ de datos** ($292\text{ B}$ totales con cabecera IP).
1. **Caso A (`TR → Eth → PPP`) — 16 fragmentos**:
   - **1º en Ethernet ($	ext{MTU} = 1.500\text{ B} \implies 1.480\text{ B}$ datos máx.)**: Los $4.020\text{ B}$ de datos se dividen en:
     - `F1`: $1.480\text{ B}$ datos ($1.500\text{ B}$ total)
     - `F2`: $1.480\text{ B}$ datos ($1.500\text{ B}$ total)
     - `F3`: $4.020 - 2.960 = \mathbf{1.060\text{ B}}$ datos ($1.080\text{ B}$ total)
   - **2º al llegar a PPP ($	ext{MTU} = 296\text{ B} \implies 272\text{ B}$ datos máx.)**: Como el router PPP fragmenta cada paquete que le llega de forma **independiente** (un router nunca reensambla fragmentos para volver a cortarlos):
     - `F1` ($1.480\text{ B}$ datos $= 5 \times 272 + 120$): produce **5 fragmentos de $292\text{ B}$ + 1 fragmento de $140\text{ B}$** ($120 + 20$).
     - `F2` ($1.480\text{ B}$ datos): produce otros **5 fragmentos de $292\text{ B}$ + 1 fragmento de $140\text{ B}$**.
     - `F3` ($1.060\text{ B}$ datos $= 3 \times 272 + 244$): produce **3 fragmentos de $292\text{ B}$ + 1 fragmento de $264\text{ B}$** ($244 + 20$).
     - **Total Caso A**: $6 + 6 + 4 = \mathbf{16\text{ fragmentos}}$ (con dos "colas" intermedias pequeñas de $140\text{ B}$).
2. **Caso B (`TR → PPP` directo) — 15 fragmentos**:
   - Los $4.020\text{ B}$ de datos se dividen directamente en bloques de $272\text{ B}$:
     $$4.020 = 14 \times 272 + 212$$
   - Produce **14 fragmentos de $292\text{ B}$** ($272 + 20$) y **1 último fragmento de $232\text{ B}$** ($212 + 20$).
   - **Total Caso B**: **$15\text{ fragmentos}$**.
- **¿Por qué dan resultados distintos?** Porque en IPv4 los routers intermedios **nunca reensamblan fragmentos** (solo el host de destino final reensambla). Por tanto, los "recortes sobrantes" de la primera fragmentación en Ethernet (`140 B`) no pueden juntarse con el fragmento siguiente al llegar al router PPP.

---
