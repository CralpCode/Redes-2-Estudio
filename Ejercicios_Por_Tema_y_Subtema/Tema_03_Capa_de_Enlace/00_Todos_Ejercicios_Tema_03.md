# Tema 3: Capa de Enlace — Solucionario Completo Explicado

> **Documento PDF consolidado asociado**: [`00_Todos_Ejercicios_Tema_03.pdf`](./00_Todos_Ejercicios_Tema_03.pdf)

---

## 3.3.2 y 3.3.3 Control de Errores: Paridad Bidimensional y Ejemplo de CRC
- **PDF del subtema**: [`3.3.2_y_3.3.3_Control_de_Errores_Ejemplos_Paridad_y_CRC.pdf`](./3.3.2_y_3.3.3_Control_de_Errores_Ejemplos_Paridad_y_CRC.pdf) | **Solución individual**: [`3.3.2_y_3.3.3_Control_de_Errores_Ejemplos_Paridad_y_CRC.md`](./3.3.2_y_3.3.3_Control_de_Errores_Ejemplos_Paridad_y_CRC.md)
- **Diapositivas**: 26, 27, 28, 31

### 1. Enunciado de los Ejemplos
1. **Paridad simple vs. Paridad bidimensional (Diapositivas 26 y 31)**: Analizar cuándo un código de paridad solo detecta errores y cuándo es capaz de **corregirlos** (FEC).
2. **Ejemplo numérico de CRC (Diapositivas 27–28)**: El nivel de red entrega el mensaje `302`. Se acuerda un CRC de 1 dígito decimal usando como generador $G = 3$. ¿Qué trama se transmite y cómo la valida el receptor?

### 2. Solución y Explicación ("¿Por qué es así?")
- **Paridad Simple (1D) vs. Paridad Cruzada/Bidimensional (2D)**:
  - Con un solo bit de paridad por fila (carácter), si cambia 1 bit se detecta que la paridad falla, pero **no sabemos cuál de los 8 bits de la fila ha cambiado** (y si cambian 2 bits en la misma fila, el error pasa desapercibido).
  - Al añadir una fila adicional de **bits de paridad longitudinales** (uno por columna), un error de 1 bit hace fallar simultáneamente **la paridad de su fila $i$ y la paridad de su columna $j$**. La intersección $(i, j)$ identifica unívocamente el bit erróneo, permitiendo **invertirlo y corregirlo sin retransmisión**.
- **Cálculo del CRC simplificado (`Mensaje = 302`, `Generador = 3`)**:
  1. **En el emisor**: Se desplaza el mensaje añadiendo un hueco para el dígito de CRC: `302x` (es decir, $302 \times 10 + x$).
  2. Se busca $x \in \{0..9\}$ tal que `302x` sea divisible exactamente por $3$ (resto $0$):
     - Si $x = 0 \implies 3020 / 3 = 1006$ con **resto $2$** (no divisible).
     - Si $x = 1 \implies 3021 / 3 = 1007$ con **resto $0$** (divisible).
     - Por tanto, se transmite la trama **`3021`**.
  3. **En el receptor**: Recibe `3021`, divide entre el generador $3$: como el resto es $0$, asume que no hubo errores, descarta el último dígito (`1`) y entrega `302` al nivel de red. En redes reales (Ethernet, WiFi, HDLC) se hace exactamente esta misma operación pero usando **aritmética polinómica en módulo 2 (XOR sin acarreo)** con un polinomio generador de 32 bits (CRC-32).

---

## 3.4 Definición de Tiempos: Igualdad Transmisión/Propagación y Cálculo de Distancias por RTT
- **PDF del subtema**: [`3.4_Definicion_de_Tiempos_Calculo_Distancias_RTT.pdf`](./3.4_Definicion_de_Tiempos_Calculo_Distancias_RTT.pdf) | **Solución individual**: [`3.4_Definicion_de_Tiempos_Calculo_Distancias_RTT.md`](./3.4_Definicion_de_Tiempos_Calculo_Distancias_RTT.md)
- **Diapositivas**: 48, 49, 50, 51, 52

### 1. Enunciado y Datos Reales (`ping` y `tracert` a `cern.ch`)
1. **Distancia crítica donde $t_{\text{trans}} = t_{\text{propag}}$ (Diapositiva 48)**: Para un paquete de $540\text{ bytes}$ ($4.320\text{ bits}$), calcular para qué longitud de cable se igualan el tiempo de transmisión y el de propagación desde $10\text{ Mb/s}$ hasta $40\text{ Gb/s}$.
2. **Estimación de distancias físicas de fibra óptica mediante `tracert` (Diapositivas 50–52)**: A partir de una traza desde la Universidad de Valencia hasta el CERN (Ginebra) con $\text{RTT total} = 43\text{ ms}$:
   - Tramo Valencia–Madrid: $\text{RTT} = 5\text{ ms}$ (distancia en línea recta: $300\text{ km}$).
   - Tramo Madrid–Milán: $\text{RTT} = 22\text{ ms}$ (línea recta: $1.200\text{ km}$).
   - Tramo Milán–Ginebra: $\text{RTT} = 13\text{ ms}$ (línea recta: $250\text{ km}$).
   Calcular la longitud real del tendido de fibra óptica en cada tramo.

