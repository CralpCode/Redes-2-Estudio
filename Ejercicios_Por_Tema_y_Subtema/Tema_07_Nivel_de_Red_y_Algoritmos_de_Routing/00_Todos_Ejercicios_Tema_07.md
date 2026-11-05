# Tema 7: Nivel de Red y Algoritmos de Routing — Solucionario Completo Explicado

> **Documento PDF consolidado asociado**: [`00_Todos_Ejercicios_Tema_07.pdf`](./00_Todos_Ejercicios_Tema_07.pdf)

---

## 7.3 Tiempo de Servicio (Ts): Modelo de Colas M/M/1 y Ejercicio Valencia-Milán (VoIP)
- **PDF del subtema**: [`7.3_Tiempo_de_Servicio_Formula_y_Ejercicio_Ts_Resuelto.pdf`](./7.3_Tiempo_de_Servicio_Formula_y_Ejercicio_Ts_Resuelto.pdf) | **Solución individual**: [`7.3_Tiempo_de_Servicio_Formula_y_Ejercicio_Ts_Resuelto.md`](./7.3_Tiempo_de_Servicio_Formula_y_Ejercicio_Ts_Resuelto.md)
- **Diapositivas**: 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27

### 1. Enunciado del Ejercicio de Modelado de Tiempo de Servicio ($T_s$, Diapositivas 25–26)
Una empresa con sedes en **Valencia** y **Milán** dispone de un enlace de **$v = 512\text{ kb/s}$** que desea utilizar para datos y telefonía IP (VoIP).
- Según la norma **ITU-T G.114**, el retardo máximo admisible en un sentido (extremo a extremo) para telefonía de calidad aceptable es de **$150\text{ ms}$**.
- Cada conversación telefónica VoIP consume un caudal constante de **$80\text{ kb/s}$**.
- Tamaño medio de los paquetes: **$p = 500\text{ bytes} = 4.000\text{ bits}$**.
- Tiempo de propagación entre Valencia y Milán: **$\tau = 20\text{ ms}$**.

**Se pide**:
1. Calcular el **caudal máximo admisible ($c_{\text{máx}}$)** en la línea de $512\text{ kb/s}$ para que el retardo total no supere los $150\text{ ms}$, así como el porcentaje de ocupación máxima.
2. Determinar el **número máximo de conversaciones VoIP simultáneas** si no hubiera otro tráfico.
3. Repetir el cálculo si el enlace se ampliase a **$2\text{ Mb/s}$ ($2.048\text{ kb/s}$)** y explicar por qué cambia el porcentaje de ocupación aprovechable.

---

### 2. Marco Teórico: ¿De dónde sale la fórmula $T_s = \frac{p}{v - c}$?
Cuando un paquete de longitud media $p$ (bits) llega a un router para salir por un enlace de capacidad nominal $v$ (bits/s) que soporta un caudal medio de tráfico $c$ (bits/s):
- Si la línea estuviera vacía ($c = 0$), el paquete no haría cola ($T_{\text{esp}} = 0$) y tardaría únicamente su **tiempo de transmisión**:
  $$T_t = \frac{p}{v}$$
- Pero cuando hay tráfico ($c > 0$), la llegada aleatoria de paquetes (modelada en teoría de colas como un proceso M/M/1 con tasa de llegada $\lambda = c/p$ y tasa de servicio $\mu = v/p$, siendo el factor de utilización $\rho = \frac{\lambda}{\mu} = \frac{c}{v}$) provoca un **tiempo medio de espera en cola**:
  $$T_{\text{esp}} = \frac{\rho}{1 - \rho} \cdot T_t = \frac{c/v}{1 - c/v} \cdot \frac{p}{v} = \frac{p \cdot c}{v(v - c)}$$
- Sumando el tiempo de espera en cola más el tiempo de transmisión obtenemos el **Tiempo de Servicio ($T_s$)**:
  $$T_s = T_{\text{esp}} + T_t = \frac{p}{v}\left(\frac{c}{v - c} + 1\right) = \mathbf{\frac{p}{v - c}}$$
