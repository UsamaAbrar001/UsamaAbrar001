import api from '../utils/api';

export default function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = { name: form.name.value, email: form.email.value, subject: form.subject.value, message: form.message.value };
    try {
      const res = await api.post('/contact', data);
      if (res.status === 201) {
        alert('Message sent successfully!');
        form.reset();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch {
      alert('Network error. Please try again later.');
    }
  };

  return (
    <section id="contact" className="bg-dark px-10 py-[120px] max-md:px-5 max-md:py-[72px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="border-t border-white/10 pt-6 mb-20" />

        <div className="grid grid-cols-[0.85fr_1fr] gap-16 items-start max-md:grid-cols-1 max-md:gap-10">
          <div>
            <h2 className="text-[clamp(48px,8vw,110px)] font-bold tracking-[-0.05em] leading-[0.9] text-white mb-8">
              Let's build<br />something<br /><span className="text-accent">reliable.</span>
            </h2>
            <p className="text-base text-white/40 leading-[1.78] mb-10">
              I'm open to maintenance engineering, facility management, and
              technical leadership conversations. If you're building something
              that needs to keep running — let's talk.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-10">
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-accent/50 transition-colors"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <input
                name="subject"
                type="text"
                placeholder="Subject (optional)"
                className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-accent/50 transition-colors"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="4"
                className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-accent/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="self-start inline-flex items-center gap-2 bg-accent text-white text-sm font-bold px-8 py-3.5 tracking-[0.02em] hover:opacity-88 hover:-translate-y-0.5 transition-all"
                data-cursor-hover
              >
                Send Message
              </button>
            </form>

            <div className="mt-10 border-t border-white/10 pt-6">
              <span className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-white/20 mb-3 block">
                Direct Channels
              </span>
              <div className="flex flex-col gap-0">
                {[
                  { label: 'Phone', val: '+92 304 2666728', href: 'tel:+923042666728' },
                  { label: 'Email', val: 'mepdesinerr@gmail.com', href: 'mailto:mepdesinerr@gmail.com' },
                  { label: 'LinkedIn', val: 'linkedin.com/in/usama-abrar/', href: 'https://linkedin.com/in/usama-abrar/' },
                  { label: 'Location', val: 'Islamabad, Pakistan', href: '#' },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-4 py-[18px] border-b border-white/20 text-white/80 text-sm font-medium tracking-[0.02em] hover:text-white hover:pl-2.5 transition-all first:border-t first:border-white/20"
                  >
                    <span className="w-[38px] h-[38px] border border-white/20 flex items-center justify-center shrink-0 text-white/60 hover:text-accent hover:border-accent transition-all text-[10px] font-mono uppercase">
                      {c.label.slice(0, 2)}
                    </span>
                    <div>
                      <p className="text-[10px] text-white/50 font-medium tracking-[0.08em] uppercase mb-0.5">{c.label}</p>
                      <p className="text-sm text-white/90">{c.val}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <img
              src="/Pic.png"
              alt="Usama Abrar"
              className="w-full aspect-[3/4] object-cover object-center grayscale contrast-[1.06] brightness-75"
            />
            <a
              href="#hero"
              className="absolute -bottom-px -left-px bg-accent text-white text-[11px] font-bold tracking-[0.1em] uppercase px-4 py-2 inline-flex items-center gap-2 group-hover:gap-3 group-hover:pr-5 transition-all"
            >
              Back to top
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline-block">
                <path d="M6 1L11 6M6 1L1 6M6 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
