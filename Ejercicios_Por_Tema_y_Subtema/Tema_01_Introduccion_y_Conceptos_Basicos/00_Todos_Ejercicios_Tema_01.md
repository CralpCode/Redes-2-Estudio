# Tema 1: Introducción y Conceptos Básicos — Solucionario Completo Explicado

> **Documento PDF consolidado asociado**: [`00_Todos_Ejercicios_Tema_01.pdf`](./00_Todos_Ejercicios_Tema_01.pdf)

---

## 1.3 Modelo de Capas: Ejemplo de Comunicación, Multiplexado y Control de Flujo
- **PDF del subtema**: [`1.3_Modelo_de_Capas_Ejemplo_Comunicacion_y_Multiplexado.pdf`](./1.3_Modelo_de_Capas_Ejemplo_Comunicacion_y_Multiplexado.pdf) | **Solución individual**: [`1.3_Modelo_de_Capas_Ejemplo_Comunicacion_y_Multiplexado.md`](./1.3_Modelo_de_Capas_Ejemplo_Comunicacion_y_Multiplexado.md)
- **Diapositivas**: 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42

### 1. Enunciado y Planteamiento del Modelo
Dos artistas, **Joaquim** en Valencia (solo habla valenciano) y **Serguei** en Moscú (solo habla ruso), mantienen una conversación sobre pintura mediante una arquitectura de **4 capas**:
- **Capa 4 (Tema / Aplicación)**: Artistas hablando de pintura/escultura.
- **Capa 3 (Idioma común)**: Traductores Valenciano/Francés y Ruso/Francés.
- **Capa 2 (Código)**: Telegrafistas que codifican/decodifican en Morse.
- **Capa 1 (Medio físico)**: Telégrafos unidos por un hilo que transmite impulsos eléctricos.

Se plantean cuatro problemas adicionales:
1. **Multiplexado en Capa 4**: Se incorporan **Vicent** (Valencia) y **Boris** (Moscú). ¿Cómo sabe el traductor de Moscú si un mensaje va dirigido a Serguei o a Boris?
2. **Multiplexado inverso en Capa 2**: El traductor es rápido y el telegrafista lento, por lo que se ponen 2 telegrafistas en paralelo (mensajes pares por el 1 e impares por el 2). Si se envían M1 (10 s), M2 (50 s) y M3 (12 s), ¿qué problema aparece?
3. **Control de flujo y Overhead**: ¿Qué ocurre si un traductor recibe mensajes más rápido de lo que puede procesar, y cómo afecta el tamaño del mensaje al rendimiento?
4. **Comunicación indirecta (Conmutación)**: Si no hay línea directa Valencia–Moscú y se pasa por París (telégrafo $\leftrightarrow$ teletipo) y Copenhague (teletipo $\leftrightarrow$ telégrafo), ¿hasta qué capa suben los nodos intermedios?

### 2. Solución Detallada y Justificación ("¿Por qué es así?")
- **Principio de independencia entre capas**: La capa $n$ ofrece servicios a la capa $n+1$ y usa los de la $n-1$ a través de **interfaces locales**, mientras conversa virtualmente con su homóloga mediante el **protocolo de capa $n$**. Si en el tramo París–Copenhague se cambia el telégrafo por un teletipo, los artistas y traductores (capas 4 y 3) **no sufren ningún cambio** porque el cambio queda encapsulado en las capas 1 y 2.
- **Solución al Multiplexado (Diapositivas 33–36)**:
  - **Opción A (Sin conexión / Datagrama)**: Cada mensaje lleva una cabecera indicando explícitamente el destinatario (ej. `De: Joaquim, Para: Boris`). Es el modelo de **UDP** o **IP**.
  - **Opción B (Orientado a conexión / Circuito virtual)**: Al inicio se envía un mensaje de control `Establecer conexión Joaquim-Boris`, creando estado en los traductores, y al final `Fin de conexión`. Es el modelo de **TCP**.
  - **¿Por qué el traductor no deduce el destinatario leyendo el contenido?** Porque violaría la independencia de capas (la capa 3 no debe inspeccionar la semántica de la capa 4) y además dos pares podrían hablar del mismo tema simultáneamente.
