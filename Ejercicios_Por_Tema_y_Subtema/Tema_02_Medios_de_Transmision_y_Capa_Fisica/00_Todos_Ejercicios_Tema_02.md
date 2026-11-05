# Tema 2: Medios de Transmisión y Capa Física — Solucionario Completo Explicado

> **Documento PDF consolidado asociado**: [`00_Todos_Ejercicios_Tema_02.pdf`](./00_Todos_Ejercicios_Tema_02.pdf)

---

## 2.5.3 WDM: Ejemplo de Red Óptica DWDM RedIRIS-NOVA
- **PDF del subtema**: [`2.5.3_WDM_Ejemplo_Red_Optica_RedIRIS_NOVA.pdf`](./2.5.3_WDM_Ejemplo_Red_Optica_RedIRIS_NOVA.pdf) | **Solución individual**: [`2.5.3_WDM_Ejemplo_Red_Optica_RedIRIS_NOVA.md`](./2.5.3_WDM_Ejemplo_Red_Optica_RedIRIS_NOVA.md)
- **Diapositivas**: 202

### 1. Datos del Caso Real (RedIRIS-NOVA)
- **Fibra desplegada**: $11.500\text{ km}$ de fibra monomodo **ITU G.652-D** (terrestre) y $2.000\text{ km}$ de fibra **ITU G.655** (submarina).
- **Topología óptica**: 53 Puntos de Presencia (PdP), 121 amplificadores ópticos en línea (**ILA**, *In-Line Amplifier*), 86 enlaces terrestres y 3 submarinos.
- **Equipos DWDM**: Alcatel-Lucent 1626 LM (*Light Manager*) con capacidad para **96 canales a $10\text{ Gb/s}$** ($960\text{ Gb/s}$) u **80 canales a $40\text{ Gb/s}$** ($3,2\text{ Tb/s}$).
- **Alcance óptico sin regenerar**: $3.500\text{ km}$ a $10\text{ Gb/s}$ y $1.600\text{ km}$ a $40\text{ Gb/s}$.

### 2. Explicación Técnica ("¿Por qué es así?")
- **¿Por qué se usa DWDM con amplificadores ILA (EDFA) en lugar de regeneradores electrónicos?** Porque un amplificador óptico dopado con erbio (EDFA) amplifica simultáneamente todas las longitudes de onda ($\lambda$) en el dominio fotónico sin convertir la señal a electricidad.
- **¿Por qué el alcance sin regenerar cae de $3.500\text{ km}$ (a $10\text{ Gb/s}$) a $1.600\text{ km}$ (a $40\text{ Gb/s}$)?** Al multiplicar por 4 la tasa binaria, la duración de cada pulso óptico se divide por 4 ($T_b$ pasa de $100\text{ ps}$ a $25\text{ ps}$). Pulsos más estrechos tienen mayor anchura espectral y sufren mucha mayor **dispersión cromática** y **dispersión por modo de polarización (PMD)**, además de requerir una mayor relación señal/ruido óptica (OSNR) para ser distinguidos en el fotodetector.
- **¿Por qué se usa fibra G.655 en los tramos submarinos?** La fibra G.655 (*Non-Zero Dispersion-Shifted Fiber*, NZDSF) tiene una dispersión cromática pequeña pero no nula en la ventana de $1550\text{ nm}$, lo que evita efectos no lineales (mezcla de cuatro ondas, FWM) entre los 80–96 canales DWDM a lo largo de cientos de kilómetros sin puntos intermedios.

---

## 2.6.5 Medios Inalámbricos: Cálculo de Atenuación WiFi y Presupuesto de Enlace
- **PDF del subtema**: [`2.6.5_Medios_Inalambricos_Calculo_de_Atenuacion_WiFi.pdf`](./2.6.5_Medios_Inalambricos_Calculo_de_Atenuacion_WiFi.pdf) | **Solución individual**: [`2.6.5_Medios_Inalambricos_Calculo_de_Atenuacion_WiFi.md`](./2.6.5_Medios_Inalambricos_Calculo_de_Atenuacion_WiFi.md)
- **Diapositivas**: 248, 249, 250

