import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-light px-10 py-[100px] max-md:px-5 max-md:py-[72px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="border-t border-black/10 pt-6 flex items-baseline justify-between mb-16 max-md:flex-col max-md:gap-2">
          <span className="sec-label">About</span>
          <span className="font-mono text-[11px] text-black/20 font-medium tracking-[0.08em]">
            01
          </span>
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-20 items-start max-md:grid-cols-1 max-md:gap-9">
          <div className="about-reveal relative">
            <img
              src="/Pic.png"
              alt="Usama Abrar"
              className="w-full aspect-[3/4] object-cover object-center grayscale contrast-[1.06]"
            />
            <div className="absolute -bottom-px -left-px bg-accent text-white text-[11px] font-bold tracking-[0.1em] uppercase px-4 py-2">
              Mechatronics Eng.
            </div>
          </div>

          <div className="flex flex-col gap-0">
            <h2 className="about-reveal text-[clamp(28px,3.5vw,48px)] font-bold tracking-[-0.04em] leading-tight text-dark mb-8">
              Engineering reliability<br />through maintenance&nbsp;excellence.
            </h2>

            <p className="about-reveal text-base text-[#666] leading-[1.82] mb-[18px]">
              A Mechatronics Engineer with hands-on experience spanning electrical
              systems, HVAC operations, and precision electro-optics maintenance.
              I bring a systematic approach to industrial reliability — combining
              engineering fundamentals with practical field experience.
            </p>

            <p className="about-reveal text-base text-[#666] leading-[1.82] mb-[18px]">
              From supervising electrical wiring layouts at <strong className="text-dark font-semibold">Solumate</strong>,
              to managing HVAC maintenance operations at <strong className="text-dark font-semibold">Jacaranda Family Club</strong>,
              and now leading technical maintenance at <strong className="text-dark font-semibold">Laser & Electro Optics Solution</strong>
              — I've built a track record of keeping critical systems running.
            </p>

            <div className="about-reveal mt-8 p-6 border border-black/10 flex items-center gap-4 hover:border-accent transition-colors">
              <div className="w-[3px] h-[52px] bg-accent shrink-0" />
              <div>
                <p className="text-sm font-bold text-dark mb-1">
                  [TBD — Certification Name]
                </p>
                <p className="text-xs text-[#999] leading-relaxed">
                  [Institution] · [Details]
                </p>
              </div>
            </div>

            <div className="about-reveal flex items-center gap-2 mt-7 text-xs text-[#aaa] font-medium">
              <span className="w-[7px] h-[7px] rounded-full bg-green-500 animate-[livePulse_2.4s_ease-in-out_infinite]" />
              Available for new opportunities
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
