
// Helper function para crear layouts responsive
function crearLayoutResponsive(titulo, xaxisTitle, yaxisTitle, opciones = {}) {
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;
  const graphHeight = isSmallMobile ? 300 : (isMobile ? 350 : 400);
  
  const layout = {
    title: {
      text: titulo,
      font: { size: isSmallMobile ? 14 : (isMobile ? 16 : 18) }
    },
    xaxis: { 
      title: xaxisTitle,
      titlefont: { size: isSmallMobile ? 11 : 12 }
    },
    yaxis: { 
      title: yaxisTitle,
      titlefont: { size: isSmallMobile ? 11 : 12 }
    },
    height: graphHeight,
    autosize: true,
    margin: {
      l: isSmallMobile ? 50 : (isMobile ? 60 : 70),
      r: isSmallMobile ? 20 : 30,
      t: isSmallMobile ? 50 : (isMobile ? 60 : 70),
      b: isSmallMobile ? 50 : 60
    },
    ...opciones
  };
  return layout;
}

// Estado global para almacenar datos entre aplicaciones
let appState = {
    enfriamiento: { T0: 80, Ta: 28, k: -0.4271 },
    poblacion: { P0: 100, r: 0.1, K: 1000 },
    ofertaDemanda: { a: 10, b: 0.5, c: 5, d: 0.3 },
    interes: { P0: 1000, r: 0.05, t: 10 },
    mezclas: { V0: 100, c0: 0.5, rIn: 2, cIn: 1, rOut: 2 },
    epidemias: { S0: 990, I0: 10, R0: 0, beta: 0.3, gamma: 0.1 },
    circuitos: { V0: 12, R: 4, L: 1, C: 0.1 },
    pendulo: { theta0: 0.5, L: 1, g: 9.8 },
    armonico: { A: 1, omega: 1, phi: 0 }
  };
  
  // Función para cargar aplicaciones
  function loadApp(app) {
    const cont = document.getElementById("contenido");
    
    // Cerrar menú en móvil
    const menu = document.getElementById("menu");
    if (window.innerWidth <= 768) {
      menu.classList.remove("active");
    }

    // Actualizar estado activo en el menú
    const menuItems = document.querySelectorAll("#menu li");
    menuItems.forEach(item => item.classList.remove("active"));
    const activeItem = Array.from(menuItems).find(item => {
      const appName = item.textContent.trim().toLowerCase();
      return (app === 'enfriamiento' && appName.includes('enfriamiento')) ||
             (app === 'poblacion' && appName.includes('crecimiento')) ||
             (app === 'ofertaDemanda' && appName.includes('oferta')) ||
             (app === 'interes' && appName.includes('interés')) ||
             (app === 'mezclas' && appName.includes('mezclas')) ||
             (app === 'epidemias' && appName.includes('epidemias')) ||
             (app === 'circuitos' && appName.includes('circuitos')) ||
             (app === 'pendulo' && appName.includes('péndulo')) ||
             (app === 'armonico' && appName.includes('armónico'));
    });
    if (activeItem) activeItem.classList.add("active");
    
    switch (app) {
      case "enfriamiento":
        cont.innerHTML = `
          <h2>Enfriamiento de Newton</h2>
          
          <h3>Concepto General</h3>
          <p>La rapidez con que se enfría un objeto, es proporcional a la diferencia entre su temperatura y la temperatura ambiente.</p>

          <h3>Ecuación Característica</h3>
          <p>El enunciado anterior se puede traducir a:</p>
          <p>$$ \\frac{dT}{dt} = k(T - T_m) $$</p>
          
          <p>Teniendo en cuenta que:</p>
          <ul>
            <li><strong>dT/dt</strong> es la rapidez de enfriamiento</li>
            <li><strong>T</strong> es la temperatura de un termómetro</li>
            <li><strong>T<sub>m</sub></strong> es la temperatura ambiente</li>
            <li><strong>k</strong> es la constante de proporción</li>
          </ul>

          <h3>Resolución Paso a Paso</h3>
          <p>Ahora, agrupamos variables así:</p>
          <p>$$ \\frac{dT}{T - T_m} = k \\, dt $$</p>
          
          <p>Al aplicar integral a cada lado de la ecuación se obtiene que:</p>
          <p>$$ \\ln(T - T_m) = kt + c $$</p>
          
          <p>Luego, al aplicar exponencial a cada lado para obviar el logaritmo natural, se obtiene:</p>
          <p>$$ T - T_m = e^{kt+c} $$</p>
          
          <p>Que es lo mismo que:</p>
          <p>$$ T - T_m = e^{kt} \\cdot e^{c} $$</p>
          
          <p>Si hacemos C = e<sup>c</sup>, y despejamos la ecuación para T, tendremos:</p>
          <p>$$ T = C \\cdot e^{kt} + T_m $$</p>

          <h3>Selecciona un Ejemplo</h3>
          <div style="display: flex; gap: 1rem; margin: 2rem 0;">
            <button onclick="loadEjemploNewton(1)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 1: Termómetro en Gimnasio
            </button>
            <button onclick="loadEjemploNewton(2)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 2: Investigación Forense
            </button>
          </div>
          
          <div id="ejemplo-newton-content"></div>
        `;
        // Cargar ejemplo 1 por defecto
        loadEjemploNewton(1);
        break;
  
      case "poblacion":
        cont.innerHTML = `
          <h2>Crecimiento Poblacional</h2>
          
          <h3>Concepto General</h3>
          <p>La variación de la población de individuos en un momento "t" va a ser proporcional a la población "N" que hay en un determinado momento.</p>

          <h3>Ecuación Característica</h3>
          <p>El enunciado anterior se puede traducir a:</p>
          <p>$$ \\frac{dN}{dt} = k \\cdot N $$</p>
          
          <p>Teniendo en cuenta que:</p>
          <ul>
            <li><strong>dN/dt</strong> es la rapidez de crecimiento poblacional</li>
            <li><strong>N</strong> es la población en un determinado año</li>
            <li><strong>k</strong> es la constante de proporcionalidad</li>
          </ul>

          <h3>Resolución Paso a Paso</h3>
          <p>Agrupamos variables así:</p>
          <p>$$ \\frac{dN}{N} = k \\, dt $$</p>
          
          <p>Al aplicar integral a cada lado de la ecuación se obtiene que:</p>
          <p>$$ \\ln(N) = kt + c $$</p>
          
          <p>Luego, al aplicar exponencial a cada lado para obviar el logaritmo natural, se obtiene:</p>
          <p>$$ N = C \\cdot e^{kt} $$</p>
          <p>Donde C = e<sup>c</sup></p>

          <h3>Selecciona un Ejemplo</h3>
          <div style="display: flex; gap: 1rem; margin: 2rem 0;">
            <button onclick="loadEjemploCrecimiento(1)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 1: Población de Cúcuta
            </button>
            <button onclick="loadEjemploCrecimiento(2)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 2: Población de Lobos
            </button>
          </div>
          
          <div id="ejemplo-crecimiento-content"></div>
        `;
        loadEjemploCrecimiento(1);
        break;
  
      case "ofertaDemanda":
        cont.innerHTML = `
          <h2>Oferta y Demanda</h2>
          
          <h3>Concepto General</h3>
          <p>Por ley, oferta y demanda tienden a equilibrarse objetivamente.</p>

          <h3>Ecuación Característica</h3>
          <p>La demanda es la expresión en el mercado de la necesidad de mercancías y la oferta es el producto disponible o susceptible de ser adquirido en el mercado. Si tanto oferta como demanda tienden a equilibrarse, se puede decir que:</p>
          <p>$$ \\frac{dp}{dt} = k(D - S) $$</p>
          <p>Donde D es la demanda, S es la oferta y p es el precio del producto.</p>

          <h3>Resolución Paso a Paso</h3>
          <p>Si D(p) = a - bp y S(p) = c + dp, entonces:</p>
          <p>$$ D - S = (a - bp) - (c + dp) = (a-c) - (b+d)p $$</p>
          <p>$$ \\frac{dp}{dt} = k((a-c) - (b+d)p) $$</p>
          <p>Resolviendo la ecuación diferencial de variables separables:</p>
          <p>$$ \\frac{dp}{(b+d)(\\frac{a-c}{b+d} - p)} = k \\, dt $$</p>
          <p>Integrando y simplificando se obtiene:</p>
          <p>$$ p(t) = \\frac{a-c}{b+d} - e^c \\cdot e^{-(b+d)kt} $$</p>

          <h3>Selecciona un Ejemplo</h3>
          <div style="display: flex; gap: 1rem; margin: 2rem 0;">
            <button onclick="loadEjemploOfertaDemanda(1)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 1: Precio de Especie Animal
            </button>
            <button onclick="loadEjemploOfertaDemanda(2)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 2: Ajuste de Precios
            </button>
          </div>
          
          <div id="ejemplo-oferta-content"></div>
        `;
        loadEjemploOfertaDemanda(1);
        break;
  
      case "interes":
        cont.innerHTML = `
          <h2>Interés Compuesto</h2>
          
          <h3>Concepto General</h3>
          <p>Si la tasa de interés es "i" capitalizable continuamente y "s" es el monto en cualquier periodo de tiempo "t" (monto principal más el interés acumulado). La variación del monto respecto al tiempo es proporcional al interés por el monto principal.</p>

          <h3>Ecuación Característica</h3>
          <p>El enunciado anterior se puede traducir a:</p>
          <p>$$ \\frac{ds}{dt} = i \\cdot s $$</p>
          
          <p>Teniendo en cuenta que:</p>
          <ul>
            <li><strong>ds/dt</strong> es la variación del monto</li>
            <li><strong>i</strong> es el interés</li>
          </ul>

          <h3>Resolución Paso a Paso</h3>
          <p>Agrupamos variables así:</p>
          <p>$$ \\frac{ds}{s} = i \\, dt $$</p>
          
          <p>Al aplicar integral a cada lado de la ecuación se obtiene que:</p>
          <p>$$ \\ln(s) = i \\cdot t + c $$</p>
          
          <p>Luego, al aplicar exponencial a cada lado para obviar el logaritmo natural, se obtiene:</p>
          <p>$$ s = e^{it+c} = e^{it} \\cdot e^c $$</p>
          
          <p>Si hacemos C = e<sup>c</sup> y despejamos la ecuación para s, tendremos:</p>
          <p>$$ s = C \\cdot e^{it} $$</p>

          <h3>Selecciona un Ejemplo</h3>
          <div style="display: flex; gap: 1rem; margin: 2rem 0;">
            <button onclick="loadEjemploInteres(1)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 1: Banco Davivienda
            </button>
          </div>
          
          <div id="ejemplo-interes-content"></div>
        `;
        loadEjemploInteres(1);
        break;
  
      case "mezclas":
        cont.innerHTML = `
          <h2>Mezclas</h2>
          
          <h3>Concepto General</h3>
          <p>Se quiere conocer la cantidad de soluto en un instante "t" en un recipiente donde hay un flujo de entrada A y del que sale un flujo B.</p>

          <h3>Ecuación Característica</h3>
          <p>Teniendo en cuenta que:</p>
          <ul>
            <li><strong>c₁</strong> es la concentración y es constante</li>
            <li><strong>c(t)</strong> es la concentración que depende del tiempo</li>
            <li><strong>V(t)</strong> es el volumen que depende del tiempo</li>
            <li><strong>Q(t)</strong> es la cantidad de soluto en cualquier instante</li>
          </ul>
          <p>\\( c(t) = \\frac{Q(t)}{V(t)} \\)</p>
          <p>\\( \\frac{dV}{dt} = A - B \\)</p>
          <p>Agrupamos los términos de la ecuación así:</p>
          <p>\\( dV = (A-B)dt \\)</p>
          <p>Al aplicar integral a cada lado de la ecuación se obtiene que:</p>
          <p>\\( V(t) = (A-B)t + c \\)</p>
          <p>Si el volumen en un instante t=0 es V₀ entonces, para hallar el valor de c:</p>
          <p>\\( V(0) = (A-B) \\cdot 0 + c \\)</p>
          <p>\\( V_0 = c \\)</p>
          <p>Entonces, la ecuación resulta:</p>
          <p>\\( V(t) = (A-B)t + V_0 \\)</p>

          <h3>Selecciona un Ejemplo</h3>
          <div style="display: flex; gap: 1rem; margin: 2rem 0;">
            <button onclick="loadEjemploMezclas(1)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 1: Tanque con Sal
            </button>
            <button onclick="loadEjemploMezclas(2)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 2: Harry Potter
            </button>
          </div>
          
          <div id="ejemplo-mezclas-content"></div>
        `;
        loadEjemploMezclas(1);
        break;
  
      case "epidemias":
        cont.innerHTML = `
          <h2>Epidemias</h2>
          
          <h3>Concepto General</h3>
          <p>Sea P(t) el tamaño de la población en el tiempo t, y M el límite superior impuesto a la población por el medio ambiente. Entonces, el ritmo de crecimiento de la población será dP/dt y la diferencia entre el límite superior y la población es M - P.</p>
          <p>Como conjuntamente proporcional significa proporcional al producto, entonces la ecuación diferencial que modela el problema es:</p>

          <h3>Ecuación Característica</h3>
          <p>\\( \\frac{dP}{dt} = kP(M-P) \\)</p>
          <p>Siendo k la constante de proporcionalidad.</p>

          <h3>Resolución Paso a Paso</h3>
          <p>Ajustando las variables tenemos:</p>
          <p>\\( \\frac{dP}{P(M-P)} = k \\, dt \\)</p>
          
          <p>Integrando término a término se tiene:</p>
          <p>\\( \\int k \\, dt - \\int \\frac{dP}{P(M-P)} = C \\)</p>
          
          <p>La primera integral es inmediata, la segunda se puede resolver aplicando fracciones parciales:</p>
          <p>\\( \\frac{1}{P(M-P)} = \\frac{A}{P} + \\frac{B}{M-P} \\)</p>
          
          <p>Resolviendo se obtiene:</p>
          <p>\\( kMt + \\ln\\left(\\frac{M-P}{P}\\right) = A \\)</p>
          
          <p>Finalmente la solución general es:</p>
          <p>\\( P(t) = \\frac{M}{1 + e^{A - kMt}} \\)</p>

          <h3>Selecciona un Ejemplo</h3>
          <div style="display: flex; gap: 1rem; margin: 2rem 0;">
            <button onclick="loadEjemploEpidemias(1)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 1: Gripe en Florida
            </button>
          </div>
          
          <div id="ejemplo-epidemias-content"></div>
        `;
        loadEjemploEpidemias(1);
        break;
  
      case "circuitos":
        cont.innerHTML = `
          <h2>Circuitos Eléctricos</h2>
          
          <h3>Concepto General</h3>
          <p>El comportamiento de estos circuitos está descrito por la ley de Kirchhoff, que es una ecuación diferencial de primer orden.</p>

          <h3>Ecuación Característica</h3>
          <p>La ley de Kirchhoff define dos ecuaciones:</p>
          <p>1) \\( L \\cdot \\frac{di}{dt} + RI = E \\)</p>
          <p>2) \\( R \\cdot \\frac{dQ}{dt} + \\frac{Q}{C} = E \\)</p>
          
          <p>Donde:</p>
          <ul>
            <li><strong>I</strong> es la intensidad de corriente que circula por el circuito en un tiempo t</li>
            <li><strong>Q</strong> es la carga</li>
            <li>Se relacionan mediante: \\( I = \\frac{dQ}{dt} \\)</li>
          </ul>

          <h3>Selecciona un Ejemplo</h3>
          <div style="display: flex; gap: 1rem; margin: 2rem 0;">
            <button onclick="loadEjemploCircuitos(1)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 1: Circuito RL
            </button>
            <button onclick="loadEjemploCircuitos(2)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 2: Circuito RC
            </button>
          </div>
          
          <div id="ejemplo-circuitos-content"></div>
        `;
        loadEjemploCircuitos(1);
        break;
  
      case "pendulo":
        cont.innerHTML = `
          <h2>Péndulo Simple</h2>
          
          <h3>Concepto General</h3>
          <p>Una partícula de masa m suspendida del punto O por un hilo inextensible de longitud l y de masa despreciable. Si la partícula se desplaza a una posición θ₀ (ángulo que hace el hilo con la vertical) y luego se suelta, el péndulo comienza a oscilar.</p>

          <h3>Ecuación Característica</h3>
          <p>De la segunda ley de Newton:</p>
          <p>\\( F = m \\cdot a \\)</p>
          
          <p>La fuerza de retorno de un péndulo está dada por:</p>
          <p>\\( F = -m \\cdot g \\cdot (\\sen \\theta) \\)</p>
          
          <p>Para ángulos pequeños: \\( \\sen \\theta = \\theta \\)</p>
          
          <p>Resultando en:</p>
          <p>\\( \\frac{d^2\\theta}{dt^2} + \\frac{g}{L}\\theta = 0 \\)</p>
          
          <p>Como \\( \\omega^2 = \\frac{g}{L} \\), procedemos a reducir:</p>
          <p>\\( \\frac{d^2\\theta}{dt^2} + \\omega^2\\theta = 0 \\)</p>
          
          <p>Resolviendo la ecuación diferencial de orden superior:</p>
          <p>\\( \\theta(t) = \\theta_0 \\cdot \\cos\\left(\\sqrt{\\frac{g}{L}} t + \\gamma\\right) \\)</p>
          
          <p><strong>Ecuaciones de frecuencia y período:</strong></p>
          <p>\\( f = \\frac{1}{2\\pi} \\cdot \\sqrt{\\frac{g}{L}} \\)</p>
          <p>\\( T = 2\\pi \\cdot \\sqrt{\\frac{L}{g}} \\)</p>
          
          <p><strong>Ecuación de la velocidad:</strong></p>
          <p>\\( v = L \\cdot \\frac{d\\theta}{dt} \\)</p>

          <h3>Selecciona un Ejemplo</h3>
          <div style="display: flex; gap: 1rem; margin: 2rem 0;">
            <button onclick="loadEjemploPendulo(1)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 1: Péndulo Simple
            </button>
          </div>
          
          <div id="ejemplo-pendulo-content"></div>
        `;
        loadEjemploPendulo(1);
        break;
  
      case "armonico":
        cont.innerHTML = `
          <h2>Movimiento Armónico Simple</h2>
          
          <h3>Concepto General</h3>
          <p>Es un movimiento donde un objeto oscila entre dos posiciones espaciales durante un tiempo indefinido, sin perder energía mecánica.</p>

          <h3>Ecuación Característica</h3>
          <p>Utilizando la ley de Hooke:</p>
          <p>\\( F = -k \\cdot s \\)</p>
          
          <p>Igualando la segunda ley de Newton con la fuerza neta:</p>
          <p>\\( m \\cdot \\frac{d^2x}{dt^2} = -k \\cdot x \\)</p>
          
          <p>Dividiendo por m:</p>
          <p>\\( \\frac{d^2x}{dt^2} = -\\frac{k}{m} \\cdot x \\)</p>
          
          <p>Haciendo \\( \\frac{k}{m} = \\omega^2 \\):</p>
          <p>\\( \\frac{d^2x}{dt^2} = -\\omega^2 \\cdot x \\)</p>
          
          <p>Resolviendo la ecuación característica:</p>
          <p>\\( x(t) = C_1 \\cos(\\omega t) + C_2 \\sen(\\omega t) \\)</p>

          <h3>Selecciona un Ejemplo</h3>
          <div style="display: flex; gap: 1rem; margin: 2rem 0;">
            <button onclick="loadEjemploArmonico(1)" style="flex: 1; padding: 1.5rem; font-size: 1.2rem; background: var(--accent-color);">
              Ejemplo 1: Movimiento Libre
            </button>
          </div>
          
          <div id="ejemplo-armonico-content"></div>
        `;
        loadEjemploArmonico(1);
        break;

      default:
        cont.innerHTML = `<h2>En construcción</h2><p>Esta sección estará disponible pronto.</p>`;
    }
    
    // Actualizar estado
    updateAppState(app);
    MathJax.typesetPromise(); // Asegura renderizado al cambiar de sección
  }
  
  // Función para actualizar el estado de la aplicación
  function updateAppState(app) {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('change', function() {
        appState[app][this.id] = parseFloat(this.value);
      });
    });
  }

  // Función para cargar ejemplos de Newton
  function loadEjemploNewton(numEjemplo) {
    const cont = document.getElementById("ejemplo-newton-content");
    
    if (numEjemplo === 1) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 1: Termómetro en un Gimnasio</h4>
          <p><strong>Problema:</strong> Se desea conocer la temperatura que registra un termómetro al cabo de 1 minuto, que inicialmente se encontraba dentro del sauna del gimnasio Body Tech con una temperatura de 80°C y se lleva al exterior de este mismo, donde la temperatura ambiente es 28°C (San José de Cúcuta), después de medio minuto la temperatura registrada en el termómetro es 70°C. ¿Cuál es esa temperatura?</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente las constantes C y k:</p>
          <div class="form-group">
            <label>Temperatura inicial T(0) (°C): <input id="T0_ej1" type="number" value="80" step="0.1"></label>
            <label>Temperatura ambiente T<sub>m</sub> (°C): <input id="Tm_ej1" type="number" value="28" step="0.1"></label>
            <label>Temperatura a t=0.5 min T(1/2) (°C): <input id="T05_ej1" type="number" value="70" step="0.1"></label>
            <button onclick="calcularYGraficarEjemplo1()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-ej1" style="margin: 1.5rem 0;"></div>
          <div id="grafica-ej1" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-ej1', 'enfriamiento-ejemplo1')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarEjemplo1();
    } else if (numEjemplo === 2) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 2: Investigación Forense</h4>
          <p><strong>Problema:</strong> Antes del medio día la Policía de Las Vegas encuentra el cuerpo de una víctima aparentemente de un homicidio que se encuentra en un cuarto que se conserva a temperatura constante de 70°F. A medio día llegan los investigadores de C.S.I., tomando la temperatura del cuerpo siendo de 80°F y a la 1:00 p.m. es de 75°F. Considérese la temperatura del cuerpo en el momento de la muerte era de 98.6°F. ¿A qué hora ocurrió la muerte?</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente las constantes C y k:</p>
          <div class="form-group">
            <label>Temperatura inicial T(0) (°F): <input id="T0_ej2" type="number" value="80" step="0.1"></label>
            <label>Temperatura ambiente T<sub>m</sub> (°F): <input id="Tm_ej2" type="number" value="70" step="0.1"></label>
            <label>Temperatura a t=1 hora T(1) (°F): <input id="T1_ej2" type="number" value="75" step="0.1"></label>
            <label>Temperatura al momento de muerte (°F): <input id="Tmuerte_ej2" type="number" value="98.6" step="0.1"></label>
            <button onclick="calcularYGraficarEjemplo2()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-ej2" style="margin: 1.5rem 0;"></div>
          <div id="grafica-ej2" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-ej2', 'enfriamiento-ejemplo2')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarEjemplo2();
    }
    
    MathJax.typesetPromise();
  }

  // Función para calcular C y k del Ejemplo 1
  function calcularYGraficarEjemplo1() {
    const T0 = parseFloat(document.getElementById("T0_ej1").value);
    const Tm = parseFloat(document.getElementById("Tm_ej1").value);
    const T05 = parseFloat(document.getElementById("T05_ej1").value);
    
    // Calcular C: C = T(0) - Tm
    const C = T0 - Tm;
    
    // Calcular k usando T(1/2)
    // T(1/2) = C·e^(k·1/2) + Tm
    // T(1/2) - Tm = C·e^(k/2)
    // (T(1/2) - Tm) / C = e^(k/2)
    // ln((T(1/2) - Tm) / C) = k/2
    // k = 2 * ln((T(1/2) - Tm) / C)
    
    const k = 2 * Math.log((T05 - Tm) / C);
    
    // Calcular T(1)
    const T1 = C * Math.exp(k * 1) + Tm;
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-ej1");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Constante C:</strong> C = T(0) - T<sub>m</sub> = ${T0} - ${Tm} = <strong>${C.toFixed(4)}</strong></p>
        <p><strong>Constante k:</strong> k = 2 · ln((T(1/2) - T<sub>m</sub>) / C) = 2 · ln((${T05} - ${Tm}) / ${C.toFixed(4)}) = <strong>${k.toFixed(4)}</strong></p>
        <p><strong>Ecuación completa:</strong> T(t) = ${C.toFixed(4)} · e<sup>${k.toFixed(4)}t</sup> + ${Tm}</p>
        <p><strong>Temperatura al cabo de 1 minuto:</strong> T(1) = <strong>${T1.toFixed(2)}°C</strong></p>
      </div>
    `;
    
    // Graficar
    const t = [];
    const T = [];
    for (let i = 0; i <= 100; i++) {
      const tiempo = i * 0.1; // 0 a 10 minutos
      const temp = C * Math.exp(k * tiempo) + Tm;
      t.push(tiempo);
      T.push(temp);
    }
    
    const trace = { 
      x: t, 
      y: T, 
      type: "scatter", 
      mode: "lines", 
      name: "T(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    const layout = crearLayoutResponsive(
      "Enfriamiento de Newton - Ejemplo 1",
      "Tiempo (min)",
      "Temperatura (°C)"
    );
    
    Plotly.newPlot("grafica-ej1", [trace], layout);
    
    MathJax.typesetPromise();
  }

  // Función para calcular C y k del Ejemplo 2
  function calcularYGraficarEjemplo2() {
    const T0 = parseFloat(document.getElementById("T0_ej2").value);
    const Tm = parseFloat(document.getElementById("Tm_ej2").value);
    const T1 = parseFloat(document.getElementById("T1_ej2").value);
    const Tmuerte = parseFloat(document.getElementById("Tmuerte_ej2").value);
    
    // Calcular C: C = T(0) - Tm
    const C = T0 - Tm;
    
    // Calcular k usando T(1)
    // T(1) = C·e^(k·1) + Tm
    // T(1) - Tm = C·e^k
    // (T(1) - Tm) / C = e^k
    // ln((T(1) - Tm) / C) = k
    
    const k = Math.log((T1 - Tm) / C);
    
    // Calcular tiempo de muerte
    // Tmuerte = C·e^(k·t) + Tm
    // Tmuerte - Tm = C·e^(k·t)
    // (Tmuerte - Tm) / C = e^(k·t)
    // ln((Tmuerte - Tm) / C) = k·t
    // t = ln((Tmuerte - Tm) / C) / k
    
    const t_muerte = Math.log((Tmuerte - Tm) / C) / k;
    
    // Convertir tiempo a horas y minutos
    const horas = Math.floor(Math.abs(t_muerte));
    const minutos = Math.round((Math.abs(t_muerte) - horas) * 60);
    const hora_muerte = t_muerte < 0 ? `12:00 - ${horas}:${minutos.toString().padStart(2, '0')}` : `12:00 + ${horas}:${minutos.toString().padStart(2, '0')}`;
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-ej2");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Constante C:</strong> C = T(0) - T<sub>m</sub> = ${T0} - ${Tm} = <strong>${C.toFixed(4)}</strong></p>
        <p><strong>Constante k:</strong> k = ln((T(1) - T<sub>m</sub>) / C) = ln((${T1} - ${Tm}) / ${C.toFixed(4)}) = <strong>${k.toFixed(4)}</strong></p>
        <p><strong>Ecuación completa:</strong> T(t) = ${C.toFixed(4)} · e<sup>${k.toFixed(4)}t</sup> + ${Tm}</p>
        <p><strong>Tiempo de muerte:</strong> t = <strong>${t_muerte.toFixed(2)} horas</strong></p>
        <p><strong>Hora aproximada de muerte:</strong> <strong>${hora_muerte}</strong> (considerando t=0 a las 12:00 m)</p>
      </div>
    `;
    
    // Graficar
    const t = [];
    const T = [];
    const tMin = Math.min(0, t_muerte - 2);
    const tMax = Math.max(5, Math.abs(t_muerte) + 2);
    
    for (let i = 0; i <= 100; i++) {
      const tiempo = tMin + (tMax - tMin) * i / 100;
      const temp = C * Math.exp(k * tiempo) + Tm;
      t.push(tiempo);
      T.push(temp);
    }
    
    const trace = { 
      x: t, 
      y: T, 
      type: "scatter", 
      mode: "lines", 
      name: "T(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    // Agregar punto de muerte
    const traceMuerte = {
      x: [t_muerte],
      y: [Tmuerte],
      type: "scatter",
      mode: "markers",
      name: "Momento de muerte",
      marker: { color: 'red', size: 10, symbol: 'x' }
    };
    
    const layout = crearLayoutResponsive(
      "Enfriamiento de Newton - Ejemplo 2",
      "Tiempo (horas, t=0 a las 12:00 m)",
      "Temperatura (°F)",
      {
        shapes: [{
          type: 'line',
          x0: t_muerte,
          x1: t_muerte,
          y0: Tm,
          y1: Tmuerte,
          line: { color: '#e74c3c', width: 2, dash: 'dash' }
        }]
      }
    );
    
    Plotly.newPlot("grafica-ej2", [trace, traceMuerte], layout);
    
    MathJax.typesetPromise();
  }

  // Función para cargar ejemplos de Crecimiento Poblacional
  function loadEjemploCrecimiento(numEjemplo) {
    const cont = document.getElementById("ejemplo-crecimiento-content");
    
    if (numEjemplo === 1) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 1: Población de Cúcuta</h4>
          <p><strong>Problema:</strong> Según el censo realizado en la ciudad de Cúcuta, tenía una población de 489.855 habitantes en 1993 y una población de 587.567 habitantes en el 2005, suponiendo que su población continúe creciendo exponencialmente con un índice constante, ¿qué población esperan los urbanistas que tenga en el año 2017?</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente las constantes C y k:</p>
          <div class="form-group">
            <label>Población inicial N(0): <input id="N0_ej1" type="number" value="489855" step="1"></label>
            <label>Población a t=12 años N(12): <input id="N12_ej1" type="number" value="587567" step="1"></label>
            <label>Tiempo a calcular (años): <input id="t_ej1" type="number" value="24" step="1"></label>
            <button onclick="calcularYGraficarCrecimiento1()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-crec1" style="margin: 1.5rem 0;"></div>
          <div id="grafica-crec1" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-crec1', 'crecimiento-ejemplo1')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarCrecimiento1();
    } else if (numEjemplo === 2) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 2: Población de Lobos</h4>
          <p><strong>Problema:</strong> La velocidad de cambio del número de lobos P(t) en una población es directamente proporcional a 550−P(t), donde t es el tiempo en años. Cuando t=0, la población es de 200, y cuando t=2, la población se incrementó a 400. Encontrar la población cuando t=3.</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente las constantes C y k:</p>
          <div class="form-group">
            <label>Población inicial P(0): <input id="P0_ej2" type="number" value="200" step="1"></label>
            <label>Población a t=2 años P(2): <input id="P2_ej2" type="number" value="400" step="1"></label>
            <label>Límite superior M: <input id="M_ej2" type="number" value="550" step="1"></label>
            <label>Tiempo a calcular (años): <input id="t_ej2" type="number" value="3" step="0.1"></label>
            <button onclick="calcularYGraficarCrecimiento2()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-crec2" style="margin: 1.5rem 0;"></div>
          <div id="grafica-crec2" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-crec2', 'crecimiento-ejemplo2')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarCrecimiento2();
    }
    
    MathJax.typesetPromise();
  }

  // Función para calcular C y k del Ejemplo 1 de Crecimiento
  function calcularYGraficarCrecimiento1() {
    const N0 = parseFloat(document.getElementById("N0_ej1").value);
    const N12 = parseFloat(document.getElementById("N12_ej1").value);
    const t = parseFloat(document.getElementById("t_ej1").value);
    
    // Calcular C: C = N(0)
    const C = N0;
    
    // Calcular k usando N(12)
    // N(12) = C·e^(k·12)
    // N(12) / C = e^(12k)
    // ln(N(12) / C) = 12k
    // k = ln(N(12) / C) / 12
    const k = Math.log(N12 / C) / 12;
    
    // Calcular N(t)
    const Nt = C * Math.exp(k * t);
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-crec1");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Constante C:</strong> C = N(0) = <strong>${C.toFixed(0)}</strong></p>
        <p><strong>Constante k:</strong> k = ln(N(12) / C) / 12 = ln(${N12} / ${C.toFixed(0)}) / 12 = <strong>${k.toFixed(6)}</strong></p>
        <p><strong>Ecuación completa:</strong> N(t) = ${C.toFixed(0)} · e<sup>${k.toFixed(6)}t</sup></p>
        <p><strong>Población al cabo de ${t} años:</strong> N(${t}) = <strong>${Nt.toFixed(0)} habitantes</strong></p>
      </div>
    `;
    
    // Graficar
    const tiempos = [];
    const poblaciones = [];
    for (let i = 0; i <= 50; i++) {
      const tiempo = i;
      const poblacion = C * Math.exp(k * tiempo);
      tiempos.push(tiempo);
      poblaciones.push(poblacion);
    }
    
    const trace = { 
      x: tiempos, 
      y: poblaciones, 
      type: "scatter", 
      mode: "lines", 
      name: "N(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    const layout = crearLayoutResponsive(
      "Crecimiento Poblacional - Ejemplo 1",
      "Tiempo (años)",
      "Población"
    );
    
    Plotly.newPlot("grafica-crec1", [trace], layout);
    
    MathJax.typesetPromise();
  }

  // Función para calcular C y k del Ejemplo 2 de Crecimiento
  function calcularYGraficarCrecimiento2() {
    const P0 = parseFloat(document.getElementById("P0_ej2").value);
    const P2 = parseFloat(document.getElementById("P2_ej2").value);
    const M = parseFloat(document.getElementById("M_ej2").value);
    const t = parseFloat(document.getElementById("t_ej2").value);
    
    // Ecuación: P(t) = M - C·e^(-kt)
    // P(0) = M - C·e^(-k·0) = M - C
    // C = M - P(0)
    const C = M - P0;
    
    // P(2) = M - C·e^(-k·2)
    // M - P(2) = C·e^(-2k)
    // (M - P(2)) / C = e^(-2k)
    // ln((M - P(2)) / C) = -2k
    // k = -ln((M - P(2)) / C) / 2
    const k = -Math.log((M - P2) / C) / 2;
    
    // Calcular P(t)
    const Pt = M - C * Math.exp(-k * t);
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-crec2");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Constante C:</strong> C = M - P(0) = ${M} - ${P0} = <strong>${C.toFixed(4)}</strong></p>
        <p><strong>Constante k:</strong> k = -ln((M - P(2)) / C) / 2 = -ln((${M} - ${P2}) / ${C.toFixed(4)}) / 2 = <strong>${k.toFixed(4)}</strong></p>
        <p><strong>Ecuación completa:</strong> P(t) = ${M} - ${C.toFixed(4)} · e<sup>-${k.toFixed(4)}t</sup></p>
        <p><strong>Población al cabo de ${t} años:</strong> P(${t}) = <strong>${Pt.toFixed(0)} lobos</strong></p>
      </div>
    `;
    
    // Graficar
    const tiempos = [];
    const poblaciones = [];
    for (let i = 0; i <= 20; i++) {
      const tiempo = i * 0.5;
      const poblacion = M - C * Math.exp(-k * tiempo);
      tiempos.push(tiempo);
      poblaciones.push(poblacion);
    }
    
    const trace = { 
      x: tiempos, 
      y: poblaciones, 
      type: "scatter", 
      mode: "lines", 
      name: "P(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    const layout = crearLayoutResponsive(
      "Crecimiento Poblacional - Ejemplo 2 (Lobos)",
      "Tiempo (años)",
      "Población"
    );
    
    Plotly.newPlot("grafica-crec2", [trace], layout);
    
    MathJax.typesetPromise();
  }

  // Función para cargar ejemplos de Oferta y Demanda
  function loadEjemploOfertaDemanda(numEjemplo) {
    const cont = document.getElementById("ejemplo-oferta-content");
    
    if (numEjemplo === 1) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 1: Precio de Especie Animal</h4>
          <p><strong>Problema:</strong> Supongamos que el precio p(t) de una determinada especie animal, varía de modo que su razón de cambio con respecto al tiempo es proporcional a la escasez D-S donde D(p) = 8 - 2p y S(p) = 2 + p son las funciones de demanda y de oferta. Si el precio es 1000 euros cuando t = 0 y 600 euros cuando t = 2, calcule p(t).</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente las constantes:</p>
          <div class="form-group">
            <label>Precio inicial p(0): <input id="p0_od1" type="number" value="1000" step="0.1"></label>
            <label>Precio a t=2 p(2): <input id="p2_od1" type="number" value="600" step="0.1"></label>
            <label>Parámetro a (demanda): <input id="a_od1" type="number" value="8" step="0.1"></label>
            <label>Parámetro b (demanda): <input id="b_od1" type="number" value="2" step="0.1"></label>
            <label>Parámetro c (oferta): <input id="c_od1" type="number" value="2" step="0.1"></label>
            <label>Parámetro d (oferta): <input id="d_od1" type="number" value="1" step="0.1"></label>
            <button onclick="calcularYGraficarOfertaDemanda1()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-od1" style="margin: 1.5rem 0;"></div>
          <div id="grafica-od1" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-od1', 'oferta-demanda-ejemplo1')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarOfertaDemanda1();
    } else if (numEjemplo === 2) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 2: Cambiemos Datos</h4>
          <p><strong>Problema:</strong> Usando las mismas funciones de demanda y oferta del Ejemplo 1 (D(p) = 8 - 2p y S(p) = 2 + p), cambia los datos del precio inicial y el precio en otro tiempo para observar cómo cambia la ecuación característica.</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa solo el precio inicial y el precio en otro tiempo:</p>
          <div class="form-group">
            <label>Precio inicial p(0): <input id="p0_od2" type="number" value="50" step="0.1"></label>
            <label>Precio a t=2 p(2): <input id="p2_od2" type="number" value="3" step="0.1"></label>
            <button onclick="calcularYGraficarOfertaDemanda2()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-od2" style="margin: 1.5rem 0;"></div>
          <div id="grafica-od2" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-od2', 'oferta-demanda-ejemplo2')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarOfertaDemanda2();
    }
    
    MathJax.typesetPromise();
  }

  // Función para calcular y graficar Oferta y Demanda - Ejemplo 1
  function calcularYGraficarOfertaDemanda1() {
    const p0 = parseFloat(document.getElementById("p0_od1").value);
    const p2 = parseFloat(document.getElementById("p2_od1").value);
    const a = parseFloat(document.getElementById("a_od1").value);
    const b = parseFloat(document.getElementById("b_od1").value);
    const c = parseFloat(document.getElementById("c_od1").value);
    const d = parseFloat(document.getElementById("d_od1").value);
    
    // D(p) = a - bp, S(p) = c + dp
    // D - S = (a - bp) - (c + dp) = (a-c) - (b+d)p
    // dp/dt = k((a-c) - (b+d)p)
    
    const suma = b + d; // b + d
    const equilibrio = (a - c) / suma; // Precio de equilibrio = (a-c)/(b+d)
    
    // Solución: p(t) = equilibrio - e^c * e^(-(b+d)kt)
    // p(0) = equilibrio - e^c = p0
    // e^c = equilibrio - p0
    const ec = equilibrio - p0;
    
    // p(2) = equilibrio - ec * e^(-suma*k*2) = p2
    // equilibrio - p2 = ec * e^(-suma*k*2)
    // (equilibrio - p2) / ec = e^(-suma*k*2)
    // ln((equilibrio - p2) / ec) = -suma*k*2
    // k = -ln((equilibrio - p2) / ec) / (suma * 2)
    const ratio = (equilibrio - p2) / ec;
    if (ratio <= 0 || isNaN(ratio) || !isFinite(ratio)) {
      alert("Error: Los valores ingresados no permiten calcular k. Verifique que los datos sean consistentes.");
      return;
    }
    const k = -Math.log(ratio) / (suma * 2);
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-od1");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Precio de equilibrio:</strong> P<sub>e</sub> = (a-c)/(b+d) = (${a}-${c})/(${b}+${d}) = <strong>${equilibrio.toFixed(4)}</strong></p>
        <p><strong>Constante e^c:</strong> e^c = P<sub>e</sub> - p(0) = ${equilibrio.toFixed(4)} - ${p0} = <strong>${ec.toFixed(4)}</strong></p>
        <p><strong>Constante k:</strong> k = <strong>${k.toFixed(4)}</strong></p>
        <p><strong>Ecuación completa:</strong> p(t) = ${equilibrio.toFixed(4)} ${ec >= 0 ? '+' : '-'} ${Math.abs(ec).toFixed(4)} · e<sup>-${(suma * k).toFixed(4)}t</sup></p>
      </div>
    `;
    
    // Graficar
    const tiempos = [];
    const precios = [];
    for (let i = 0; i <= 50; i++) {
      const tiempo = i * 0.1;
      const precio = equilibrio - ec * Math.exp(-suma * k * tiempo);
      tiempos.push(tiempo);
      precios.push(precio);
    }
    
    const trace = { 
      x: tiempos, 
      y: precios, 
      type: "scatter", 
      mode: "lines", 
      name: "p(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    // Línea de equilibrio
    const traceEquilibrio = {
      x: tiempos,
      y: tiempos.map(() => equilibrio),
      type: "scatter",
      mode: "lines",
      name: "Precio de equilibrio",
      line: { color: 'red', width: 1, dash: 'dash' }
    };
    
    const layout = crearLayoutResponsive(
      "Oferta y Demanda - Ejemplo 1",
      "Tiempo",
      "Precio (euros)"
    );
    
    Plotly.newPlot("grafica-od1", [trace, traceEquilibrio], layout);
    
    MathJax.typesetPromise();
  }

  // Función para calcular y graficar Oferta y Demanda - Ejemplo 2
  function calcularYGraficarOfertaDemanda2() {
    const p0 = parseFloat(document.getElementById("p0_od2").value);
    const p2 = parseFloat(document.getElementById("p2_od2").value);
    
    // Usar los mismos parámetros del Ejemplo 1: D(p) = 8 - 2p, S(p) = 2 + p
    const a = 8;
    const b = 2;
    const c = 2;
    const d = 1;
    
    // D(p) = a - bp, S(p) = c + dp
    // D - S = (a - bp) - (c + dp) = (a-c) - (b+d)p
    // dp/dt = k((a-c) - (b+d)p)
    // D - S = 6 - 3p, entonces dp/dt = k(6 - 3p) = 3k(2 - p)
    
    const suma = b + d; // b + d = 3
    const equilibrio = (a - c) / suma; // Precio de equilibrio = (8-2)/3 = 2
    
    // Solución: p(t) = 2 - e^c * e^(-3kt)
    // p(0) = 2 - e^c = p0
    // e^c = 2 - p0
    const ec = equilibrio - p0;
    
    // p(2) = 2 - ec * e^(-3k*2) = p2
    // 2 - p2 = ec * e^(-6k)
    // (2 - p2) / ec = e^(-6k)
    // ln((2 - p2) / ec) = -6k
    // k = -ln((2 - p2) / ec) / 6
    const ratio = (equilibrio - p2) / ec;
    if (ratio <= 0 || isNaN(ratio) || !isFinite(ratio)) {
      alert("Error: Los valores ingresados no permiten calcular k. Verifique que los datos sean consistentes.");
      return;
    }
    const k = -Math.log(ratio) / (suma * 2);
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-od2");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Funciones:</strong> D(p) = ${a} - ${b}p, S(p) = ${c} + ${d}p</p>
        <p><strong>Precio de equilibrio:</strong> P<sub>e</sub> = (a-c)/(b+d) = (${a}-${c})/(${b}+${d}) = <strong>${equilibrio.toFixed(4)}</strong></p>
        <p><strong>Constante e^c:</strong> e^c = P<sub>e</sub> - p(0) = ${equilibrio.toFixed(4)} - ${p0} = <strong>${ec.toFixed(4)}</strong></p>
        <p><strong>Constante k:</strong> k = <strong>${k.toFixed(4)}</strong></p>
        <p><strong>Ecuación completa:</strong> p(t) = ${equilibrio.toFixed(4)} ${ec >= 0 ? '+' : '-'} ${Math.abs(ec).toFixed(4)} · e<sup>-${(suma * k).toFixed(4)}t</sup></p>
      </div>
    `;
    
    // Graficar
    const tiempos = [];
    const precios = [];
    for (let i = 0; i <= 50; i++) {
      const tiempo = i * 0.1;
      const precio = equilibrio - ec * Math.exp(-suma * k * tiempo);
      tiempos.push(tiempo);
      precios.push(precio);
    }
    
    const trace = { 
      x: tiempos, 
      y: precios, 
      type: "scatter", 
      mode: "lines", 
      name: "p(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    // Línea de equilibrio
    const traceEquilibrio = {
      x: tiempos,
      y: tiempos.map(() => equilibrio),
      type: "scatter",
      mode: "lines",
      name: "Precio de equilibrio",
      line: { color: 'red', width: 1, dash: 'dash' }
    };
    
    const layout = crearLayoutResponsive(
      "Oferta y Demanda - Ejemplo 2",
      "Tiempo",
      "Precio"
    );
    
    Plotly.newPlot("grafica-od2", [trace, traceEquilibrio], layout);
    
    MathJax.typesetPromise();
  }

  // Función para cargar ejemplos de Interés Compuesto
  function loadEjemploInteres(numEjemplo) {
    const cont = document.getElementById("ejemplo-interes-content");
    
    if (numEjemplo === 1) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 1: Banco Davivienda</h4>
          <p><strong>Problema:</strong> El Banco Davivienda está realizando la semana para los inversionistas y ofrece a sus clientes préstamos a un año con una tasa de interés efectiva anual del 8%. Si José desea realizar un viaje a Europa necesita prestar $ 20.000.000,00 cuánto debe pagar al finalizar el año incluido los intereses?</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente:</p>
          <div class="form-group">
            <label>Monto inicial s(0): <input id="s0_int" type="number" value="20000000" step="1000"></label>
            <label>Tasa de interés i (decimal): <input id="i_int" type="number" value="0.08" step="0.001"></label>
            <label>Tiempo t (años): <input id="t_int" type="number" value="1" step="0.1"></label>
            <button onclick="calcularYGraficarInteres()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-int" style="margin: 1.5rem 0;"></div>
          <div id="grafica-int" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-int', 'interes-compuesto')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarInteres();
    }
    
    MathJax.typesetPromise();
  }

  // Función para calcular y graficar Interés Compuesto
  function calcularYGraficarInteres() {
    const s0 = parseFloat(document.getElementById("s0_int").value);
    const i = parseFloat(document.getElementById("i_int").value);
    const t = parseFloat(document.getElementById("t_int").value);
    
    // C = s(0)
    const C = s0;
    
    // Calcular s(t)
    const st = C * Math.exp(i * t);
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-int");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Constante C:</strong> C = s(0) = <strong>${C.toLocaleString()}</strong></p>
        <p><strong>Ecuación completa:</strong> s(t) = ${C.toLocaleString()} · e<sup>${i}t</sup></p>
        <p><strong>Monto al cabo de ${t} ${t === 1 ? 'año' : 'años'}:</strong> s(${t}) = <strong>$${st.toLocaleString()}</strong></p>
      </div>
    `;
    
    // Graficar
    const tiempos = [];
    const montos = [];
    for (let j = 0; j <= 100; j++) {
      const tiempo = j * t / 100;
      const monto = C * Math.exp(i * tiempo);
      tiempos.push(tiempo);
      montos.push(monto);
    }
    
    const trace = { 
      x: tiempos, 
      y: montos, 
      type: "scatter", 
      mode: "lines", 
      name: "s(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    const layout = crearLayoutResponsive(
      "Interés Compuesto - Ejemplo 1",
      "Tiempo (años)",
      "Monto ($)"
    );
    
    Plotly.newPlot("grafica-int", [trace], layout);
    
    MathJax.typesetPromise();
  }

  // Función para cargar ejemplos de Mezclas
  function loadEjemploMezclas(numEjemplo) {
    const cont = document.getElementById("ejemplo-mezclas-content");
    
    if (numEjemplo === 1) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 1: Tanque con Sal</h4>
          <p><strong>Problema:</strong> Un tanque contiene 200L de agua donde se han disuelto 30gr de sal, donde entran 4Lt por minuto de solución con 1gr de sal por litro, luego de la mezcla, sale líquido con el mismo flujo. ¿Cuál es la cantidad de gramos de sal que hay en el tanque en cualquier momento?</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente:</p>
          <div class="form-group">
            <label>Volumen inicial V(0) (L): <input id="V0_mez1" type="number" value="200" step="0.1"></label>
            <label>Cantidad inicial Q(0) (gr): <input id="Q0_mez1" type="number" value="30" step="0.1"></label>
            <label>Flujo de entrada A (L/min): <input id="A_mez1" type="number" value="4" step="0.1"></label>
            <label>Concentración de entrada c₁ (gr/L): <input id="c1_mez1" type="number" value="1" step="0.1"></label>
            <label>Flujo de salida B (L/min): <input id="B_mez1" type="number" value="4" step="0.1"></label>
            <button onclick="calcularYGraficarMezclas1()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-mez1" style="margin: 1.5rem 0;"></div>
          <div id="grafica-mez1" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-mez1', 'mezclas-ejemplo1')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarMezclas1();
    } else if (numEjemplo === 2) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 2: Harry Potter - Compuesto DUPREE</h4>
          <p><strong>Problema:</strong> Harry Potter necesita producir un compuesto llamado DUPREE usando "saliva de lagarto con gripe" y "moco de rata de alcantarilla". La rapidez de transformación es proporcional al producto de las cantidades NO transformadas. Ron consiguió 4 onzas de la primera sustancia y 5 onzas de la segunda. Al cabo de 50 minutos, Harry ha fabricado 1 onza de DUPREE. ¿Cuánto tiempo más debe transcurrir para obtener 1.5 onzas?</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente:</p>
          <div class="form-group">
            <label>Cantidad inicial x(0) (onzas): <input id="x0_mez2" type="number" value="0" step="0.1"></label>
            <label>Cantidad de sustancia 1 (onzas): <input id="s1_mez2" type="number" value="4" step="0.1"></label>
            <label>Cantidad de sustancia 2 (onzas): <input id="s2_mez2" type="number" value="5" step="0.1"></label>
            <label>Cantidad a t=50 min x(50) (onzas): <input id="x50_mez2" type="number" value="1" step="0.1"></label>
            <label>Cantidad deseada (onzas): <input id="xdeseada_mez2" type="number" value="1.5" step="0.1"></label>
            <button onclick="calcularYGraficarMezclas2()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-mez2" style="margin: 1.5rem 0;"></div>
          <div id="grafica-mez2" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-mez2', 'mezclas-ejemplo2')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarMezclas2();
    }
    
    MathJax.typesetPromise();
  }

  // Función para calcular y graficar Mezclas - Ejemplo 1
  function calcularYGraficarMezclas1() {
    const V0 = parseFloat(document.getElementById("V0_mez1").value);
    const Q0 = parseFloat(document.getElementById("Q0_mez1").value);
    const A = parseFloat(document.getElementById("A_mez1").value);
    const c1 = parseFloat(document.getElementById("c1_mez1").value);
    const B = parseFloat(document.getElementById("B_mez1").value);
    
    // dQ/dt = A·c₁ - B·Q(t)/V(t)
    // Si A = B, entonces V(t) = V₀ (volumen constante)
    // dQ/dt = A·c₁ - (B/V₀)·Q
    // dQ/dt + (B/V₀)·Q = A·c₁
    
    // Solución: Q(t) = A·c₁·V₀/B + c·e^(-Bt/V₀)
    // Q(0) = A·c₁·V₀/B + c = Q0
    // c = Q0 - A·c₁·V₀/B
    
    const terminoConstante = A * c1 * V0 / B;
    const c = Q0 - terminoConstante;
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-mez1");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Término constante:</strong> A·c₁·V₀/B = ${A}·${c1}·${V0}/${B} = <strong>${terminoConstante.toFixed(4)}</strong></p>
        <p><strong>Constante c:</strong> c = Q(0) - A·c₁·V₀/B = ${Q0} - ${terminoConstante.toFixed(4)} = <strong>${c.toFixed(4)}</strong></p>
        <p><strong>Ecuación completa:</strong> Q(t) = ${terminoConstante.toFixed(4)} ${c >= 0 ? '+' : '-'} ${Math.abs(c).toFixed(4)} · e<sup>-${(B/V0).toFixed(4)}t</sup></p>
      </div>
    `;
    
    // Graficar
    const tiempos = [];
    const cantidades = [];
    for (let i = 0; i <= 200; i++) {
      const tiempo = i * 0.5;
      const cantidad = terminoConstante + c * Math.exp(-B * tiempo / V0);
      tiempos.push(tiempo);
      cantidades.push(cantidad);
    }
    
    const trace = { 
      x: tiempos, 
      y: cantidades, 
      type: "scatter", 
      mode: "lines", 
      name: "Q(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    const layout = crearLayoutResponsive(
      "Mezclas - Ejemplo 1 (Tanque con Sal)",
      "Tiempo (min)",
      "Cantidad de sal (gr)"
    );
    
    Plotly.newPlot("grafica-mez1", [trace], layout);
    
    MathJax.typesetPromise();
  }

  // Función para calcular y graficar Mezclas - Ejemplo 2
  function calcularYGraficarMezclas2() {
    const x0 = parseFloat(document.getElementById("x0_mez2").value);
    const s1 = parseFloat(document.getElementById("s1_mez2").value);
    const s2 = parseFloat(document.getElementById("s2_mez2").value);
    const x50 = parseFloat(document.getElementById("x50_mez2").value);
    const xdeseada = parseFloat(document.getElementById("xdeseada_mez2").value);
    
    // dx/dt = k(s1-x)(s2-x)
    // dx/((s1-x)(s2-x)) = k·dt
    // Resolviendo por fracciones parciales: ln((s1-x)/(s2-x)) = kt + c
    
    // Con x(0) = 0: c = ln(s1/s2)
    const c = Math.log(s1 / s2);
    
    // Con x(50) = x50: ln((s1-x50)/(s2-x50)) = 50k + c
    // k = (ln((s1-x50)/(s2-x50)) - c) / 50
    const k = (Math.log((s1 - x50) / (s2 - x50)) - c) / 50;
    
    // Para x = xdeseada: ln((s1-xdeseada)/(s2-xdeseada)) = kt + c
    // t = (ln((s1-xdeseada)/(s2-xdeseada)) - c) / k
    const t = (Math.log((s1 - xdeseada) / (s2 - xdeseada)) - c) / k;
    const tiempoAdicional = t - 50;
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-mez2");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Constante c:</strong> c = ln(s₁/s₂) = ln(${s1}/${s2}) = <strong>${c.toFixed(4)}</strong></p>
        <p><strong>Constante k:</strong> k = <strong>${k.toFixed(6)}</strong></p>
        <p><strong>Ecuación:</strong> ln((s₁-x)/(s₂-x)) = ${k.toFixed(6)}t + ${c.toFixed(4)}</p>
        <p><strong>Tiempo total para ${xdeseada} onzas:</strong> t = <strong>${t.toFixed(2)} minutos</strong></p>
        <p><strong>Tiempo adicional necesario:</strong> <strong>${tiempoAdicional.toFixed(2)} minutos</strong></p>
      </div>
    `;
    
    // Graficar
    const tiempos = [];
    const cantidades = [];
    for (let i = 0; i <= 200; i++) {
      const tiempo = i * 0.5;
      // Resolver: ln((s1-x)/(s2-x)) = kt + c
      // (s1-x)/(s2-x) = e^(kt+c)
      // s1-x = (s2-x)e^(kt+c)
      // s1-x = s2·e^(kt+c) - x·e^(kt+c)
      // s1 = s2·e^(kt+c) - x·e^(kt+c) + x
      // s1 = s2·e^(kt+c) + x(1 - e^(kt+c))
      // x = (s1 - s2·e^(kt+c)) / (1 - e^(kt+c))
      const exponente = k * tiempo + c;
      const cantidad = (s1 - s2 * Math.exp(exponente)) / (1 - Math.exp(exponente));
      if (cantidad >= 0 && cantidad <= Math.min(s1, s2)) {
        tiempos.push(tiempo);
        cantidades.push(cantidad);
      }
    }
    
    const trace = { 
      x: tiempos, 
      y: cantidades, 
      type: "scatter", 
      mode: "lines", 
      name: "x(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    const layout = crearLayoutResponsive(
      "Mezclas - Ejemplo 2 (Harry Potter)",
      "Tiempo (min)",
      "Cantidad de DUPREE (onzas)"
    );
    
    Plotly.newPlot("grafica-mez2", [trace], layout);
    
    MathJax.typesetPromise();
  }

  // Función para cargar ejemplos de Epidemias
  function loadEjemploEpidemias(numEjemplo) {
    const cont = document.getElementById("ejemplo-epidemias-content");
    
    if (numEjemplo === 1) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 1: Propagación de Gripe en Florida (Valle del Cauca)</h4>
          <p><strong>Problema:</strong> En Florida (valle del Cauca) tienen una población aproximada de 45mil personas, la tasa de propagación de una epidemia de gripe es conjuntamente proporcional al número de personas que han contraído la enfermedad y al número de ellas que no se han contagiado. Si 200 personas tenían gripe al iniciarse la epidemia y 2800 tienen gripe al cabo de 3 semanas, obtenga un modelo matemático que describa la epidemia. ¿Cuántas personas esperan que contraigan la enfermedad después de 5 semanas? Si la epidemia se sigue extendiendo indefinidamente cuántas personas contraerán la enfermedad en Florida?</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente:</p>
          <div class="form-group">
            <label>Población total M (miles): <input id="M_epi1" type="number" value="45" step="0.1"></label>
            <label>Infectados iniciales P(0) (miles): <input id="P0_epi1" type="number" value="0.2" step="0.01"></label>
            <label>Infectados a t=3 semanas P(3) (miles): <input id="P3_epi1" type="number" value="2.8" step="0.1"></label>
            <label>Tiempo a calcular (semanas): <input id="t_epi1" type="number" value="5" step="0.1"></label>
            <button onclick="calcularYGraficarEpidemias()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-epi1" style="margin: 1.5rem 0;"></div>
          <div id="grafica-epi1" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-epi1', 'epidemias-ejemplo1')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarEpidemias();
    }
    
    MathJax.typesetPromise();
  }

  // Función para calcular y graficar Epidemias
  function calcularYGraficarEpidemias() {
    const M = parseFloat(document.getElementById("M_epi1").value);
    const P0 = parseFloat(document.getElementById("P0_epi1").value);
    const P3 = parseFloat(document.getElementById("P3_epi1").value);
    const t = parseFloat(document.getElementById("t_epi1").value);
    
    // P(t) = M / (1 + e^(A - kMt))
    // P(0) = M / (1 + e^A) = P0
    // 1 + e^A = M / P0
    // e^A = M/P0 - 1
    // A = ln(M/P0 - 1)
    const A = Math.log(M / P0 - 1);
    
    // P(3) = M / (1 + e^(A - kM*3)) = P3
    // 1 + e^(A - 3kM) = M / P3
    // e^(A - 3kM) = M/P3 - 1
    // A - 3kM = ln(M/P3 - 1)
    // 3kM = A - ln(M/P3 - 1)
    // k = (A - ln(M/P3 - 1)) / (3M)
    const k = (A - Math.log(M / P3 - 1)) / (3 * M);
    
    // Calcular P(t)
    const Pt = M / (1 + Math.exp(A - k * M * t));
    
    // Calcular límite cuando t -> infinito (todos los que pueden contagiarse)
    const limite = M;
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-epi1");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Constante A:</strong> A = ln(M/P(0) - 1) = ln(${M}/${P0} - 1) = <strong>${A.toFixed(4)}</strong></p>
        <p><strong>Constante k:</strong> k = <strong>${k.toFixed(4)}</strong></p>
        <p><strong>Modelo matemático:</strong> P(t) = ${M} / (1 + e<sup>${A.toFixed(4)} - ${(k * M).toFixed(4)}t</sup>)</p>
        <p><strong>Personas infectadas después de ${t} semanas:</strong> P(${t}) = <strong>${Pt.toFixed(3)} mil personas</strong> (${(Pt * 1000).toFixed(0)} personas)</p>
        <p><strong>Si la epidemia se extiende indefinidamente:</strong> <strong>${limite} mil personas</strong> (${(limite * 1000).toFixed(0)} personas) contraerán la enfermedad</p>
      </div>
    `;
    
    // Graficar
    const tiempos = [];
    const infectados = [];
    for (let i = 0; i <= 100; i++) {
      const tiempo = i * 0.5;
      const infectado = M / (1 + Math.exp(A - k * M * tiempo));
      tiempos.push(tiempo);
      infectados.push(infectado);
    }
    
    const trace = { 
      x: tiempos, 
      y: infectados, 
      type: "scatter", 
      mode: "lines", 
      name: "P(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    // Línea del límite
    const traceLimite = {
      x: tiempos,
      y: tiempos.map(() => M),
      type: "scatter",
      mode: "lines",
      name: "Límite M",
      line: { color: 'red', width: 1, dash: 'dash' }
    };
    
    const layout = crearLayoutResponsive(
      "Epidemias - Ejemplo 1 (Gripe en Florida)",
      "Tiempo (semanas)",
      "Personas infectadas (miles)"
    );
    
    Plotly.newPlot("grafica-epi1", [trace, traceLimite], layout);
    
    MathJax.typesetPromise();
  }

  // Función para cargar ejemplos de Circuitos
  function loadEjemploCircuitos(numEjemplo) {
    const cont = document.getElementById("ejemplo-circuitos-content");
    
    if (numEjemplo === 1) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 1: Circuito RL</h4>
          <p><strong>Problema:</strong> Un generador cuya f.e.m. es 100 voltios, se conecta en serie con una resistencia de 10 ohmios y una inducción de 2 henrios. Si el interruptor se cierra cuando t=0, hallar la intensidad de la corriente en función del tiempo.</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente:</p>
          <div class="form-group">
            <label>Fuerza electromotriz E (V): <input id="E_cir1" type="number" value="100" step="0.1"></label>
            <label>Resistencia R (Ω): <input id="R_cir1" type="number" value="10" step="0.1"></label>
            <label>Inductancia L (H): <input id="L_cir1" type="number" value="2" step="0.1"></label>
            <button onclick="calcularYGraficarCircuitos1()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-cir1" style="margin: 1.5rem 0;"></div>
          <div id="grafica-cir1" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-cir1', 'circuitos-ejemplo1')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarCircuitos1();
    } else if (numEjemplo === 2) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 2: Circuito RC</h4>
          <p><strong>Problema:</strong> Una F.e.m. de 20·e^(-5t) voltios se conecta en serie con una resistencia de 20 ohmios y una capacitancia de 0.01 Faradios. Asumiendo que la carga inicial del capacitor es cero, encuentre la carga y la corriente en cualquier instante del tiempo.</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente:</p>
          <div class="form-group">
            <label>Resistencia R (Ω): <input id="R_cir2" type="number" value="20" step="0.1"></label>
            <label>Capacitancia C (F): <input id="C_cir2" type="number" value="0.01" step="0.001"></label>
            <label>Coeficiente de exponencial: <input id="alpha_cir2" type="number" value="5" step="0.1"></label>
            <button onclick="calcularYGraficarCircuitos2()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-cir2" style="margin: 1.5rem 0;"></div>
          <div id="grafica-cir2" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-cir2', 'circuitos-ejemplo2')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarCircuitos2();
    }
    
    MathJax.typesetPromise();
  }

  // Función para calcular y graficar Circuitos - Ejemplo 1
  function calcularYGraficarCircuitos1() {
    const E = parseFloat(document.getElementById("E_cir1").value);
    const R = parseFloat(document.getElementById("R_cir1").value);
    const L = parseFloat(document.getElementById("L_cir1").value);
    
    // L·(di/dt) + RI = E
    // di/dt + (R/L)I = E/L
    // Solución: I(t) = (E/R)(1 - e^(-Rt/L))
    
    const constante = E / R;
    const exponente = R / L;
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-cir1");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Ecuación diferencial:</strong> L·(di/dt) + RI = E</p>
        <p><strong>Forma estándar:</strong> di/dt + (R/L)I = E/L</p>
        <p><strong>Ecuación completa:</strong> I(t) = ${constante.toFixed(2)} · (1 - e<sup>-${exponente.toFixed(4)}t</sup>)</p>
      </div>
    `;
    
    // Graficar
    const tiempos = [];
    const corrientes = [];
    for (let i = 0; i <= 100; i++) {
      const tiempo = i * 0.1;
      const corriente = constante * (1 - Math.exp(-exponente * tiempo));
      tiempos.push(tiempo);
      corrientes.push(corriente);
    }
    
    const trace = { 
      x: tiempos, 
      y: corrientes, 
      type: "scatter", 
      mode: "lines", 
      name: "I(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    const layout = crearLayoutResponsive(
      "Circuitos - Ejemplo 1 (Circuito RL)",
      "Tiempo (s)",
      "Corriente (A)"
    );
    
    Plotly.newPlot("grafica-cir1", [trace], layout);
    
    MathJax.typesetPromise();
  }

  // Función para calcular y graficar Circuitos - Ejemplo 2
  function calcularYGraficarCircuitos2() {
    const R = parseFloat(document.getElementById("R_cir2").value);
    const C = parseFloat(document.getElementById("C_cir2").value);
    const alpha = parseFloat(document.getElementById("alpha_cir2").value);
    
    // R·(dQ/dt) + Q/C = E donde E = 20·e^(-5t)
    // dQ/dt + Q/(RC) = (20/R)·e^(-5t)
    // Solución: Q(t) = t·e^(-5t) (con condiciones iniciales Q(0)=0)
    // I(t) = dQ/dt = -(1/5)·t·e^(-5t) - (1/25)·e^(-5t)
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-cir2");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Ecuación diferencial:</strong> R·(dQ/dt) + Q/C = E(t)</p>
        <p><strong>E(t):</strong> E(t) = 20·e<sup>-${alpha}t</sup></p>
        <p><strong>Ecuación de carga:</strong> Q(t) = t·e<sup>-${alpha}t</sup></p>
        <p><strong>Ecuación de corriente:</strong> I(t) = -(1/${alpha})·t·e<sup>-${alpha}t</sup> - (1/${alpha*alpha})·e<sup>-${alpha}t</sup></p>
      </div>
    `;
    
    // Graficar
    const tiempos = [];
    const cargas = [];
    const corrientes = [];
    for (let i = 0; i <= 100; i++) {
      const tiempo = i * 0.1;
      const carga = tiempo * Math.exp(-alpha * tiempo);
      const corriente = -(1/alpha) * tiempo * Math.exp(-alpha * tiempo) - (1/(alpha*alpha)) * Math.exp(-alpha * tiempo);
      tiempos.push(tiempo);
      cargas.push(carga);
      corrientes.push(corriente);
    }
    
    const traceQ = { 
      x: tiempos, 
      y: cargas, 
      type: "scatter", 
      mode: "lines", 
      name: "Q(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    const traceI = { 
      x: tiempos, 
      y: corrientes, 
      type: "scatter", 
      mode: "lines", 
      name: "I(t)",
      line: { color: '#e74c3c', width: 2 }
    };
    
    const layout = crearLayoutResponsive(
      "Circuitos - Ejemplo 2 (Circuito RC)",
      "Tiempo (s)",
      "Carga (C) / Corriente (A)"
    );
    
    Plotly.newPlot("grafica-cir2", [traceQ, traceI], layout);
    
    MathJax.typesetPromise();
  }

  // Función para cargar ejemplos de Péndulos
  function loadEjemploPendulo(numEjemplo) {
    const cont = document.getElementById("ejemplo-pendulo-content");
    
    if (numEjemplo === 1) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 1: Péndulo Simple</h4>
          <p><strong>Problema:</strong> Un péndulo sencillo cuya longitud es de 5ft se columpia con una amplitud de π/60 radianes. Encontrar el periodo del péndulo y su velocidad, cuando pasa por la posición de equilibrio, es decir, θ = 0.</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente:</p>
          <div class="form-group">
            <label>Longitud L (ft): <input id="L_pen1" type="number" value="5" step="0.1"></label>
            <label>Gravedad g (ft/s²): <input id="g_pen1" type="number" value="32" step="0.1"></label>
            <label>Amplitud θ₀ (rad): <input id="theta0_pen1" type="number" value="0.05236" step="0.001"></label>
            <button onclick="calcularYGraficarPendulo()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-pen1" style="margin: 1.5rem 0;"></div>
          <div id="grafica-pen1" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-pen1', 'pendulo-ejemplo1')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarPendulo();
    }
    
    MathJax.typesetPromise();
  }

  // Función para calcular y graficar Péndulo
  function calcularYGraficarPendulo() {
    const L = parseFloat(document.getElementById("L_pen1").value);
    const g = parseFloat(document.getElementById("g_pen1").value);
    const theta0 = parseFloat(document.getElementById("theta0_pen1").value);
    
    // ω = √(g/L)
    const omega = Math.sqrt(g / L);
    
    // Período: T = 2π·√(L/g)
    const T = 2 * Math.PI * Math.sqrt(L / g);
    
    // Velocidad cuando θ = 0: v = ±L·ω·θ₀
    const v = L * omega * theta0;
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-pen1");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Frecuencia angular:</strong> ω = √(g/L) = √(${g}/${L}) = <strong>${omega.toFixed(4)} rad/s</strong></p>
        <p><strong>Período:</strong> T = 2π·√(L/g) = 2π·√(${L}/${g}) = <strong>${T.toFixed(3)} s</strong></p>
        <p><strong>Velocidad en posición de equilibrio:</strong> v = ±L·ω·θ₀ = ±${L}·${omega.toFixed(4)}·${theta0.toFixed(4)} = <strong>±${v.toFixed(4)} ft/s</strong></p>
        <p><strong>Ecuación del movimiento:</strong> θ(t) = ${theta0.toFixed(4)}·cos(${omega.toFixed(4)}t + γ)</p>
      </div>
    `;
    
    // Graficar
    const tiempos = [];
    const angulos = [];
    const velocidades = [];
    for (let i = 0; i <= 200; i++) {
      const tiempo = i * 0.05;
      const angulo = theta0 * Math.cos(omega * tiempo);
      const velocidad = -L * omega * theta0 * Math.sin(omega * tiempo);
      tiempos.push(tiempo);
      angulos.push(angulo);
      velocidades.push(velocidad);
    }
    
    const traceTheta = { 
      x: tiempos, 
      y: angulos, 
      type: "scatter", 
      mode: "lines", 
      name: "θ(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    const traceVel = { 
      x: tiempos, 
      y: velocidades, 
      type: "scatter", 
      mode: "lines", 
      name: "v(t)",
      line: { color: '#e74c3c', width: 2 },
      yaxis: 'y2'
    };
    
    const layout = crearLayoutResponsive(
      "Péndulo Simple - Ejemplo 1",
      "Tiempo (s)",
      "Ángulo (rad)",
      {
        yaxis: { title: "Ángulo (rad)", side: "left" },
        yaxis2: { title: "Velocidad (ft/s)", side: "right", overlaying: "y" }
      }
    );
    
    Plotly.newPlot("grafica-pen1", [traceTheta, traceVel], layout);
    
    MathJax.typesetPromise();
  }

  // Función para cargar ejemplos de Movimiento Armónico
  function loadEjemploArmonico(numEjemplo) {
    const cont = document.getElementById("ejemplo-armonico-content");
    
    if (numEjemplo === 1) {
      cont.innerHTML = `
        <div class="ejemplo">
          <h4>Ejemplo 1: Movimiento Libre</h4>
          <p><strong>Problema:</strong> Una masa que pesa 2 libras hace que un resorte se estire 6 pulg cuando t=0; la masa se suelta desde un punto a 8 pulg debajo de la posición de equilibrio con una velocidad inicial hacia arriba de 4/3 ft/seg. Deduzca la ecuación del movimiento libre.</p>
          
          <h4>Cambiemos Datos</h4>
          <p>Ingresa los datos para calcular automáticamente:</p>
          <div class="form-group">
            <label>Peso w (lb): <input id="w_arm1" type="number" value="2" step="0.1"></label>
            <label>Estiramiento inicial s (ft): <input id="s_arm1" type="number" value="0.5" step="0.1"></label>
            <label>Posición inicial x(0) (ft): <input id="x0_arm1" type="number" value="0.6667" step="0.01"></label>
            <label>Velocidad inicial x'(0) (ft/s): <input id="v0_arm1" type="number" value="-1.3333" step="0.01"></label>
            <label>Gravedad g (ft/s²): <input id="g_arm1" type="number" value="32" step="0.1"></label>
            <button onclick="calcularYGraficarArmonico()">Calcular y Graficar</button>
          </div>
          
          <div id="resultados-arm1" style="margin: 1.5rem 0;"></div>
          <div id="grafica-arm1" class="grafica-container"></div>
          <button class="export-btn" onclick="exportarGrafica('grafica-arm1', 'armonico-ejemplo1')">📥 Exportar Gráfica</button>
        </div>
      `;
      calcularYGraficarArmonico();
    }
    
    MathJax.typesetPromise();
  }

  // Función para calcular y graficar Movimiento Armónico
  function calcularYGraficarArmonico() {
    const w = parseFloat(document.getElementById("w_arm1").value);
    const s = parseFloat(document.getElementById("s_arm1").value);
    const x0 = parseFloat(document.getElementById("x0_arm1").value);
    const v0 = parseFloat(document.getElementById("v0_arm1").value);
    const g = parseFloat(document.getElementById("g_arm1").value);
    
    // m = w/g
    const m = w / g;
    
    // k = f/s = w/s
    const k = w / s;
    
    // ω² = k/m
    const omega = Math.sqrt(k / m);
    
    // x(t) = C₁ cos(ωt) + C₂ sen(ωt)
    // x(0) = C₁ = x0
    const C1 = x0;
    
    // x'(t) = -ωC₁ sen(ωt) + ωC₂ cos(ωt)
    // x'(0) = ωC₂ = v0
    // C₂ = v0/ω
    const C2 = v0 / omega;
    
    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados-arm1");
    resultadosDiv.innerHTML = `
      <div class="ejemplo" style="background: #e8f5e9; border-left-color: #4caf50;">
        <h4>Resultados del Cálculo</h4>
        <p><strong>Masa:</strong> m = w/g = ${w}/${g} = <strong>${m.toFixed(4)}</strong></p>
        <p><strong>Constante del resorte:</strong> k = w/s = ${w}/${s} = <strong>${k.toFixed(4)} lb/ft</strong></p>
        <p><strong>Frecuencia angular:</strong> ω = √(k/m) = √(${k.toFixed(4)}/${m.toFixed(4)}) = <strong>${omega.toFixed(4)} rad/s</strong></p>
        <p><strong>Constante C₁:</strong> C₁ = x(0) = <strong>${C1.toFixed(4)}</strong></p>
        <p><strong>Constante C₂:</strong> C₂ = x'(0)/ω = ${v0}/${omega.toFixed(4)} = <strong>${C2.toFixed(4)}</strong></p>
        <p><strong>Ecuación del movimiento:</strong> x(t) = ${C1.toFixed(4)}·cos(${omega.toFixed(4)}t) ${C2 >= 0 ? '+' : ''} ${C2.toFixed(4)}·sen(${omega.toFixed(4)}t)</p>
      </div>
    `;
    
    // Graficar
    const tiempos = [];
    const posiciones = [];
    for (let i = 0; i <= 200; i++) {
      const tiempo = i * 0.05;
      const posicion = C1 * Math.cos(omega * tiempo) + C2 * Math.sin(omega * tiempo);
      tiempos.push(tiempo);
      posiciones.push(posicion);
    }
    
    const trace = { 
      x: tiempos, 
      y: posiciones, 
      type: "scatter", 
      mode: "lines", 
      name: "x(t)",
      line: { color: '#8B6F47', width: 3 }
    };
    
    const layout = crearLayoutResponsive(
      "Movimiento Armónico Simple - Ejemplo 1",
      "Tiempo (s)",
      "Posición (ft)"
    );
    
    Plotly.newPlot("grafica-arm1", [trace], layout);
    
    MathJax.typesetPromise();
  }
  
  // Función para alternar el menú en móvil
  function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
  }
  
  // ---- Funciones para gráficas ----
  
  function graficaEnfriamiento() {
    const T0 = parseFloat(document.getElementById("T0").value);
    const Ta = parseFloat(document.getElementById("Ta").value);
    const k = parseFloat(document.getElementById("k").value);
  
    // Calcular C según la ecuación: C = T(0) - Tm
    const C = T0 - Ta;
  
    const t = [];
    const T = [];
    for (let i = 0; i <= 100; i++) {
      const tiempo = i;
      // Usar la ecuación: T = C·e^(kt) + Tm
      const temp = C * Math.exp(k * tiempo) + Ta;
      t.push(tiempo);
      T.push(temp);
    }
  
    const trace = { x: t, y: T, type: "scatter", mode: "lines", name: "T(t)" };
    const layout = {
      title: "Enfriamiento de Newton - T(t) = C·e^(kt) + T<sub>m</sub>",
      xaxis: { title: "Tiempo (min)" },
      yaxis: { title: "Temperatura (°C)" },
    };
  
    Plotly.newPlot("grafica", [trace], layout);
  }
  
  function graficaPoblacion() {
    const P0 = parseFloat(document.getElementById("P0").value);
    const r = parseFloat(document.getElementById("r").value);
    const K = parseFloat(document.getElementById("K").value);
  
    const t = [];
    const P = [];
    for (let i = 0; i <= 100; i++) {
      const tiempo = i;
      const poblacion = K / (1 + ((K - P0) / P0) * Math.exp(-r * tiempo));
      t.push(tiempo);
      P.push(poblacion);
    }
  
    const trace = { x: t, y: P, type: "scatter", mode: "lines", name: "P(t)" };
    const layout = {
      title: "Crecimiento Poblacional Logístico",
      xaxis: { title: "Tiempo" },
      yaxis: { title: "Población" },
    };
  
    Plotly.newPlot("grafica", [trace], layout);
  }
  
  function graficaOfertaDemanda() {
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const c = parseFloat(document.getElementById("c").value);
    const d = parseFloat(document.getElementById("d").value);
    const k = parseFloat(document.getElementById("k").value);
  
    const P_e = (a - c) / (b + d);
    const P0 = 8; // Precio inicial fijo para este ejemplo
  
    const t = [];
    const P = [];
    for (let i = 0; i <= 50; i++) {
      const tiempo = i;
      const precio = P_e + (P0 - P_e) * Math.exp(-k * (b + d) * tiempo);
      t.push(tiempo);
      P.push(precio);
    }
  
    const trace = { x: t, y: P, type: "scatter", mode: "lines", name: "P(t)" };
    const layout = {
      title: "Ajuste de Precios",
      xaxis: { title: "Tiempo" },
      yaxis: { title: "Precio" },
    };
  
    Plotly.newPlot("grafica", [trace], layout);
  }
  
  function calcularInteres() {
    const P0 = parseFloat(document.getElementById("P0").value);
    const r = parseFloat(document.getElementById("r").value);
    const t = parseFloat(document.getElementById("t").value);
  
    const resultado = P0 * Math.exp(r * t);
    document.getElementById("resultado").innerHTML = `
      <p><b>Capital final:</b> $${resultado.toFixed(2)}</p>
    `;
  
    // Gráfica
    const tiempos = [];
    const capitales = [];
    for (let i = 0; i <= t; i++) {
      tiempos.push(i);
      capitales.push(P0 * Math.exp(r * i));
    }
  
    const trace = { x: tiempos, y: capitales, type: "scatter", mode: "lines", name: "P(t)" };
    const layout = {
      title: "Interés Compuesto Continuo",
      xaxis: { title: "Tiempo (años)" },
      yaxis: { title: "Capital ($)" },
    };
  
    Plotly.newPlot("grafica", [trace], layout);
  }
  
  function graficaMezclas() {
    const V0 = parseFloat(document.getElementById("V0").value);
    const c0 = parseFloat(document.getElementById("c0").value);
    const rIn = parseFloat(document.getElementById("rIn").value);
    const cIn = parseFloat(document.getElementById("cIn").value);
    const rOut = parseFloat(document.getElementById("rOut").value);
  
    const A0 = V0 * c0; // Cantidad inicial de sal
  
    const t = [];
    const A = []; // Cantidad de sal
    const C = []; // Concentración
  
    for (let i = 0; i <= 100; i++) {
      const tiempo = i;
      const volumen = V0 + (rIn - rOut) * tiempo;
      
      // Para simplificar, asumimos rIn = rOut (tanque de volumen constante)
      if (rIn === rOut) {
        const cantidad = A0 * Math.exp(-rOut * tiempo / V0);
        t.push(tiempo);
        A.push(cantidad);
        C.push(cantidad / V0);
      } else {
        // Para el caso general necesitaríamos resolver la ED completa
        t.push(tiempo);
        A.push(A0); // Placeholder
        C.push(c0); // Placeholder
      }
    }
  
    const trace1 = { x: t, y: A, type: "scatter", mode: "lines", name: "Cantidad de sal" };
    const trace2 = { x: t, y: C, type: "scatter", mode: "lines", name: "Concentración", yaxis: "y2" };
  
    const layout = {
      title: "Problema de Mezclas",
      xaxis: { title: "Tiempo (min)" },
      yaxis: { title: "Cantidad de sal (kg)", side: "left" },
      yaxis2: { title: "Concentración (kg/L)", side: "right", overlaying: "y" }
    };
  
    Plotly.newPlot("grafica", [trace1, trace2], layout);
  }
  
  function graficaEpidemias() {
    const S0 = parseFloat(document.getElementById("S0").value);
    const I0 = parseFloat(document.getElementById("I0").value);
    const R0 = parseFloat(document.getElementById("R0").value);
    const beta = parseFloat(document.getElementById("beta").value);
    const gamma = parseFloat(document.getElementById("gamma").value);
  
    // Simulación numérica simple del modelo SIR
    const dt = 0.1;
    const t = [];
    const S = [S0];
    const I = [I0];
    const R = [R0];
  
    t.push(0);
    
    for (let i = 1; i <= 200; i++) {
      const tiempo = i * dt;
      const s_prev = S[S.length - 1];
      const i_prev = I[I.length - 1];
      const r_prev = R[R.length - 1];
      
      const ds = -beta * s_prev * i_prev * dt;
      const di = (beta * s_prev * i_prev - gamma * i_prev) * dt;
      const dr = gamma * i_prev * dt;
      
      S.push(s_prev + ds);
      I.push(i_prev + di);
      R.push(r_prev + dr);
      t.push(tiempo);
    }
  
    const traceS = { x: t, y: S, type: "scatter", mode: "lines", name: "Susceptibles" };
    const traceI = { x: t, y: I, type: "scatter", mode: "lines", name: "Infectados" };
    const traceR = { x: t, y: R, type: "scatter", mode: "lines", name: "Recuperados" };
  
    const layout = {
      title: "Modelo SIR para Epidemias",
      xaxis: { title: "Tiempo (días)" },
      yaxis: { title: "Población" },
    };
  
    Plotly.newPlot("grafica", [traceS, traceI, traceR], layout);
  }
  
  function graficaCircuitos() {
    const V0 = parseFloat(document.getElementById("V0").value);
    const R = parseFloat(document.getElementById("R").value);
    const L = parseFloat(document.getElementById("L").value);
  
    const t = [];
    const I = [];
    for (let i = 0; i <= 50; i++) {
      const tiempo = i * 0.1;
      const corriente = (V0 / R) * (1 - Math.exp(-(R / L) * tiempo));
      t.push(tiempo);
      I.push(corriente);
    }
  
    const trace = { x: t, y: I, type: "scatter", mode: "lines", name: "i(t)" };
    const layout = {
      title: "Circuito RL",
      xaxis: { title: "Tiempo (s)" },
      yaxis: { title: "Corriente (A)" },
    };
  
    Plotly.newPlot("grafica", [trace], layout);
  }
  
  function graficaPendulo() {
    const theta0 = parseFloat(document.getElementById("theta0").value);
    const L = parseFloat(document.getElementById("L").value);
    const g = parseFloat(document.getElementById("g").value);
  
    const omega = Math.sqrt(g / L);
  
    const t = [];
    const theta = [];
    for (let i = 0; i <= 100; i++) {
      const tiempo = i * 0.1;
      const angulo = theta0 * Math.cos(omega * tiempo);
      t.push(tiempo);
      theta.push(angulo);
    }
  
    const trace = { x: t, y: theta, type: "scatter", mode: "lines", name: "θ(t)" };
    const layout = {
      title: "Péndulo Simple",
      xaxis: { title: "Tiempo (s)" },
      yaxis: { title: "Ángulo (rad)" },
    };
  
    Plotly.newPlot("grafica", [trace], layout);
  }
  
  function graficaArmonico() {
    const A = parseFloat(document.getElementById("A").value);
    const omega = parseFloat(document.getElementById("omega").value);
    const phi = parseFloat(document.getElementById("phi").value);
  
    const t = [];
    const x = [];
    for (let i = 0; i <= 100; i++) {
      const tiempo = i * 0.1;
      const posicion = A * Math.cos(omega * tiempo + phi);
      t.push(tiempo);
      x.push(posicion);
    }
  
    const trace = { x: t, y: x, type: "scatter", mode: "lines", name: "x(t)" };
    const layout = {
      title: "Movimiento Armónico Simple",
      xaxis: { title: "Tiempo (s)" },
      yaxis: { title: "Posición" },
    };
  
    Plotly.newPlot("grafica", [trace], layout);
  }
  
  // Función para filtrar el menú
  function filtrarMenu() {
    const searchTerm = document.getElementById("menu-search").value.toLowerCase();
    const menuItems = document.querySelectorAll("#menu-list li");
    
    menuItems.forEach(item => {
      const itemName = item.getAttribute("data-name").toLowerCase();
      if (itemName.includes(searchTerm)) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  }

  // Función para volver al inicio
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Mostrar/ocultar botón de volver al inicio
  window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  // Función para exportar gráfica como imagen
  function exportarGrafica(graficaId, nombre) {
    const grafica = document.getElementById(graficaId);
    if (!grafica) return;
    
    Plotly.downloadImage(grafica, {
      format: 'png',
      width: 1200,
      height: 600,
      filename: nombre || 'grafica'
    });
  }

  // Función para validar número positivo
  function validarNumeroPositivo(valor, nombre) {
    const num = parseFloat(valor);
    if (isNaN(num) || num <= 0) {
      mostrarError(`${nombre} debe ser un número positivo mayor que 0`);
      return false;
    }
    return true;
  }

  // Función para validar número (puede ser negativo)
  function validarNumero(valor, nombre) {
    const num = parseFloat(valor);
    if (isNaN(num)) {
      mostrarError(`${nombre} debe ser un número válido`);
      return false;
    }
    return true;
  }

  // Función para mostrar mensajes de error
  function mostrarError(mensaje) {
    // Crear o actualizar elemento de error
    let errorDiv = document.getElementById('error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.id = 'error-message';
      errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
      `;
      document.body.appendChild(errorDiv);
    }
    
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
    
    // Ocultar después de 4 segundos
    setTimeout(() => {
      errorDiv.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 300);
    }, 4000);
  }

  // Función para mostrar mensajes de éxito
  function mostrarExito(mensaje) {
    let successDiv = document.getElementById('success-message');
    if (!successDiv) {
      successDiv = document.createElement('div');
      successDiv.id = 'success-message';
      successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
      `;
      document.body.appendChild(successDiv);
    }
    
    successDiv.textContent = mensaje;
    successDiv.style.display = 'block';
    
    setTimeout(() => {
      successDiv.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        successDiv.style.display = 'none';
      }, 300);
    }, 3000);
  }

  // Inicialización
  document.addEventListener("DOMContentLoaded", function() {
    // Cargar la primera aplicación por defecto
    loadApp('enfriamiento');
    
    // Agregar botón de menú móvil
    const header = document.querySelector('header');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰ Menú';
    menuToggle.onclick = toggleMenu;
    header.appendChild(menuToggle);

    // Cerrar menú al hacer clic fuera en móvil
    document.addEventListener('click', function(event) {
      const menu = document.getElementById('menu');
      const menuToggle = document.querySelector('.menu-toggle');
      if (window.innerWidth <= 768 && 
          menu.classList.contains('active') && 
          !menu.contains(event.target) && 
          !menuToggle.contains(event.target)) {
        menu.classList.remove('active');
      }
    });
  });