- **Interpretación física fundamental (Diapositiva 19)**: Una línea de velocidad $v$ con tráfico $c$ se comporta, a efectos de retardo de servicio $T_s$, **exactamente igual que una línea vacía de velocidad igual al ancho de banda sobrante $(v - c)$**. Cuando $c \to v$ ($100\%$ de ocupación), el denominador $(v - c) \to 0$ y el retardo $T_s \to \infty$.

---

### 3. Solución Paso a Paso
1. **Presupuesto de retardo para el Tiempo de Servicio ($T_s$)**:
   El retardo total extremo a extremo es la suma del Tiempo de Servicio en la interfaz del router más el Tiempo de Propagación por el cable:
   $$T_{\text{total}} = T_s + \tau \le 150\text{ ms}$$
   Como $\tau = 20\text{ ms}$, el tiempo de servicio máximo admisible es:
   $$T_{s,\text{máx}} = 150\text{ ms} - 20\text{ ms} = \mathbf{130\text{ ms}} = 0,13\text{ s}$$

2. **Despeje del caudal máximo ($c$) para $v = 512.000\text{ b/s}$ y $p = 500\times 8 = 4.000\text{ bits}$**:
   Partiendo de $T_s = \frac{p}{v - c}$, despejamos $c$:
   $$v - c = \frac{p}{T_s} \implies c = v - \frac{p}{T_s}$$
   Sustituyendo los valores en unidades del Sistema Internacional (bits y segundos):
   $$c = 512.000 - \frac{4.000}{0,13} = 512.000 - 30.769,23 \approx \mathbf{481.000\text{ bits/s}}\quad (\mathbf{481\text{ kb/s}})$$
   - **Nivel máximo de ocupación**:
     $$\rho_{\text{máx}} = \frac{481\text{ kb/s}}{512\text{ kb/s}} = 0,9394 \approx \mathbf{94\%}$$

3. **Número máximo de llamadas VoIP simultáneas**:
   Cada llamada requiere $80\text{ kb/s}$:
   $$N_{\text{llamadas}} = \left\lfloor \frac{481\text{ kb/s}}{80\text{ kb/s}} \right\rfloor = \left\lfloor 6,0125 \right\rfloor = \mathbf{6\text{ conversaciones simultáneas}}\quad (6 \times 80 = 480\text{ kb/s} \le 481\text{ kb/s})$$

4. **Ampliación a una línea de $2\text{ Mb/s}$ ($v = 2.048.000\text{ b/s}$)**:
   $$c = 2.048.000 - \frac{4.000}{0,13} = 2.048.000 - 30.769 = \mathbf{2.017.000\text{ b/s}}\quad (\mathbf{2.017\text{ kb/s}})$$
   - **Nuevo porcentaje de ocupación admisible**:
     $$\rho_{\text{máx}} = \frac{2.017}{2.048} = \mathbf{98,5\%}$$

### 4. ¿Por qué en líneas más rápidas podemos apurar un porcentaje de ocupación mayor ($98,5\%$ frente a $94\%$)?
Porque para garantizar $T_s \le 0,13\text{ s}$ con paquetes de $4.000\text{ bits}$, lo que exige la ecuación $v - c = \frac{p}{T_s}$ es dejar un **margen absoluto de capacidad libre constante** de $\Delta v = v - c = 30,77\text{ kb/s}$, independientemente de lo rápida que sea la línea. En una línea lenta de $512\text{ kb/s}$, reservar $31\text{ kb/s}$ libres supone sacrificar el $6\%$ del enlace; en cambio, en una línea rápida de $2.048\text{ kb/s}$, reservar esos mismos $31\text{ kb/s}$ supone apenas el $1,5\%$ de la capacidad total.

---

## 7.5 Routing Estático Basado en el Flujo: Matriz de Tráfico y Ts Medio Ponderado
- **PDF del subtema**: [`7.5_Routing_Estatico_Basado_en_el_Flujo_Matriz_Ts_y_Ponderado.pdf`](./7.5_Routing_Estatico_Basado_en_el_Flujo_Matriz_Ts_y_Ponderado.pdf) | **Solución individual**: [`7.5_Routing_Estatico_Basado_en_el_Flujo_Matriz_Ts_y_Ponderado.md`](./7.5_Routing_Estatico_Basado_en_el_Flujo_Matriz_Ts_y_Ponderado.md)
- **Diapositivas**: 37, 38, 39, 40, 41, 42

