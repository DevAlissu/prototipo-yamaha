import React, { useState } from 'react';
import './ZoneMap.css';

interface ZoneMapProps {
  highlightedZone?: number;
  showHeatMap?: boolean;
  heatMapPosition?: { x: number; y: number };
  iotActive?: boolean;
}

const ZoneMap: React.FC<ZoneMapProps> = ({
  highlightedZone,
  showHeatMap = false,
  heatMapPosition = { x: 400, y: 300 },
  iotActive = false
}) => {
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);

  const zones = [
    {
      id: 1,
      name: "ZONA 1",
      path: "M 20 300 L 270 300 L 270 470 L 20 470 Z",
      neutralColor: "#f5f5f5"
    },
    {
      id: 2,
      name: "ZONA 2", 
      path: "M 650 20 L 980 20 L 980 220 L 650 220 Z",
      neutralColor: "#f5f5f5"
    },
    {
      id: 3,
      name: "ZONA 3",
      path: "M 650 240 L 980 240 L 980 400 L 650 400 Z", 
      neutralColor: "#f5f5f5"
    },
    {
      id: 4,
      name: "ZONA 4",
      path: "M 650 420 L 980 420 L 980 480 L 650 480 Z",
      neutralColor: "#f5f5f5"
    }
  ];

  const getZoneStyle = (zone: any) => {
    const isHighlighted = highlightedZone === zone.id;
    const isHovered = hoveredZone === zone.id;
    
    
    return {
      fill: isHighlighted ? '#C8E6C9' : isHovered ? '#e0e0e0' : zone.neutralColor,
      stroke: isHighlighted ? '#81C784' : '#bdbdbd',
      strokeWidth: isHighlighted ? 3 : 1,
      opacity: 1,
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    };
  };

  return (
    <div className="zone-map-container">
      <svg 
        width="1000" 
        height="600" 
        viewBox="0 0 1000 600"
        className="zone-map-svg"
      >
        {/* Background */}
        <rect 
          x="0" 
          y="0" 
          width="1000" 
          height="600" 
          fill="#f8f9fa" 
          stroke="#333" 
          strokeWidth="3"
        />

        {/* ZONA 1 - Canto inferior esquerdo (pequena) */}
        <g>
          <rect 
            x="20" 
            y="450" 
            width="150" 
            height="130"
            fill={highlightedZone === 1 ? '#C8E6C9' : '#f5f5f5'}
            stroke={highlightedZone === 1 ? '#81C784' : '#333'}
            strokeWidth="2"
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={() => setHoveredZone(1)}
            onMouseLeave={() => setHoveredZone(null)}
          />
          <text x="95" y="520" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">ZONA 1</text>
          {/* Motosinhas na Zona 1 */}
          <g fill="#666" fontSize="8">
            <text x="40" y="470">🏍️</text>
            <text x="70" y="470">🏍️</text>
            <text x="100" y="470">🏍️</text>
            <text x="130" y="470">🏍️</text>
            <text x="40" y="490">🏍️</text>
            <text x="70" y="490">🏍️</text>
            <text x="100" y="490">🏍️</text>
            <text x="130" y="490">🏍️</text>
          </g>
        </g>

        {/* ZONA 2 - Superior direita (grande) */}
        <g>
          <rect 
            x="520" 
            y="20" 
            width="350" 
            height="200"
            fill={highlightedZone === 2 ? '#C8E6C9' : '#f5f5f5'}
            stroke={highlightedZone === 2 ? '#81C784' : '#333'}
            strokeWidth="2"
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={() => setHoveredZone(2)}
            onMouseLeave={() => setHoveredZone(null)}
          />
          <text x="695" y="125" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">ZONA 2</text>
          {/* Grid de motosinhas na Zona 2 */}
          <g fill="#666" fontSize="8">
            {[...Array(6)].map((_, row) => (
              [...Array(12)].map((_, col) => (
                <text key={`z2-${row}-${col}`} x={540 + col * 25} y={50 + row * 25}>🏍️</text>
              ))
            ))}
          </g>
        </g>

        {/* ZONA 3 - Centro direita (grande) */}
        <g>
          <rect 
            x="520" 
            y="240" 
            width="350" 
            height="180"
            fill={highlightedZone === 3 ? '#C8E6C9' : '#f5f5f5'}
            stroke={highlightedZone === 3 ? '#81C784' : '#333'}
            strokeWidth="2"
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={() => setHoveredZone(3)}
            onMouseLeave={() => setHoveredZone(null)}
          />
          <text x="695" y="335" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">ZONA 3</text>
          {/* Grid de motosinhas na Zona 3 */}
          <g fill="#666" fontSize="8">
            {[...Array(5)].map((_, row) => (
              [...Array(12)].map((_, col) => (
                <text key={`z3-${row}-${col}`} x={540 + col * 25} y={260 + row * 25}>🏍️</text>
              ))
            ))}
          </g>
        </g>

        {/* ZONA 4 - Inferior centro-direita */}
        <g>
          <rect 
            x="520" 
            y="440" 
            width="200" 
            height="120"
            fill={highlightedZone === 4 ? '#C8E6C9' : '#f5f5f5'}
            stroke={highlightedZone === 4 ? '#81C784' : '#333'}
            strokeWidth="2"
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={() => setHoveredZone(4)}
            onMouseLeave={() => setHoveredZone(null)}
          />
          <text x="620" y="505" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">ZONA 4</text>
          {/* Motosinhas na Zona 4 */}
          <g fill="#666" fontSize="8">
            {[...Array(3)].map((_, row) => (
              [...Array(6)].map((_, col) => (
                <text key={`z4-${row}-${col}`} x={540 + col * 25} y={460 + row * 25}>🏍️</text>
              ))
            ))}
          </g>
        </g>

        {/* ZONA 5 - Canto direito */}
        <g>
          <rect 
            x="890" 
            y="20" 
            width="90" 
            height="540"
            fill={highlightedZone === 5 ? '#C8E6C9' : '#f5f5f5'}
            stroke={highlightedZone === 5 ? '#81C784' : '#333'}
            strokeWidth="2"
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={() => setHoveredZone(5)}
            onMouseLeave={() => setHoveredZone(null)}
          />
          <text x="935" y="300" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333" transform="rotate(-90 935 300)">ZONA 5</text>
          {/* Motosinhas verticais na Zona 5 */}
          <g fill="#666" fontSize="8">
            {[...Array(20)].map((_, i) => (
              <text key={`z5-${i}`} x={910} y={40 + i * 25}>🏍️</text>
            ))}
          </g>
        </g>

        {/* Almoxarifado */}
        <rect x="20" y="20" width="120" height="100" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="2"/>
        <text x="80" y="75" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#666">Almoxarifado</text>

        {/* Área Estoque/Revisão */}
        <rect x="20" y="140" width="150" height="120" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="2"/>
        <text x="95" y="205" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#666">ESTOQUE</text>

        {/* Área técnica - esquerda meio-baixo */}
        <rect x="20" y="280" width="150" height="150" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="2"/>
        <text x="95" y="360" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#666">TÉCNICA</text>

        {/* Corredor Central Vertical */}
        <rect x="190" y="20" width="60" height="540" fill="#fafafa" stroke="#333" strokeWidth="2"/>
        <text x="220" y="290" textAnchor="middle" fontSize="10" fill="#666" transform="rotate(-90 220 290)">CORREDOR CENTRAL</text>

        {/* Corredor Central parte 2 */}
        <rect x="270" y="20" width="60" height="540" fill="#fafafa" stroke="#333" strokeWidth="2"/>

        {/* Área Central - Kit/Supply */}
        <rect x="350" y="20" width="150" height="180" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="2"/>
        <text x="425" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#666">KIT SUPPLY</text>

        {/* Área Solda/Conexão */}
        <rect x="350" y="220" width="150" height="100" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="2"/>
        <text x="425" y="275" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#666">SOLDA</text>

        {/* Linha C - Inferior */}
        <rect x="350" y="340" width="150" height="80" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="2"/>
        <text x="425" y="385" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#666">LINHA C</text>

        {/* Conexão entre galpões */}
        <rect x="350" y="440" width="150" height="120" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="2"/>
        <text x="425" y="505" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#666">Conexão Galpões</text>

        {/* Linhas divisórias principais */}
        <line x1="180" y1="20" x2="180" y2="580" stroke="#333" strokeWidth="2"/>
        <line x1="340" y1="20" x2="340" y2="580" stroke="#333" strokeWidth="2"/>
        <line x1="510" y1="20" x2="510" y2="580" stroke="#333" strokeWidth="2"/>
        <line x1="880" y1="20" x2="880" y2="580" stroke="#333" strokeWidth="2"/>

        {/* Divisórias internas */}
        <line x1="520" y1="230" x2="870" y2="230" stroke="#333" strokeWidth="1"/>
        <line x1="520" y1="430" x2="870" y2="430" stroke="#333" strokeWidth="1"/>
        <line x1="720" y1="440" x2="720" y2="560" stroke="#333" strokeWidth="1"/>

        {/* Heat Map Circle (LoRaWAN Range) - Apenas quando zona específica estiver destacada */}
        {showHeatMap && highlightedZone && (
          <g className="heat-map">
            {/* Círculo externo piscando */}
            <circle
              cx={heatMapPosition.x}
              cy={heatMapPosition.y}
              r="25"
              fill="rgba(255, 87, 34, 0.2)"
              stroke="#FF5722"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="heat-circle-pulse"
            />
            {/* Círculo interno piscando */}
            <circle
              cx={heatMapPosition.x}
              cy={heatMapPosition.y}
              r="15"
              fill="rgba(255, 87, 34, 0.4)"
              stroke="#FF5722"
              strokeWidth="1"
              className="heat-center-pulse"
            />
            {/* Sinalização especial quando ativo */}
            {iotActive && (
              <circle
                cx={heatMapPosition.x}
                cy={heatMapPosition.y}
                r="8"
                fill="none"
                stroke="#FFD700"
                strokeWidth="3"
                className="signal-ring"
              />
            )}
          </g>
        )}

      </svg>
    </div>
  );
};

export default ZoneMap;