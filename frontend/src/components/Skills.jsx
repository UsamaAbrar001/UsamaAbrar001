import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const toolGroups = [
  {
    label: 'Maintenance & Reliability',
    items: ['Predictive Maintenance', 'Preventive Maintenance', 'RCM', 'RCA', 'FMEA', 'TPM'],
  },
  {
    label: 'Control & Automation',
    items: ['PLC Programming', 'SCADA', 'HMI', 'Siemens S7', 'Allen-Bradley', 'VFD Drives'],
  },
  {
    label: 'Electrical & Mechanical',
    items: ['AutoCAD', 'SolidWorks', 'Electrical Wiring', 'Hydraulics', 'Pneumatics', 'HVAC Design'],
  },
  {
    label: 'Management & Software',
    items: ['CMMS', 'MS Project', 'MATLAB', 'BMS', 'MS Office', 'SAP PM'],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-group', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
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
    <section id="skills" ref={sectionRef} className="bg-light px-10 py-[100px] max-md:px-5 max-md:py-[72px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="border-t border-black/10 pt-6 flex items-baseline justify-between mb-16 max-md:flex-col max-md:gap-2">
          <div>
            <span className="sec-label">Toolset</span>
            <h2 className="text-[clamp(22px,3vw,36px)] font-bold tracking-[-0.03em] text-dark mt-2.5">
              The tools of the&nbsp;craft
            </h2>
          </div>
          <span className="font-mono text-[11px] text-black/20 font-medium tracking-[0.08em]">
            05
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-14 gap-y-8 max-md:grid-cols-1">
          {toolGroups.map((group) => (
            <div key={group.label} className="skill-group">
              <h3 className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-black/30 mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-medium text-dark/50 border border-black/10 px-3 py-1.5 tracking-[0.02em] hover:text-dark hover:border-black/25 transition-all"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#999] mt-10 font-medium">
          [TBD — Update skills list to match your actual tools and technologies]
        </p>
      </div>
    </section>
  );
}
