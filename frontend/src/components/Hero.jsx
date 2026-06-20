export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh bg-light overflow-hidden flex flex-col justify-end"
    >
      <div className="absolute inset-0">
        <img
          src="/Pic.png"
          alt="Usama Abrar"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            zIndex: 1,
            background: 'linear-gradient(to bottom, rgba(17,17,17,0.10) 0%, rgba(17,17,17,0.20) 40%, rgba(17,17,17,0.60) 100%)',
          }}
        />
      </div>

      <div className="relative z-[5] text-right px-[48px] pb-[18px] max-md:px-5 max-md:pb-2">
        <p className="text-[clamp(14px,1.4vw,20px)] font-semibold text-white leading-tight tracking-[-0.01em]">
          <span className="text-accent mr-1.5">//</span>
          Mechatronics Engineer · Maintenance Professional
        </p>
      </div>

      <div className="relative z-[4] overflow-visible pointer-events-none select-none pb-0">
        <h1
          className="hero-name text-white font-bold tracking-[-0.04em] leading-[0.85] whitespace-nowrap px-8 max-md:px-5 max-md:whitespace-normal max-md:text-[clamp(52px,17vw,120px)]"
          style={{
            fontSize: 'clamp(72px, 16vw, 240px)',
            animation: 'heroNameIn 1.2s cubic-bezier(0.16,1,0.3,1) 0.1s both',
          }}
        >
          Usama Abrar.
        </h1>
      </div>

      <div className="scroll-hint absolute bottom-7 left-1/2 z-[5] animate-[scrollBob_2.2s_ease-in-out_infinite_2s]">
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="text-white/40">
          <rect x="1.5" y="1.5" width="17" height="25" rx="8.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="10" cy="8" r="2" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
