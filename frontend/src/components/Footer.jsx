export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/6 px-10 py-6 flex items-center justify-between flex-wrap gap-3 max-md:px-5">
      <span className="text-xs font-bold text-white/60 tracking-[-0.01em]">
        Usama Abrar
      </span>
      <span className="text-xs text-white/20 font-mono">
        Mechatronics Engineer
      </span>
      <span className="text-xs text-white/20">
        &copy; {new Date().getFullYear()} — All rights reserved
      </span>
    </footer>
  );
}
