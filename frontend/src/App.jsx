import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import DSA from './components/DSA';
import Contact from './components/Contact';
import ResumeModal from './components/Resume';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import CommandPalette from './components/CommandPalette';
import ProjectModal from './components/ProjectModal';
import BackgroundEffects from './components/BackgroundEffects';
import PageLoader from './components/PageLoader';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => setIsLoaded(true), []);

  useEffect(() => {
    const handleCustomOpen = () => setCmdOpen(true);
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => window.removeEventListener('open-command-palette', handleCustomOpen);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#0F172A' }}>
      <PageLoader onComplete={handleLoaderComplete} />
      <ScrollProgress />
      <CustomCursor />
      <BackgroundEffects />
      
      <Navbar onOpenCmd={() => setCmdOpen(true)} onOpenResume={() => setResumeOpen(true)} />
      
      <main style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease-in' }}>
        <Hero />
        <About />
        <Skills />
        <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
        <DSA />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <AIAssistant />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
