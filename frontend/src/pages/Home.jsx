import { useState, useCallback } from 'react';
import SplashScreen from '../components/SplashScreen';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import About from '../components/About';
import Experience from '../components/Experience';
import Expertise from '../components/Expertise';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <CustomCursor />
      <Navbar />
      <Hero />
      <Intro />
      <About />
      <Experience />
      <Expertise />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