### 1. Enunciado del Ejercicio de Atenuación WiFi (Diapositiva 250)
Un punto de acceso (AP) emite en la banda de **$2,4\text{ GHz}$** con una potencia **EIRP = $+20\text{ dBm}$ ($100\text{ mW}$)** (incluyendo una ganancia de antena del AP de $+5\text{ dBi}$). Calcular la potencia recibida ($P_{Rx}$) en tres escenarios:
1. **Caso 1**: Portátil con antena de $+2\text{ dBi}$ situado a $3\text{ m}$ en visión directa ($	ext{FSPL}_{3\text{m}} = -50\text{ dB}$).
2. **Caso 2**: Portátil con antena de $+2\text{ dBi}$ situado a $25\text{ m}$ ($	ext{FSPL}_{25\text{m}} = -68\text{ dB}$) atravesando un muro de ladrillo ($-6\text{ dB}$) y, alternativamente, a $50\text{ m}$ ($	ext{FSPL}_{50\text{m}} = -74\text{ dB}$).
3. **Caso 3**: Teléfono móvil con antena interna de $-2\text{ dBi}$ en la misma ubicación del Caso 2.

### 2. Cálculos Paso a Paso y Explicación ("¿Por qué es así?")
La fórmula del balance de enlace (*Link Budget*) partiendo de la potencia radiada isotrópica equivalente ($	ext{EIRP} = P_{Tx} + G_{Tx} = +20\text{ dBm}$) es:
$$P_{Rx}\text{ (dBm)} = \text{EIRP (dBm)} - L_{\text{espacio libre}}\text{ (dB)} - L_{\text{obstáculos}}\text{ (dB)} + G_{Rx}\text{ (dBi)}$$

- **Cálculo Caso 1 (Portátil a $3\text{ m}$)**:
  $$P_{Rx} = +20\text{ dBm} - 50\text{ dB} + 2\text{ dBi} = -28\text{ dBm}\quad (\text{o }-23\text{ dBm sumando ganancia de recepción según convenio de la diapositiva: }+20 + 5 - 50 + 2 = -23\text{ dBm})$$
  *Nota clave sobre la diapositiva 250*: El autor suma explícitamente: $+20\text{ dBm} + 5\text{ dBi (antena AP)} - 50\text{ dB (FSPL 3m)} + 2\text{ dBi (antena portátil)} = -23\text{ dBm}$.
- **Cálculo Caso 2 (Portátil a $25\text{ m}$ tras muro de ladrillo de $-6\text{ dB}$ o a $50\text{ m}$ en espacio libre)**:
  - A $25\text{ m}$ con muro de ladrillo: $L_{\text{total}} = -68\text{ dB} - 6\text{ dB} = -74\text{ dB}$ (exactamente la misma pérdida que a $50\text{ m}$ en espacio libre, porque perder $6\text{ dB}$ equivale a duplicar la distancia en el espacio libre: $\Delta\text{FSPL} = 20\log_{10}(2) \approx 6\text{ dB}$).
  - Señal en el portátil:
    $$P_{Rx,\text{portátil}} = +20 + 5 - 74 + 2 = -47\text{ dBm}$$
- **Cálculo Caso 3 (Teléfono móvil en el mismo punto)**:
  - Como la antena del smartphone es muy pequeña y está integrada en el chasis, su ganancia es negativa ($-2\text{ dBi}$, frente a $+2\text{ dBi}$ de la pantalla del portátil):
    $$P_{Rx,\text{teléfono}} = +20 + 5 - 74 - 2 = -51\text{ dBm}$$
- **¿Por qué a $5\text{ GHz}$ el alcance interior es mucho menor que a $2,4\text{ GHz}$ (Diapositivas 248–249)?**
  1. Porque la pérdida en espacio libre ($	ext{FSPL} = 20\log_{10}(d) + 20\log_{10}(f) + 32,44$) aumenta con la frecuencia ($+6,4\text{ dB}$ adicionales al pasar de $2,4\text{ GHz}$ a $5\text{ GHz}$).
  2. Porque la absorción de los materiales constructivos crece drásticamente con la frecuencia: por ejemplo, una puerta de madera maciza atenúa $4\text{ dB}$ a $2,4\text{ GHz}$ pero $10\text{ dB}$ a $5\text{ GHz}$, y un muro de ladrillo/hormigón duplica su atenuación en dB.

