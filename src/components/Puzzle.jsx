import { useState, useEffect } from 'react';

// Componente principal
export default function PuzzleImagen() {
  // Estado para las piezas del puzzle
  const [piezas, setPiezas] = useState([]);
  // Estado para comprobar si el puzzle está completo
  const [completado, setCompletado] = useState(false);
  // Estado para la animación de celebración
  const [mostrarCelebracion, setMostrarCelebracion] = useState(false);
  // Estado para la pieza seleccionada actualmente
  const [piezaSeleccionada, setPiezaSeleccionada] = useState(null);
  
  // Número de filas y columnas del puzzle
  const numFilas = 3;
  const numColumnas = 3;
  
  // Tamaño del puzzle completo - reducido para que no sea tan ancho
  const puzzleWidth = 240;
  const puzzleHeight = 240;
  
  // Tamaño de cada pieza
  const anchoFicha = puzzleWidth / numColumnas;
  const altoFicha = puzzleHeight / numFilas;
  
  // Inicializar el puzzle
  useEffect(() => {
    mezclarPiezas();
  }, []);
  
  // Función para mezclar las piezas del puzzle
  const mezclarPiezas = () => {
    console.log('Mezclando piezas...'); // Debug
    // Crear el array de piezas ordenadas
    const piezasIniciales = [];
    for (let i = 0; i < numFilas * numColumnas; i++) {
      piezasIniciales.push({
        id: i,
        posicionActual: i
      });
    }
    
    // Mezclar las piezas de forma aleatoria pero asegurando que no quede resuelto
    let piezasMezcladas;
    do {
      piezasMezcladas = [...piezasIniciales];
      for (let i = piezasMezcladas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [piezasMezcladas[i].posicionActual, piezasMezcladas[j].posicionActual] = 
        [piezasMezcladas[j].posicionActual, piezasMezcladas[i].posicionActual];
      }
      // Verificar que no esté ya resuelto
      const estaResuelto = piezasMezcladas.every(pieza => pieza.id === pieza.posicionActual);
      if (!estaResuelto) break;
    } while (true);
    
    setPiezas(piezasMezcladas);
    setCompletado(false);
    setMostrarCelebracion(false);
    setPiezaSeleccionada(null);
    console.log('Piezas mezcladas:', piezasMezcladas); // Debug
  };
  
  // Función para seleccionar una pieza
  const seleccionarPieza = (index) => {
    if (completado) return;
    
    if (piezaSeleccionada === null) {
      // Primera selección
      setPiezaSeleccionada(index);
    } else {
      // Segunda selección - intercambiar piezas
      if (piezaSeleccionada !== index) {
        intercambiarPiezas(piezaSeleccionada, index);
      }
      // Resetear selección
      setPiezaSeleccionada(null);
    }
  };
  
  // Función para intercambiar dos piezas
  const intercambiarPiezas = (indice1, indice2) => {
    // Crear una copia del array de piezas
    const nuevasPiezas = [...piezas];
    
    // Encontrar las piezas a intercambiar
    const pieza1 = nuevasPiezas.find(p => p.posicionActual === indice1);
    const pieza2 = nuevasPiezas.find(p => p.posicionActual === indice2);
    
    // Intercambiar posiciones
    [pieza1.posicionActual, pieza2.posicionActual] = [pieza2.posicionActual, pieza1.posicionActual];
    
    // Actualizar el estado
    setPiezas(nuevasPiezas);
    
    // Comprobar si el puzzle está completo
    comprobarPuzzleCompleto(nuevasPiezas);
  };
  
  // Comprobar si el puzzle está completo
  const comprobarPuzzleCompleto = (piezasActuales) => {
    const estaCompleto = piezasActuales.every(pieza => pieza.id === pieza.posicionActual);
    
    if (estaCompleto && !completado) {
      setCompletado(true);
      setTimeout(() => {
        // Mostrar celebración
        setMostrarCelebracion(true);
      }, 500);
    }
  };
  
  // Renderizar el componente
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 m-6 rounded-xl w-[50%]">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-pink-600 text-center">
        Completa el Puzzle de Cumpleaños
      </h2>
      
      <div className="relative w-full max-w-[280px] sm:max-w-xs mb-6 sm:mb-8">
        {/* Tablero del puzzle - mejorado para móviles */}
        <div className="w-full mx-auto aspect-square p-2 sm:p-3 bg-pink-100 rounded-xl border-4 border-pink-300 shadow-lg">
          <div className="relative mx-auto" style={{ width: '100%', aspectRatio: '1/1' }}>
            {Array.from({ length: 9 }).map((_, posicion) => {
              // Encontrar qué pieza está en esta posición
              const pieza = piezas.find(p => p.posicionActual === posicion);
              const estaSeleccionada = piezaSeleccionada === posicion;
              
              if (!pieza) return null;

              const fila = Math.floor(posicion / numColumnas);
              const columna = posicion % numColumnas;
              
              // Calcular la posición de visualización en porcentajes
              const posX = (columna * 100) / numColumnas;
              const posY = (fila * 100) / numFilas;
              const anchoPercent = 100 / numColumnas;
              const altoPercent = 100 / numFilas;
              
              // Calcular qué parte de la imagen original mostrar (basado en el ID de la pieza)
              const pieceRow = Math.floor(pieza.id / numColumnas);
              const pieceCol = pieza.id % numColumnas;
              
              // Posición de la imagen en porcentajes (0-100%)
              const imagePosX = (pieceCol * 100) / (numColumnas - 1);
              const imagePosY = (pieceRow * 100) / (numFilas - 1);
              
              return (
                <div 
                  key={posicion}
                  onClick={() => seleccionarPieza(posicion)}
                  className={`absolute border border-white overflow-hidden transition-all duration-300 cursor-pointer ${estaSeleccionada ? 'z-10 transform scale-105 shadow-lg' : 'z-0'}`}
                  style={{
                    left: posX + '%',
                    top: posY + '%',
                    width: anchoPercent + '%',
                    height: altoPercent + '%'
                  }}
                >
                  {/* Imagen corregida */}
                  <div 
                    className="absolute w-full h-full"
                    style={{
                      backgroundImage: 'url("src/assets/puzzleBase.jpg")',
                      backgroundSize: '300% 300%',
                      backgroundPosition: `${imagePosX}% ${imagePosY}%`,
                      backgroundRepeat: 'no-repeat',
                      transform: estaSeleccionada ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.3s'
                    }}
                  >
                    {/* Efecto destacado cuando está seleccionada */}
                    {estaSeleccionada && (
                      <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Imagen de referencia */}
        <div className="mt-4 sm:mt-6 mx-auto">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2 rounded-lg overflow-hidden">
            <img 
              src="src/assets/puzzleBase.jpg" 
              alt="Imagen objetivo" 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-white ${completado ? 'opacity-0' : 'opacity-30'} transition-opacity duration-500`}></div>
          </div>
          <p className="text-center text-pink-600 font-bold text-sm sm:text-base">Imagen objetivo</p>
        </div>
        
        {/* Animación de celebración */}
        {mostrarCelebracion && (
          <div className="absolute inset-0 flex items-center justify-center bg-pink-100 bg-opacity-90 animate-fade-in rounded-lg z-20">
            <div className="text-center transform animate-bounce-slow">
              <div className="text-4xl font-bold text-pink-600 mb-2">¡FELIZ CUMPLEAÑOS!</div>
              <div className="text-xl text-pink-700">Has completado el puzzle</div>
              <div className="mt-4">
                <span className="text-4xl">🎂✨</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Mensaje de instrucción */}
      <div className="text-pink-700 mb-4 text-center italic text-sm sm:text-base px-4">
        {piezaSeleccionada !== null 
          ? "¡Ahora selecciona otra pieza para intercambiarlas!" 
          : "Selecciona una pieza para moverla"}
      </div>
      
      {/* Botón para reiniciar - corregido con handler inline */}
      <button
        style={{ zIndex: 50 }}
        onClick={(e) => {
          e.preventDefault();
          mezclarPiezas();
        }}
        className="px-4 sm:px-6 py-2 bg-pink-500 text-white text-sm sm:text-base rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reiniciar Puzzle
      </button>
      
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-8px); }
          50% { transform: translateY(8px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-in forwards;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}