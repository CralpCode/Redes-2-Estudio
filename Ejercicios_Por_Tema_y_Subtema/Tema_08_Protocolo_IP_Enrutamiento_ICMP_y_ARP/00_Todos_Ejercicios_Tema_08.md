# Tema 8: Protocolo IP, Enrutamiento, ICMP y ARP — Solucionario Completo Explicado

> **Documento PDF consolidado asociado**: [`00_Todos_Ejercicios_Tema_08.pdf`](./00_Todos_Ejercicios_Tema_08.pdf)

---

## 8.7 y 8.8 Tabla de Rutas: Rutas Asimétricas y Hosts Multihomed
- **PDF del subtema**: [`8.7_y_8.8_Tabla_de_Rutas_Ejemplos_Rutas_Asimetricas_y_Multihomed.pdf`](./8.7_y_8.8_Tabla_de_Rutas_Ejemplos_Rutas_Asimetricas_y_Multihomed.pdf) | **Solución individual**: [`8.7_y_8.8_Tabla_de_Rutas_Ejemplos_Rutas_Asimetricas_y_Multihomed.md`](./8.7_y_8.8_Tabla_de_Rutas_Ejemplos_Rutas_Asimetricas_y_Multihomed.md)
- **Diapositivas**: 33, 34, 35, 36

### 1. Enunciado de los Ejemplos (Diapositivas 33–36)
1. **Tabla de rutas UNIX (`route -n`, Diap. 33)**: Analizar las entradas del host `H1 (11.0.0.2)` y del router `R (12.0.0.3)`.
2. **Rutas asimétricas (Diap. 34)**: Tres LANs (`LAN A: 12.0.0.0/8`, `LAN B: 13.0.0.0/8`, `LAN C: 14.0.0.0/8`) interconectadas por tres routers (`X`, `Y`, `Z`). Explicar por qué los paquetes de `H2 (12.0.0.3)` a `H5 (14.0.0.3)` van por una ruta distinta a los de vuelta.
3. **Host Multihomed `H6` (Diap. 35–36)**: Si sustituimos el router `Z` por un host `H6` con dos tarjetas de red (`12.0.0.4` en `LAN A` y `14.0.0.4` en `LAN C`), ¿encamina paquetes entre `LAN A` y `LAN C`? ¿Por qué interfaz envía su propio tráfico?

### 2. Solución y Explicación ("¿Por qué es así?")
- **Rutas Asimétricas (Diap. 34)**:
  - `H2 (12.0.0.3)` tiene configurado como router por defecto a `Z (12.0.0.4)`, por lo que a la ida el paquete `H2 → H5` pasa directamente de `LAN A` a `LAN C` a través de **`Z`** (1 solo salto).
  - En cambio, `H5 (14.0.0.3)` tiene como router por defecto a `Y (14.0.0.1)`, el cual enruta hacia `12.0.0.0/8` a través de `X (13.0.0.1)` pasando por `LAN B` (2 saltos: **`H5 → Y → X → H2`**).
  - **¿Por qué funciona aunque el camino de ida y vuelta sea diferente?** Porque el protocolo IP es **sin conexión (*stateless*)**: cada router decide el siguiente salto de cada datagrama consultando únicamente su propia tabla de rutas local y la IP de destino del paquete, sin importar por dónde vino la solicitud.
- **Host Multihomed `H6` (Diap. 35–36)**:
  - **¿Pasa paquetes entre `LAN A` y `LAN C`?** **NO**, porque un host tiene desactivado por defecto el reenvío entre interfaces (`IP forwarding = 0`). Si recibe un paquete cuya IP de destino no es ni `12.0.0.4` ni `14.0.0.4`, lo descarta silenciosamente.
  - **¿La tabla de rutas es por interfaz o por host?** Es **única y global para todo el host**. Como `H6` tiene conexión directa a `12.0.0.0/8` (por `E0`) y a `14.0.0.0/8` (por `E1`), y su ruta por defecto apunta a `12.0.0.1` (`E0`), cuando `H6` habla con `LAN C` sale por `E1`, y para cualquier otro destino del mundo (incluida `LAN B`) sale por `E0`.

---

## 8.10 y 8.11 Subredes, Bucle por Ruta por Defecto y Ruta Host (/32)
- **PDF del subtema**: [`8.10_y_8.11_Subredes_Mascaras_Ruta_por_Defecto_y_Ruta_Host.pdf`](./8.10_y_8.11_Subredes_Mascaras_Ruta_por_Defecto_y_Ruta_Host.pdf) | **Solución individual**: [`8.10_y_8.11_Subredes_Mascaras_Ruta_por_Defecto_y_Ruta_Host.md`](./8.10_y_8.11_Subredes_Mascaras_Ruta_por_Defecto_y_Ruta_Host.md)
- **Diapositivas**: 46, 47, 58, 59, 63

### 1. Enunciado de los Casos Prácticos
1. **Subredes y direcciones prohibidas (Diap. 46–47)**: División de la red de clase B `140.40.0.0/16` en 256 subredes `/24` (`255.255.255.0`) para 256 VLANs. ¿Cuántas direcciones IP se pierden?
2. **Bucle de enrutamiento por Ruta por Defecto mal configurada (Diap. 58–59)**: En el router central `X` (conectado a `Y`, `Z`, `W` y al router de borde hacia Internet `10.0.0.2`), por error se configura la ruta por defecto `0.0.0.0/0 por 90.0.0.10` (apuntando a `W`) en lugar de `por 10.0.0.2` (Internet). ¿Qué ocurre cuando llega un paquete hacia Internet?
3. **Ruta Host `/32` para movilidad (Diap. 63)**: El host `H (30.0.0.25)` de `LAN B (30.0.0.0/24)` se traslada temporalmente a `LAN C (40.0.0.0/24)` conservando su IP original. ¿Cómo se logra que siga recibiendo tráfico?

### 2. Solución y Explicación ("¿Por qué es así?")
1. **Direcciones prohibidas al subnetear**:
   - Sin subredes (`140.40.0.0/16`), solo había **2 direcciones prohibidas** (`140.40.0.0` identificador de red y `140.40.255.255` broadcast), quedando $65.536 - 2 = 65.534$ hosts útiles.
   - Al dividir en **256 subredes `/24`**, cada subred `140.40.x.0/24` reserva su primera dirección (`140.40.x.0`, todos los bits de host a `0`) y su última dirección (`140.40.x.255`, todos los bits de host a `1`, broadcast dirigido de esa subred). Por tanto, hay **$256 \times 2 = 512$ direcciones prohibidas** y quedan $256 \times 254 = 65.024$ direcciones útiles.