### 2. Cálculos Paso a Paso y Explicación ("¿Por qué es así?")
- **1. Igualdad $t_{\text{trans}} = t_{\text{propag}}$ para $p = 540\text{ bytes} = 4.320\text{ bits}$**:
  - La velocidad de propagación de la luz en cobre/fibra es $v_p \approx 200.000\text{ km/s} = 200\text{ m/}\mu\text{s}$ (en aire/WiFi es $300\text{ m/}\mu\text{s}$).
  - El tiempo de transmisión es $t_{\text{trans}} = \frac{4.320\text{ bits}}{v}$.
  - Igualando $d_{\text{eq}} = v_p \cdot t_{\text{trans}}$:
    - A **$10\text{ Mb/s}$**: $t_{\text{trans}} = 432\,\mu\text{s} \implies d_{\text{eq}} = 432 \times 200\text{ m} = \mathbf{86,4\text{ km}}$ en fibra ($130\text{ km}$ en aire).
    - A **$1\text{ Gb/s}$**: $t_{\text{trans}} = 4,32\,\mu\text{s} \implies d_{\text{eq}} = \mathbf{860\text{ m}}$ en fibra.
    - A **$40\text{ Gb/s}$**: $t_{\text{trans}} = 0,108\,\mu\text{s} \implies d_{\text{eq}} = \mathbf{22\text{ m}}$ en fibra.
  - **¿Por qué es crucial este resultado?** Porque a medida que las redes aumentan de velocidad ($10\text{ Gb/s}$, $40\text{ Gb/s}$), como la velocidad de la luz es constante, el tiempo de transmisión se vuelve diminuto y **cualquier enlace de más de unas decenas de metros pasa a estar dominado por el tiempo de propagación**.

- **2. Cálculo de la longitud real de fibra óptica con `ping` / `tracert` (Diapositivas 51–52)**:
  - Como los paquetes sonda de `ping`/`tracert` son muy pequeños ($32\text{ bytes}$) y los enlaces troncales (RedIRIS / GÉANT) son de alta velocidad ($\ge 10\text{ Gb/s}$), $t_{\text{trans}} \approx 0$.
  - Por tanto, $\text{RTT} \approx 2 \cdot t_{\text{propag}} = \frac{2 \cdot d}{v_{\text{fibra}}}$. Como $v_{\text{fibra}} \approx 200\text{ km/ms}$, en $1\text{ ms}$ de RTT la luz recorre $200\text{ km}$ de ida y vuelta, lo que equivale a **$100\text{ km}$ de distancia física de fibra por cada milisegundo de RTT**:
    $$d_{\text{fibra}}\text{ (km)} \approx 100 \times \text{RTT (ms)}$$
  - Aplicando la fórmula a los tres tramos medidos en el `tracert`:
    - **Valencia–Madrid**: $\Delta\text{RTT} = 5\text{ ms} \implies d_{\text{fibra}} = 5 \times 100 = \mathbf{500\text{ km}}$ (frente a $300\text{ km}$ en línea recta).
    - **Madrid–Milán**: $\Delta\text{RTT} = 29 - 7 = 22\text{ ms} \implies d_{\text{fibra}} = 22 \times 100 = \mathbf{2.200\text{ km}}$ (frente a $1.200\text{ km}$ en línea recta).
    - **Milán–Ginebra**: $\Delta\text{RTT} = 42 - 29 = 13\text{ ms} \implies d_{\text{fibra}} = 13 \times 100 = \mathbf{1.300\text{ km}}$ (frente a $250\text{ km}$ en línea recta, pues la fibra bordea los Alpes e Italia).

---

## 3.6 Protocolos de Enlace: Parada y Espera, Dos Ejércitos y Ventana Deslizante
- **PDF del subtema**: [`3.6_Protocolos_de_Enlace_Problemas_Dos_Ejercitos_y_Ventana_Deslizante.pdf`](./3.6_Protocolos_de_Enlace_Problemas_Dos_Ejercitos_y_Ventana_Deslizante.pdf) | **Solución individual**: [`3.6_Protocolos_de_Enlace_Problemas_Dos_Ejercitos_y_Ventana_Deslizante.md`](./3.6_Protocolos_de_Enlace_Problemas_Dos_Ejercitos_y_Ventana_Deslizante.md)
- **Diapositivas**: 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78

### 1. Enunciado y Datos del Problema
Dos conmutadores A y B están unidos por un enlace de **$1\text{ Gb/s}$**, enviando tramas de **$512\text{ bits}$**:
- Tiempo de transmisión de trama: $t_{\text{trans}} = \frac{512\text{ bits}}{10^9\text{ b/s}} = 0,512\,\mu\text{s}$.
- Tiempo de propagación del enlace: $\tau = 0,556\,\mu\text{s}$.
- Latencia de una trama: $t_{\text{trans}} + \tau = 1,068\,\mu\text{s}$.
- Tiempo de ciclo completo (con ACK del mismo tamaño o considerando tiempos de la diapositiva 63): $\text{RTT} = 2,136\,\mu\text{s}$.