### 1. Enunciado del Problema de Optimización de Rutas (Diapositivas 37–42)
Se tiene una red triangular con tres routers **$A$, $B$ y $C$** unidos por tres enlaces bidireccionales (full-dúplex) con las siguientes capacidades ($v$):
- Enlace **$A\text{--}B$**: $v_{AB} = 64\text{ kb/s}$
- Enlace **$A\text{--}C$**: $v_{AC} = 256\text{ kb/s}$
- Enlace **$B\text{--}C$**: $v_{BC} = 512\text{ kb/s}$

El tamaño medio de los paquetes es **$p = 500\text{ bytes} = 4.000\text{ bits}$**.
La **Matriz de Tráfico** medida entre los nodos (en $\text{kb/s}$) es simétrica:

| Origen \ Destino | A | B | C |
| :---: | :---: | :---: | :---: |
| **A** | — | $10\text{ kb/s}$ | $100\text{ kb/s}$ |
| **B** | $10\text{ kb/s}$ | — | $400\text{ kb/s}$ |
| **C** | $100\text{ kb/s}$ | $400\text{ kb/s}$ | — |

El tráfico $A\leftrightarrow C$ ($100\text{ kb/s}$) y $B\leftrightarrow C$ ($400\text{ kb/s}$) va obviamente por sus enlaces directos rápidos. La duda de diseño es: **¿Debemos enviar el tráfico $A\leftrightarrow B$ ($10\text{ kb/s}$) por el enlace directo lento $A\text{--}B$ ($64\text{ kb/s}$), o es mejor desviarlo por la ruta indirecta $A\text{--}C\text{--}B$ a través de los enlaces rápidos?**

---

### 2. Solución Paso a Paso

#### Paso 1: Análisis de la Opción 1 — Ruta Directa ($A\text{--}B$)
Cada flujo usa su enlace directo:
- **Enlace $A\text{--}B$**: $v = 64\text{ kb/s}$, caudal $c = 10\text{ kb/s}$ (ocupación $15,6\%$).
  $$T_s(AB) = \frac{p}{v - c} = \frac{4.000}{64.000 - 10.000} = \frac{4.000}{54.000} = 0,07407\text{ s} = \mathbf{74,1\text{ ms}}$$
- **Enlace $A\text{--}C$**: $v = 256\text{ kb/s}$, caudal $c = 100\text{ kb/s}$ (ocupación $39,1\%$).
  $$T_s(AC) = \frac{4.000}{256.000 - 100.000} = \frac{4.000}{156.000} = 0,02564\text{ s} = \mathbf{25,6\text{ ms}}$$
- **Enlace $B\text{--}C$**: $v = 512\text{ kb/s}$, caudal $c = 400\text{ kb/s}$ (ocupación $78,1\%$).
  $$T_s(BC) = \frac{4.000}{512.000 - 400.000} = \frac{4.000}{112.000} = 0,03571\text{ s} = \mathbf{35,7\text{ ms}}$$
- **Media aritmética simple de la Matriz de $T_s$**:
  $$\overline{T_s}_{\text{simple}} = \frac{74,1 + 25,6 + 35,7}{3} = \mathbf{45,1\text{ ms}}$$

#### Paso 2: Análisis de la Opción 2 — Ruta Indirecta ($A\text{--}C\text{--}B$)
El enlace $A\text{--}B$ queda sin uso ($c = 0$), y los $10\text{ kb/s}$ entre $A$ y $B$ se suman tanto al enlace $A\text{--}C$ como al enlace $B\text{--}C$:
- **Enlace $A\text{--}C$**: $v = 256\text{ kb/s}$, nuevo caudal $c = 100 + 10 = 110\text{ kb/s}$ (ocupación $43,0\%$).
  $$T_s(AC) = \frac{4.000}{256.000 - 110.000} = \frac{4.000}{146.000} = 0,02740\text{ s} = \mathbf{27,4\text{ ms}}$$
