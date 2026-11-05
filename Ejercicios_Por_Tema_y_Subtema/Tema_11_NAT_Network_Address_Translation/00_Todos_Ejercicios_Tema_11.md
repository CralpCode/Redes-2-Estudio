# Tema 11: NAT (Network Address Translation) — Solucionario Completo Explicado

> **Documento PDF consolidado asociado**: [`00_Todos_Ejercicios_Tema_11.pdf`](./00_Todos_Ejercicios_Tema_11.pdf)

---

## 11.1 y 11.2 Traducción de Direcciones (NAT): NAT Estático, Dinámico, NAPT (PAT) y Cono Completo
- **PDF del subtema**: [`11.1_y_11.2_NAT_Ejemplos_NAT_Estatico_Dinamico_y_NAPT.pdf`](./11.1_y_11.2_NAT_Ejemplos_NAT_Estatico_Dinamico_y_NAPT.pdf) | **Solución individual**: [`11.1_y_11.2_NAT_Ejemplos_NAT_Estatico_Dinamico_y_NAPT.md`](./11.1_y_11.2_NAT_Ejemplos_NAT_Estatico_Dinamico_y_NAPT.md)
- **Diapositivas**: 9, 10, 11, 12, 13, 14, 19

### 1. Enunciado de los Casos Prácticos de NAT (Diapositivas 9–14 y 19)
Analizar y comparar cómo traduce las direcciones IP y los puertos TCP/UDP un router NAT con IP externa `206.245.160.1` y red interna privada `192.168.0.0/24` (hosts `.2`, `.3`, servidores internos `.4`, `.5`) en 5 modalidades:
1. **NAT Básico Estático (Diap. 9)**: Mapeo fijo 1 a 1 (`192.168.0.x ↔ 206.245.160.x`).
2. **NAT Básico Dinámico (Diap. 10)**: Pool público `206.245.160.5–10`.
3. **NAPT / PAT Dinámico (Diap. 11, 12 y 14)**: Múltiples hosts internos saliendo simultáneamente con **una única IP pública** (`206.245.160.1` o `192.76.100.7`).
4. **NAPT Estático / Port Forwarding (Diap. 13)**: Dos servidores web internos (`192.168.0.4:80` y `192.168.0.5:80`) publicados hacia Internet detrás de una única IP pública (`206.245.160.1`).
5. **NAPT de Cono Completo (*Full Cone NAT*, Diap. 19)**: Comportamiento con UDP.

---

### 2. Solución Detallada y Explicación ("¿Por qué funciona NAPT con una sola IP?")

| Modalidad NAT | ¿Qué campos del paquete traduce? | ¿Ahorra direcciones IPv4 públicas? | ¿Permite iniciar conexiones desde Internet hacia adentro? |
| :--- | :--- | :--- | :--- |
| **1. NAT Básico Estático** (Diap. 9) | Solo la **IP** (`192.168.0.2 ↔ 206.245.160.2`). Conserva el puerto `1108`. | **NO** (gasta 1 IP pública por cada host interno). | **SÍ** (mapeo permanente 1:1). |
| **2. NAT Básico Dinámico** (Diap. 10) | Solo la **IP** (asigna `206.245.160.5` al primero, `.6` al segundo). | **Poco** (si hay 6 IPs en el pool, solo 6 hosts pueden salir a la vez). | **NO** (sin conexión previa no hay entrada en la tabla). |
| **3. NAPT / PAT Dinámico** (Diap. 11–12) | **IP + Puerto TCP/UDP** (`192.168.0.2:1108 → 206.245.160.1:61001` y `192.168.0.3:1108 → 206.245.160.1:61002`). | **SÍ, masivamente** (hasta $\approx 60.000$ sesiones con **1 sola IP pública**). | **NO** (salvo con agujeros UDP o reglas estáticas). |
| **4. NAPT Estático (Port Forwarding)** (Diap. 13) | **IP destino + Puerto destino** entrante: `206.245.160.1:80 → 192.168.0.4:80` y `206.245.160.1:8080 → 192.168.0.5:80`. | **SÍ** (publica múltiples servidores internos usando 1 sola IP pública). | **SÍ**, exclusivamente a los puertos mapeados en la tabla. |

#### Explicación de Casos Especiales en las Diapositivas
1. **¿Qué pasa si dos ordenadores internos (`192.168.0.2` y `192.168.0.3`) eligen casualmente el MISMO puerto efímero de origen (`1108`) al salir a Internet (Diapositiva 11)?**
   - Si el router mantuviera el puerto `1108` al traducir ambos a la misma IP pública `206.245.160.1`, al volver las respuestas el router no sabría a cuál de los dos ordenadores internos entregárselas.
   - Por eso **NAPT reescribe también el puerto de origen**, asignando un puerto público libre distinto a cada sesión (`61001` para `.2` y `61002` para `.3`) y recalculando tanto el **checksum IP** como el **checksum TCP/UDP** (ya que el checksum TCP/UDP incluye la pseudo-cabecera con las direcciones IP y los puertos).
2. **Análisis de la Tabla NAPT Real de un Router ADSL (Diapositiva 12)**:
   - El PC `192.168.1.11` tiene dos entradas activas: juega a *Quake 3* por `UDP 27960` (traducido a `192.76.100.7:60218`) y escucha radio MP3 en streaming desde `205.149.163.62:8000` (traducido al puerto local `60020`).
   - Simultáneamente, otro PC de la casa (`192.168.1.10`) escucha otra emisora MP3 en `192.160.165.89:8000` (traducido al puerto `60007` de la misma IP pública `192.76.100.7`).
3. **¿Cómo podemos tener DOS servidores web internos escuchando en el puerto 80 si solo tenemos UNA IP pública (`206.245.160.1`, Diapositiva 13)?**
   - Como el puerto público `80` de `206.245.160.1` solo puede apuntar a un servidor interno (`192.168.0.4:80`), el segundo servidor web (`192.168.0.5:80`) debe publicarse en el exterior en un **puerto público alternativo (ej. `8080`)**. Cuando un cliente externo se conecta a `http://206.245.160.1:8080`, el router NAPT traduce la IP destino a `192.168.0.5` y **también traduce el puerto destino de `8080` a `80`**, de modo que el servidor interno `.5` sigue trabajando normalmente en su puerto estándar `80`.

---
