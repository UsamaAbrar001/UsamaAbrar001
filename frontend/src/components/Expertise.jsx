import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const specializations = [
  'Predictive & Preventive Maintenance',
  'HVAC Systems & BMS',
  'Electrical Wiring & Layout',
  'PLC Programming & Automation',
  'Root Cause Analysis (RCA)',
  'SCADA Systems',
  'Electro-Optics Maintenance',
  'CMMS Implementation',
  'Hydraulics & Pneumatics',
  'Facility Management',
  'Team Supervision & Training',
  'Safety Compliance (HSE)',
];

export default function Expertise() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.expertise-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          x: i % 2 === 0 ? -30 : 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="bg-dark px-10 py-[100px] max-md:px-5 max-md:py-[72px]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="expertise-header border-t border-white/10 pt-6 flex items-center justify-between mb-16 max-md:flex-col max-md:gap-3">
          <div className="ns-title-block flex-1 pl-0 max-md:pl-0">
            <span className="sec-label">Expertise</span>
            <h2 className="text-[clamp(28px,4vw,52px)] font-bold tracking-[-0.04em] leading-tight text-white mt-3">
              Areas of<br />Specialisation.
            </h2>
          </div>
          <span className="ns-ghost-num text-[clamp(80px,14vw,180px)] font-bold tracking-[-0.05em] leading-[0.85] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.08)] select-none pointer-events-none shrink-0">
            03
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-14 gap-y-0 max-md:grid-cols-1">
          {specializations.map((s, i) => (
            <div
              key={s}
              ref={(el) => (itemsRef.current[i] = el)}
              className="flex items-center justify-between py-[13px] border-t border-white/8"
            >
              <span className="text-[clamp(14px,1.3vw,17px)] font-semibold text-white tracking-[-0.02em]">
                {s}
              </span>
              <span className="font-mono text-xs text-white/25 shrink-0 tracking-[0.04em]">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