Se pide:
1. Analizar por qué falla un protocolo sin numeración de tramas cuando se pierde un ACK y relacionarlo con el **Problema de los Dos Ejércitos**.
2. Calcular la **eficiencia** del protocolo de **Parada y Espera** (*Stop-and-Wait*).
3. Calcular el **tamaño mínimo de ventana ($W$)** en un protocolo de **Ventana Deslizante** para alcanzar el $100\%$ de eficiencia.
4. Determinar la ventana máxima permitida con un campo de número de secuencia de **3 bits** para **Retroceso-$N$** (*Go-Back-N*) y **Repetición Selectiva** (*Selective Repeat*).

### 2. Solución Paso a Paso y Explicación ("¿Por qué es así?")
1. **Pérdida de ACK, Duplicados y el Problema de los Dos Ejércitos (Diapositivas 66–70)**:
   - Si A envía la trama `T0`, B la recibe bien y envía `ACK`, pero el `ACK` se pierde en el camino, A agotará su *timeout* y reenviará `T0`. Si las tramas no van numeradas, B creerá que es una trama nueva y entregará **una copia duplicada** al nivel de red.
   - Intentar solucionarlo enviando un "ACK del ACK" no resuelve nada porque ese segundo ACK también puede perderse (equivalente al **Problema de los Dos Ejércitos**, que no tiene solución exacta en un canal inseguro).
   - **La verdadera solución en redes**: No hace falta confirmar el ACK; basta con **numerar las tramas** (en Parada y Espera basta **1 solo bit: módulo 2**, alternando `0` y `1`, protocolo *Alternating Bit*). Si B recibe de nuevo `T0` cuando esperaba `T1`, sabe que su `ACK0` se perdió: descarta el duplicado `T0` y reenvía `ACK0`.

2. **Eficiencia de Parada y Espera (Diapositivas 71–72)**:
   $$\text{Eficiencia} = \frac{t_{\text{trans}}}{\text{RTT}} = \frac{0,512\,\mu\text{s}}{2,136\,\mu\text{s}} = 0,2397 \approx \mathbf{24\%}$$
   El canal permanece ocioso el $76\%$ del tiempo esperando el viaje de ida y vuelta de la señal.

3. **Tamaño mínimo de Ventana Deslizante ($W$) para $100\%$ de ocupación (Diapositiva 77)**:
   Para no parar de transmitir mientras llega el primer ACK (suponiendo ACK de longitud despreciable, donde $\text{RTT} = t_{\text{trans}} + 2\tau$), el número de tramas que caben "en vuelo" en la tubería es:
   $$W = \frac{2 \cdot \tau \cdot \text{Caudal}}{\text{Tamaño de trama}} + 1 = \frac{2 \times 0,556\,\mu\text{s} \times 10^9\text{ b/s}}{512\text{ bits}} + 1 = \frac{1.112}{512} + 1 = 2,17 + 1 = 3,17 \implies \mathbf{W_{\text{mín}} = 4\text{ tramas}}$$
   *(Si el ACK tuviera el mismo $t_{\text{trans}} = 0,512\,\mu\text{s}$ de la diapositiva 63, entonces $W = \frac{2,136}{0,512} = 4,17 \implies 5\text{ tramas}$)*.

4. **Límite del tamaño de ventana según los bits del número de secuencia (Diapositiva 78)**:
   Con un campo de $k = 3\text{ bits}$, existen $2^3 = 8$ números de secuencia posibles ($0..7$):
   - **En Retroceso-$N$ (*Go-Back-N*)**: $W_{\text{máx}} = 2^k - 1 = 8 - 1 = \mathbf{7}$.
     *¿Por qué $2^k - 1$ y no $8$?* Porque si enviamos 8 tramas ($0..7$) y se pierden **todos** los ACKs, el emisor reenviará la trama $0$, y el receptor (que ya esperaba la siguiente tanda comenzando en $0$) la aceptaría como si fuera la trama $0$ nueva en lugar de una retransmisión.
   - **En Repetición Selectiva (*Selective Repeat*)**: $W_{\text{máx}} = \frac{2^k}{2} = \frac{8}{2} = \mathbf{4}$.
     *¿Por qué la mitad?* Porque el receptor almacena tramas fuera de orden dentro de su ventana de recepción (de tamaño $W$). Para que la ventana avanzada del receptor (si todos los ACKs se pierden) no se solape con los números de secuencia antiguos que el emisor puede retransmitir, debe cumplirse $W_{\text{emisor}} + W_{\text{receptor}} \le 2^k \implies 2W \le 2^k \implies W \le 2^{k-1}$.

---
