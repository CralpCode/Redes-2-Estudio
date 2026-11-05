# Tema 6: Redes Inalámbricas IEEE 802.11 — Solucionario Completo Explicado

> **Documento PDF consolidado asociado**: [`00_Todos_Ejercicios_Tema_06.pdf`](./00_Todos_Ejercicios_Tema_06.pdf)

---

## 6.2 Redes 802.11: Ejemplo de Escaneo Activo con NetStumbler
- **PDF del subtema**: [`6.2_Redes_802_11_Ejemplo_Escaneo_Activo_NetStumbler.pdf`](./6.2_Redes_802_11_Ejemplo_Escaneo_Activo_NetStumbler.pdf) | **Solución individual**: [`6.2_Redes_802_11_Ejemplo_Escaneo_Activo_NetStumbler.md`](./6.2_Redes_802_11_Ejemplo_Escaneo_Activo_NetStumbler.md)
- **Diapositivas**: 24

### 1. Enunciado y Análisis de la Captura (Diapositiva 24)
Se muestra una captura del programa **NetStumbler** descubriendo puntos de acceso IEEE 802.11 mediante **escaneo activo genérico**.

### 2. Explicación Técnica ("¿Por qué es así?")
- **Escaneo Pasivo vs. Escaneo Activo en IEEE 802.11**:
  - En el **escaneo pasivo**, la estación escucha silenciosamente cada canal esperando recibir las tramas **Beacon** que los APs emiten periódicamente (habitualmente cada $100\text{ ms}$).
  - En el **escaneo activo**, la estación no espera al Beacon: salta de canal en canal enviando una trama **Probe Request** y espera la respuesta inmediata (**Probe Response**) de los APs presentes en ese canal.
- **¿Cómo funciona el escaneo activo "genérico" de NetStumbler y qué limitación tiene?**
  - NetStumbler envía el `Probe Request` con el campo **SSID vacío (`null` o broadcast)**. Por norma IEEE 802.11, cualquier AP normal responde con un `Probe Response` revelando su BSSID (MAC), su SSID, canal, velocidades soportadas y relación señal/ruido (SNR).
  - **¿Por qué no descubre los APs con "SSID oculto"?** Porque configurar un AP para "ocultar el SSID" consiste en dos acciones: (1) enviar las tramas Beacon con el campo SSID vacío, y (2) **ignorar los `Probe Request` que tengan el SSID en blanco (`null`)**, respondiendo únicamente a aquellos `Probe Request` donde el cliente especifique explícitamente el nombre exacto de la red.

---

## 6.5.2 IEEE 802.11: Problema de la Estación Oculta, NAV y Configuración de RTS/CTS
- **PDF del subtema**: [`6.5.2_Problema_Estacion_Oculta_y_Ejemplo_RTS_CTS.pdf`](./6.5.2_Problema_Estacion_Oculta_y_Ejemplo_RTS_CTS.pdf) | **Solución individual**: [`6.5.2_Problema_Estacion_Oculta_y_Ejemplo_RTS_CTS.md`](./6.5.2_Problema_Estacion_Oculta_y_Ejemplo_RTS_CTS.md)
- **Diapositivas**: 70, 71, 72, 73, 74, 75, 76

### 1. Enunciado del Problema y Ejercicio de Diseño (Diapositivas 70–76)
1. **Problema de la estación oculta (Diap. 70)**: Tres estaciones $A$, $B$ (p. ej. el AP) y $C$ están en línea a $70\text{ m}$ unas de otras. El alcance de radio es de $100\text{ m}$: $A$ y $C$ escuchan a $B$, pero **$A$ y $C$ no se escuchan entre sí**. Analizar qué sucede cuando $A$ envía una trama de $100\text{ ms}$ a $B$ y en mitad del envío $C$ quiere transmitir a $B$.
2. **Mecanismo RTS/CTS y NAV (Diap. 71–75)**: Explicar cómo evitan la colisión las tramas `RTS` (*Request To Send*) y `CTS` (*Clear To Send*) mediante el vector de reserva de red (**NAV**, *Network Allocation Vector*).
3. **Ejercicio de configuración selectiva (Diap. 76)**: En una celda con un AP central y 6 estaciones ($A, B, C, D, E, F$), donde todas las estaciones se escuchan entre sí **salvo $A$ y $F$, que están en extremos opuestos y no se escuchan mutuamente**:
   - ¿En qué estaciones debe activarse RTS/CTS?
   - ¿Qué pasaría si desaparece la estación $F$?
   - ¿Hace falta activar RTS/CTS en el Punto de Acceso (AP)?

### 2. Solución Detallada y Explicación ("¿Por qué es así?")
1. **¿Por qué falla CSMA/CA físico ante una estación oculta?**
   - En CSMA/CA básico (*Physical Carrier Sense*), antes de transmitir, $C$ escucha el medio físico. Como $C$ está fuera del alcance de radio de $A$, **detecta el canal libre** aunque $A$ esté transmitiendo hacia $B$, por lo que $C$ transmite y provoca una **colisión en la antena receptora de $B$**, destruyendo ambas tramas.
2. **¿Cómo lo resuelve la Detección de Portadora Virtual (`RTS/CTS` + `NAV`)?**
   - Antes de mandar los datos largos, $A$ envía una trama muy corta `RTS` indicando la duración total de la transmisión ($100\text{ ms}$) que incluye datos y ACK.
   - Cualquier estación cercana a $A$ (como $D$ en la Diap. 72) lee el `RTS` y carga su temporizador **NAV** (*no transmitir durante $100\text{ ms}$*).
   - El receptor $B$ responde tras un intervalo `SIFS` con una trama corta `CTS` que **repite el campo de duración restante**.
   - Aunque la estación oculta $C$ no oyó el `RTS` de $A$, **sí escucha perfectamente el `CTS` emitido por $B$**, por lo que carga su `NAV = 100 ms` y permanece en silencio hasta que $A$ termina y recibe su `ACK`.
3. **Solución al Ejercicio de la Celda con Estaciones $A..F$ (Diapositiva 76)**:
   - **¿Dónde activar RTS/CTS?** **Únicamente en las estaciones $A$ y $F$**. No debe activarse en $B, C, D, E$ porque ellas son escuchadas directamente por todas las demás estaciones (su propia transmisión física ya frena a todos, por lo que usar RTS/CTS en ellas solo añadiría retardo y *overhead* innecesario).
   - **¿Y si solo estuviera $A$ (y no existiera $F$)?** Entonces **no haría falta activar RTS/CTS en ninguna estación** (tampoco en $A$), porque todas las estaciones existentes se oirían entre sí.
   - **¿Por qué NUNCA hace falta activar RTS/CTS en el AP?**
     1. Para las tramas que **envía** el AP hacia cualquier cliente, como todas las estaciones de la celda están dentro del área de cobertura del AP, todas lo escuchan físicamente (el AP nunca es una estación oculta).
     2. Para las tramas que **recibe** el AP desde clientes lejanos ($A$ o $F$), el estándar IEEE 802.11 obliga a que todo AP responda automáticamente con un `CTS` siempre que cualquier cliente le envíe un `RTS`, sin necesidad de configurar nada en el AP.
   - **¿Por qué se configura un umbral de tamaño (*RTS Threshold*)?** Porque si dos estaciones envían un `RTS` a la vez y colisionan, solo se pierde una trama diminuta ($20\text{ bytes}$). En cambio, para paquetes de datos muy cortos, el sobrecoste de enviar `RTS + SIFS + CTS + SIFS` antes de los datos es peor que el riesgo de retransmitir el paquete corto si colisiona.

---
