import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="bg-dark px-10 py-[100px] max-md:px-5 max-md:py-[72px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="projects-header border-t border-white/10 pt-6 flex items-center justify-between mb-16 max-md:flex-col max-md:gap-3">
          <div>
            <span className="sec-label">Projects</span>
            <h2 className="text-[clamp(28px,4vw,52px)] font-bold tracking-[-0.04em] leading-tight text-white mt-3">
              Maintenance<br />Optimisation Work.
            </h2>
          </div>
          <span className="text-[clamp(80px,14vw,180px)] font-bold tracking-[-0.05em] leading-[0.85] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.08)] select-none pointer-events-none shrink-0">
            04
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="border border-white/10 p-8 md:p-12 hover:border-accent/40 transition-colors duration-300"
            >
              <span className="font-mono text-[11px] text-accent font-medium tracking-[0.08em]">
                Project {String(i).padStart(2, '0')}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.03em] mt-3 mb-4">
                [TBD — Project Title #{i}]
              </h3>
              <p className="text-sm text-white/45 leading-relaxed max-w-[55ch] mb-6">
                [TBD — Description of your maintenance optimisation project.
                Describe the problem, your approach, tools used, and the measurable
                outcome — e.g., reduced downtime, cost savings, efficiency gain.]
              </p>
              <div className="flex flex-wrap gap-2">
                {['[TBD Tool]', '[TBD Tool]', '[TBD Tool]'].map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium text-white/30 border border-white/10 px-2.5 py-[3px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-white/25 mt-10 font-mono tracking-[0.08em] uppercase">
          [Fill in your project details above]
        </p>
      </div>
    </section>
  );
}