- **Solución al Multiplexado Inverso (Diapositivas 37–39)**:
  - El Telegrafista 1 envía M1 ($t = 10\text{ s}$) y luego M3 ($t = 10 + 12 = 22\text{ s}$).
  - El Telegrafista 2 envía M2 ($t = 50\text{ s}$).
  - **Consecuencia**: M3 llega en el segundo 22, mucho antes que M2 (segundo 50), provocando **desorden de paquetes**. Por ello, la capa superior (traductor) está obligada a incluir un **número de secuencia** en su cabecera para reordenar los mensajes antes de entregarlos al artista.
- **Control de Flujo y Overhead (Diapositivas 40–41)**:
  - Si el receptor se satura, aplica control de flujo **explícito** (avisando al emisor para que pare o reduzca el ritmo, como la ventana TCP) o **implícito** (descartando paquetes para que el emisor infiera congestión).
  - Cada capa añade su propia cabecera de tamaño fijo $H$. El rendimiento útil es $\eta = \frac{D}{D + H}$. Si los datos $D$ son muy pequeños, el *overhead* porcentual se dispara y el rendimiento cae drásticamente.

---

## 1.4 y 1.6 Ejemplos de Protocolos por Capa (OSI) y Servicios Con/Sin Conexión
- **PDF del subtema**: [`1.4_y_1.6_Ejemplos_de_Protocolos_por_Capa_y_Conexion.pdf`](./1.4_y_1.6_Ejemplos_de_Protocolos_por_Capa_y_Conexion.pdf) | **Solución individual**: [`1.4_y_1.6_Ejemplos_de_Protocolos_por_Capa_y_Conexion.md`](./1.4_y_1.6_Ejemplos_de_Protocolos_por_Capa_y_Conexion.md)
- **Diapositivas**: 64, 81

### 1. Enunciado y Clasificación
1. Clasificar los protocolos reales en las 7 capas del modelo OSI (Diapositiva 64).
2. Clasificar los protocolos según operen **con conexión** o **sin conexión** en cada capa y explicar el diseño de Internet (Diapositiva 81).

### 2. Solución y Explicación Profunda ("¿Por qué es así?")
| Capa OSI | Ejemplos de Protocolos | Con Conexión | Sin Conexión |
| :--- | :--- | :--- | :--- |
| **7 - Aplicación** | FTP, HTTP, SMTP, SSH, Telnet, DNS | FTP | DNS |
| **6 - Presentación** | CSS, GIF, HTML | — | — |
| **5 - Sesión** | RPC, SQL, TLS, PAP | — | — |
| **4 - Transporte** | TCP, UDP, NETBEUI | **TCP** | **UDP** |
| **3 - Red** | IPv4, IPv6, ICMP, OSPF, Appletalk | ATM, X.25 | **IP**, Ethernet (LLC) |
| **2 - Enlace** | LLC, Ethernet | X.25 | **Ethernet** |
| **1 - Física** | CATV, xDSL, Ethernet física, USB | Llamada telefónica | Ethernet |

- **¿Por qué Internet usa servicios SIN conexión hasta el nivel de red (IP) y deja la conexión para el nivel de transporte (TCP)?**
  - En las redes telefónicas clásicas (X.25, ATM), la inteligencia y el estado de las conexiones residían en los conmutadores intermedios (orientado a conexión en capa 2/3). Si un nodo intermedio caía, la conexión moría.
  - Internet aplica el principio *End-to-End*: mantiene el núcleo de la red (routers IP y switches Ethernet) **sin estado de conexión** (*connectionless*), de modo que cada datagrama IP se enruta independientemente y puede rodear fallos dinámicamente. La fiabilidad y el control de conexión se delegan íntegramente a los extremos mediante **TCP** (o se omiten usando **UDP** cuando prima la inmediatez, como en DNS o VoIP).

---
