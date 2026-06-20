import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouchDevice) return;

    let rafId = null;
    let mouseX = -100, mouseY = -100;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    const update = () => {
      cursor.style.setProperty('--cx', mouseX + 'px');
      cursor.style.setProperty('--cy', mouseY + 'px');
      rafId = null;
    };

    const onHover = () => cursor.classList.add('scale-150', 'bg-accent/20', 'border-accent', 'shadow-lg');
    const offHover = () => cursor.classList.remove('scale-150', 'bg-accent/20', 'border-accent', 'shadow-lg');

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', offHover);
    });

    requestAnimationFrame(() => cursor.classList.add('opacity-100'));

    return () => {
      document.removeEventListener('mousemove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed pointer-events-none z-[9999] w-6 h-6 rounded-full border-2 border-accent shadow-[0_0_10px_rgba(14,165,233,0.7)] transition-all duration-[180ms] ease-out opacity-0"
      style={{
        transform: 'translate(calc(var(--cx) - 50%), calc(var(--cy) - 50%))',
      }}
    />
  );
}