- **Enlace $B\text{--}C$**: $v = 512\text{ kb/s}$, nuevo caudal $c = 400 + 10 = 410\text{ kb/s}$ (ocupación $80,1\%$).
  $$T_s(BC) = \frac{4.000}{512.000 - 410.000} = \frac{4.000}{102.000} = 0,03922\text{ s} = \mathbf{39,2\text{ ms}}$$
- **Tiempo de servicio de la ruta $A\leftrightarrow B$ (suma de los dos saltos $A\text{--}C$ y $C\text{--}B$)**:
  $$T_s(A\text{--}C\text{--}B) = 27,4\text{ ms} + 39,2\text{ ms} = \mathbf{66,6\text{ ms}}\quad (\text{¡mejora los } 74,1\text{ ms directos!})$$
- **Media aritmética simple de la Matriz de $T_s$**:
  $$\overline{T_s}_{\text{simple}} = \frac{66,6 + 27,4 + 39,2}{3} = \mathbf{44,4\text{ ms}}$$

#### Paso 3: La Trampa de la Media Simple vs. El Cálculo Ponderado (Diapositivas 41–42)
Si mirásemos solo la media simple ($44,4\text{ ms} < 45,1\text{ ms}$), elegiríamos la ruta indirecta $A\text{--}C\text{--}B$. **¡Pero eso sería un error grave de ingeniería!**
- **¿Por qué?** Porque la media simple le da el mismo peso ($1/3$) al flujo $A\leftrightarrow B$ (que apenas mueve **$10\text{ kb/s}$**) que al flujo $B\leftrightarrow C$ (que mueve **$400\text{ kb/s}$**, ¡40 veces más paquetes!).
- Calculemos el **Tiempo de Servicio Medio Ponderado por el Tráfico** (multiplicando elemento a elemento la Matriz de Tráfico Normalizada $M_{\text{norm}}$ —dividida por el tráfico total $1.020\text{ kb/s}$— por la Matriz de $T_s$):
  - Peso de $A\leftrightarrow B$ (cada sentido): $\frac{10}{1.020} = 0,009804$ (ambos sentidos suman el **$1,96\%$** del tráfico).
  - Peso de $A\leftrightarrow C$ (cada sentido): $\frac{100}{1.020} = 0,098039$ (ambos sentidos suman el **$19,61\%$** del tráfico).
  - Peso de $B\leftrightarrow C$ (cada sentido): $\frac{400}{1.020} = 0,392157$ (ambos sentidos suman el **$78,43\%$** del tráfico).
- **Para la Ruta Directa ($A\text{--}B$)**:
  $$\overline{T_s}_{\text{ponderado}} = 2 \times (0,009804 \times 74,1 + 0,098039 \times 25,6 + 0,392157 \times 35,7) = 2 \times (0,726 + 2,509 + 14,002) = \mathbf{34,5\text{ ms}}$$
- **Para la Ruta Indirecta ($A\text{--}C\text{--}B$)**:
  $$\overline{T_s}_{\text{ponderado}} = 2 \times (0,009804 \times 66,6 + 0,098039 \times 27,4 + 0,392157 \times 39,2) = 2 \times (0,653 + 2,685 + 15,374) = \mathbf{37,4\text{ ms}}$$

### 3. Conclusión: ¿Por qué es mejor la Ruta Directa $A\text{--}B$ ($34,5\text{ ms} < 37,4\text{ ms}$)?
Porque desviar los $10\text{ kb/s}$ de $A\leftrightarrow B$ por $C$ les ahorra $7,5\text{ ms}$ a esos pocos paquetes, pero **mete carga adicional en el enlace $B\text{--}C$ que ya estaba al $78,1\%$ de ocupación**, haciendo que los **$400\text{ kb/s}$** de $B\leftrightarrow C$ sufran un retraso extra de $+3,5\text{ ms}$ ($39,2 - 35,7\text{ ms}$) y los **$100\text{ kb/s}$** de $A\leftrightarrow C$ sufran $+1,8\text{ ms}$. Perjudicar al $98\%$ del tráfico de la empresa para beneficiar ligeramente al $2\%$ empeora el rendimiento global de la red en casi $3\text{ ms}$ por paquete.

