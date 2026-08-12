import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import GithubActivity from './components/GithubActivity';
import Experience from './components/Experience';
import DSA from './components/DSA';
import Contact from './components/Contact';
import RecruiterCTA from './components/RecruiterCTA';
import ResumeModal from './components/Resume';
import Footer from './components/Footer';

import CommandPalette from './components/CommandPalette';
import ProjectModal from './components/ProjectModal';
import BackgroundEffects from './components/BackgroundEffects';
import PageLoader from './components/PageLoader';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';

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
    <ThemeProvider>
      <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg0)', color: 'var(--t1)', transition: 'background 0.3s ease, color 0.3s ease' }}>
        <PageLoader onComplete={handleLoaderComplete} />
        <ScrollProgress />
        <CustomCursor />
        <BackgroundEffects />
        
        <Navbar onOpenCmd={() => setCmdOpen(true)} onOpenResume={() => setResumeOpen(true)} />
        
        <main style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease-in' }}>
          <Hero onOpenResume={() => setResumeOpen(true)} />
          <About />
          <Skills />
          <Services />
          <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
          <GithubActivity />
          <DSA />
          <Experience />
          <Contact />
          <RecruiterCTA />
        </main>

        <Footer />
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

        <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} onOpenResume={() => setResumeOpen(true)} />
        
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