---

## 2.6.9 Puentes Inalámbricos: Ganancia de Antena, Zona de Fresnel y Viabilidad
- **PDF del subtema**: [`2.6.9_Puentes_Inalambricos_Calculo_Antena_y_Viabilidad.pdf`](./2.6.9_Puentes_Inalambricos_Calculo_Antena_y_Viabilidad.pdf) | **Solución individual**: [`2.6.9_Puentes_Inalambricos_Calculo_Antena_y_Viabilidad.md`](./2.6.9_Puentes_Inalambricos_Calculo_Antena_y_Viabilidad.md)
- **Diapositivas**: 269, 270, 271

### 1. Enunciado y Datos
1. **Radiotelescopio de Arecibo (Diapositiva 269)**: Diámetro $D = 305\text{ m}$, frecuencia $f = 2,4\text{ GHz}$ ($\lambda = 0,125\text{ m}$), potencia $P_{Tx} = 1\text{ MW} = +63\text{ dBm}$ (nota: $1\text{ MW} = 10^9\text{ mW} = 90\text{ dBm}$, en el ejemplo se indica $63\text{ dBm}$ y ganancia $73,3\text{ dBi}$).
2. **Zonas de Fresnel (Diapositiva 270)**: Cálculo de la anchura del elipsoide libre de obstáculos a $2,4\text{ GHz}$ y $5\text{ GHz}$ para enlaces de $100\text{ m}$, $500\text{ m}$, $1\text{ km}$ y $10\text{ km}$.
3. **Viabilidad de un radioenlace exterior (Diapositiva 271)**: Parámetros requeridos.

### 2. Explicación Técnica ("¿Por qué es así?")
- **¿De dónde sale la ganancia de $73,3\text{ dBi}$ de una antena parabólica?**
  La ganancia de un reflector parabólico es $G = \eta \left(\frac{\pi D}{\lambda}\right)^2$, donde $\eta \approx 0,55$ es la eficiencia de apertura y $\lambda = \frac{c}{f} = \frac{3\times 10^8}{2,4\times 10^9} = 0,125\text{ m}$. Con $D = 305\text{ m}$, $\frac{\pi D}{\lambda} = 7.665$, su cuadrado multiplicado por $\eta$ da $\approx 2,14 \times 10^7$, que en decibelios es $10\log_{10}(2,14\times 10^7) = 73,3\text{ dBi}$.
- **¿Por qué no basta con "ver" la otra antena (línea de vista óptica) y se exige despejar la 1ª Zona de Fresnel?**
  Las ondas de radio tienen una longitud de onda millones de veces mayor que la luz visible ($12,5\text{ cm}$ a $2,4\text{ GHz}$ frente a $500\text{ nm}$). Cualquier obstáculo (edificio, árboles, tierra) dentro del primer elipsoide de Fresnel provoca **difracción y reflexiones desfasadas $180^\circ$** que interfieren destructivamente con el rayo directo en el receptor.
  El radio de la primera zona de Fresnel en el punto medio de un enlace de distancia $D$ es:
  $$r_1 = \frac{1}{2}\sqrt{\lambda \cdot D}$$
  Por eso, para $D = 10\text{ km}$ a $2,4\text{ GHz}$, la anchura de la 1ª zona de Fresnel alcanza **$35\text{ m}$** (mientras que a $5\text{ GHz}$, al ser $\lambda$ la mitad, se reduce a **$24\text{ m}$**).

---

## 2.9.2 Ley de Shannon: Ejemplos (Canal Telefónico y TV PAL) y Regla Aproximada
- **PDF del subtema**: [`2.9.2_Ley_de_Shannon_Ejemplos_y_Calculo_Aproximado.pdf`](./2.9.2_Ley_de_Shannon_Ejemplos_y_Calculo_Aproximado.pdf) | **Solución individual**: [`2.9.2_Ley_de_Shannon_Ejemplos_y_Calculo_Aproximado.md`](./2.9.2_Ley_de_Shannon_Ejemplos_y_Calculo_Aproximado.md)
- **Diapositivas**: 326, 327, 328, 329

