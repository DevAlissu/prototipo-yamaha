// src/pages/home/components/dashboard/SimpleCarousel.tsx
import React from "react";
import "./carousel.css";

interface SimpleCarouselProps {
  children: React.ReactNode;
  title: string;
}

const SimpleCarousel: React.FC<SimpleCarouselProps> = ({ children, title }) => {
  return (
    <div style={{ marginTop: 24 }}>
      <h3 className="carousel-section-title">{title}</h3>
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{
            // Forçar scroll nativo no mobile
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'auto',
            // Remover qualquer interferência
            pointerEvents: 'auto',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SimpleCarousel;