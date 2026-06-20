import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState('');
  const indicatorRef = useRef(null);
  const navRef = useRef(null);
  const lastScroll = useRef(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastScroll.current || y < 100);
      lastScroll.current = y;

      const sections = links.map((l) => {
        const el = document.querySelector(l.href);
        if (!el) return { id: l.label, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: l.label, top: Math.abs(rect.top) };
      });
      const closest = sections.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(closest.id);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const moveIndicator = () => {
      const nav = navRef.current;
      if (!nav) return;
      const activeEl = nav.querySelector(`a[data-section="${active}"]`);
      const ind = indicatorRef.current;
      if (!activeEl || !ind) {
        ind?.classList.remove('opacity-100');
        return;
      }
      const r = activeEl.getBoundingClientRect();
      const nr = nav.getBoundingClientRect();
      ind.style.left = `${r.left - nr.left}px`;
      ind.style.width = `${r.width}px`;
      ind.classList.add('opacity-100');
    };
    moveIndicator();
  }, [active]);

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (pathname !== '/') return null;

  return (
    <nav
      ref={navRef}
      id="nav"
      className={`fixed top-[22px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-3.5 py-1.5 pl-[18px] pr-1.5 bg-dark/55 backdrop-blur-[20px] saturate-[140%] border border-white/10 rounded-full shadow-[0_8px_28px_rgba(0,0,0,0.25)] transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <span className="font-body font-bold text-[15px] text-white tracking-[-0.02em] pr-3.5 border-r border-white/12 leading-none whitespace-nowrap">
        UA<span className="text-accent">.</span>
      </span>

      <ul className="nav-pill relative flex list-none m-0 p-0">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              data-section={l.label}
              onClick={(e) => handleClick(e, l.href)}
              className={`relative block px-3.5 py-2 text-xs font-medium tracking-[0.01em] rounded-full whitespace-nowrap z-[2] transition-colors duration-200 ${
                active === l.label ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          </li>
        ))}
        <div
          ref={indicatorRef}
          className="nav-indicator absolute top-0 left-0 h-full bg-accent/92 rounded-full pointer-events-none z-[1] opacity-0 transition-all duration-[450ms] cubic-bezier(0.16,1,0.3,1)"
        />
      </ul>

      <Link
        to="/blog"
        className="font-mono text-[10.5px] font-medium tracking-[0.1em] uppercase text-white px-4 py-[9px] rounded-full bg-accent hover:bg-[#38bdf8] hover:-translate-y-[1px] transition-all duration-200 whitespace-nowrap leading-none"
      >
        Blog
      </Link>
    </nav>
  );
}