### 1. Enunciado y Fórmulas
Aplicar la **Ley de Shannon-Hartley** para hallar la capacidad máxima teórica ($C$) y la eficiencia espectral ($C/\text{BW}$) de:
1. **Canal telefónico analógico**: $\text{BW} = 3,3\text{ kHz}$ y relación señal/ruido $\text{SR}_{\text{dB}} = 36\text{ dB}$.
2. **Canal de TV PAL**: $\text{BW} = 8\text{ MHz}$ y $\text{SR}_{\text{dB}} = 46\text{ dB}$.
3. Deducir la **regla aproximada de Shannon** para valores altos de SNR.

### 2. Solución Paso a Paso y Explicación ("¿Por qué es así?")
La Ley de Shannon establece el límite teórico insuperable de transferencia de información libre de errores sobre un canal con ruido blanco gaussiano aditivo (AWGN):
$$C = \text{BW} \cdot \log_2(1 + \text{SR}) = \frac{\text{BW} \cdot \log_{10}(1 + 10^{\text{SR}_{\text{dB}}/10})}{0,30103}\text{ (bits/s)}$$

1. **Canal Telefónico ($\text{BW} = 3.300\text{ Hz}$, $\text{SR}_{\text{dB}} = 36\text{ dB}$)**:
   - Pasamos $\text{SR}$ de decibelios a relación lineal: $\text{SR} = 10^{36/10} = 10^{3,6} = 3.981,07$.
   - Aplicamos Shannon:
     $$C = 3,3\text{ kHz} \cdot \frac{\log_{10}(1 + 3.981)}{0,301} = 3,3\text{ kHz} \cdot \frac{3,6001}{0,301} = 39,4\text{ kb/s}$$
   - **Eficiencia espectral**: $\eta = \frac{39,4\text{ kb/s}}{3,3\text{ kHz}} \approx 12\text{ bits/Hz}$. (Por esta razón los módems telefónicos V.34/V.90 nunca pudieron superar los $33,6\text{ kb/s}$–$56\text{ kb/s}$ sobre el ancho de banda filtrado de voz).

2. **Canal de TV PAL ($\text{BW} = 8\text{ MHz}$, $\text{SR}_{\text{dB}} = 46\text{ dB}$)**:
   - Relación lineal: $\text{SR} = 10^{4,6} = 39.810,7$.
   - Capacidad máxima:
     $$C = 8\text{ MHz} \cdot \frac{\log_{10}(39.812)}{0,301} = 8\text{ MHz} \cdot 15,28 = 122,2\text{ Mb/s}$$
   - **Eficiencia espectral**: $\eta = \frac{122,2\text{ Mb/s}}{8\text{ MHz}} = 15,3\text{ bits/Hz}$.

3. **Deducción de la Regla Aproximada ($\eta \approx \frac{\text{SR}_{\text{dB}}}{3}$)**:
   - Cuando $\text{SR} \gg 1$, podemos despreciar el $1$ en $(1 + \text{SR}) \approx \text{SR}$. Como $\text{SR}_{\text{dB}} = 10\log_{10}(\text{SR})$, tenemos $\log_{10}(\text{SR}) = \frac{\text{SR}_{\text{dB}}}{10}$.
   - Sustituyendo en la ecuación:
     $$C \approx \text{BW} \cdot \frac{\text{SR}_{\text{dB}} / 10}{0,301} \approx \text{BW} \cdot \frac{\text{SR}_{\text{dB}}}{3} \implies \text{Eficiencia (bits/Hz)} \approx \frac{\text{SR}_{\text{dB}}}{3}$$
   - **Consecuencia física directa**: **Por cada $3\text{ dB}$ que mejore la relación señal/ruido (es decir, cada vez que se duplica la potencia de señal respecto al ruido), podemos añadir $1\text{ bit/símbolo}$ a la modulación QAM** (por ejemplo, pasar de 64-QAM con $6\text{ bits/símbolo}$ a 128-QAM con $7\text{ bits/símbolo}$).

---

