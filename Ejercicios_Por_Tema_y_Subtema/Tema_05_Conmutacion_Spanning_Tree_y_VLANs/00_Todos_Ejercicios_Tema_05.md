# Tema 5: Conmutación, Spanning Tree y VLANs — Solucionario Completo Explicado

> **Documento PDF consolidado asociado**: [`00_Todos_Ejercicios_Tema_05.pdf`](./00_Todos_Ejercicios_Tema_05.pdf)

---

## 5.2 Microsegmentación: Ejemplo de Agregación de Enlaces (Link Aggregation)
- **PDF del subtema**: [`5.2_Microsegmentacion_Ejemplo_Agregacion_de_Enlaces.pdf`](./5.2_Microsegmentacion_Ejemplo_Agregacion_de_Enlaces.pdf) | **Solución individual**: [`5.2_Microsegmentacion_Ejemplo_Agregacion_de_Enlaces.md`](./5.2_Microsegmentacion_Ejemplo_Agregacion_de_Enlaces.md)
- **Diapositivas**: 28

### 1. Enunciado del Caso Real (Universidad de Valencia – RedIRIS)
El router principal de la Universidad de Valencia se conecta al PoP (*Point of Presence*) de RedIRIS mediante **2 enlaces Gigabit Ethernet (1000BASE-T)** agrupados en paralelo (Diapositiva 28).

### 2. Explicación Técnica ("¿Por qué es así?")
- **¿Por qué se necesita un protocolo especial (IEEE 802.3ad / LACP) para unir dos enlaces entre switches/routers?**
  1. Si simplemente conectásemos dos cables Ethernet entre dos conmutadores, se formaría un **bucle físico de nivel 2** y el protocolo **Spanning Tree (STP)** bloquearía uno de los dos puertos, dejando el segundo enlace inutilizado en reposo.
  2. Al configurar *Link Aggregation* (EtherChannel / Trunking), ambos enlaces físicos se presentan ante el nivel 2 y ante STP como **una única interfaz lógica** de $2\text{ Gb/s}$ con tolerancia a fallos automática.
- **¿Cómo se reparte el tráfico entre los dos enlaces sin provocar desorden de tramas?**
  A diferencia del multiplexado inverso trama a trama visto en el Tema 1, en Ethernet **una conversación individual no se reparte paquete a paquete entre los dos cables** (porque el estándar 802.3 prohíbe alterar el orden de las tramas de una misma conversación). En su lugar, el conmutador aplica una **función hash** sobre las direcciones MAC/IP/puertos de origen y destino, enviando todos los paquetes de cada flujo por el mismo enlace físico pero equilibrando los miles de flujos de la universidad al $50\%$ entre ambos cables.

---

## 5.4.2 y 5.4.3 Spanning Tree (STP): Resolución de Árboles, Cambios de Velocidad y Fórmula de Puertos
- **PDF del subtema**: [`5.4.2_y_5.4.3_Spanning_Tree_Ejemplos_y_Computo_de_Puertos.pdf`](./5.4.2_y_5.4.3_Spanning_Tree_Ejemplos_y_Computo_de_Puertos.pdf) | **Solución individual**: [`5.4.2_y_5.4.3_Spanning_Tree_Ejemplos_y_Computo_de_Puertos.md`](./5.4.2_y_5.4.3_Spanning_Tree_Ejemplos_y_Computo_de_Puertos.md)
- **Diapositivas**: 51, 52, 60, 61, 62, 63

