"use client";

import Navbar from "@/components/portfolio/Navbar";
import SpaceBackground from "@/components/portfolio/SpaceBackground";
import CinematicHero from "@/components/portfolio/CinematicHero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Contact from "@/components/portfolio/Contact";

import { useState } from "react";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <main className="overflow-x-hidden bg-[#03040d] text-white">
      <SpaceBackground />
      <Navbar visible={showNavbar} />
      <CinematicHero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