2. **Bucle entre `X` y `W` por la ruta por defecto (`0.0.0.0/0`, Diap. 59)**:
   - La ruta por defecto (`0.0.0.0/0`) tiene longitud de prefijo $0$ (la máscara más corta posible), por lo que solo se usa cuando **ninguna otra entrada de la tabla coincide**.
   - Si un host envía un paquete hacia una IP externa (ej. `8.8.8.8`), llega a `X`. Como `8.8.8.8` no coincide con `20.0.0.0/24`, `30.0.0.0/24` ni `40.0.0.0/24`, `X` usa su ruta por defecto errónea y se lo envía a `W (90.0.0.10)`.
   - `W` mira su tabla de rutas y su única salida para tráfico no local es su propia ruta por defecto `0.0.0.0/0 por 90.0.0.9`, ¡que apunta de vuelta a `X`!
   - **Resultado**: El paquete queda **rebotando en bucle entre `X` y `W`** hasta que el campo **TTL** de la cabecera IP se decrementa hasta llegar a `0`, momento en que el router lo descarta y devuelve un mensaje `ICMP Time Exceeded`.
3. **Ruta Host (`30.0.0.25/32`) y Host Multihomed Virtual (Diap. 63)**:
   - Al mudarse a `LAN C (40.0.0.0/24)`, el host `H` necesita una IP de `LAN C` (`40.0.0.2/24`) en la misma tarjeta de red para poder hablar con el router local `Z (40.0.0.1)`, además de conservar su IP secundaria `30.0.0.25/32`.
   - En los routers `X`, `Y` y `Z` se añade una **ruta a host específico**: `A 30.0.0.25/32` apuntando hacia `Z` (y en `Z` apuntando a `40.0.0.2`).
   - **¿Por qué los routers `X` e `Y` envían los paquetes de `30.0.0.25` hacia `Z` si tienen otra ruta hacia `30.0.0.0/24` (`LAN B`)?** Por la regla fundamental de ** coincidencia de máscara más larga (*Longest Prefix Match*)**: cuando un paquete va dirigido a `30.0.0.25`, coincide tanto con `30.0.0.0/24` (24 bits) como con `30.0.0.25/32` (32 bits). Como **$32 > 24$**, gana siempre la ruta `/32`.

---

## 8.14 Envíos Broadcast: Análisis de Respuestas ante Ping a Broadcast Dirigido
- **PDF del subtema**: [`8.14_Envios_Broadcast_Ejemplo_Broadcast_Dirigido.pdf`](./8.14_Envios_Broadcast_Ejemplo_Broadcast_Dirigido.pdf) | **Solución individual**: [`8.14_Envios_Broadcast_Ejemplo_Broadcast_Dirigido.md`](./8.14_Envios_Broadcast_Ejemplo_Broadcast_Dirigido.md)
- **Diapositivas**: 77

### 1. Enunciado del Ejercicio (Diapositiva 77)
En una red con dos routers **`X`** e **`Y`** que tienen **desactivado el reenvío de broadcast dirigido** (`no ip directed-broadcast`):
- **LAN de `A`**: `20.0.0.0/24`, con 49 hosts (`20.0.0.2` a `20.0.0.50`) + la interfaz de `X` (`20.0.0.1/24`).
- **LAN de `C`**: `20.0.4.0/24`, con el host `C (20.0.4.2/24)` y el router `Y (20.0.4.1/24)`.
- **Enlace serie `X—Y`**: `20.0.5.0/30` (`X` es `20.0.5.1/30` e `Y` es `20.0.5.2/30`).
- **LAN de `B`**: `20.0.2.0/23` (`20.0.2.0` a `20.0.3.255`), con el router `Y (20.0.2.1/23)` y el host `B (20.0.2.255/23)`.

Determinar cuántas respuestas recibe cada equipo en los siguientes casos:
1. `A`, `B` y `C` ejecutan `ping 20.0.0.255`.
2. Desde Internet se ejecuta:
   - `ping 20.0.0.255`
   - `ping 20.0.4.255`
   - `ping 20.0.5.3`
   - `ping 20.0.2.255`

### 2. Solución Paso a Paso y Explicación ("¿Por qué es así?")
1. **Cuando `A` ejecuta `ping 20.0.0.255`**:
   - Como `A` ya pertenece a la subred `20.0.0.0/24`, la dirección `20.0.0.255` es su **broadcast local**: `A` encapsula el ICMP Echo Request directamente en una trama Ethernet con **MAC destino `FF:FF:FF:FF:FF:FF`** sin pasar por ningún filtrado de router.
   - Lo reciben y responden los otros 48 hosts de la LAN (`20.0.0.3..50`) más la interfaz local del router `X (20.0.0.1)`. Total: **49 respuestas**.
2. **Cuando `B` o `C` (o alguien desde Internet) ejecutan `ping 20.0.0.255`**:
   - Para ellos `20.0.0.255` es un destino remoto; el datagrama llega enrutado en unicast hasta el router `X`.
   - Al llegar a `X`, `X` descubre que `20.0.0.255` es la dirección de **broadcast dirigido** de su interfaz `20.0.0.0/24`. Como tiene **desactivado el broadcast dirigido** (para evitar ataques de amplificación *Smurf*), `X` **no lo difunde por la LAN**, pero como él mismo forma parte de la subred `20.0.0.0/24`, responde únicamente él mismo. Total: **1 respuesta (de `X`)**.
3. **Desde Internet: `ping 20.0.4.255` y `ping 20.0.5.3`**:
   - `20.0.4.255` es el broadcast de `20.0.4.0/24` y `20.0.5.3` es el broadcast del enlace `/30` (`20.0.5.0/30`, cuyo rango es `.0` red, `.1` y `.2` útiles, `.3` broadcast). Ambos llegan al router `Y`, que tiene desactivado el broadcast dirigido y responde solo él. Total: **1 respuesta (de `Y`)** en cada caso.
4. **Desde Internet: `ping 20.0.2.255` (¡Pregunta trampa con máscara `/23`!)**:
   - La LAN de `B` tiene máscara **`/23` (`255.255.254.0`)**, lo que agrupa dos bloques `/24` contiguos: desde `20.0.2.0` hasta `20.0.3.255`.
   - Por tanto, en una red `/23`, la dirección `20.0.2.255` (en binario termina en `0.11111111` en los 9 bits de host) **NO tiene todos los bits de host a 1** (el broadcast real es `20.0.3.255`). ¡`20.0.2.255/23` es una **dirección unicast de host perfectamente válida** asignada al equipo `B`!
   - Por consiguiente, el router `Y` se la entrega normalmente en unicast a `B`, y se recibe **1 respuesta (del host `B`)**.

