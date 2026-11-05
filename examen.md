1. ¿Cuál es la diferencia entre protocolo UDP y TCP?
 TCP (Protocolo de Control de Transmisión): Es fiable y orientado a la conexión. Garantiza que todos los paquetes lleguen en orden y sin errores (ej. navegación web, email).
 UDP (Protocolo de Datagramas de Usuario): Es rápido y no orientado a la conexión. Envía paquetes sin verificar si llegan o en qué orden (ej. streaming, juegos en línea, DNS).
2. ¿Qué característica de uso requiere un puerto del tipo bien conocido?
Los puertos bien conocidos (0-1023) son requeridos por servicios de servidor estándar y fundamentales del sistema operativo (como HTTP, FTP, SSH). Su uso permite que cualquier cliente sepa "dónde" contactar a un servicio específico en un servidor.
3. Enumere 3 servicios UDP y 3 servicio TCP.
 TCP: HTTP (Web), FTP (Transferencia de archivos), SSH (Acceso remoto seguro).
 UDP: DNS (Resolución de nombres), DHCP (Asignación de IP), NTP (Sincronización de tiempo).
4. ¿Cuál es la funcion de las banderas RST y END de TCP?
(Nota: Se asume que "END" se refiere a la bandera "FIN")
 RST (Reset): Cierra la conexión de forma abrupta e inmediata. Se usa para rechazar una conexión o en caso de un error irrecuperable.
 FIN (Finish): Inicia el cierre ordenado de una conexión. Indica que un lado ha terminado de enviar datos, pero aún puede recibir.
5. ¿En que nivel del modelo OSI trabajan el UDP?
Tanto UDP como TCP trabajan en la Capa 4 (Transporte).
6. Describa los tipos de balanceo de carga y capa en la que funcionan:
 Balanceo L4 (Capa 4 - Transporte): Es rápido y simple. Distribuye el tráfico basándose en la IP y el puerto (TCP/UDP), sin mirar el contenido del paquete.
 Balanceo L7 (Capa 7 - Aplicación): Es más inteligente y lento. Inspecciona el contenido del paquete (como URLs, cookies o cabeceras HTTP) para tomar decisiones de enrutamiento.
7. ¿Que es el HSRP?
HSRP (Hot Standby Router Protocol) es un protocolo (propietario de Cisco) que proporciona redundancia de gateway. Permite que dos o más routers compartan una IP virtual. Uno actúa como activo (gestionando el tráfico) y el otro como standby (en espera). Si el activo falla, el standby toma el control automáticamente.
8. ¿Cual es la topologia por excelencia en el Internet?
La topología de Internet es una malla híbrida y jerárquica. No es una topología pura (como estrella o anillo), sino una "red de redes" (Sistemas Autónomos) interconectadas de forma redundante y descentralizada.
9. ¿A que nivel del modelo OSI funciona el broadcast?
El broadcast funciona en dos niveles principales:
 Capa 2 (Enlace de datos): Mediante la dirección MAC de broadcast (FF:FF:FF:FF:FF:FF) dentro de un mismo segmento de red.
 Capa 3 (Red): Mediante la dirección IP de broadcast de una subred (ej. 192.168.1.255).