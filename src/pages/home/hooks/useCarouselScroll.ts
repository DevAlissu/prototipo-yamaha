// src/pages/home/hooks/useCarouselScroll.ts
import { useRef, useCallback, useEffect } from 'react';

export function useCarouselScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const isHorizontalScroll = useRef(false);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Card width + gap
      const currentScroll = scrollRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  }, []);

  // Touch/Mouse drag functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Increase scroll speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!scrollRef.current) return;
    
    isDragging.current = false;
    scrollRef.current.style.cursor = 'grab';
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    
    isDragging.current = true;
    startX.current = e.touches[0].pageX;
    startY.current = e.touches[0].pageY;
    scrollLeft.current = scrollRef.current.scrollLeft;
    isHorizontalScroll.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    
    const currentX = e.touches[0].pageX;
    const currentY = e.touches[0].pageY;
    const deltaX = Math.abs(currentX - startX.current);
    const deltaY = Math.abs(currentY - startY.current);
    
    // Detectar direção do movimento apenas na primeira vez
    if (!isHorizontalScroll.current && (deltaX > 5 || deltaY > 5)) {
      isHorizontalScroll.current = deltaX > deltaY;
    }
    
    // Se o movimento for horizontal, fazer scroll do carrossel
    if (isHorizontalScroll.current && deltaX > 10) {
      e.preventDefault();
      e.stopPropagation();
      const walk = (currentX - startX.current);
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    } else if (!isHorizontalScroll.current) {
      // Se for vertical, parar o tracking do carrossel
      isDragging.current = false;
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    isDragging.current = false;
    e.stopPropagation();
  }, []);

  // Add global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging.current && scrollRef.current) {
        isDragging.current = false;
        scrollRef.current.style.cursor = 'grab';
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // Simplificar para mobile - apenas scroll nativo
  const carouselProps = {
    ref: scrollRef,
    // Apenas eventos de mouse para desktop
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    style: { cursor: 'grab' } as React.CSSProperties,
  };

  return {
    scrollRef,
    scroll,
    carouselProps,
  };
}