---

## 8.15 Ejercicios 1 al 5: Diseño VLSM de Subredes, Detección de Errores y Tablas de Rutas
- **PDF del subtema**: [`8.15_Ejercicios_1_al_5_Diseno_de_Subredes_y_Tablas_de_Rutas.pdf`](./8.15_Ejercicios_1_al_5_Diseno_de_Subredes_y_Tablas_de_Rutas.pdf) | **Solución individual**: [`8.15_Ejercicios_1_al_5_Diseno_de_Subredes_y_Tablas_de_Rutas.md`](./8.15_Ejercicios_1_al_5_Diseno_de_Subredes_y_Tablas_de_Rutas.md)
- **Diapositivas**: 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91

### 1. Ejercicio 1: Diseño VLSM para Fábrica y 4 Almacenes con Enlaces Serie Públicos (Diapositivas 78–80)
#### Enunciado
Una empresa dispone del bloque público **`194.100.100.0/24`** (256 direcciones) y debe direccionar tanto las LANs como los 4 enlaces serie punto a punto (todos deben ser accesibles desde Internet):
- **Fábrica (Barcelona)**: 107 ordenadores + 1 interfaz Ethernet del router = **108 IPs útiles**.
- **Almacén Madrid**: 43 ordenadores + 1 interfaz router = **44 IPs útiles**.
- **Almacén Alicante**: 12 ordenadores + 1 interfaz router = **13 IPs útiles**.
- **Almacén Bilbao**: 10 ordenadores + 1 interfaz router = **11 IPs útiles**.
- **Almacén Sevilla**: 11 ordenadores + 1 interfaz router = **12 IPs útiles**.
- **4 Enlaces Serie** (Barna–Mad, Barna–Ali, Barna–Bil, Barna–Sev): 2 extremos por enlace = **2 IPs útiles cada uno**.

#### Solución Paso a Paso y Explicación ("¿Por qué se ordena de mayor a menor en VLSM?")
En **VLSM (*Variable Length Subnet Mask*)** siempre debemos asignar primero las subredes más grandes para que sus direcciones base queden **alineadas a potencias enteras de su propio tamaño de bloque**:
1. **Barcelona ($108$ IPs $\implies$ potencia de 2 superior: $128 = 2^7 \implies /25$, $126$ útiles)**:
   - Subred: **`194.100.100.0/25`** (`255.255.255.128`), Rango útil: `.1` – `.126`, Broadcast: `.127`.
2. **Madrid ($44$ IPs $\implies 64 = 2^6 \implies /26$, $62$ útiles)**:
   - Subred: **`194.100.100.128/26`** (`255.255.255.192`), Rango útil: `.129` – `.190`, Broadcast: `.191`.
3. **Alicante, Bilbao y Sevilla ($13, 11, 12$ IPs $\implies 16 = 2^4 \implies /28$, $14$ útiles cada una)**:
   - **Alicante**: **`194.100.100.192/28`** (`255.255.255.240`), Rango útil: `.193` – `.206`, Broadcast: `.207`.
   - **Bilbao**: **`194.100.100.208/28`** (`255.255.255.240`), Rango útil: `.209` – `.222`, Broadcast: `.223`.
   - **Sevilla**: **`194.100.100.224/28`** (`255.255.255.240`), Rango útil: `.225` – `.238`, Broadcast: `.239`.
4. **4 Enlaces Serie ($2$ IPs útiles cada uno $\implies 4 = 2^2 \implies /30$, $2$ útiles por enlace)**:
   Aprovechamos el último bloque `/28` libre (`194.100.100.240/28`, de `.240` a `.255`) dividiéndolo en 4 subredes `/30`:
   - **S. Barna–Mad**: **`194.100.100.240/30`** (`255.255.255.252`), Rango útil: `.241` – `.242`, Broadcast: `.243`.
   - **S. Barna–Ali**: **`194.100.100.244/30`**, Rango útil: `.245` – `.246`, Broadcast: `.247`.
   - **S. Barna–Bil**: **`194.100.100.248/30`**, Rango útil: `.249` – `.250`, Broadcast: `.251`.
   - **S. Barna–Sev**: **`194.100.100.252/30`**, Rango útil: `.253` – `.254`, Broadcast: `.255`.
   - *¡Se aprovecha el $100\%$ del espacio `/24` sin desperdiciar ni un solo bloque!*

---

### 2. Ejercicio 2: Diseño con Enlaces Serie Privados y Agregación CIDR en Madrid (Diapositivas 81–83)
#### Enunciado
Asignar el rango **`194.100.100.0/24`** a 4 oficinas empleando **direcciones privadas** en los enlaces serie:
- **Madrid** (conectada a Internet, a Barcelona y a Sevilla): $100$ ordenadores $\implies$ **`194.100.100.0/25`** ($126$ útiles, `.0`–`.127`).
- **Barcelona** (conectada a Madrid y a Bilbao): $50$ ordenadores $\implies$ **`194.100.100.128/26`** ($62$ útiles, `.128`–`.191`).
- **Bilbao** (conectada a Barcelona): $25$ ordenadores $\implies$ **`194.100.100.192/27`** ($30$ útiles, `.192`–`.223`).
- **Sevilla** (conectada a Madrid): $20$ ordenadores $\implies$ **`194.100.100.224/27`** ($30$ útiles, `.224`–`.255`).
- **Enlaces serie**: Internet–Madrid (`192.168.1.0/30`), Madrid–Barcelona (`192.168.2.0/30`), Madrid–Sevilla (`192.168.3.0/30`).

#### Solución de la Tabla de Rutas de Madrid y Supernetting/Agregación
- **Opción sin agregar (4 rutas)**:
  - `A 194.100.100.128/26 por 192.168.2.2` (Barcelona)
  - `A 194.100.100.192/27 por 192.168.2.2` (Bilbao, que cuelga detrás de Barcelona)
  - `A 194.100.100.224/27 por 192.168.3.2` (Sevilla)
  - `A 0.0.0.0/0 por 192.168.1.1` (Internet)
