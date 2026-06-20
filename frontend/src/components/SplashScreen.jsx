import { useEffect, useRef, useState } from 'react';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const dur = 1800;
    const step = 20;
    const inc = step / dur;
    let current = 0;

    const interval = setInterval(() => {
      current += inc;
      if (current >= 1) {
        current = 1;
        clearInterval(interval);
        setTimeout(() => setFade(true), 300);
      }
      setProgress(current);
    }, step);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (fade) {
      const t = setTimeout(() => onFinish?.(), 600);
      return () => clearTimeout(t);
    }
  }, [fade, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-dark flex items-center justify-center transition-opacity duration-600 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-7">
        <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-accent">
          // Mechatronics Engineer
        </span>
        <h1 className="font-body font-bold text-white text-center leading-none tracking-[-0.03em] text-[clamp(36px,9vw,80px)]">
          Usama <span className="text-accent">Abrar</span>
        </h1>
        <div className="w-[min(260px,60vw)] h-[2px] bg-white/10 rounded overflow-hidden mt-1">
          <div
            ref={barRef}
            className="h-full bg-accent rounded transition-all duration-[400ms] ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