## 2.9.3 y 2.9.4 ADSL: Modulación DMT y Análisis de Parámetros Reales de un Router
- **PDF del subtema**: [`2.9.3_y_2.9.4_ADSL_Ejemplo_Practico_y_Parametros_Reales.pdf`](./2.9.3_y_2.9.4_ADSL_Ejemplo_Practico_y_Parametros_Reales.pdf) | **Solución individual**: [`2.9.3_y_2.9.4_ADSL_Ejemplo_Practico_y_Parametros_Reales.md`](./2.9.3_y_2.9.4_ADSL_Ejemplo_Practico_y_Parametros_Reales.md)
- **Diapositivas**: 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341

### 1. Enunciado y Caso Práctico (Router Cisco ADSL `show dsl int atm0`)
Se analiza un bucle de abonado ADSL con modulación **DMT (ITU G.992.1)** dividido en 256 subcanales (*bins*) de $4,3125\text{ kHz}$ cada uno ($4.000\text{ símbolos/s}$ por bin):
- **Bins 0–6**: Telefonía analógica POTS ($0–4\text{ kHz}$) + banda de guarda.
- **Bins 7–29**: Canal ascendente (*Upstream*).
- **Bins 38–243**: Canal descendente (*Downstream*).

Se examinan dos capturas reales del comando `reglaro#show dsl int atm0`:
- **Captura 1 (Diapositivas 338–340)**: Contrato de $4000 / 512\text{ kb/s}$.
- **Captura 2 (Diapositiva 341)**: El mismo bucle tras subir el contrato a $8000 / 640\text{ kb/s}$.

### 2. Análisis Detallado y Explicación ("¿Por qué es así?")
1. **Cálculo del caudal físico a partir de la tabla `Bits Per Bin` (Diapositiva 339)**:
   - Sumando los dígitos hexadecimales de los bins ascendentes (7 al 29) se obtienen **$168\text{ bits/símbolo}$**. Como en ADSL se envían $4.000\text{ símbolos/s}$:
     $$\text{Capacidad bruta ascendente} = 168\text{ bits/símb} \times 4\text{ ksímb/s} = 672\text{ kb/s}$$
     (Suficiente para cubrir los $512\text{ kb/s}$ contratados más el *overhead* de corrección Reed-Solomon e Interleaving).
   - Sumando los bits por símbolo de los bins descendentes (38 al 243) se obtienen **$1.241\text{ bits/símbolo}$**:
     $$\text{Capacidad bruta descendente} = 1.241\text{ bits/símb} \times 4\text{ ksímb/s} = 4.964\text{ kb/s}$$
2. **¿Por qué el bin 40 (hex) = bin 64 (decimal, $\approx 276\text{ kHz}$) tiene `0` bits asignados en medio de bins con `8` bits?**
   - Porque en esa frecuencia exacta existe una interferencia estrecha (como una emisora de radio AM de onda media o una resonancia por un puente de derivación en el par de cobre). La gran ventaja de **DMT (OFDM)** es que mide la SNR bin a bin durante el entrenamiento y **apaga o reduce la modulación QAM únicamente en el bin afectado**, sin degradar el resto del espectro.
3. **¿Qué ocurre al subir el perfil comercial a $8000 / 640\text{ kb/s}$ sobre el mismo cable (Diapositiva 341)?**
   - Como la atenuación del cable es fija ($30,0\text{ dB}$ en bajada) y la potencia máxima de emisión ya estaba al tope ($20,0\text{ dBm}$), para codificar más bits por bin (pasando de 8–9 bits a `B`=11 y `C`=12 bits/símbolo, es decir, **4096-QAM**) el módem tiene que **consumir su margen de ruido (*Noise Margin*)**:
   - En $4000\text{ kb/s}$ el *Noise Margin* era de **$20,5\text{ dB}$** (muy holgado, casi sin errores CRC: 6 errores).
   - Al pedir $8000\text{ kb/s}$, el router ni siquiera logra llegar a $8000\text{ kb/s}$: sincroniza a **$6560\text{ kb/s}$** (su máximo físico es $6694\text{ kb/s}$), el *Noise Margin* cae a **$10,5\text{ dB}$** y los errores CRC suben de 6 a **39**.

---