- **Opción optimizada mediante Agregación CIDR (3 rutas)**:
  - Observemos que tanto Barcelona (`.128`–`.191`) como Bilbao (`.192`–`.223`) salen por el mismo vecino (`192.168.2.2`). Aunque Sevilla (`.224`–`.255`) sale por otro vecino (`192.168.3.2`), en Madrid podemos **reemplazar las dos rutas de Barcelona y Bilbao por una sola ruta `/25` hacia toda la mitad superior (`194.100.100.128/25`)**:
    1. **`A 194.100.100.224/27 por 192.168.3.2`** (Sevilla, máscara `/27`)
    2. **`A 194.100.100.128/25 por 192.168.2.2`** (Engloba `.128`–`.255`, máscara `/25`)
    3. **`A 0.0.0.0/0 por 192.168.1.1`** (Internet, máscara `/0`)
  - **¿Por qué funciona sin desviar el tráfico de Sevilla hacia Barcelona?** Porque cuando un paquete va a Sevilla (`.224`–`.255`), cumple tanto la ruta `/25` como la ruta `/27`, pero por la regla de **máscara más larga** ($27 > 25$) el router elige siempre la ruta específica `/27` hacia `192.168.3.2`.

---

### 3. Ejercicio 3: Detección de Dos Errores de Configuración en un Router (Diapositiva 84)
#### Enunciado
Identificar y explicar los dos errores marcados en rojo en la configuración del router:
1. Interfaz `E0`: **`194.125.1.63/26`**
2. Entrada de la tabla de rutas: **`A 160.87.34.0/21 por 195.100.1.1`**

#### Solución y Demostración en Binario ("¿Por qué son inválidas?")
1. **Error 1 (`194.125.1.63/26` en interfaz `E0`) — Dirección de Broadcast asignada a un host/interfaz**:
   - Una máscara `/26` (`255.255.255.192`) deja $32 - 26 = 6\text{ bits}$ para el host (bloques de $2^6 = 64$ direcciones).
   - El primer bloque va de `194.125.1.0` (dirección de subred, últimos 6 bits `000000`) a **`194.125.1.63`** (en binario el último octeto es `00111111`, es decir, **los 6 bits de host están a `1`**).
   - Por tanto, `194.125.1.63/26` es la **dirección de broadcast dirigido** de la subred `194.125.1.0/26` y **no puede asignarse a ninguna interfaz**.
2. **Error 2 (`A 160.87.34.0/21` en la tabla de rutas) — Prefijo de red con bits de host distintos de cero**:
   - Una máscara `/21` abarca los dos primeros octetos ($16\text{ bits}$) más los **$5$ primeros bits del tercer octeto** ($16 + 5 = 21$). Los últimos $3\text{ bits}$ del tercer octeto y todo el cuarto octeto forman la **parte de host** y en una dirección de red deben valer obligatoriamente **`0`**.
   - Descompongamos el tercer octeto (`34`) en binario:
     $$34_{10} = \underbrace{00100}_{\text{5 bits de red}}\underbrace{\mathbf{010}}_{\text{3 bits de host } \ne 0}$$
   - Como el bit de peso $2$ está a `1`, `160.87.34.0` **no es múltiplo de $8$** ($2^3 = 8$) en el tercer octeto. La dirección de subred `/21` correcta debería ser **`160.87.32.0/21`** (donde $32_{10} = 00100\mathbf{000}_2$).

---

### 4. Ejercicio 4: Conexión a Dos Proveedores (ISP X e ISP Y) con 1 o 2 Routers (Diapositivas 85–87)
#### Enunciado y Análisis Técnico ("¿Por qué fracasa con 1 router y funciona con 2?")
La empresa tiene en una misma LAN dos rangos públicos: `199.199.199.0/24` (del Proveedor X, lento) y `200.200.200.0/24` (del Proveedor Y, rápido).
- **Con 1 solo router (Diap. 86)**:
  - Aunque pongamos las dos IPs (`199.199.199.1` y `200.200.200.1`) en la interfaz LAN del router, el enrutamiento IP estándar decide la salida **mirando únicamente la IP de DESTINO del paquete** (en este caso, cualquier servidor de Internet `0.0.0.0/0`), **nunca la IP de origen** (salvo que se use *Policy-Based Routing* no estándar).
  - Por tanto, con rutas normales `0.0.0.0/0`, el router no puede enviar los paquetes de origen `199.199.199.x` por X y los de `200.200.200.x` por Y. Si saca paquetes con origen `199.199.199.x` por el ISP Y, se producen **rutas asimétricas** o, peor aún, el ISP Y **descartará los paquetes por su filtro anti-spoofing** (al ver entrar paquetes con IP de origen que no pertenece a su propio rango asignado).
- **Con 2 routers (Diap. 87)**:
  - El **Router 1** (`199.199.199.1/24`) tiene su ruta por defecto apuntando exclusivamente al **Proveedor X**.
  - El **Router 2** (`200.200.200.1/24`) tiene su ruta por defecto apuntando exclusivamente al **Proveedor Y**.
  - Los ordenadores con IP `199.199.199.x` configuran como *Default Gateway* `199.199.199.1` (Router 1) y los de IP `200.200.200.x` configuran `200.200.200.1` (Router 2). Además, a cada router se le añade una IP secundaria de la otra subred en la LAN para que ambos grupos de ordenadores locales puedan comunicarse entre sí sin salir a Internet.

---

### 5. Ejercicio 5: Separación de Tráfico VoIP (Terrestre) y Datos (Satélite) entre Chicago y Madrid (Diapositivas 88–91)
#### Enunciado
Sedes en **Chicago** (Ordenadores: `193.1.1.128/26`, Teléfonos IP: `193.1.1.192/26`) y **Madrid** (Ordenadores: `193.1.1.0/26`, Teléfonos IP: `193.1.1.64/26`), unidas por un enlace **satélite de $1,5\text{ Mb/s}$** (routers `A` y `B`, enlace `192.168.1.0/30`) y un enlace **terrestre de $128\text{ kb/s}$** (routers `C` y `D`, enlace `192.168.1.4/30`). Se exige que el tráfico entre teléfonos IP vaya **siempre por tierra** (porque el satélite tiene $\approx 250\text{ ms}$ de propagación por salto y arruina la voz) y el resto del tráfico vaya **siempre por satélite**.