---

## 7.6 Routing por Vector Distancia: Algoritmo de Bellman-Ford y Problema de la Cuenta a Infinito
- **PDF del subtema**: [`7.6_Routing_Vector_Distancia_Ejemplo_y_Cuenta_a_Infinito.pdf`](./7.6_Routing_Vector_Distancia_Ejemplo_y_Cuenta_a_Infinito.pdf) | **Solución individual**: [`7.6_Routing_Vector_Distancia_Ejemplo_y_Cuenta_a_Infinito.md`](./7.6_Routing_Vector_Distancia_Ejemplo_y_Cuenta_a_Infinito.md)
- **Diapositivas**: 46, 47, 48, 49, 50

### 1. Enunciado de los Ejercicios (Diapositivas 46 y 49)
1. **Cálculo de la tabla de encaminamiento por Vector Distancia (Diapositiva 46)**:
   El router central tiene **`ID: 4`** y dispone de 4 interfaces (`j`, `k`, `m`, `n`) conectadas a 4 routers vecinos con los siguientes costes de enlace directo:
   - Por interfaz **`j`** (hacia vecino `ID: 9`): coste de enlace = **$+3$**
   - Por interfaz **`k`** (hacia vecino `ID: 10`): coste de enlace = **$+2$**
   - Por interfaz **`m`** (hacia vecino `ID: 1`): coste de enlace = **$+2$**
   - Por interfaz **`n`** (hacia vecino `ID: 3`): coste de enlace = **$+7$**

   El router `ID: 4` recibe de sus 4 vecinos los vectores de distancia hacia los 11 destinos de la red (`1..11`). Calcular la fila **Distancia mínima** y la fila **Interfaz de salida**.
2. **Problema de la Cuenta a Infinito (Diapositiva 49)**: Explicar paso a paso qué ocurre en la red lineal `A(0) —[dist 1]— 7 —[dist 1]— 8` cuando $A$ se apaga.

---

### 2. Solución Paso a Paso y Explicación ("¿Por qué es así?")

#### A. Resolución de la Tabla de Vector Distancia en el Router `ID: 4` (Ecuación de Bellman-Ford)
Para cada destino $d \in \{1..11\}$ (salvo el propio router $d = 4$, cuya distancia es $0$ por interfaz local `0`), el router suma el coste de cada interfaz al valor anunciado por ese vecino:
$$D_4(d) = \min_{x \in \{j,k,m,n\}} \big( c(4, x) + D_x(d) \big)$$

| Destino | Vía `j` ($+3$) | Vía `k` ($+2$) | Vía `m` ($+2$) | Vía `n` ($+7$) | **Distancia Mínima** | **Interfaz Salida** |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | $12+3 = 15$ | $5+2 = 7$ | $0+2 = \mathbf{2}$ | $6+7 = 13$ | **2** | **`m`** |
| **2** | $3+3 = \mathbf{6}$ | $8+2 = 10$ | $5+2 = 7$ | $2+7 = 9$ | **6** | **`j`** |
| **3** | $15+3 = 18$ | $3+2 = \mathbf{5}$ | $3+2 = \mathbf{5}$ | $0+7 = 7$ | **5** | **`m`** (o `k`) |
| **4** | — | — | — | — | **0** | **`0`** (propio) |
| **5** | $12+3 = 15$ | $10+2 = \mathbf{12}$ | $19+2 = 21$ | $8+7 = 15$ | **12** | **`k`** |
| **6** | $5+3 = \mathbf{8}$ | $7+2 = 9$ | $9+2 = 11$ | $5+7 = 12$ | **8** | **`j`** |
| **7** | $6+3 = 9$ | $4+2 = \mathbf{6}$ | $5+2 = 7$ | $8+7 = 15$ | **6** | **`k`** |
| **8** | $18+3 = 21$ | $20+2 = 22$ | $22+2 = 24$ | $12+7 = \mathbf{19}$ | **19** | **`n`** |
| **9** | $0+3 = \mathbf{3}$ | $5+2 = 7$ | $2+2 = 4$ | $11+7 = 18$ | **3** | **`j`** |
| **10** | $7+3 = 10$ | $0+2 = \mathbf{2}$ | $4+2 = 6$ | $3+7 = 10$ | **2** | **`k`** |
| **11** | $15+3 = 18$ | $15+2 = 17$ | $7+2 = \mathbf{9}$ | $2+7 = \mathbf{9}$ | **9** | **`n`** (o `m`) |

