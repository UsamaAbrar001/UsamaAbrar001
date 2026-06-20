import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const statementRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ist-line .ist-inner', {
        y: 120,
        opacity: 0,
        rotateX: -40,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: statementRef.current,
          start: 'top 85%',
        },
      });

      gsap.from('.intro-stat', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 90%',
        },
      });
    }, [statementRef, statsRef]);

    return () => ctx.revert();
  }, []);

  return (
    <section id="intro" className="bg-dark px-10 py-[120px] max-md:px-5 max-md:py-[72px]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-[1fr_1fr] gap-20 items-center max-md:grid-cols-1 max-md:gap-9">
        <div ref={statementRef} className="overflow-hidden perspective-[900px]">
          <h2 className="text-[clamp(28px,3.5vw,52px)] font-semibold leading-tight tracking-[-0.03em] text-white">
            {[
              'Mechatronics Engineer',
              'turning industrial maintenance',
              'into <span class="text-accent">measurable reliability.</span>',
            ].map((line, i) => (
              <span key={i} className="ist-line block overflow-hidden pb-[0.06em]">
                <span
                  className="ist-inline block"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              </span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col gap-7 pt-2">
          <p className="text-base text-white/45 leading-relaxed max-w-[44ch]">
            4+ years of hands-on maintenance experience across electrical wiring,
            HVAC systems, and electro-optics — keeping critical infrastructure
            operational, reducing downtime, and driving systematic reliability
            improvements.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 border border-white/25 rounded-full text-sm font-medium text-white/70 tracking-[0.02em] w-fit hover:border-white/70 hover:text-white hover:-translate-y-0.5 transition-all"
            data-cursor-hover
          >
            Let's Connect
          </a>

          <div
            ref={statsRef}
            className="flex gap-10 pt-8 border-t border-white/8 max-md:gap-4 max-md:mt-7"
          >
            {[
              { num: '4+', label: 'Years Experience', red: true },
              { num: '3', label: 'Industry Sectors' },
              { num: '[TBD]', label: 'Projects Delivered' },
            ].map((s) => (
              <div key={s.label} className="intro-stat">
                <p className={`text-[clamp(32px,8vw,36px)] font-bold tracking-[-0.04em] leading-none ${s.red ? 'text-accent' : 'text-white'}`}>
                  {s.num}
                </p>
                <p className="text-xs text-white/35 font-medium mt-1 tracking-[0.04em]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
