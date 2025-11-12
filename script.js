// Estado global para almacenar datos entre aplicaciones
let appState = {
    enfriamiento: { T0: 90, Ta: 25, k: 0.1 },
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
    
    switch (app) {
      case "enfriamiento":
        cont.innerHTML = `
          <h2>Enfriamiento de Newton</h2>
          <p>El <b>enfriamiento de Newton</b> describe cómo la temperatura de un objeto cambia con el tiempo cuando se encuentra en un ambiente con temperatura constante. 
          La velocidad de enfriamiento es proporcional a la diferencia entre la temperatura del objeto y la del ambiente.</p>
  
          <h3>Ecuación diferencial</h3>
          <p>\\( \\frac{dT}{dt} = -k(T - T_a) \\)</p>
  
          <h3>Resolución paso a paso</h3>
          <ol>
            <li>Separar variables:
              $$ \\frac{dT}{T - T_a} = -k\\, dt $$
            </li>
            <li>Integrar ambos lados:
              $$ \\int \\frac{dT}{T - T_a} = -k \\int dt $$
            </li>
            <li>Se obtiene:
              $$ \\ln|T - T_a| = -kt + C $$
            </li>
            <li>Aplicando la exponencial:
              $$ T - T_a = Ce^{-kt} $$
            </li>
            <li>Usando la condición inicial \\( T(0) = T_0 \\):
              $$ C = T_0 - T_a $$
            </li>
            <li>Finalmente:
              $$ T(t) = T_a + (T_0 - T_a)e^{-kt} $$
            </li>
          </ol>
  
          <div class="ejemplo">
            <h4>Ejemplo práctico</h4>
            <p>Un café recién preparado está a 90°C. La habitación está a 25°C. Si después de 10 minutos el café está a 60°C, ¿a qué temperatura estará después de 20 minutos?</p>
            <p>Solución: Primero calculamos k usando los datos: 60 = 25 + (90-25)e^(-10k) → k ≈ 0.051. Luego, T(20) = 25 + 65e^(-0.051*20) ≈ 43.5°C.</p>
          </div>
  
          <h3>Simulador interactivo</h3>
          <div class="form-group">
            <label>Temperatura inicial (T₀): <input id="T0" type="number" value="${appState.enfriamiento.T0}"></label>
            <label>Temperatura ambiente (Ta): <input id="Ta" type="number" value="${appState.enfriamiento.Ta}"></label>
            <label>Constante de enfriamiento (k): <input id="k" type="number" value="${appState.enfriamiento.k}" step="0.01"></label>
            <button onclick="graficaEnfriamiento()">Graficar</button>
          </div>
          <div id="grafica" class="grafica-container"></div>
        `;
        graficaEnfriamiento();
        break;
  
      case "poblacion":
        cont.innerHTML = `
          <h2>Crecimiento Poblacional</h2>
          <p>El <b>modelo logístico</b> describe cómo una población crece inicialmente de forma exponencial pero se estabiliza debido a limitaciones de recursos.</p>
  
          <h3>Ecuación diferencial</h3>
          <p>\\( \\frac{dP}{dt} = rP \\left(1 - \\frac{P}{K}\\right) \\)</p>
  
          <h3>Solución</h3>
          <p>\\( P(t) = \\frac{K}{1 + \\left(\\frac{K - P_0}{P_0}\\right)e^{-rt}} \\)</p>
  
          <div class="ejemplo">
            <h4>Ejemplo práctico</h4>
            <p>Una población de bacterias en un laboratorio tiene una capacidad de carga de 1000 individuos. Si inicialmente hay 100 bacterias y la tasa de crecimiento es del 10% por hora, ¿cuántas bacterias habrá después de 24 horas?</p>
            <p>Solución: P(24) = 1000 / (1 + ((1000-100)/100)e^(-0.1*24)) ≈ 917 bacterias.</p>
          </div>
  
          <h3>Simulador interactivo</h3>
          <div class="form-group">
            <label>Población inicial (P₀): <input id="P0" type="number" value="${appState.poblacion.P0}"></label>
            <label>Tasa de crecimiento (r): <input id="r" type="number" value="${appState.poblacion.r}" step="0.01"></label>
            <label>Capacidad de carga (K): <input id="K" type="number" value="${appState.poblacion.K}"></label>
            <button onclick="graficaPoblacion()">Graficar</button>
          </div>
          <div id="grafica" class="grafica-container"></div>
        `;
        graficaPoblacion();
        break;
  
      case "ofertaDemanda":
        cont.innerHTML = `
          <h2>Oferta y Demanda</h2>
          <p>El <b>modelo de ajuste de precios</b> describe cómo el precio de un producto cambia en función del desequilibrio entre oferta y demanda.</p>
  
          <h3>Ecuación diferencial</h3>
          <p>\\( \\frac{dP}{dt} = k(D(P) - S(P)) \\)</p>
          <p>Donde D(P) = a - bP (demanda) y S(P) = c + dP (oferta)</p>
  
          <h3>Solución</h3>
          <p>\\( P(t) = P_e + (P_0 - P_e)e^{-k(b+d)t} \\)</p>
          <p>Donde P_e = (a - c)/(b + d) es el precio de equilibrio</p>
  
          <div class="ejemplo">
            <h4>Ejemplo práctico</h4>
            <p>Un producto tiene una función de demanda D(P) = 10 - 0.5P y una función de oferta S(P) = 5 + 0.3P. Si el precio inicial es 8 unidades y la constante de ajuste es 0.2, ¿cuál será el precio después de 5 períodos?</p>
            <p>Solución: P_e = (10-5)/(0.5+0.3) = 6.25. P(5) = 6.25 + (8-6.25)e^(-0.2*(0.5+0.3)*5) ≈ 6.79.</p>
          </div>
  
          <h3>Simulador interactivo</h3>
          <div class="form-group">
            <label>Parámetro a (demanda): <input id="a" type="number" value="${appState.ofertaDemanda.a}" step="0.1"></label>
            <label>Parámetro b (demanda): <input id="b" type="number" value="${appState.ofertaDemanda.b}" step="0.1"></label>
            <label>Parámetro c (oferta): <input id="c" type="number" value="${appState.ofertaDemanda.c}" step="0.1"></label>
            <label>Parámetro d (oferta): <input id="d" type="number" value="${appState.ofertaDemanda.d}" step="0.1"></label>
            <label>Constante de ajuste (k): <input id="k" type="number" value="0.2" step="0.01"></label>
            <button onclick="graficaOfertaDemanda()">Graficar</button>
          </div>
          <div id="grafica" class="grafica-container"></div>
        `;
        graficaOfertaDemanda();
        break;
  
      case "interes":
        cont.innerHTML = `
          <h2>Interés Compuesto Continuo</h2>
          <p>El <b>interés compuesto continuo</b> modela el crecimiento de una inversión cuando el interés se capitaliza continuamente.</p>
  
          <h3>Ecuación diferencial</h3>
          <p>\\( \\frac{dP}{dt} = rP \\)</p>
  
          <h3>Solución</h3>
          <p>\\( P(t) = P_0 e^{rt} \\)</p>
  
          <div class="ejemplo">
            <h4>Ejemplo práctico</h4>
            <p>Si inviertes $1000 a una tasa de interés del 5% compuesto continuamente, ¿cuánto tendrás después de 10 años?</p>
            <p>Solución: P(10) = 1000 * e^(0.05*10) ≈ $1648.72.</p>
          </div>
  
          <h3>Simulador interactivo</h3>
          <div class="form-group">
            <label>Capital inicial (P₀): <input id="P0" type="number" value="${appState.interes.P0}"></label>
            <label>Tasa de interés (r): <input id="r" type="number" value="${appState.interes.r}" step="0.01"></label>
            <label>Tiempo (t): <input id="t" type="number" value="${appState.interes.t}"></label>
            <button onclick="calcularInteres()">Calcular</button>
          </div>
          <div id="resultado"></div>
          <div id="grafica" class="grafica-container"></div>
        `;
        calcularInteres();
        break;
  
      case "mezclas":
        cont.innerHTML = `
          <h2>Problemas de Mezclas</h2>
          <p>Este modelo describe la concentración de una sustancia en un tanque donde entra y sale líquido a diferentes tasas.</p>
  
          <h3>Ecuación diferencial</h3>
          <p>\\( \\frac{dA}{dt} = r_{in}c_{in} - \\frac{r_{out}}{V(t)}A \\)</p>
          <p>Donde V(t) = V₀ + (r_in - r_out)t</p>
  
          <div class="ejemplo">
            <h4>Ejemplo práctico</h4>
            <p>Un tanque contiene 100 litros de agua con 50 kg de sal. Entra agua pura a 2 L/min y sale la mezcla a 2 L/min. ¿Cuánta sal queda después de 30 minutos?</p>
            <p>Solución: A(t) = 50e^(-2t/100) = 50e^(-0.02t). A(30) = 50e^(-0.6) ≈ 27.4 kg.</p>
          </div>
  
          <h3>Simulador interactivo</h3>
          <div class="form-group">
            <label>Volumen inicial (V₀): <input id="V0" type="number" value="${appState.mezclas.V0}"></label>
            <label>Concentración inicial (c₀): <input id="c0" type="number" value="${appState.mezclas.c0}" step="0.1"></label>
            <label>Tasa de entrada (r_in): <input id="rIn" type="number" value="${appState.mezclas.rIn}" step="0.1"></label>
            <label>Concentración de entrada (c_in): <input id="cIn" type="number" value="${appState.mezclas.cIn}" step="0.1"></label>
            <label>Tasa de salida (r_out): <input id="rOut" type="number" value="${appState.mezclas.rOut}" step="0.1"></label>
            <button onclick="graficaMezclas()">Graficar</button>
          </div>
          <div id="grafica" class="grafica-container"></div>
        `;
        graficaMezclas();
        break;
  
      case "epidemias":
        cont.innerHTML = `
          <h2>Modelo SIR para Epidemias</h2>
          <p>El <b>modelo SIR</b> divide la población en Susceptibles, Infectados y Recuperados para modelar la propagación de enfermedades.</p>
  
          <h3>Ecuaciones diferenciales</h3>
          <p>
            $$ \\frac{dS}{dt} = -\\beta SI $$
            $$ \\frac{dI}{dt} = \\beta SI - \\gamma I $$
            $$ \\frac{dR}{dt} = \\gamma I $$
          </p>
  
          <div class="ejemplo">
            <h4>Ejemplo práctico</h4>
            <p>En una población de 1000 personas, hay 10 infectados inicialmente. Si β = 0.3 y γ = 0.1, ¿cuál será el pico de infectados y cuándo ocurrirá?</p>
            <p>Solución: El pico ocurre cuando dI/dt = 0, aproximadamente a los 20 días con 300 infectados.</p>
          </div>
  
          <h3>Simulador interactivo</h3>
          <div class="form-group">
            <label>Susceptibles iniciales (S₀): <input id="S0" type="number" value="${appState.epidemias.S0}"></label>
            <label>Infectados iniciales (I₀): <input id="I0" type="number" value="${appState.epidemias.I0}"></label>
            <label>Recuperados iniciales (R₀): <input id="R0" type="number" value="${appState.epidemias.R0}"></label>
            <label>Tasa de contagio (β): <input id="beta" type="number" value="${appState.epidemias.beta}" step="0.01"></label>
            <label>Tasa de recuperación (γ): <input id="gamma" type="number" value="${appState.epidemias.gamma}" step="0.01"></label>
            <button onclick="graficaEpidemias()">Graficar</button>
          </div>
          <div id="grafica" class="grafica-container"></div>
        `;
        graficaEpidemias();
        break;
  
      case "circuitos":
        cont.innerHTML = `
          <h2>Circuitos Eléctricos RL</h2>
          <p>Este modelo describe la corriente en un circuito RL (resistencia-inductancia) cuando se aplica un voltaje constante.</p>
  
          <h3>Ecuación diferencial</h3>
          <p>\\( L\\frac{di}{dt} + Ri = V \\)</p>
  
          <h3>Solución</h3>
          <p>\\( i(t) = \\frac{V}{R}(1 - e^{-(R/L)t}) \\)</p>
  
          <div class="ejemplo">
            <h4>Ejemplo práctico</h4>
            <p>Un circuito RL tiene R=4Ω, L=1H y V=12V. ¿Cuál será la corriente después de 0.5 segundos?</p>
            <p>Solución: i(0.5) = (12/4)(1 - e^(-4*0.5)) = 3(1 - e^(-2)) ≈ 2.59 A.</p>
          </div>
  
          <h3>Simulador interactivo</h3>
          <div class="form-group">
            <label>Voltaje (V): <input id="V0" type="number" value="${appState.circuitos.V0}" step="0.1"></label>
            <label>Resistencia (R): <input id="R" type="number" value="${appState.circuitos.R}" step="0.1"></label>
            <label>Inductancia (L): <input id="L" type="number" value="${appState.circuitos.L}" step="0.1"></label>
            <button onclick="graficaCircuitos()">Graficar</button>
          </div>
          <div id="grafica" class="grafica-container"></div>
        `;
        graficaCircuitos();
        break;
  
      case "pendulo":
        cont.innerHTML = `
          <h2>Péndulo Simple</h2>
          <p>El <b>péndulo simple</b> describe el movimiento oscilatorio de una masa suspendida cuando las oscilaciones son pequeñas.</p>
  
          <h3>Ecuación diferencial</h3>
          <p>\\( \\frac{d^2\\theta}{dt^2} + \\frac{g}{L}\\theta = 0 \\)</p>
  
          <h3>Solución</h3>
          <p>\\( \\theta(t) = \\theta_0 \\cos\\left(\\sqrt{\\frac{g}{L}} t\\right) \\)</p>
  
          <div class="ejemplo">
            <h4>Ejemplo práctico</h4>
            <p>Un péndulo de 1 metro de longitud se desplaza 0.5 radianes y se suelta. ¿Cuál será su posición después de 1 segundo?</p>
            <p>Solución: θ(1) = 0.5 * cos(√(9.8/1)*1) = 0.5 * cos(3.13) ≈ -0.5 radianes.</p>
          </div>
  
          <h3>Simulador interactivo</h3>
          <div class="form-group">
            <label>Ángulo inicial (θ₀): <input id="theta0" type="number" value="${appState.pendulo.theta0}" step="0.1"></label>
            <label>Longitud (L): <input id="L" type="number" value="${appState.pendulo.L}" step="0.1"></label>
            <label>Gravedad (g): <input id="g" type="number" value="${appState.pendulo.g}" step="0.1"></label>
            <button onclick="graficaPendulo()">Graficar</button>
          </div>
          <div id="grafica" class="grafica-container"></div>
        `;
        graficaPendulo();
        break;
  
      case "armonico":
        cont.innerHTML = `
          <h2>Movimiento Armónico Simple</h2>
          <p>El <b>movimiento armónico simple</b> describe el movimiento oscilatorio de sistemas como resortes o péndulos con pequeñas oscilaciones.</p>
  
          <h3>Ecuación diferencial</h3>
          <p>\\( \\frac{d^2x}{dt^2} + \\omega^2 x = 0 \\)</p>
  
          <h3>Solución</h3>
          <p>\\( x(t) = A \\cos(\\omega t + \\phi) \\)</p>
  
          <div class="ejemplo">
            <h4>Ejemplo práctico</h4>
            <p>Un resorte con constante k=4 N/m tiene una masa de 1 kg. Si se estira 0.1 m y se suelta, ¿cuál será su posición después de 2 segundos?</p>
            <p>Solución: ω = √(k/m) = √4 = 2 rad/s. x(2) = 0.1 * cos(2*2) = 0.1 * cos(4) ≈ -0.065 m.</p>
          </div>
  
          <h3>Simulador interactivo</h3>
          <div class="form-group">
            <label>Amplitud (A): <input id="A" type="number" value="${appState.armonico.A}" step="0.1"></label>
            <label>Frecuencia angular (ω): <input id="omega" type="number" value="${appState.armonico.omega}" step="0.1"></label>
            <label>Fase inicial (φ): <input id="phi" type="number" value="${appState.armonico.phi}" step="0.1"></label>
            <button onclick="graficaArmonico()">Graficar</button>
          </div>
          <div id="grafica" class="grafica-container"></div>
        `;
        graficaArmonico();
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
  
    const t = [];
    const T = [];
    for (let i = 0; i <= 100; i++) {
      const tiempo = i;
      const temp = Ta + (T0 - Ta) * Math.exp(-k * tiempo);
      t.push(tiempo);
      T.push(temp);
    }
  
    const trace = { x: t, y: T, type: "scatter", mode: "lines", name: "T(t)" };
    const layout = {
      title: "Enfriamiento de Newton",
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
  });