- **Observación crucial en el Destino 3**: ¡El nodo `ID: 3` es vecino directo de `ID: 4` a través de la interfaz `n` (coste $7$), pero la ruta óptima hacia `3` **NO va por `n`**, sino por `m` (o `k`) con coste total **$5$** ($3+2$)! Esto demuestra que el enlace directo no siempre es el camino más corto.

#### B. Explicación del Problema de la Cuenta a Infinito (Diapositiva 49)
- **Estado estable cuando $A$ está encendido**:
  - $A$ tiene distancia $0$; el router `7` aprende que llega a $A$ con distancia $1$; el router `8` aprende de `7` que llega a $A$ con distancia $1 + 1 = 2$.
- **¿Qué ocurre cuando $A$ se apaga o se corta el enlace `A—7`?**
  1. El router `7` pierde su ruta directa a $A$, pero mira lo que le anuncia su vecino `8`: ¡`8` le está diciendo *"yo llego a $A$ con distancia $2$"*!
  2. Como el Vector Distancia **no informa del camino completo**, `7` ignora que la ruta de `8` pasaba a través del propio `7`. Así que `7` actualiza su distancia a $2 + 1 = \mathbf{3}$ apuntando hacia `8`.
  3. En el siguiente ciclo, `8` ve que su vecino `7` (su único camino hacia $A$) ha subido su coste a $3$, por lo que `8` actualiza su coste a $3 + 1 = \mathbf{4}$.
  4. Seguidamente `7` sube a $4 + 1 = \mathbf{5}$, luego `8` a $\mathbf{6}$, `7` a $\mathbf{7}$, `8` a $\mathbf{8}$... creando un **bucle de enrutamiento entre `7` y `8`** que incrementa el coste de uno en uno hasta alcanzar el valor prefijado como "infinito" (en RIP es **16 saltos**).

---

## 7.7 Routing de Estado del Enlace: Ejecución Paso a Paso del Algoritmo de Dijkstra
- **PDF del subtema**: [`7.7_Routing_Estado_del_Enlace_Ejemplo_Algoritmo_Dijkstra.pdf`](./7.7_Routing_Estado_del_Enlace_Ejemplo_Algoritmo_Dijkstra.pdf) | **Solución individual**: [`7.7_Routing_Estado_del_Enlace_Ejemplo_Algoritmo_Dijkstra.md`](./7.7_Routing_Estado_del_Enlace_Ejemplo_Algoritmo_Dijkstra.md)
- **Diapositivas**: 53, 54, 55

### 1. Enunciado del Ejercicio (Diapositivas 53–55)
Se tiene una red de 7 routers (`A`, `B`, `C`, `D`, `E`, `F`, `G`) cuyos paquetes de estado del enlace (**LSP**, *Link State Packets*) contienen los siguientes costes simétricos:
- **`A`**: `B/6`, `D/2`
- **`B`**: `A/6`, `C/2`, `E/1`
- **`C`**: `B/2`, `F/2`, `G/5`
- **`D`**: `A/2`, `E/2`
- **`E`**: `B/1`, `D/2`, `F/4`
- **`F`**: `C/2`, `E/4`, `G/1`
- **`G`**: `C/5`, `F/1`

Ejecutar paso a paso el **Algoritmo de Dijkstra (SPF)** tomando como raíz el router **`C`** y determinar qué enlaces de la red no son utilizados por ninguna ruta óptima.

---

