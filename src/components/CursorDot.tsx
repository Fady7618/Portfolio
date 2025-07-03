import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CursorDot = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const dotOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const dotOutline = dotOutlineRef.current;
    
    if (!dot || !dotOutline) return;

    // Set initial position off-screen
    gsap.set([dot, dotOutline], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    
    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let outlineX = -100;
    let outlineY = -100;
    
    // Animation loop for smooth following
    const animateDot = () => {
      // Smooth follow with different speeds for dot and outline
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      
      outlineX += (mouseX - outlineX) * 0.1; // Slower follow for outline
      outlineY += (mouseY - outlineY) * 0.1;
      
      gsap.set(dot, { x: dotX, y: dotY });
      gsap.set(dotOutline, { x: outlineX, y: outlineY });
      
      requestAnimationFrame(animateDot);
    };
    
    animateDot();
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseDown = () => {
      gsap.to(dot, { scale: 0.7, duration: 0.15 });
      gsap.to(dotOutline, { scale: 1.4, duration: 0.15 });
    };
    
    const handleMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.15 });
      gsap.to(dotOutline, { scale: 1, duration: 0.15 });
    };
    
    const handleMouseEnterLink = () => {
      gsap.to(dot, { scale: 1.5, duration: 0.2 });
      gsap.to(dotOutline, { scale: 0, opacity: 0, duration: 0.2 });
    };
    
    const handleMouseLeaveLink = () => {
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(dotOutline, { scale: 1, opacity: 0.5, duration: 0.2 });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add hover effect for all clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    clickables.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnterLink);
      element.addEventListener('mouseleave', handleMouseLeaveLink);
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      clickables.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnterLink);
        element.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
        style={{ mixBlendMode: 'difference' }}
      />
      
      {/* Outer ring */}
      <div
        ref={dotOutlineRef}
        className="fixed top-0 left-0 pointer-events-none z-50 w-7 h-7 rounded-full border-2 border-blue-400/50"
        style={{ opacity: 0.5 }}
      />
    </>
  );
};

export default CursorDot;