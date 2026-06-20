import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    num: '01',
    role: 'Junior Technical Manager (Maintenance)',
    company: 'Laser & Electro Optics Solution Pvt Ltd',
    location: 'Islamabad',
    tenure: 'Feb 2025 — Present',
    body: 'Leading technical maintenance operations for precision electro-optics equipment. Managing maintenance schedules, troubleshooting, and team coordination.',
    tags: ['Electro-Optics', 'Precision Maintenance', 'Team Leadership'],
    impacts: [
      ['[TBD]', '% improvement in equipment uptime'],
      ['[TBD]', 'team members managed'],
    ],
  },
  {
    num: '02',
    role: 'Supervisor HVAC (Maintenance/Operations)',
    company: 'Jacaranda Family Club Pvt Ltd',
    location: 'DHA Phase 2, Islamabad',
    tenure: 'Sep 2022 — Apr 2025',
    body: 'Supervised HVAC maintenance and operations for a large family club facility. Managed preventive and corrective maintenance programs, coordinated with contractors, and ensured 24/7 system reliability.',
    tags: ['HVAC Systems', 'Preventive Maintenance', 'Facility Management', 'BMS'],
    impacts: [
      ['[TBD]', 'HVAC units maintained'],
      ['[TBD]', '% reduction in breakdowns'],
    ],
  },
  {
    num: '03',
    role: 'Site Supervisor — Electrical Wiring Layout',
    company: 'Solumate Pvt Ltd',
    location: 'Islamabad',
    tenure: 'Apr 2022 — Sep 2022',
    body: 'Supervised electrical wiring layout installation for residential/commercial projects. Ensured compliance with electrical codes, managed installation teams, and maintained quality standards.',
    tags: ['Electrical Systems', 'Wiring Layout', 'Site Supervision', 'Code Compliance'],
    impacts: [
      ['[TBD]', 'projects supervised'],
      ['[TBD]', '% on-time delivery'],
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="bg-dark px-10 py-[100px] max-md:px-5 max-md:py-[72px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="border-t border-white/10 pt-6 flex items-baseline justify-between mb-[72px]">
          <div>
            <span className="sec-label">Career</span>
            <h2 className="text-[clamp(32px,4.5vw,60px)] font-bold tracking-[-0.04em] leading-tight text-white mt-3">
              Four Years. Three Industries.<br />
              <span className="text-accent">Measurable at Every Step.</span>
            </h2>
          </div>
          <span className="font-mono text-[11px] text-white/20 font-medium tracking-[0.08em] shrink-0">
            02
          </span>
        </div>

        <div className="flex flex-col gap-0">
          {experiences.map((exp, i) => (
            <div
              key={exp.num}
              ref={(el) => (itemsRef.current[i] = el)}
              className="border-b border-white/8 py-10 grid grid-cols-[2fr_1fr] gap-10 items-start first:border-t first:border-white/8 max-md:grid-cols-1 max-md:gap-5"
            >
              <div>
                <span className="font-mono text-[11px] text-accent font-medium tracking-[0.08em] mb-3.5 block">
                  {exp.num}
                </span>
                <h3 className="text-[clamp(20px,2.5vw,30px)] font-bold text-white tracking-[-0.03em] leading-tight mb-1.5">
                  {exp.role}
                </h3>
                <p className="text-sm text-white/40 font-medium mb-1">
                  {exp.company} · {exp.location}
                </p>
                <p className="text-sm text-white/45 leading-relaxed max-w-[55ch]">
                  {exp.body}
                </p>

                <div className="mt-5 flex flex-col gap-2">
                  {exp.impacts.map((imp, j) => (
                    <div key={j} className="flex gap-2.5 items-start text-xs text-white/40 leading-relaxed">
                      <span className="w-3.5 h-3.5 rounded-full bg-accent shrink-0 mt-0.5 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </span>
                      <strong className="text-white/80 font-semibold">{imp[0]}</strong>
                      <span>{imp[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-5 max-md:items-start">
                <span className="font-mono text-xs text-accent text-right tracking-[0.04em] leading-relaxed font-medium max-md:text-left">
                  {exp.tenure}
                </span>
                <div className="flex flex-wrap gap-1.5 justify-end max-md:justify-start">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium text-white/30 border border-white/10 px-2.5 py-[3px] tracking-[0.02em]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