#### Solución 1 (Con IPs secundarias `/26` en los routers, Diap. 90) vs. Solución 2 (Supernetting `/25` en los routers, Diap. 91)
- **¿Cómo discriminan el tráfico los hosts y los teléfonos al salir?**
  - En **Chicago**: Los ordenadores `X (193.1.1.130)` tienen como router por defecto al router satélite **`A (193.1.1.129)`**; los teléfonos `Y (193.1.1.194)` tienen como router por defecto al router terrestre **`C (193.1.1.193)`**.
  - En **Madrid**: Los ordenadores `Z (193.1.1.2)` apuntan al router satélite **`B (193.1.1.1)`**; los teléfonos `W (193.1.1.66)` apuntan al router terrestre **`D (193.1.1.65)`**.
- **¿Qué pasa si un teléfono `Y` llama a otro teléfono `W (193.1.1.66)` vs. si un teléfono `Y` envía un paquete a un ordenador `Z (193.1.1.2)`?**
  - En los routers terrestres `C` y `D`, solo la subred de teléfonos remotos (`193.1.1.64/26` en `C`, y `193.1.1.192/26` en `D`) se encamina por la línea serie terrestre (`192.168.1.6` / `192.168.1.5`), mientras que la subred de ordenadores remotos (`193.1.1.0/26` en `C` y `193.1.1.128/26` en `D`) se redirige al router satélite local (`A` o `B`).
- **¿Por qué la Solución 2 (Diap. 91) usa máscara `/25` en los routers y los terminales aunque las subredes sean `/26`?**
  - Porque en Chicago `193.1.1.128/26` y `193.1.1.192/26` comparten el mismo cable físico Ethernet y juntas forman el bloque contiguo `193.1.1.128/25` (y en Madrid `193.1.1.0/26` y `193.1.1.64/26` forman `193.1.1.0/25`). Poniendo máscara `/25`, los routers `A` y `C` (y `B` y `D`) se ven como vecinos directos en la misma red IP sin necesidad de configurar direcciones IP secundarias en cada interfaz Ethernet.

---

## 8.18 y 8.19 Protocolo ARP: Destino Local, Destino Remoto y Gratuitous ARP (GARP)
- **PDF del subtema**: [`8.18_y_8.19_ARP_Basico_y_Avanzado_Ejemplos_ARP_y_GARP.pdf`](./8.18_y_8.19_ARP_Basico_y_Avanzado_Ejemplos_ARP_y_GARP.pdf) | **Solución individual**: [`8.18_y_8.19_ARP_Basico_y_Avanzado_Ejemplos_ARP_y_GARP.md`](./8.18_y_8.19_ARP_Basico_y_Avanzado_Ejemplos_ARP_y_GARP.md)
- **Diapositivas**: 116, 117, 118, 128

### 1. Enunciado de los Ejemplos (Diapositivas 116–118 y 128)
1. **Caso 1 (Destino Local, Diap. 117)**: `X (50.0.0.2/8)` hace `ping 50.0.0.3` (host `Y` en su misma LAN). Detallar el intercambio de tramas y cómo evoluciona la caché ARP de todos los equipos (`X`, `Y`, `Z`, `W`).
2. **Caso 2 (Destino Remoto, Diap. 118)**: `X (50.0.0.2/8)` hace `ping 60.0.0.1` (en Internet). ¿Por qué IP pregunta `X` en su `ARP Request`?
3. **Caso 3 (Gratuitous ARP y Proxy ARP en IP Móvil, Diap. 128)**: Cuando el host `H (30.0.0.25)` se muda de `LAN B` a `LAN C`, ¿qué dos mecanismos ARP ejecuta el router `Y` de `LAN B`?

### 2. Solución y Explicación ("¿Por qué es así?")
- **Caso 1 (`ping 50.0.0.3` — Destino Local)**:
  - `X` aplica su máscara `/8`: como `50.0.0.2` y `50.0.0.3` tienen el mismo prefijo `50`, el destino es **local**.
  - `X` emite en **broadcast Ethernet (`FF:FF:FF:FF:FF:FF`)** un `ARP Request` preguntando por **`50.0.0.3`**.
  - **Optimización clave en la caché ARP**: Aunque `Y`, `Z` y `W` escuchan todos el broadcast de `X` (que incluye la IP y MAC de `X`), **solo `Y` (el destinatario aludido) guarda en su caché ARP la entrada `50.0.0.2 → MAC X`** (porque `Y` seguro tendrá que responder a `X` de inmediato; si `Z` y `W` también guardasen todos los broadcasts de la LAN, sus tablas ARP se llenarían de entradas inútiles). Acto seguido, `Y` responde en **unicast** a `X` con su `ARP Reply`.
- **Caso 2 (`ping 60.0.0.1` — Destino Remoto)**:
  - `X` comprueba que `60` $\ne$ `50`: el destino está fuera de su red. **Regla de oro de ARP**: *Un host NUNCA hace ARP por una IP que no pertenezca a su propia subred*.
  - En su lugar, `X` consulta su tabla de rutas, ve que debe usar su *Default Gateway* (`50.0.0.1`, router `W`) y lanza un **`ARP Request` preguntando por `50.0.0.1` (la IP de su router)**, enviando luego el paquete IP con **IP destino `60.0.0.1` pero MAC destino `W`**.
- **Caso 3 (GARP + Proxy ARP en `LAN B`, Diap. 128)**:
  - Cuando `H (30.0.0.25)` se marcha de `LAN B`, los demás hosts de `LAN B` (como `30.0.0.2`) siguen creyendo que `30.0.0.25` es un vecino local de su cable:
    1. Si `30.0.0.2` ya tenía en su caché ARP la MAC antigua de `H`, el router `Y` emite un **GARP (*Gratuitous ARP*)** anunciando que la IP `30.0.0.25` tiene ahora la **MAC del router `Y`**, forzando la actualización inmediata de las cachés ARP de `LAN B`.
    2. Si un host de `LAN B` hace más tarde un nuevo `ARP Request ¿quién es 30.0.0.25?`, el router `Y` le responde en nombre de `H` con su propia MAC (**Proxy ARP**), captura las tramas y las encamina por nivel 3 hacia `LAN C`.

---

## 8.21 Alimento para la Mente: Discrepancia Deliberada entre Tabla CAM y Caché ARP (Clúster HA)
- **PDF del subtema**: [`8.21_Alimento_para_la_Mente_Ejercicios_CAM_vs_ARP.pdf`](./8.21_Alimento_para_la_Mente_Ejercicios_CAM_vs_ARP.pdf) | **Solución individual**: [`8.21_Alimento_para_la_Mente_Ejercicios_CAM_vs_ARP.md`](./8.21_Alimento_para_la_Mente_Ejercicios_CAM_vs_ARP.md)
- **Diapositivas**: 130, 131, 132