### 1. Enunciado de los Ejercicios de Spanning Tree (IEEE 802.1D)
- **Costes estándar IEEE 802.1D**: $10\text{ Mb/s} \implies \text{Coste } 100$; $100\text{ Mb/s} \implies \text{Coste } 19$.
- **Ejercicio 1 (Diapositivas 51–52)**: Red con 5 puentes (`ID 42`, `ID 44`, `ID 45`, `ID 83`, `ID 97`) y 5 LANs (`LAN 1` y `LAN 2` a $100\text{ Mb/s}$; `LAN 3`, `LAN 4` y `LAN 5` a $10\text{ Mb/s}$). Determinar el Puente Raíz, Puertos Raíz (R), Puertos Designados (D) y Puertos Bloqueados (B).
- **Ejercicio 2 (Diapositivas 60–62)**: Red con 4 puentes (`ID 23`, `ID 29`, `ID 37`, `ID 41`) y 4 LANs (`W`, `X`, `Y`, `Z`):
  - **Estado inicial (Diap. 60)**: `W`, `X`, `Z` a $10\text{ Mb/s}$ ($C=100$) e `Y` a $100\text{ Mb/s}$ ($C=19$).
  - **Cambio 1 (Diap. 61)**: Se pasa `LAN X` a $100\text{ Mb/s}$ ($C=19$). ¿Cambia el árbol?
  - **Cambio 2 (Diap. 62)**: Se pasa además `LAN Z` a $100\text{ Mb/s}$ ($C=19$). ¿Cambia ahora el árbol?
- **Fórmula general de cómputo de puertos (Diapositiva 63)**: Deducir el número exacto de puertos R, D y B en función de $m$ conmutadores, $n$ puertos totales y $p$ bucles elementales.

### 2. Solución Paso a Paso y Explicación ("¿Por qué es así?")

#### A. Reglas del Algoritmo Spanning Tree (STP)
1. **Elección del Puente Raíz (*Root Bridge*)**: Gana el puente con **menor ID** de toda la red. Todos sus puertos son **Puertos Designados (D)**.
2. **Elección del Puerto Raíz (R) en cada puente no raíz** (exactamente 1 por puente): Es el puerto por el que ese puente alcanza al Puente Raíz con **menor coste acumulado** (sumando los costes de los puertos por los que *entran* las BPDUs hacia la raíz). En caso de empate de coste:
   - Gana el vecino con **menor Bridge ID**.
   - Si es el mismo vecino, gana el puerto con **menor Port ID**.
3. **Elección del Puerto Designado (D) en cada segmento LAN** (exactamente 1 por LAN): Es el puerto conectado a esa LAN perteneciente al puente que ofrece **menor coste acumulado hacia la raíz**. En caso de empate, gana el puente con **menor Bridge ID**.
4. **Puertos Bloqueados (B)**: Cualquier puerto que no haya sido elegido ni como Puerto Raíz (R) ni como Puerto Designado (D) pasa a estado **Bloqueado (B)** para romper los bucles.

#### B. Resolución del Ejercicio 1 (Diapositivas 51–52)
- **Puente Raíz**: `ID 42` (menor ID entre 42, 44, 45, 83, 97). Sus dos puertos hacia `LAN 1` ($C=19$) y `LAN 2` ($C=19$) son **Designados (D)** con coste a la raíz $0$.
- **Puertos Raíz (R)**:
  - `ID 97` y `ID 83` están conectados a `LAN 1`: su puerto en `LAN 1` es su **Puerto Raíz (R)** con coste acumulado $19$.
  - `ID 45` y `ID 44` están conectados a `LAN 2`: su puerto en `LAN 2` es su **Puerto Raíz (R)** con coste acumulado $19$.
- **Puertos Designados (D) y Bloqueados (B) en las LANs inferiores (`LAN 3`, `LAN 4`, `LAN 5` a $10\text{ Mb/s}$)**:
  - En `LAN 3` (une `ID 97` e `ID 83`): Ambos puentes están a coste $19$ de la raíz. Desempata el **menor ID**: gana **`ID 83`** (su puerto es **D**), mientras que el puerto P1 de `ID 97` queda **Bloqueado (B)**.
  - En `LAN 4` (une `ID 97` e `ID 45`): Ambos están a coste $19$ de la raíz. Gana **`ID 45`** ($45 < 97$, su puerto P3 es **D**) y el puerto P2 de `ID 97` queda **Bloqueado (B)**.
  - En `LAN 5` (une `ID 83`, `ID 45` e `ID 44`): Los tres puentes tienen coste $19$ hacia la raíz. Gana el de menor ID, que es **`ID 44`** (su puerto es **D**), quedando **Bloqueados (B)** los puertos de `ID 83` y de `ID 45` que dan a `LAN 5`.

