import { useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import StickyElements from './components/StickyElements';
import CursorDot from './components/CursorDot';
import MouseGlow from './components/MouseGlow';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother, TextPlugin);

function App() {
  const smoothWrapper = useRef(null);
  const smoothContent = useRef(null);

  
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapper.current,
      content: smoothContent.current,
      smooth: 1, // Smoothness factor
      effects: true, // Enable effects like parallax
    });
    // Smooth scrolling setup
    gsap.set('body', { overflow: 'auto' });
    
    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      smoother.kill(); // Clean up the smoother instance
    };
  }, []);

  return (
    <div className=" min-h-screen relative overflow-x-hidden" ref={smoothWrapper}>
      <CursorDot />
      <MouseGlow />
      <StickyElements />
      <Navigation />
      <main ref={smoothContent}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;