### 1. Enunciado del Problema ("Alimento para la Mente", Diapositivas 130–132)
- Los **switches Ethernet** aprenden su **tabla CAM** leyendo la **MAC de origen de la cabecera Ethernet** de las tramas que entran por cada puerto.
- Los **hosts y routers** aprenden su **caché ARP** leyendo el campo **MAC del emisor dentro de la carga útil del paquete ARP** (`ARP Payload`).
- Normalmente ambas direcciones MAC son idénticas (Diap. 131). Pero en la Diapositiva 132 dos servidores **`C`** (en puerto 3) y **`D`** (en puerto 4) comparten la misma IP **`20.0.0.1/24`** y responden al `ARP Request` de `A (20.0.0.2)` poniendo:
  - En la cabecera de la trama Ethernet: su MAC física real (`20:20:20:20:20:0C` y `20:20:20:20:20:0D`).
  - Dentro del mensaje `ARP Reply`: una MAC distinta (`21:20:20:20:20:00`).

**Preguntas**:
1. ¿Qué queda grabado en la tabla CAM del switch y qué queda en la caché ARP de `A`?
2. ¿Qué ocurre cuando `A` envía paquetes a `20.0.0.1` y **para qué sirve este truco en el mundo real**?

### 2. Solución Detallada y Explicación ("¿Por qué es así?")
1. **Estado de las tablas tras el `ARP Reply` (Diapositiva 132)**:
   - **En la Tabla CAM del Switch**: Como los servidores `C` y `D` usaron sus MACs físicas (`...0C` y `...0D`) como MAC de origen en la cabecera Ethernet, el switch registra `20:20:20:20:20:0C → Puerto 3` y `20:20:20:20:20:0D → Puerto 4`. **¡La dirección `21:20:20:20:20:00` NUNCA aparece como MAC de origen Ethernet, por lo que NO entra en la tabla CAM del switch!**
   - **En la Caché ARP del cliente `A`**: Como `A` rellena su tabla ARP leyendo el interior del paquete ARP, registra **`20.0.0.1 → 21:20:20:20:20:00`**.
2. **¿Qué ocurre cuando `A` envía tramas hacia `20.0.0.1` (MAC destino `21:20:20:20:20:00`)?**
   - Cuando la trama llega al switch con MAC de destino `21:20:20:20:20:00`, el switch busca esa MAC en su tabla CAM y **no la encuentra** (o bien observa que el primer byte `0x21 = 00100001_2` tiene el bit menos significativo a `1`, lo que indica una **dirección MAC Multicast**).
   - Al no conocer un puerto único para `21:20:20:20:20:00`, **el switch inunda (*flooding*) la trama por todos los puertos** (llegando simultáneamente tanto al servidor `C` en el puerto 3 como al servidor `D` en el puerto 4).
3. **¿Qué utilidad tiene esto en la ingeniería de redes real?**
   - Es exactamente el mecanismo que utilizan los **clústeres de balanceo de carga y alta disponibilidad sin hardware adicional** (como **Microsoft NLB — *Network Load Balancing*** o clústeres de firewalls activos-activos):
   - Permite que varios servidores físicos (`C` y `D`) compartan una única IP virtual (`20.0.0.1`) y **reciban ambos todas las tramas de los clientes simultáneamente**, repartiendo las conexiones entrantes entre ellos mediante un algoritmo determinista (por ejemplo, `C` procesa los puertos origen pares y `D` los impares) sin que un servidor acapare en exclusiva el puerto de la tabla CAM del switch.

---

## 8.22 Alta Disponibilidad del Router por Defecto: Evolución hacia HSRP y VRRP
- **PDF del subtema**: [`8.22_Alta_Disponibilidad_Problema_y_Ejemplo_VRRP.pdf`](./8.22_Alta_Disponibilidad_Problema_y_Ejemplo_VRRP.pdf) | **Solución individual**: [`8.22_Alta_Disponibilidad_Problema_y_Ejemplo_VRRP.md`](./8.22_Alta_Disponibilidad_Problema_y_Ejemplo_VRRP.md)
- **Diapositivas**: 134, 135, 136, 137, 138

