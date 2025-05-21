import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

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
    // Crear el array de piezas ordenadas
    const piezasIniciales = [];
    for (let i = 0; i < numFilas * numColumnas; i++) {
      const fila = Math.floor(i / numColumnas);
      const columna = i % numColumnas;
      
      piezasIniciales.push({
        id: i,
        posicionActual: i,
        posX: columna * anchoFicha,
        posY: fila * altoFicha
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
        // Lanzar confetti
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        // Mostrar celebración
        setMostrarCelebracion(true);
      }, 500);
    }
  };
  
  // Renderizar el componente
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
      <h2 className="text-3xl font-bold mb-6 text-pink-600">Completa el Puzzle de Cumpleaños</h2>
      
      <div className="relative w-full max-w-xs mb-8">
        {/* Tablero del puzzle - reducido el ancho máximo */}
        <div className="w-full mx-auto aspect-square p-3 bg-pink-100 rounded-xl border-4 border-pink-300 shadow-lg"
              style={{ maxWidth: puzzleWidth + 16 + 'px' }}>
          <div className="relative mx-auto" style={{ width: puzzleWidth + 'px', height: puzzleHeight + 'px' }}>
            {Array.from({ length: 9 }).map((_, posicion) => {
              // Encontrar qué pieza está en esta posición
              const pieza = piezas.find(p => p.posicionActual === posicion);
              const estaSeleccionada = piezaSeleccionada === posicion;
              
              if (!pieza) return null;

              const fila = Math.floor(posicion / numColumnas);
              const columna = posicion % numColumnas;
              
              // Calcular la posición de visualización
              const posX = columna * anchoFicha;
              const posY = fila * altoFicha;
              
              // Calcular qué parte de la imagen mostrar
              const pieceRow = Math.floor(pieza.id / numColumnas);
              const pieceCol = pieza.id % numColumnas;
              
              const imagePosX = pieceCol * anchoFicha;
              const imagePosY = pieceRow * altoFicha;
              
              return (
                <div 
                  key={posicion}
                  onClick={() => seleccionarPieza(posicion)}
                  className={`absolute border border-white overflow-hidden transition-all duration-300 ${estaSeleccionada ? 'z-10 transform scale-105 shadow-lg' : 'z-0'}`}
                  style={{
                    left: posX + 'px',
                    top: posY + 'px',
                    width: anchoFicha + 'px',
                    height: altoFicha + 'px'
                  }}
                >
                  {/* Aquí está la corrección principal - ajustamos el tamaño y posición de la imagen */}
                  <div 
                    className="absolute"
                    style={{
                      width: anchoFicha + 'px',
                      height: altoFicha + 'px',
                      backgroundImage: 'url("src/assets/puzzleBase.jpg")',
                      backgroundSize: `${puzzleWidth}px ${puzzleHeight}px`,
                      backgroundPosition: `-${imagePosX}px -${imagePosY}px`,
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
        <div className="mt-6 mx-auto">
          <div className="relative w-24 h-24 mx-auto mb-2 rounded-lg overflow-hidden">
            <img 
              src="src/assets/puzzleBase.jpg" 
              alt="Imagen objetivo" 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-white ${completado ? 'opacity-0' : 'opacity-30'} transition-opacity duration-500`}></div>
          </div>
          <p className="text-center text-pink-600 font-bold">Imagen objetivo</p>
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
      <div className="text-pink-700 mb-4 text-center italic">
        {piezaSeleccionada !== null 
          ? "¡Ahora selecciona otra pieza para intercambiarlas!" 
          : "Selecciona una pieza para moverla"}
      </div>
      
      {/* Botón para reiniciar */}
      <button
        onClick={mezclarPiezas}
        className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reiniciar Puzzle
      </button>
      
      {/* Añadir iconos decorativos */}
      <div className="fixed top-10 left-10 w-12 h-12 pointer-events-none opacity-80">
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M50,10 C80,20 80,80 50,90 C20,80 20,20 50,10 Z" fill="#FF9AAC" />
          <circle cx="35" cy="40" r="5" fill="#555" />
          <circle cx="65" cy="40" r="5" fill="#555" />
          <path d="M40,60 Q50,70 60,60" fill="none" stroke="#555" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      
      <div className="fixed bottom-10 right-10 w-12 h-12 pointer-events-none opacity-80">
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M50,10 C80,20 80,80 50,90 C20,80 20,20 50,10 Z" fill="#FFBBC3" />
          <circle cx="35" cy="40" r="5" fill="#555" />
          <circle cx="65" cy="40" r="5" fill="#555" />
          <path d="M35,60 Q50,70 65,60" fill="none" stroke="#555" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      
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