#### C. Resolución del Ejercicio 2: Sensibilidad al Cambio de Velocidad (Diapositivas 60–62)
- **Estado Inicial (Diap. 60)**:
  - Puente Raíz: **`ID 23`**. Sus puertos hacia `LAN W` ($10\text{ Mb/s}, C=100$) y `LAN X` ($10\text{ Mb/s}, C=100$) son **Designados (D)**.
  - `ID 41` (conectado a `LAN X` y `LAN Z`): Su puerto en `LAN X` es **R** (coste $100$) y su puerto en `LAN Z` es **D**.
  - `ID 37` (conectado a `LAN W` y `LAN Y`): Su puerto en `LAN W` es **R** (coste $100$) y su puerto en `LAN Y` es **D** (coste a raíz $100$).
  - `ID 29` (conectado a `LAN Y` [$C=19$] y `LAN Z` [$C=100$]):
    - Vía `LAN Y` (a través de `ID 37`): $\text{Coste} = 100\text{ (de ID 37)} + 19\text{ (puerto en Y)} = \mathbf{119}$.
    - Vía `LAN Z` (a través de `ID 41`): $\text{Coste} = 100\text{ (de ID 41)} + 100\text{ (puerto en Z)} = \mathbf{200}$.
    - Por tanto, en `ID 29` el puerto hacia `LAN Y` es **Puerto Raíz (R)** ($119 < 200$) y el puerto hacia `LAN Z` queda **Bloqueado (B)**.
- **Cambio 1: Se mejora `LAN X` a $100\text{ Mb/s}$ ($C=19$, Diap. 61). ¿Por qué NO cambia el árbol?**
  - Ahora `ID 41` llega a la raíz con coste $19$ (en vez de $100$).
  - recalculemos las dos rutas desde `ID 29` hacia la raíz:
    - Vía `LAN Y` (`ID 37`): Sigue costando $100 + 19 = \mathbf{119}$.
    - Vía `LAN Z` (`ID 41`): Ahora cuesta $19\text{ (de ID 41)} + 100\text{ (puerto de ID 29 en LAN Z, que sigue a 10 Mb/s)} = \mathbf{119}$.
  - ¡Hay un **empate a 119**! ¿Cómo desempata STP? Comparando el **Bridge ID del puente vecino**: por `LAN Y` el vecino es `ID 37` y por `LAN Z` el vecino es `ID 41`. Como **$37 < 41$**, `ID 29` **mantiene su Puerto Raíz hacia `ID 37`** y sigue bloqueando el puerto hacia `LAN Z`. ¡El tráfico hacia `ID 29` sigue yendo por la ruta lenta `LAN W` ($10\text{ Mb/s}$) porque `LAN Z` sigue siendo un cuello de botella de $10\text{ Mb/s}$!
- **Cambio 2: Se mejora además `LAN Z` a $100\text{ Mb/s}$ ($C=19$, Diap. 62). ¿Por qué ahora SÍ cambia el árbol?**
  - Ahora desde `ID 29` la ruta vía `LAN Z` (`ID 41`) cuesta $19 + 19 = \mathbf{38}$ (mucho menor que $119$).
  - `ID 29` cambia su **Puerto Raíz (R)** al de `LAN Z` (coste $38$), se convierte en **Puerto Designado (D)** de `LAN Y` (porque su coste a la raíz es $38$, mejor que el coste $100$ de `ID 37`), e **`ID 37` bloquea su puerto en `LAN Y`**.

#### D. Fórmula de Cómputo de Puertos (Diapositiva 63)
En una red conexa con $m$ conmutadores, $n$ puertos activos en total y $p$ bucles elementales:
- **Puentes raíz**: $1$.
- **Puertos raíz (R)**: $m - 1$ (exactamente uno por cada conmutador no raíz).
- **Puertos bloqueados (B)**: $p$ (para romper cada bucle elemental basta y sobra con bloquear exactamente 1 puerto por bucle).
- **Puertos designados (D)**: $n - (m - 1) - p$ (todos los demás puertos).
- *Comprobación en el Ejercicio 2*: $m = 4$, $n = 8$, $p = 1 \implies R = 3,\; B = 1,\; D = 8 - 3 - 1 = 4$.

---