### 2. Ejecución Paso a Paso del Algoritmo de Dijkstra desde `C(0)` (Diapositiva 54)
1. **Paso 1 (Raíz `C(0)`)**: `C` examina su propio LSP (`B/2`, `F/2`, `G/5`) e incorpora como candidatos a sus vecinos:
   - `B(2)` vía `C`, `F(2)` vía `C`, `G(5)` vía `C`.
   - Elegimos los de menor coste acumulado ($2$): se consolidan **`B(2)`** y **`F(2)`**.
2. **Paso 2 (Examina el LSP de `F(2)`: `C/2`, `E/4`, `G/1`)**:
   - Hacia `G`: coste vía `F` = $2 + 1 = \mathbf{3} < 5$ (coste directo `C—G`). **Se poda la rama directa `C—G(5)`** y nos quedamos con **`C → F(2) → G(3)`**.
   - Hacia `E`: coste vía `F` = $2 + 4 = 6 \implies$ se añade candidato `E(6)` colgando de `F`.
3. **Paso 3 (Examina el LSP de `B(2)`: `A/6`, `C/2`, `E/1`)**:
   - Hacia `A`: coste vía `B` = $2 + 6 = 8 \implies$ se añade candidato `A(8)` colgando de `B`.
   - Hacia `E`: coste vía `B` = $2 + 1 = \mathbf{3} < 6$ (vía `F`). **Se poda la rama `F—E(6)`** y nos quedamos con **`C → B(2) → E(3)`**.
4. **Paso 4 (Examina el LSP de `E(3)`: `B/1`, `D/2`, `F/4`)**:
   - Hacia `D`: coste vía `E` = $3 + 2 = \mathbf{5} \implies$ se añade **`D(5)`** colgando de `E` (`C → B(2) → E(3) → D(5)`).
5. **Paso 5 (Examina el LSP de `G(3)`: `C/5`, `F/1`)**:
   - No mejora ningún camino existente (sin cambios).
6. **Paso 6 (Examina el LSP de `D(5)`: `A/2`, `E/2`)**:
   - Hacia `A`: coste vía `D` = $5 + 2 = \mathbf{7} < 8$ (vía `B`). **Se poda la rama `B—A(8)`** y nos quedamos con **`C → B(2) → E(3) → D(5) → A(7)`**.
7. **Paso 7 (Examina el LSP de `A(7)`)**:
   - Sin cambios. Todos los nodos están en el árbol óptimo; el algoritmo termina.

---

### 3. Tabla Resumen de Rutas Óptimas desde `C` y Explicación ("¿Por qué es así?")

| Nodo Destino | Camino Óptimo desde `C` | Coste Total Mínimo | Siguiente Salto desde `C` |
| :---: | :--- | :---: | :---: |
| **B** | `C → B` | **2** | `B` |
| **F** | `C → F` | **2** | `F` |
| **E** | `C → B → E` | **3** ($2+1$) | `B` |
| **G** | `C → F → G` | **3** ($2+1$) | `F` |
| **D** | `C → B → E → D` | **5** ($2+1+2$) | `B` |
| **A** | `C → B → E → D → A` | **7** ($2+1+2+2$) | `B` |

- **¿Por qué los enlaces `A—B` (coste 6), `E—F` (coste 4) y `C—G` (coste 5) no se usan en NINGUNA ruta de la red (Diapositiva 55)?**
  Porque entre los extremos de cada uno de esos tres enlaces existe un camino alternativo de 2 saltos cuyo coste sumado es estrictamente menor que el enlace directo:
  - Entre `A` y `B`: el camino `A—D—E—B` cuesta $2 + 2 + 1 = 5 < 6$.
  - Entre `E` y `F`: el camino `E—B—C—F` cuesta $1 + 2 + 2 = 5 > 4$ (no usado desde `C`, aunque sí entre `E` y `F`), pero para `A—B` ($6 > 5$) y `C—G` ($5 > 2+1=3$) ningún par de nodos de toda la red los elegirá jamás mientras no se caiga otro enlace; por tanto, actúan exclusivamente como **enlaces de respaldo (*backup*)**.

---