### 1. Enunciado del Problema de Alta Disponibilidad (Diapositivas 134–138)
Se tienen dos routers en una LAN (`10.0.0.0/24`): el router **`A`** (activo, `10.0.0.1`, MAC `...0A` en el puerto 2 del switch) y el router **`B`** (en reserva/*standby*, `10.0.0.2`, MAC `...0B` en el puerto 3 del switch). El host `H (10.0.0.50)` tiene configurado como router por defecto `10.0.0.1`.
Analizar qué ocurre cuando el router `A` se avería bajo tres estrategias sucesivas:
1. **Intento 1 (Diap. 136 — Solo cambio de IP)**: `B` detecta que `A` ha caído y asume la IP `10.0.0.1`.
2. **Intento 2 (Diap. 137 — Cambio de IP + envío de GARP)**: `B` asume la IP `10.0.0.1` y envía un *Gratuitous ARP* anunciando su MAC `...0B`.
3. **Solución Definitiva (Diap. 138 — VRRP / HSRP con IP y MAC Virtual)**: Ambos comparten una IP virtual y una **MAC Virtual (`MACv: ...FF`)**.

### 2. Análisis Técnico Comparativo ("¿Por qué se necesita VRRP?")
- **¿Por qué falla el Intento 1 (Solo cambiar la IP en `B`, Diap. 136)?**
  - Porque el host `H` ya tiene en su **caché ARP** la asociación `10.0.0.1 → MAC A (...0A)`. Mientras esa entrada no caduque (lo que en muchos sistemas operativos tarda hasta **15 minutos**), `H` seguirá enviando todas sus tramas Ethernet con MAC destino `...0A` hacia el router muerto, quedando incomunicado durante 15 minutos.
- **¿Qué mejora el Intento 2 (Cambio de IP + GARP, Diap. 137) y qué limitaciones conserva?**
  - Al emitir `B` un **GARP** (`10.0.0.1 está en MAC ...0B`), el host `H` actualiza al instante su caché ARP y la red se recupera en pocos segundos.
  - **Sin embargo, tiene dos defectos en redes reales**: (1) algunos dispositivos antiguos o con pilas TCP/IP embebidas simples ignoran los paquetes GARP si no han hecho una petición ARP previa; y (2) todas las máquinas de la LAN se ven obligadas a procesar tramas broadcast ARP y modificar sus tablas de nivel 3.
- **¿Por qué es superior el Intento 3 (VRRP / HSRP con MAC Virtual `MACv`, Diap. 138)?**
  - En **VRRP (RFC 3768)**, el router activo responde a los ARP de `10.0.0.1` dando una **MAC Virtual (`00:00:5E:00:01:XX`, en la diapositiva `...FF`)**.
  - Cuando `A` cae, `B` toma posesión de esa misma `MACv (...FF)` y emite una trama con origen `MACv` por el puerto 3 del switch.
  - **Ventaja crucial**: ¡En el host `H` **NO cambia absolutamente nada** (ni su IP de gateway ni su caché ARP, que sigue apuntando a `10.0.0.1 → ...FF`)! Lo único que se actualiza es **la tabla CAM del switch Ethernet**, que mueve la dirección `...FF` del puerto 2 al puerto 3 en cuestión de milisegundos. La conmutación por fallo (*failover*) es **100% transparente para todos los hosts de la LAN**.

---

## 8.24 Problemas 1, 2 y 3 (3.1 a 3.4): Secuencia Completa de Tramas Ethernet, Switches y Máscaras
- **PDF del subtema**: [`8.24_Ejercicios_Problemas_1_2_y_3_Encaminamiento_y_Tramas.pdf`](./8.24_Ejercicios_Problemas_1_2_y_3_Encaminamiento_y_Tramas.pdf) | **Solución individual**: [`8.24_Ejercicios_Problemas_1_2_y_3_Encaminamiento_y_Tramas.md`](./8.24_Ejercicios_Problemas_1_2_y_3_Encaminamiento_y_Tramas.md)
- **Diapositivas**: 146, 147, 148, 149, 150, 151, 152, 153, 154, 155

### 1. Problema 1: Ping a través de Switches y Router Recién Encendidos (Diapositivas 147–149)
#### Enunciado
Todos los equipos y switches se acaban de encender (cachés ARP vacías y tablas CAM vacías). El host **`A` (`130.206.212.7/24`, Rtr: `130.206.212.1`)** ejecuta `ping 130.206.220.5` hacia el host **`D` (`130.206.220.5/24`, Rtr: `130.206.220.1`)**.
- Entre `A` y la interfaz **`B` (`130.206.212.1/24`)** del router hay un switch que une los segmentos `Red A`, `Red B` (donde está `A`) y `Red C` (donde está `B`).
- Entre la interfaz **`C` (`130.206.220.1/24`)** del router y el host `D` hay **dos switches en cascada** que unen `Red D` (donde está `C`), `Red E` (entre ambos switches) y `Red F` (donde está `D`).

#### Solución: Las 8 Tramas Lógicas (Diap. 148) y los 20 Sucesos Físicos por Segmento (Diap. 149)

| Nº Trama | MAC Origen | MAC Destino | Ethertype | Contenido / Mensaje | Segmentos que atraviesa (Sucesos) |
| :---: | :---: | :---: | :---: | :--- | :--- |
| **1** | `A` | `FF:FF:FF:FF:FF:FF` | `ARP (0x0806)` | `ARP Req: ¿quién es 130.206.212.1?` | `Red B` (1) $\to$ Switch inunda a `Red A` (2.1) y `Red C` (2.2). *(El switch aprende `A` en `Red B`)* |
| **2** | `B` | `A` | `ARP (0x0806)` | `ARP Resp: 130.206.212.1 es B` | `Red C` (3) $\to$ Switch envía solo a `Red B` (4) porque ya conoce dónde está `A`. *(Aprende `B` en `Red C`)* |
| **3** | `A` | `B` | `IP (0x0800)` | `ICMP Echo Req para 130.206.220.5` | `Red B` (5) $\to$ `Red C` (6). *(No sale por `Red A`)* |
| **4** | `C` | `FF:FF:FF:FF:FF:FF` | `ARP (0x0806)` | `ARP Req: ¿quién es 130.206.220.5?` | `Red D` (7) $\to$ `Red E` (8) $\to$ `Red F` (9). *(Ambos switches aprenden dónde está `C`)* |
| **5** | `D` | `C` | `ARP (0x0806)` | `ARP Resp: 130.206.220.5 es D` | `Red F` (10) $\to$ `Red E` (11) $\to$ `Red D` (12). *(Ambos switches aprenden dónde está `D`)* |
| **6** | `C` | `D` | `IP (0x0800)` | `ICMP Echo Req para 130.206.220.5` | `Red D` (13) $\to$ `Red E` (14) $\to$ `Red F` (15). |
| **7** | `D` | `C` | `IP (0x0800)` | `ICMP Echo Reply para 130.206.212.7` | `Red F` (16) $\to$ `Red E` (17) $\to$ `Red D` (18). *(¡`D` NO hace ARP por `C` porque ya anotó la MAC de `C` cuando `C` le preguntó en la trama 4!)* |
| **8** | `B` | `A` | `IP (0x0800)` | `ICMP Echo Reply para 130.206.212.7` | `Red C` (19) $\to$ `Red B` (20). *(¡`B` tampoco hace ARP por `A` porque ya aprendió la MAC de `A` en la trama 1!)* |

---

### 2. Problema 2: Diseño de Red con Radioenlace entre Oficina Vieja y Oficina Nueva (Diapositivas 150–151)
#### Enunciado
Conectar una **Oficina Vieja** (host `C`, router `Z` hacia Internet `192.169.15.6/30` y router `Y`) y una **Oficina Nueva** (hosts `A` y `B`, router `X`) unidas por un **enlace LAN inalámbrico** usando el rango público **`195.123.0.0/24`**.
1. Asignar direcciones y tablas de rutas en `X`, `Y`, `Z` y hosts `A, B, C`.
2. ¿Cuántas tramas MAC atraviesan el radioenlace si `A` hace `ping` a `B`? ¿Y si `A` hace `ping` a `C`?
3. ¿Qué pasaría si suprimiésemos el router `X` o el router `Y` (dejando puentes/APs de capa 2)?

#### Solución y Explicación ("¿Por qué poner routers a ambos lados del radioenlace?")
1. **Reparto de subredes**:
   - **Oficina Vieja**: **`195.123.0.0/25`** (`Z` es `.1`, `Y` es `.2`, `C` es `.3` con GW `195.123.0.1`).
   - **Oficina Nueva**: **`195.123.0.128/25`** (`X` es `.129`, `A` es `.130`, `B` es `.131` con GW `195.123.0.129`).
   - **Radioenlace entre `X` e `Y`**: Red privada **`192.168.0.0/24`** (o `/30`): `Y` es `192.168.0.1` y `X` es `192.168.0.2`.
2. **Tráfico en el radioenlace**:
   - **Si `A` hace `ping` a `B`**: Atraviesan el radioenlace **0 tramas**. Como `A` y `B` están en la Oficina Nueva y el router `X` aisla el dominio de broadcast (capa 3), ni siquiera el `ARP Request` broadcast de `A` cruza el enlace inalámbrico.
   - **Si `A` hace `ping` a `C`**: Atraviesan el radioenlace **4 tramas** (2 de `ARP Request/Reply` entre los routers `X` e `Y` para descubrir sus MACs en la red `192.168.0.0`, y 2 de `ICMP Echo Request/Reply`).
   - **¿Qué ocurriría si quitásemos `X` o `Y`?** El radioenlace (que suele ser el eslabón más lento y sensible de la red) quedaría unido en capa 2 a las LANs de las oficinas, por lo que **todo el tráfico broadcast y multicast (ARP, DHCP, NetBIOS) de los ordenadores inundaría continuamente el radioenlace**, degradando su capacidad.

---

### 3. Problemas 3.1, 3.2, 3.3 y 3.4: El Rompecabezas del Router y el Puente en Paralelo (Diapositivas 152–155)
#### Topología Común
Dos segmentos Ethernet (**`LAN X`** a la izquierda y **`LAN Y`** a la derecha) están unidos simultáneamente por:
- **Arriba**: Un **Router** con interfaz izquierda `CC` e interfaz derecha `DD`.
- **Abajo**: Un **Puente transparente (Switch de Capa 2)** que une físicamente `LAN X` y `LAN Y` en una sola LAN de nivel 2.
En `LAN X` está el host **`A`** (MAC `AA`, IP `202.1.1.2`) y en `LAN Y` está el host **`B`** (MAC `BB`, IP `202.1.1.130`). En los 4 casos **`A` ejecuta `ping 202.1.1.130` y recibe respuesta**.

#### Caso 3.1: Configuración Normal (`A` `/25`, `B` `/25`, Router `CC=202.1.1.1/25`, `DD=202.1.1.129/25`, Diap. 152)
- Como `A` es `/25` (`202.1.1.0`–`127`), ve que `202.1.1.130` está en otra subred y pide ARP por su gateway `202.1.1.1` (`CC`).
- **¿Qué tramas cruzan el puente inferior?** **Únicamente los 2 `ARP Request` broadcast** (`AA → FF` en `LAN X`, y `DD → FF` en `LAN Y`). Las otras 6 tramas son unicast dentro de su propio segmento (`AA↔CC` en `LAN X` y `DD↔BB` en `LAN Y`), por lo que el puente las filtra (`Pasa puente = NO`). Total: **8 tramas**.

#### Caso 3.2: "¡Router Conectado al Revés!" (`CC=202.1.1.129/25` en `LAN X` y `DD=202.1.1.1/25` en `LAN Y`, Diap. 153)
- **¿Por qué funciona el ping aunque el técnico haya cruzado los cables del router?!**
  - ¡Porque el **puente de capa 2 inferior** une ambos lados en un único dominio de broadcast Ethernet!
  - Cuando `A` (en `LAN X`) lanza en broadcast `ARP Request ¿quién es 202.1.1.1?`, la trama **cruza el puente hacia `LAN Y`** y llega a la interfaz `DD` (`202.1.1.1`) del router, que responde `ARP Response: es DD` (cruzando el puente hacia `LAN X`).
  - Así, `A` le envía el paquete IP a `DD` **cruzando el puente de `X` a `Y`**, el router lo encamina internamente de `DD` a `CC` (en `LAN X`), `CC` hace ARP por `B` cruzando el puente de `X` a `Y`, y le manda el paquete a `BB` cruzando de nuevo el puente.
  - **Consecuencia**: **¡Las 8 tramas tienen `Pasa puente = SI`!** El ping funciona, pero todo el tráfico cruza el puente dos veces y el router otra vez.

#### Caso 3.3: `A` y `B` con Máscara `/24` (`A=202.1.1.2/24`, `B=202.1.1.130/24`, Diap. 154)
- Aunque el router siga teniendo `/25`, al tener `A` y `B` máscara **`/24`**, `A` compara `202.1.1.2/24` con `202.1.1.130/24` y concluye que **`B` está en su misma red local**.
- `A` hace `ARP Request ¿quién es 202.1.1.130?`, que cruza el puente inferior directo hasta `B` (`BB`). Ambos se comunican **directamente a través del puente en 4 tramas** (`ARP Req`, `ARP Resp`, `ICMP Echo Req`, `ICMP Echo Reply`), **todas con `Pasa puente = SI`**, e **ignorando por completo al router** (que no interviene para nada).

#### Caso 3.4: Máscaras Asimétricas (`A` en `/24`, `B` en `/25`, Diap. 155) — ¡El Caso Más Interesante!
- **A la IDA (`A → B`)**: Como `A` tiene máscara **`/24`**, cree que `B (202.1.1.130)` es vecino local. Lanza `ARP Request ¿quién es 202.1.1.130?`, cruza el puente, `B` le responde con su MAC `BB` y **`A` envía el `ICMP Echo Request` directamente a `BB` a través del puente** (sin pasar por el router: 3 tramas con `Pasa puente = SI`).
- **A la VUELTA (`B → A`)**: Como `B` tiene máscara **`/25`** (`202.1.1.128`–`255`), cuando quiere responder a `A (202.1.1.2)`, ve que `202.1.1.2` **está fuera de su subred `/25`**. Por tanto, `B` **no responde directamente por el puente**, sino que hace `ARP Request ¿quién es 202.1.1.129?` (su router `DD` en `LAN Y`) y entrega el `ICMP Echo Reply` a `DD`, quien lo enruta hacia `CC` (`LAN X`) y `CC` se lo entrega a `AA`.
- **Pregunta clave de la tabla (Trama 7)**: Cuando `CC` entrega en `LAN X` el `ICMP Echo Reply` final a `AA`, **¿por qué `CC` NO necesita hacer antes un `ARP Request` preguntando por `202.1.1.2` (`AA`)?**
  - Porque en la Trama 1, cuando `A` emitió el broadcast `ARP Request` (que cruzó el puente), o porque el router comparte la pila ARP / aprendió la dirección de `A`, `CC` ya conoce la MAC `AA` y emite directamente la trama 7 (`CC → AA`, `Pasa puente = NO`). Total: **7 tramas** (las 4 primeras pasan el puente y las 3 últimas no).

---
