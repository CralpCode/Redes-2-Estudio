// Aplicación Vue 3 — Plataforma Interactiva de Estudio de Redes (AulaClic)
const { createApp, ref, computed, watch, onMounted, nextTick } = Vue;

const app = createApp({
  setup() {
    // Datos cargados desde los scripts globales
    const ejercicios = ref(window.DATOS_EJERCICIOS || []);
    const documentosMd = ref(window.DATOS_DOCUMENTOS_MD || []);
    const curso = ref(window.DATOS_CURSO || []);
    const cuestionarios = ref(window.DATOS_CUESTIONARIOS || {});
    const flashcards = ref(window.DATOS_FLASHCARDS || []);
    const formulario = ref(window.DATOS_FORMULARIO || []);

    // Navegación principal y tema visual
    const vistaActiva = ref("ejercicios"); // 'ejercicios' | 'buscador' | 'cuestionarios' | 'calculadoras' | 'flashcards' | 'temario'
    const modoOscuro = ref(localStorage.getItem("redes_dark") !== "false");

    // Estado persistente de estudio (localStorage)
    const progresoEjercicios = ref(JSON.parse(localStorage.getItem("redes_progreso_ej") || "{}"));
    const notasEjercicios = ref(JSON.parse(localStorage.getItem("redes_notas_ej") || "{}"));
    const puntuacionesQuiz = ref(JSON.parse(localStorage.getItem("redes_scores_quiz") || "{}"));

    watch(modoOscuro, (val) => {
      localStorage.setItem("redes_dark", val ? "true" : "false");
      document.documentElement.classList.toggle("dark", val);
    }, { immediate: true });

    const guardarProgreso = (id, estado) => {
      if (progresoEjercicios.value[id] === estado) {
        delete progresoEjercicios.value[id];
      } else {
        progresoEjercicios.value[id] = estado;
      }
      localStorage.setItem("redes_progreso_ej", JSON.stringify(progresoEjercicios.value));
    };

    const guardarNota = (id, texto) => {
      notasEjercicios.value[id] = texto;
      localStorage.setItem("redes_notas_ej", JSON.stringify(notasEjercicios.value));
    };

    // Estadísticas globales de progreso
    const statsProgreso = computed(() => {
      const total = ejercicios.value.length;
      let dominados = 0, repaso = 0;
      ejercicios.value.forEach(e => {
        if (progresoEjercicios.value[e.id] === "dominado") dominados++;
        else if (progresoEjercicios.value[e.id] === "repaso") repaso++;
      });
      return {
        total,
        dominados,
        repaso,
        pendientes: total - dominados - repaso,
        porcentaje: total ? Math.round((dominados / total) * 100) : 0
      };
    });

    // =========================================================================
    // MÓDULO 1: EXPLORADOR DE LOS 42 EJERCICIOS Y SOLUCIONES EXPLICADAS
    // =========================================================================
    const filtroTemaEj = ref(0); // 0 = Todos
    const filtroCategoriaEj = ref("Todas");
    const filtroEstadoEj = ref("todos"); // 'todos' | 'dominado' | 'repaso' | 'pendiente'
    const busquedaEj = ref("");
    const ejercicioSeleccionado = ref(ejercicios.value[0] || null);
    const slideIdxActual = ref(0);
    const mostrarOcrAnexo = ref(false);
    const modalImagenUrl = ref(null);

    const categoriasDisponibles = computed(() => {
      const s = new Set(ejercicios.value.map(e => e.categoria));
      return ["Todas", ...Array.from(s)];
    });

    const ejerciciosFiltrados = computed(() => {
      const q = busquedaEj.value.trim().toLowerCase();
      return ejercicios.value.filter(e => {
        if (filtroTemaEj.value !== 0 && e.tema !== filtroTemaEj.value) return false;
        if (filtroCategoriaEj.value !== "Todas" && e.categoria !== filtroCategoriaEj.value) return false;
        const est = progresoEjercicios.value[e.id] || "pendiente";
        if (filtroEstadoEj.value !== "todos" && est !== filtroEstadoEj.value) return false;
        if (!q) return true;
        const enTitulo = e.titulo.toLowerCase().includes(q) || e.codigo.toLowerCase().includes(q);
        const enMd = e.markdown.toLowerCase().includes(q);
        const enOcr = e.slides.some(s => s.ocr.toLowerCase().includes(q));
        return enTitulo || enMd || enOcr;
      });
    });

    const seleccionarEjercicio = (ej, irASlideNum = null) => {
      ejercicioSeleccionado.value = ej;
      if (irASlideNum !== null) {
        const idx = ej.slides.findIndex(s => s.num === irASlideNum);
        slideIdxActual.value = idx >= 0 ? idx : 0;
      } else {
        slideIdxActual.value = 0;
      }
      vistaActiva.value = "ejercicios";
      nextTick(() => renderizarMatematicas());
    };

    watch(ejercicioSeleccionado, () => {
      nextTick(() => renderizarMatematicas());
    });

    // Renderizado de Markdown + Fórmulas LaTeX con Marked y KaTeX
    const renderMarkdown = (mdText) => {
      if (!mdText) return "";
      let html = mdText;
      // Proteger bloques LaTeX $$...$$ y $...$ antes de pasar por marked
      const mathBlocks = [];
      html = html.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
        const id = `@@MATH_DISPLAY_${mathBlocks.length}@@`;
        mathBlocks.push({ id, tex: tex.trim(), display: true });
        return id;
      });
      html = html.replace(/\$([^\$\n]+?)\$/g, (_, tex) => {
        const id = `@@MATH_INLINE_${mathBlocks.length}@@`;
        mathBlocks.push({ id, tex: tex.trim(), display: false });
        return id;
      });

      if (window.marked) {
        html = window.marked.parse(html);
      }

      // Restaurar y renderizar con KaTeX
      mathBlocks.forEach(item => {
        let rendered = item.tex;
        if (window.katex) {
          try {
            rendered = window.katex.renderToString(item.tex, {
              displayMode: item.display,
              throwOnError: false
            });
          } catch (e) {
            rendered = `<code>${item.tex}</code>`;
          }
        }
        html = html.replace(item.id, rendered);
      });
      return html;
    };

    const renderizarMatematicas = () => {
      if (window.renderMathInElement) {
        document.querySelectorAll(".math-container").forEach(el => {
          try {
            window.renderMathInElement(el, {
              delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false }
              ],
              throwOnError: false
            });
          } catch (_) {}
        });
      }
    };

    // =========================================================================
    // MÓDULO 2: BUSCADOR GLOBAL EN LAS 1.421 DIAPOSITIVAS Y 42 EJERCICIOS
    // =========================================================================
    const queryGlobal = ref("");
    const temaFiltroGlobal = ref(0);
    const soloConEjercicio = ref(false);
    const sugerenciasBusqueda = [
      "Tiempo de servicio", "Dijkstra", "Spanning Tree", "Ley de Shannon",
      "Estación oculta", "RTS/CTS", "Cuenta a infinito", "Broadcast dirigido",
      "CAM-ARP", "VRRP", "Spoofing", "OSPF", "Fragmentación", "SRTT", "Ventana de congestión", "LFN", "NAPT"
    ];

    // Mapa rápido de qué diapositiva pertenece a qué ejercicio
    const mapaSlideAEjercicio = computed(() => {
      const m = {};
      ejercicios.value.forEach(ej => {
        ej.slidesNums.forEach(sNum => {
          m[`${ej.tema}-${sNum}`] = ej;
        });
      });
      return m;
    });

    const resultadosGlobales = computed(() => {
      const q = queryGlobal.value.trim().toLowerCase();
      if (q.length < 2) return [];
      const res = [];
      for (const t of curso.value) {
        if (temaFiltroGlobal.value !== 0 && t.numero !== temaFiltroGlobal.value) continue;
        for (const sl of t.slides) {
          const ejAsociado = mapaSlideAEjercicio.value[`${t.numero}-${sl.s}`] || null;
          if (soloConEjercicio.value && !ejAsociado) continue;
          const textoOcr = sl.t || "";
          const matchOcr = textoOcr.toLowerCase().includes(q);
          const matchEj = ejAsociado && (ejAsociado.titulo.toLowerCase().includes(q) || ejAsociado.markdown.toLowerCase().includes(q));
          if (matchOcr || matchEj) {
            res.push({
              id: `t${t.numero}-s${sl.s}`,
              temaNum: t.numero,
              temaTitulo: t.titulo,
              pdfTema: t.pdfTema,
              slideNum: sl.s,
              img: sl.img,
              ocr: textoOcr,
              ejercicio: ejAsociado
            });
            if (res.length >= 120) return res;
          }
        }
      }
      return res;
    });

    const resaltarTexto = (texto, query) => {
      if (!texto) return "";
      const limpio = texto.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const q = query.trim();
      if (!q || q.length < 2) return limpio;
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escaped})`, "gi");
      return limpio.replace(regex, '<mark class="bg-amber-300 dark:bg-amber-500/40 text-slate-900 dark:text-amber-100 px-1 rounded font-semibold">$1</mark>');
    };

    // =========================================================================
    // MÓDULO 3: CUESTIONARIOS INTERACTIVOS POR TEMA Y SIMULACRO GLOBAL
    // =========================================================================
    const temaQuizActivo = ref(7); // Por defecto Tema 7 (o 'global' para simulacro)
    const respuestasUsuario = ref({});
    const mostrarExplicacionesQuiz = ref({});
    const preguntasSimulacro = ref([]);

    const generarSimulacroGlobal = () => {
      const todas = [];
      Object.keys(cuestionarios.value).forEach(tKey => {
        cuestionarios.value[tKey].forEach(q => {
          todas.push({ ...q, temaNum: Number(tKey) });
        });
      });
      // Barajar con Fisher-Yates y tomar 15 preguntas
      for (let i = todas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [todas[i], todas[j]] = [todas[j], todas[i]];
      }
      preguntasSimulacro.value = todas.slice(0, 15);
      respuestasUsuario.value = {};
      mostrarExplicacionesQuiz.value = {};
    };

    const preguntasQuizActual = computed(() => {
      if (temaQuizActivo.value === "global") {
        if (preguntasSimulacro.value.length === 0) generarSimulacroGlobal();
        return preguntasSimulacro.value;
      }
      return cuestionarios.value[temaQuizActivo.value] || [];
    });

    const seleccionarTemaQuiz = (t) => {
      temaQuizActivo.value = t;
      respuestasUsuario.value = {};
      mostrarExplicacionesQuiz.value = {};
      if (t === "global") generarSimulacroGlobal();
    };

    const responderPregunta = (qId, idxOpcion) => {
      respuestasUsuario.value[qId] = idxOpcion;
      mostrarExplicacionesQuiz.value[qId] = true;
      // Guardar récord si completó todas las del tema
      const lista = preguntasQuizActual.value;
      const respondidas = lista.filter(q => respuestasUsuario.value[q.id] !== undefined);
      if (respondidas.length === lista.length && lista.length > 0) {
        const aciertos = lista.filter(q => respuestasUsuario.value[q.id] === q.correcta).length;
        puntuacionesQuiz.value[temaQuizActivo.value] = {
          aciertos,
          total: lista.length,
          porcentaje: Math.round((aciertos / lista.length) * 100)
        };
        localStorage.setItem("redes_scores_quiz", JSON.stringify(puntuacionesQuiz.value));
      }
    };

    const resumenQuizActual = computed(() => {
      const lista = preguntasQuizActual.value;
      let respondidas = 0, aciertos = 0;
      lista.forEach(q => {
        if (respuestasUsuario.value[q.id] !== undefined) {
          respondidas++;
          if (respuestasUsuario.value[q.id] === q.correcta) aciertos++;
        }
      });
      return {
        total: lista.length,
        respondidas,
        aciertos,
        fallos: respondidas - aciertos,
        porcentaje: respondidas ? Math.round((aciertos / respondidas) * 100) : 0
      };
    });

    // =========================================================================
    // MÓDULO 4: LABORATORIO DE 5 CALCULADORAS INTERACTIVAS DE REDES
    // =========================================================================
    const calcActiva = ref("ts"); // 'ts' | 'ip' | 'frag' | 'tcp' | 'shannon'

    // 4.1 Calculadora de Tiempo de Servicio Ts = p / (v - c) y VoIP (Tema 7)
    const calcTs = ref({
      paqueteBytes: 500,
      velocidadKbps: 512,
      caudalKbps: 256,
      propagacionMs: 20,
      retardoMaxMs: 150,
      caudalLlamadaKbps: 80
    });

    const resultadoCalcTs = computed(() => {
      const pBits = Math.max(1, Number(calcTs.value.paqueteBytes) * 8);
      const vBps = Math.max(1, Number(calcTs.value.velocidadKbps) * 1000);
      const cBps = Math.max(0, Number(calcTs.value.caudalKbps) * 1000);
      const propMs = Math.max(0, Number(calcTs.value.propagacionMs));
      const maxTotalMs = Math.max(propMs + 1, Number(calcTs.value.retardoMaxMs));
      const llamadaBps = Math.max(1, Number(calcTs.value.caudalLlamadaKbps) * 1000);

      const ocupacion = (cBps / vBps) * 100;
      const tTransMs = (pBits / vBps) * 1000;
      const saturado = cBps >= vBps;
      const tsMs = saturado ? Infinity : (pBits / (vBps - cBps)) * 1000;
      const tEsperaMs = saturado ? Infinity : tsMs - tTransMs;
      const retardoTotalMs = saturado ? Infinity : tsMs + propMs;

      // Caudal máximo para cumplir retardoMaxMs (ej. 150 ms ITU G.114)
      const tsLimiteSeg = (maxTotalMs - propMs) / 1000;
      const cMaxBps = Math.max(0, vBps - (pBits / tsLimiteSeg));
      const cMaxKbps = cMaxBps / 1000;
      const ocupacionMax = (cMaxBps / vBps) * 100;
      const maxLlamadas = Math.floor(cMaxBps / llamadaBps);

      // Curva para distintos niveles de ocupación
      const niveles = [0, 20, 40, 50, 60, 70, 80, 90, 94, 95, 98];
      const tablaCurva = niveles.map(pct => {
        const c = vBps * (pct / 100);
        const ts = (pBits / (vBps - c)) * 1000;
        return { pct, cKbps: (c / 1000).toFixed(1), tsMs: ts.toFixed(2), totalMs: (ts + propMs).toFixed(2) };
      });

      return {
        pBits,
        ocupacion: ocupacion.toFixed(1),
        tTransMs: tTransMs.toFixed(2),
        tEsperaMs: saturado ? "∞ (Cola infinita)" : tEsperaMs.toFixed(2),
        tsMs: saturado ? "∞" : tsMs.toFixed(2),
        retardoTotalMs: saturado ? "∞" : retardoTotalMs.toFixed(2),
        tsLimiteMs: (tsLimiteSeg * 1000).toFixed(1),
        cMaxKbps: cMaxKbps.toFixed(1),
        ocupacionMax: ocupacionMax.toFixed(1),
        maxLlamadas,
        tablaCurva
      };
    });

    // 4.2 Calculadora y Analizador de Subredes IPv4 / VLSM / Detector de Errores (Tema 8)
    const calcIp = ref({
      ipStr: "194.125.1.63",
      prefijo: 26
    });

    const resultadoCalcIp = computed(() => {
      const partes = calcIp.value.ipStr.trim().split(".").map(Number);
      const pref = Math.min(32, Math.max(1, Number(calcIp.value.prefijo) || 24));
      if (partes.length !== 4 || partes.some(n => isNaN(n) || n < 0 || n > 255)) {
        return { error: "Introduce una dirección IPv4 válida (ej. 194.100.100.0)." };
      }
      const ipInt = ((partes[0] << 24) | (partes[1] << 16) | (partes[2] << 8) | partes[3]) >>> 0;
      const maskInt = pref === 0 ? 0 : (0xFFFFFFFF << (32 - pref)) >>> 0;
      const netInt = (ipInt & maskInt) >>> 0;
      const bcastInt = (netInt | (~maskInt >>> 0)) >>> 0;

      const intToIp = (n) => `${(n >>> 24) & 255}.${(n >>> 16) & 255}.${(n >>> 8) & 255}.${n & 255}`;
      const intToBinDots = (n) => {
        const b = n.toString(2).padStart(32, "0");
        return `${b.slice(0,8)}.${b.slice(8,16)}.${b.slice(16,24)}.${b.slice(24,32)}`;
      };

      const binFull = ipInt.toString(2).padStart(32, "0");
      const bitsRed = binFull.slice(0, pref);
      const bitsHost = binFull.slice(pref);

      const totalDirs = Math.pow(2, 32 - pref);
      const hostsUtiles = pref >= 31 ? (pref === 32 ? 1 : 2) : totalDirs - 2;
      const primerHost = pref >= 31 ? intToIp(netInt) : intToIp((netInt + 1) >>> 0);
      const ultimoHost = pref >= 31 ? intToIp(bcastInt) : intToIp((bcastInt - 1) >>> 0);

      // Diagnóstico automático (estilo Ejercicio 3 Tema 8)
      let diagnosticoHost = "Dirección de HOST VÁLIDA (Unicast utilizable)";
      let tipoAlerta = "ok";
      if (pref < 31 && ipInt === netInt) {
        diagnosticoHost = "INVÁLIDA COMO HOST: Es la Dirección de Subred (todos los bits de host son 0). Sí es válida para una tabla de rutas.";
        tipoAlerta = "warn";
      } else if (pref < 31 && ipInt === bcastInt) {
        diagnosticoHost = "INVÁLIDA COMO HOST Y COMO RED: Es la Dirección de Broadcast Dirigido de la subred (todos los bits de host son 1).";
        tipoAlerta = "error";
      } else if (ipInt !== netInt) {
        diagnosticoHost = `VÁLIDA COMO HOST, pero INVÁLIDA como prefijo de Tabla de Rutas (tiene bits de host ≠ 0; el prefijo correcto es ${intToIp(netInt)}/${pref}).`;
        tipoAlerta = "ok";
      }

      return {
        error: null,
        ip: intToIp(ipInt),
        prefijo: pref,
        mascara: intToIp(maskInt),
        subred: intToIp(netInt),
        broadcast: intToIp(bcastInt),
        primerHost,
        ultimoHost,
        totalDirs: totalDirs.toLocaleString("es-ES"),
        hostsUtiles: hostsUtiles.toLocaleString("es-ES"),
        binIp: intToBinDots(ipInt),
        binMask: intToBinDots(maskInt),
        bitsRed,
        bitsHost,
        diagnosticoHost,
        tipoAlerta
      };
    });

    // 4.3 Simulador de Fragmentación IPv4 (Simple y en Cascada, Temas 9 y 10)
    const calcFrag = ref({
      datosOriginales: 4420,
      cabeceraIp: 20,
      mtu1: 1500,
      usarMtu2: true,
      mtu2: 296
    });

    const fragmentarPaquete = (cargaDatos, offsetInicialBytes, mfOriginal, mtu, cabIp) => {
      const totalPkt = cargaDatos + cabIp;
      if (totalPkt <= mtu) {
        return [{
          longitudTotal: totalPkt,
          datos: cargaDatos,
          mf: mfOriginal,
          offsetBytes: offsetInicialBytes,
          offset8: offsetInicialBytes / 8
        }];
      }
      const maxDatosBruto = mtu - cabIp;
      const maxDatosMult8 = Math.floor(maxDatosBruto / 8) * 8;
      if (maxDatosMult8 < 8) return [];
      const frags = [];
      let restante = cargaDatos;
      let curOffset = offsetInicialBytes;
      while (restante > 0) {
        if (restante > maxDatosBruto) {
          frags.push({
            longitudTotal: maxDatosMult8 + cabIp,
            datos: maxDatosMult8,
            mf: 1,
            offsetBytes: curOffset,
            offset8: curOffset / 8
          });
          restante -= maxDatosMult8;
          curOffset += maxDatosMult8;
        } else {
          frags.push({
            longitudTotal: restante + cabIp,
            datos: restante,
            mf: mfOriginal,
            offsetBytes: curOffset,
            offset8: curOffset / 8
          });
          restante = 0;
        }
      }
      return frags;
    };

    const resultadoCalcFrag = computed(() => {
      const datos = Math.max(1, Number(calcFrag.value.datosOriginales) || 1480);
      const cab = Math.max(20, Number(calcFrag.value.cabeceraIp) || 20);
      const m1 = Math.max(68, Number(calcFrag.value.mtu1) || 1500);
      const m2 = Math.max(68, Number(calcFrag.value.mtu2) || 296);

      const paso1 = fragmentarPaquete(datos, 0, 0, m1, cab).map((f, i) => ({
        nombre: `F${i + 1}`,
        ...f
      }));

      let paso2 = [];
      if (calcFrag.value.usarMtu2) {
        paso1.forEach((f1, i) => {
          const sub = fragmentarPaquete(f1.datos, f1.offsetBytes, f1.mf, m2, cab);
          sub.forEach((sf, j) => {
            paso2.push({
              nombre: sub.length > 1 ? `F${i + 1}.${j + 1}` : `F${i + 1}`,
              ...sf
            });
          });
        });
      }

      return {
        datagramaOriginal: datos + cab,
        maxDatosMtu1: Math.floor((m1 - cab) / 8) * 8,
        maxDatosMtu2: Math.floor((m2 - cab) / 8) * 8,
        paso1,
        paso2
      };
    });

    // 4.4 Calculadora TCP: Timer RTO (Van Jacobson) y Redes LFN (Window Scale, Tema 10)
    const calcTcp = ref({
      rttsInput: "230, 294, 264, 340, 246, 201, 340, 272, 311, 282, 246, 304, 308, 230, 328",
      bwMbps: 100,
      rttMs: 43
    });

    const resultadoCalcTcp = computed(() => {
      const nums = calcTcp.value.rttsInput
        .split(/[\s,;]+/)
        .map(s => parseFloat(s))
        .filter(n => !isNaN(n) && n > 0);

      const filasRto = [];
      let srtt = 0, rttvar = 0;
      nums.forEach((rtt, idx) => {
        if (idx === 0) {
          srtt = rtt;
          rttvar = rtt / 2;
        } else {
          const diff = Math.abs(srtt - rtt);
          srtt = (7 / 8) * srtt + (1 / 8) * rtt;
          rttvar = (3 / 4) * rttvar + (1 / 4) * diff;
        }
        const rto = srtt + 4 * rttvar;
        filasRto.push({
          n: idx + 1,
          rtt: rtt.toFixed(0),
          srtt: srtt.toFixed(2),
          rttvar: rttvar.toFixed(2),
          rto: rto.toFixed(2)
        });
      });

      // Cálculo LFN y Factor de Escala
      const bwBps = Math.max(1, Number(calcTcp.value.bwMbps)) * 1e6;
      const rttSeg = Math.max(0.0001, Number(calcTcp.value.rttMs)) / 1000;
      const bdpBits = bwBps * rttSeg;
      const bdpKB = bdpBits / 8 / 1024;
      const maxSinEscalaMbps = (65535 * 8) / rttSeg / 1e6;

      const tablaEscala = [0, 1, 2, 3, 4, 5, 6, 7].map(s => {
        const mult = Math.pow(2, s);
        const winBits = 65536 * 8 * mult;
        const caudalMbps = (winBits / rttSeg) / 1e6;
        return {
          s,
          mult: `${mult}x`,
          winKB: (64 * mult).toLocaleString("es-ES") + " KB",
          winBits: winBits.toLocaleString("es-ES"),
          caudalMbps: caudalMbps.toFixed(1),
          aprovecha100: caudalMbps >= Number(calcTcp.value.bwMbps)
        };
      });

      return {
        filasRto,
        bdpBits: Math.round(bdpBits).toLocaleString("es-ES"),
        bdpKB: bdpKB.toFixed(1),
        maxSinEscalaMbps: maxSinEscalaMbps.toFixed(2),
        tablaEscala
      };
    });

    // 4.5 Calculadora de Ley de Shannon (Tema 2)
    const calcShannon = ref({
      bwKhz: 3.3,
      snrDb: 36
    });

    const resultadoShannon = computed(() => {
      const bwHz = Math.max(1, Number(calcShannon.value.bwKhz) * 1000);
      const snrDb = Number(calcShannon.value.snrDb) || 0;
      const snrLineal = Math.pow(10, snrDb / 10);
      const capExactaBps = bwHz * Math.log2(1 + snrLineal);
      const capAproxBps = bwHz * (snrDb / 3);
      const eficExacta = capExactaBps / bwHz;
      const eficAprox = snrDb / 3;
      return {
        snrLineal: snrLineal.toFixed(1),
        capExactaKbps: (capExactaBps / 1000).toFixed(2),
        capExactaMbps: (capExactaBps / 1e6).toFixed(3),
        capAproxKbps: (capAproxBps / 1000).toFixed(2),
        eficExacta: eficExacta.toFixed(2),
        eficAprox: eficAprox.toFixed(2)
      };
    });

    // =========================================================================
    // MÓDULO 5: FLASHCARDS INTERACTIVAS Y FORMULARIO
    // =========================================================================
    const temaFlashcardFiltro = ref(0);
    const flashcardIdx = ref(0);
    const flashcardGirada = ref(false);

    const flashcardsFiltradas = computed(() => {
      if (temaFlashcardFiltro.value === 0) return flashcards.value;
      return flashcards.value.filter(f => f.tema === temaFlashcardFiltro.value);
    });

    watch(temaFlashcardFiltro, () => {
      flashcardIdx.value = 0;
      flashcardGirada.value = false;
    });

    // =========================================================================
    // MÓDULO 6: EXPLORADOR DEL TEMARIO, ARCHIVOS .MD Y PDFs (INTEGRADO EN LA APP)
    // =========================================================================
    const temaCursoSeleccionado = ref(curso.value[0] || null);
    const slideCursoActual = ref(1);
    const subvistaTemario = ref("diapositivas"); // 'diapositivas' | 'archivos_md'
    const filtroTipoMd = ref("todos"); // 'todos' | 'indice' | 'tema' | 'subtema'
    const busquedaArchivoMd = ref("");
    const docMdSeleccionado = ref(documentosMd.value[0] || null);
    const modoLecturaMdInline = ref("render"); // 'render' | 'raw' | 'split' | 'pdf'

    const documentosMdFiltrados = computed(() => {
      const q = busquedaArchivoMd.value.trim().toLowerCase();
      return documentosMd.value.filter(d => {
        if (filtroTipoMd.value !== "todos" && d.tipo !== filtroTipoMd.value) return false;
        if (!q) return true;
        return (
          d.titulo.toLowerCase().includes(q) ||
          d.nombreArchivo.toLowerCase().includes(q) ||
          d.contenido.toLowerCase().includes(q)
        );
      });
    });

    const seleccionarTemaCurso = (t) => {
      temaCursoSeleccionado.value = t;
      slideCursoActual.value = 1;
    };

    // =========================================================================
    // VISOR MODAL / PANTALLA COMPLETA INTEGRADO PARA CUALQUIER ARCHIVO .MD Y .PDF
    // =========================================================================
    const visorDoc = ref({
      abierto: false,
      modo: "md-render", // 'md-render' | 'md-raw' | 'pdf' | 'split'
      titulo: "",
      nombreArchivo: "",
      mdContenido: "",
      mdRuta: "",
      pdfUrl: ""
    });
    const copiadoMdExito = ref(false);

    const abrirVisorEjercicio = (ej, modoInicial = "md-render") => {
      if (!ej) return;
      visorDoc.value = {
        abierto: true,
        modo: modoInicial,
        titulo: `Tema ${ej.tema} · ${ej.codigo} — ${ej.titulo}`,
        nombreArchivo: `${ej.slug}.md`,
        mdContenido: ej.mdArchivoCompleto || ej.markdown,
        mdRuta: ej.mdSubtema,
        pdfUrl: ej.pdfSubtema
      };
      nextTick(() => renderizarMatematicas());
    };

    const abrirVisorMdDoc = (doc, modoInicial = "md-render") => {
      if (!doc) return;
      visorDoc.value = {
        abierto: true,
        modo: modoInicial,
        titulo: doc.titulo,
        nombreArchivo: doc.nombreArchivo,
        mdContenido: doc.contenido,
        mdRuta: doc.rutaRelativa,
        pdfUrl: doc.pdfAsociado || ""
      };
      nextTick(() => renderizarMatematicas());
    };

    const abrirVisorMdPorId = (docId, modoInicial = "md-render") => {
      const encontrado = documentosMd.value.find(d => d.id === docId);
      if (encontrado) abrirVisorMdDoc(encontrado, modoInicial);
    };

    const abrirVisorPdf = (pdfUrl, titulo = "Documento PDF", mdDocOpcional = null) => {
      let mdCont = "";
      let mdNom = "";
      let mdRut = "";
      if (mdDocOpcional) {
        mdCont = mdDocOpcional.mdArchivoCompleto || mdDocOpcional.contenido || mdDocOpcional.markdown || "";
        mdNom = mdDocOpcional.nombreArchivo || (mdDocOpcional.slug ? `${mdDocOpcional.slug}.md` : "");
        mdRut = mdDocOpcional.mdSubtema || mdDocOpcional.rutaRelativa || "";
      } else {
        // Buscar si existe un documento .MD asociado a este PDF
        const matchMd = documentosMd.value.find(d => d.pdfAsociado === pdfUrl);
        if (matchMd) {
          mdCont = matchMd.contenido;
          mdNom = matchMd.nombreArchivo;
          mdRut = matchMd.rutaRelativa;
        }
      }
      visorDoc.value = {
        abierto: true,
        modo: "pdf",
        titulo,
        nombreArchivo: mdNom || pdfUrl.split("/").pop(),
        mdContenido: mdCont,
        mdRuta: mdRut,
        pdfUrl
      };
    };

    const cerrarVisorDoc = () => {
      visorDoc.value.abierto = false;
    };

    const copiarMdActual = async (texto) => {
      try {
        await navigator.clipboard.writeText(texto || visorDoc.value.mdContenido || "");
        copiadoMdExito.value = true;
        setTimeout(() => { copiadoMdExito.value = false; }, 2000);
      } catch (_) {}
    };

    // Intercepta clics en enlaces .md y .pdf dentro del Markdown renderizado para abrirlos en la propia app
    const manejarClickMarkdown = (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href) return;

      if (href.endsWith(".md")) {
        event.preventDefault();
        const fileName = href.split("/").pop();
        const doc = documentosMd.value.find(d => d.nombreArchivo === fileName || d.rutaRelativa.endsWith(fileName));
        if (doc) {
          abrirVisorMdDoc(doc, "md-render");
        }
      } else if (href.endsWith(".pdf")) {
        event.preventDefault();
        const fileName = href.split("/").pop();
        const doc = documentosMd.value.find(d => d.pdfAsociado && d.pdfAsociado.endsWith(fileName));
        if (doc) {
          abrirVisorMdDoc(doc, "pdf");
        } else {
          // Construir ruta relativa desde Ejercicios_Por_Tema_y_Subtema
          const cleanHref = href.replace(/^\.\//, "");
          const resolvedPdf = cleanHref.includes("/")
            ? `../Ejercicios_Por_Tema_y_Subtema/${cleanHref}`
            : (visorDoc.value.pdfUrl || `../Ejercicios_Por_Tema_y_Subtema/${cleanHref}`);
          abrirVisorPdf(resolvedPdf, fileName);
        }
      }
    };

    onMounted(() => {
      renderizarMatematicas();
    });

    return {
      // Estado general
      ejercicios,
      documentosMd,
      curso,
      cuestionarios,
      flashcards,
      formulario,
      vistaActiva,
      modoOscuro,
      progresoEjercicios,
      notasEjercicios,
      puntuacionesQuiz,
      guardarProgreso,
      guardarNota,
      statsProgreso,

      // Módulo 1: Ejercicios
      filtroTemaEj,
      filtroCategoriaEj,
      filtroEstadoEj,
      busquedaEj,
      categoriasDisponibles,
      ejerciciosFiltrados,
      ejercicioSeleccionado,
      slideIdxActual,
      mostrarOcrAnexo,
      modalImagenUrl,
      seleccionarEjercicio,
      renderMarkdown,

      // Módulo 2: Buscador Global
      queryGlobal,
      temaFiltroGlobal,
      soloConEjercicio,
      sugerenciasBusqueda,
      resultadosGlobales,
      resaltarTexto,

      // Módulo 3: Cuestionarios
      temaQuizActivo,
      respuestasUsuario,
      mostrarExplicacionesQuiz,
      preguntasQuizActual,
      seleccionarTemaQuiz,
      responderPregunta,
      generarSimulacroGlobal,
      resumenQuizActual,

      // Módulo 4: Calculadoras
      calcActiva,
      calcTs,
      resultadoCalcTs,
      calcIp,
      resultadoCalcIp,
      calcFrag,
      resultadoCalcFrag,
      calcTcp,
      resultadoCalcTcp,
      calcShannon,
      resultadoShannon,

      // Módulo 5: Flashcards
      temaFlashcardFiltro,
      flashcardIdx,
      flashcardGirada,
      flashcardsFiltradas,

      // Módulo 6: Temario Completo y Biblioteca .MD / .PDF
      temaCursoSeleccionado,
      slideCursoActual,
      seleccionarTemaCurso,
      subvistaTemario,
      filtroTipoMd,
      busquedaArchivoMd,
      documentosMdFiltrados,
      docMdSeleccionado,
      modoLecturaMdInline,

      // Visor Integrado de Documentos .MD y .PDF
      visorDoc,
      copiadoMdExito,
      abrirVisorEjercicio,
      abrirVisorMdDoc,
      abrirVisorMdPorId,
      abrirVisorPdf,
      cerrarVisorDoc,
      copiarMdActual,
      manejarClickMarkdown
    };
  }
});

app.mount("#app");

