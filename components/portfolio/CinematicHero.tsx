"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SystemStatus = {
  name: string;
  label: string;
  percent: number;
};

type Destination = {
  name: string;
  code: string;
  distance: string;
  status: string;
};

/* -------------------------------------------------------------------------- */
/* STATIC DATA                                                                */
/* -------------------------------------------------------------------------- */

const systemSequence: SystemStatus[] = [
  {
    name: "EXPLORATION CORE",
    label: "INITIALIZING",
    percent: 100,
  },
  {
    name: "NAVIGATION ARRAY",
    label: "ONLINE",
    percent: 82,
  },
  {
    name: "LIFE SUPPORT",
    label: "STABLE",
    percent: 96,
  },
  {
    name: "PROPULSION SYSTEM",
    label: "STANDBY",
    percent: 68,
  },
  {
    name: "FLIGHT CONTROL",
    label: "READY",
    percent: 100,
  },
];

const selectedDestination: Destination = {
  name: "NEBULA NX-07",
  code: "NX-07",
  distance: "1,240 LY",
  status: "READY",
};

/* -------------------------------------------------------------------------- */
/* HUD CORNERS                                                                */
/* -------------------------------------------------------------------------- */

function HudCorners() {
  return (
    <>
      <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-cyan-400/60" />
      <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-cyan-400/60" />
      <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-cyan-400/60" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-cyan-400/60" />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* HUD LABEL                                                                  */
/* -------------------------------------------------------------------------- */

function HudLabel({
  children,
  violet = false,
}: {
  children: ReactNode;
  violet?: boolean;
}) {
  return (
    <div
      className={`font-mono text-[9px] tracking-[0.35em] ${
        violet ? "text-violet-300" : "text-cyan-300"
      }`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CSS SPACECRAFT                                                             */
/* -------------------------------------------------------------------------- */

function Spacecraft() {
  return (
    <div className="spacecraft relative h-[300px] w-[540px]">
      {/* Atmospheric glow */}
      <div className="absolute left-1/2 top-[55%] h-[220px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[80px]" />

      {/* ENGINE EXHAUST */}
      <div className="engine-glow absolute left-1/2 top-[76%] z-0 flex -translate-x-1/2 gap-5">
        <div className="engine-flame h-[100px] w-[48px] origin-top rounded-b-[30px] bg-gradient-to-b from-white via-cyan-300 to-blue-600 opacity-0 blur-[7px]" />

        <div className="engine-flame h-[120px] w-[55px] origin-top rounded-b-[35px] bg-gradient-to-b from-white via-cyan-300 to-blue-600 opacity-0 blur-[8px]" />

        <div className="engine-flame h-[100px] w-[48px] origin-top rounded-b-[30px] bg-gradient-to-b from-white via-cyan-300 to-blue-600 opacity-0 blur-[7px]" />
      </div>

      {/* MAIN SHIP */}
      <div className="ship-body absolute left-1/2 top-1/2 z-10 h-[145px] w-[300px] -translate-x-1/2 -translate-y-1/2">
        {/* Left wing */}
        <div
          className="
            absolute left-[-135px] top-[47px]
            h-[62px] w-[160px]
            origin-right -skew-y-[18deg]
            rounded-l-[45px] rounded-br-[12px]
            border border-cyan-300/20
            bg-gradient-to-br from-slate-800 via-slate-900 to-[#050914]
            shadow-[inset_0_0_30px_rgba(34,211,238,0.08)]
          "
        >
          <div className="absolute right-5 top-1/2 h-[2px] w-20 -translate-y-1/2 bg-cyan-300/40 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

          <div className="absolute right-10 top-[38px] h-[3px] w-10 bg-violet-400/60" />
        </div>

        {/* Right wing */}
        <div
          className="
            absolute right-[-135px] top-[47px]
            h-[62px] w-[160px]
            origin-left skew-y-[18deg]
            rounded-r-[45px] rounded-bl-[12px]
            border border-cyan-300/20
            bg-gradient-to-bl from-slate-800 via-slate-900 to-[#050914]
            shadow-[inset_0_0_30px_rgba(34,211,238,0.08)]
          "
        >
          <div className="absolute left-5 top-1/2 h-[2px] w-20 -translate-y-1/2 bg-cyan-300/40 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

          <div className="absolute left-10 top-[38px] h-[3px] w-10 bg-violet-400/60" />
        </div>

        {/* Central fuselage */}
        <div
          className="
            absolute left-1/2 top-1/2
            h-[125px] w-[250px]
            -translate-x-1/2 -translate-y-1/2
            rounded-[48%_48%_30%_30%]
            border border-cyan-200/20
            bg-gradient-to-b from-slate-600 via-slate-900 to-[#03050c]
            shadow-[inset_0_12px_35px_rgba(255,255,255,0.06),0_0_45px_rgba(34,211,238,0.08)]
          "
        />

        {/* Upper spine */}
        <div
          className="
            absolute left-1/2 top-[12px]
            h-[70px] w-[105px]
            -translate-x-1/2
            rounded-[50%_50%_35%_35%]
            border border-cyan-200/20
            bg-gradient-to-b from-slate-500 to-slate-950
          "
        />

        {/* Rear canopy */}
        <div
          className="
            absolute left-1/2 top-[22px]
            h-[43px] w-[86px]
            -translate-x-1/2
            rounded-[50%]
            border border-cyan-200/30
            bg-gradient-to-b from-cyan-200/30 via-blue-500/15 to-transparent
            shadow-[0_0_20px_rgba(34,211,238,0.15)]
          "
        />

        {/* Center light */}
        <div
          className="
            ship-light
            absolute left-1/2 top-[91px]
            h-[4px] w-[105px]
            -translate-x-1/2
            rounded-full
            bg-cyan-300
            opacity-0
            shadow-[0_0_8px_#67e8f9,0_0_20px_#22d3ee]
          "
        />

        {/* Left navigation light */}
        <div
          className="
            nav-light-left
            absolute left-[23px] top-[66px]
            h-[6px] w-[6px]
            rounded-full
            bg-cyan-300
            opacity-0
            shadow-[0_0_12px_#22d3ee]
          "
        />

        {/* Right navigation light */}
        <div
          className="
            nav-light-right
            absolute right-[23px] top-[66px]
            h-[6px] w-[6px]
            rounded-full
            bg-violet-300
            opacity-0
            shadow-[0_0_12px_#a78bfa]
          "
        />

        {/* Engine housing */}
        <div className="absolute bottom-[-5px] left-1/2 flex -translate-x-1/2 gap-5">
          {[0, 1, 2].map((engine) => (
            <div
              key={engine}
              className="
                engine-housing
                h-[28px] w-[42px]
                rounded-b-xl
                border border-slate-600/60
                bg-gradient-to-b from-slate-700 to-black
              "
            >
              <div className="engine-core mx-auto mt-1 h-[8px] w-[22px] rounded-full bg-slate-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* WELCOME PASSENGER                                                          */
/* -------------------------------------------------------------------------- */

function WelcomePassenger() {
  return (
    <div className="relative w-[min(620px,calc(100vw-32px))]">
      <div
        className="
          relative overflow-hidden
          border border-cyan-300/20
          bg-[#020b12]/70
          px-6 py-8
          backdrop-blur-[5px]
          sm:px-10 sm:py-10
        "
      >
        <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-cyan-300/80" />
        <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-cyan-300/80" />
        <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-cyan-300/80" />
        <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-cyan-300/80" />

        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

        <div className="relative text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />

            <span className="font-mono text-[9px] tracking-[0.35em] text-cyan-300/60">
              EXPLORATION SYSTEM // NX-01
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
          </div>

          <div className="font-mono text-[10px] tracking-[0.4em] text-cyan-300/60">
            PASSENGER ACCESS
          </div>

          <h2 className="mt-3 text-3xl font-light tracking-[0.18em] text-white sm:text-5xl">
            WELCOME ABOARD
          </h2>

          <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

          <p className="mx-auto mt-5 max-w-md font-mono text-[9px] leading-6 tracking-[0.18em] text-white/45 sm:text-[10px] sm:leading-7">
            PASSENGER IDENTIFICATION ACKNOWLEDGED.
            <br />
            PREPARE FOR DEEP SPACE EXPLORATION.
          </p>

          <div className="mt-7 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />

            <span className="font-mono text-[8px] tracking-[0.3em] text-cyan-300/70">
              BOARDING SEQUENCE CONFIRMED
            </span>
          </div>
        </div>

        <div className="mt-7 flex justify-between border-t border-cyan-300/10 pt-3">
          <span className="font-mono text-[7px] tracking-[0.25em] text-white/20">
            MISSION // 001
          </span>

          <span className="font-mono text-[7px] tracking-[0.25em] text-cyan-300/35">
            ACCESS GRANTED
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PILOT PROFILE                                                              */
/* -------------------------------------------------------------------------- */

function PilotProfile() {
  return (
    <div className="relative w-[min(760px,calc(100vw-32px))] sm:w-[min(760px,calc(100vw-48px))]">
      <div
        className="
          relative
          border border-cyan-300/20
          bg-cyan-950/[0.035]
          px-4 py-5
          backdrop-blur-[3px]
          sm:px-7 sm:py-7
          md:px-10 md:py-9
        "
      >
        <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-cyan-300/70 sm:h-8 sm:w-8" />
        <div className="pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-cyan-300/70 sm:h-8 sm:w-8" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-cyan-300/70 sm:h-8 sm:w-8" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-cyan-300/70 sm:h-8 sm:w-8" />

        <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />

        <div className="mb-5 flex items-center justify-between border-b border-cyan-300/10 pb-3 sm:mb-7 sm:pb-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)] sm:h-2.5 sm:w-2.5" />

            <span className="truncate font-mono text-[9px] tracking-[0.25em] text-cyan-200/90 sm:text-sm sm:tracking-[0.4em]">
              PILOT IDENTIFICATION
            </span>
          </div>

          <span className="ml-3 shrink-0 font-mono text-[8px] tracking-[0.2em] text-cyan-300/40 sm:text-xs sm:tracking-[0.3em]">
            ID // 001
          </span>
        </div>

        <div className="flex flex-col items-center gap-7 sm:gap-8 md:flex-row md:items-center md:gap-10">
          {/* Profile image */}
          <div className="relative h-[150px] w-[150px] shrink-0 sm:h-[180px] sm:w-[180px] md:h-[220px] md:w-[220px]">
            <div className="absolute inset-0 border border-cyan-300/20" />

            <div className="absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-cyan-300/80 sm:-left-3 sm:-top-3 sm:h-8 sm:w-8" />
            <div className="absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-cyan-300/80 sm:-right-3 sm:-top-3 sm:h-8 sm:w-8" />
            <div className="absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-cyan-300/80 sm:-bottom-3 sm:-left-3 sm:h-8 sm:w-8" />
            <div className="absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-cyan-300/80 sm:-bottom-3 sm:-right-3 sm:h-8 sm:w-8" />

            <div className="absolute inset-2 overflow-hidden bg-cyan-950/[0.08] sm:inset-3">
              <div className="absolute inset-0 scale-[1.20]">
                <Image
                  src="/images/profile.png"
                  alt="Ramil Aoanan"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="pointer-events-none absolute inset-0 z-10 opacity-30 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_3px,rgba(103,232,249,0.08)_4px,transparent_5px)]" />

              <div className="pointer-events-none absolute left-0 top-[-25%] z-20 h-[20%] w-full bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.25)]" />

              <div className="pointer-events-none absolute left-0 top-[-25%] z-20 h-px w-full bg-cyan-300/70 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />

              <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle,transparent_45%,rgba(8,145,178,0.10)_75%,rgba(2,3,10,0.28)_100%)]" />

              <div className="pointer-events-none absolute inset-0 z-30 bg-cyan-400/[0.025]" />
            </div>

            <div className="absolute -bottom-5 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap bg-[#02030a] px-2 font-mono text-[7px] tracking-[0.2em] text-cyan-300/50 sm:-bottom-6 sm:px-3 sm:text-[10px] sm:tracking-[0.25em]">
              BIOMETRIC // VERIFIED
            </div>
          </div>

          {/* Profile information */}
          <div className="w-full min-w-0 text-center md:text-left">
            <div className="mb-1 font-mono text-[8px] tracking-[0.28em] text-cyan-300/45 sm:text-[10px] sm:tracking-[0.35em]">
              DESIGNATION
            </div>

            <div className="mb-1 whitespace-nowrap text-2xl font-light tracking-[0.08em] text-white sm:text-3xl md:text-4xl md:tracking-[0.12em]">
              RAMIL AOANAN
            </div>

            <div className="mb-5 font-mono text-[9px] tracking-[0.2em] text-cyan-300/70 sm:mb-7 sm:text-xs sm:text-sm sm:tracking-[0.28em]">
              EXPLORATION PILOT
            </div>

            <div className="space-y-3 border-l-0 pl-0 sm:space-y-4 md:border-l md:border-cyan-300/15 md:pl-5">
              <div>
                <div className="font-mono text-[8px] tracking-[0.22em] text-white/30 sm:text-[10px] sm:tracking-[0.28em]">
                  SPECIALIZATION
                </div>

                <div className="mt-1 font-mono text-[10px] tracking-[0.12em] text-white/75 sm:text-sm sm:tracking-[0.16em]">
                  WEB SYSTEMS
                </div>
              </div>

              <div>
                <div className="font-mono text-[8px] tracking-[0.22em] text-white/30 sm:text-[10px] sm:tracking-[0.28em]">
                  PRIMARY STACK
                </div>

                <div className="mt-1 font-mono text-[10px] tracking-[0.12em] text-white/75 sm:text-sm sm:tracking-[0.16em]">
                  REACT / NEXT.JS
                </div>
              </div>

              <div>
                <div className="font-mono text-[8px] tracking-[0.22em] text-white/30 sm:text-[10px] sm:tracking-[0.28em]">
                  EXPERIENCE
                </div>

                <div className="mt-1 font-mono text-[10px] tracking-[0.12em] text-white/75 sm:text-sm sm:tracking-[0.16em]">
                  05+ YEARS
                </div>
              </div>

              <div>
                <div className="font-mono text-[8px] tracking-[0.22em] text-white/30 sm:text-[10px] sm:tracking-[0.28em]">
                  MISSION STATUS
                </div>

                <div className="mt-1 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.12em] text-cyan-300 md:justify-start sm:text-sm sm:tracking-[0.16em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
                  ACTIVE
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col items-center gap-2 border-t border-cyan-300/10 pt-3 sm:mt-9 sm:flex-row sm:justify-between sm:pt-4">
          <div className="font-mono text-[7px] tracking-[0.2em] text-white/25 sm:text-[10px] sm:tracking-[0.3em]">
            EXPLORATION PROGRAM // NX-01
          </div>

          <div className="font-mono text-[7px] tracking-[0.2em] text-cyan-300/45 sm:text-[10px] sm:tracking-[0.3em]">
            AUTHORIZED PILOT
          </div>
        </div>

        <div className="absolute -right-12 top-1/2 hidden -translate-y-1/2 flex-col gap-1 opacity-40 sm:flex">
          <div className="h-px w-8 bg-cyan-300" />
          <div className="h-px w-5 bg-cyan-300" />
          <div className="h-px w-10 bg-cyan-300" />
          <div className="h-px w-4 bg-cyan-300" />
          <div className="h-px w-7 bg-cyan-300" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CINEMATIC HERO                                                             */
/* -------------------------------------------------------------------------- */

export default function CinematicHero() {
  const root = useRef<HTMLElement>(null);

  const initialization = useRef<HTMLDivElement>(null);
  const initializationBar = useRef<HTMLDivElement>(null);
  const initializationPercent = useRef<HTMLDivElement>(null);
  const initializationStatus = useRef<HTMLDivElement>(null);

  const systemStatusPanel = useRef<HTMLDivElement>(null);

  const destinationPanel = useRef<HTMLDivElement>(null);
  const destinationName = useRef<HTMLDivElement>(null);
  const destinationCode = useRef<HTMLDivElement>(null);
  const destinationDistance = useRef<HTMLDivElement>(null);
  const destinationStatus = useRef<HTMLDivElement>(null);
  const destinationBar = useRef<HTMLDivElement>(null);

  const gpsPanel = useRef<HTMLDivElement>(null);
  const gpsCoordinates = useRef<HTMLDivElement>(null);
  const gpsHeading = useRef<HTMLDivElement>(null);
  const gpsAltitude = useRef<HTMLDivElement>(null);
  const gpsVelocity = useRef<HTMLDivElement>(null);
  const gpsLock = useRef<HTMLDivElement>(null);
  const gpsScan = useRef<HTMLDivElement>(null);

  const scrollProgress = useRef<HTMLDivElement>(null);

  const welcomePassenger = useRef<HTMLDivElement>(null);
  const pilotProfile = useRef<HTMLDivElement>(null);

  const ship = useRef<HTMLDivElement>(null);
  const shipGlow = useRef<HTMLDivElement>(null);
  const horizon = useRef<HTMLDivElement>(null);

  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      /* -------------------------------------------------------------------- */
      /* INITIAL STATE                                                        */
      /* -------------------------------------------------------------------- */

      gsap.set(
        [
          initialization.current,
          welcomePassenger.current,
          pilotProfile.current,
          ship.current,
          shipGlow.current,
          horizon.current,
          systemStatusPanel.current,
          destinationPanel.current,
          gpsPanel.current,
        ],
        {
          opacity: 0,
        },
      );

      gsap.set(initialization.current, {
        pointerEvents: "none",
      });

      gsap.set(welcomePassenger.current, {
        scale: 0.96,
        y: 10,
      });

      gsap.set(pilotProfile.current, {
        scale: 0.96,
        y: 10,
      });

      gsap.set(ship.current, {
        y: 120,
        scale: 0.82,
      });

      gsap.set(shipGlow.current, {
        opacity: 0,
        scale: 0.8,
      });

      gsap.set(horizon.current, {
        opacity: 0,
        scaleY: 1,
      });

      gsap.set(systemStatusPanel.current, {
        x: -20,
      });

      gsap.set(destinationPanel.current, {
        x: 20,
      });

      gsap.set(gpsPanel.current, {
        x: 0,
        y: 15,
      });

      /* Initialization */
      gsap.set(initializationBar.current, {
        width: "0%",
      });

      if (initializationPercent.current) {
        initializationPercent.current.textContent = "0%";
      }

      if (initializationStatus.current) {
        initializationStatus.current.textContent = "INITIALIZING CORE SYSTEM";
      }

      /* System status rows */
      gsap.set(".system-status-row", {
        opacity: 0,
        x: -20,
      });

      /* Destination */
      gsap.set(
        [
          destinationName.current,
          destinationCode.current,
          destinationDistance.current,
          destinationStatus.current,
        ],
        {
          opacity: 0,
          y: 12,
        },
      );

      gsap.set(destinationBar.current, {
        width: "0%",
      });

      /* GPS */
      gsap.set(
        [
          gpsCoordinates.current,
          gpsHeading.current,
          gpsAltitude.current,
          gpsVelocity.current,
          gpsLock.current,
        ],
        {
          opacity: 0,
          y: 10,
        },
      );

      gsap.set(gpsScan.current, {
        width: "0%",
      });

      /* Ship lighting */
      gsap.set(".ship-light", {
        opacity: 0,
      });

      gsap.set(".nav-light-left, .nav-light-right", {
        opacity: 0,
      });

      /* Engines */
      gsap.set(".engine-core", {
        backgroundColor: "#334155",
        boxShadow: "none",
      });

      gsap.set(".engine-flame", {
        opacity: 0,
        scaleY: 0.15,
        transformOrigin: "top center",
      });

      gsap.set(".engine-glow", {
        opacity: 0,
        scale: 1,
      });

      /* -------------------------------------------------------------------- */
      /* MASTER TIMELINE                                                      */
      /* -------------------------------------------------------------------- */

      const initState = {
        value: 0,
      };

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=11000",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            if (scrollProgress.current) {
              gsap.set(scrollProgress.current, {
                width: `${Math.max(4, self.progress * 100)}%`,
              });
            }
          },
        },
      });

      /* ==================================================================== */
      /* FRAME 01 — SYSTEM INITIALIZATION                                    */
      /* ==================================================================== */

      master
        .to(initialization.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })

        .to(
          initState,
          {
            value: 100,
            duration: 3.5,
            ease: "none",

            onUpdate: () => {
              const value = Math.floor(initState.value);

              if (initializationPercent.current) {
                initializationPercent.current.textContent = `${value}%`;
              }

              if (initializationBar.current) {
                gsap.set(initializationBar.current, {
                  width: `${value}%`,
                });
              }

              if (initializationStatus.current) {
                const statuses = [
                  "INITIALIZING CORE SYSTEM",
                  "CHECKING NAVIGATION ARRAY",
                  "VERIFYING LIFE SUPPORT",
                  "CALIBRATING PROPULSION",
                  "SYNCING FLIGHT CONTROL",
                  "SYSTEMS NOMINAL",
                ];

                const index = Math.min(
                  statuses.length - 1,
                  Math.floor(value / 20),
                );

                initializationStatus.current.textContent = statuses[index];
              }
            },
          },
          "<",
        )

        /* Hold initialization */
        .to(
          {},
          {
            duration: 0.7,
          },
        );

      /* ==================================================================== */
      /* FRAME 02 — WELCOME ABOARD                                           */
      /* ==================================================================== */

      master
        .to(initialization.current, {
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        })

        .to(welcomePassenger.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })

        .to(
          {},
          {
            duration: 1,
          },
        );

      /* ==================================================================== */
      /* FRAME 03 — PILOT IDENTIFICATION                                     */
      /* ==================================================================== */

      master
        .to(welcomePassenger.current, {
          opacity: 0,
          scale: 0.98,
          y: -10,
          duration: 0.35,
          ease: "power2.in",
        })

        .to(pilotProfile.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        })

        .to(
          {},
          {
            duration: 1,
          },
        );

      /* ==================================================================== */
      /* FRAME 04 — SHIP REVEAL                                              */
      /* ==================================================================== */

      master
        .to(pilotProfile.current, {
          opacity: 0,
          scale: 0.98,
          y: -10,
          duration: 0.35,
          ease: "power2.in",
        })

        .to(ship.current, {
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
        })

        .to(ship.current, {
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        })

        .to(
          {},
          {
            duration: 0.8,
          },
        );

      /* ==================================================================== */
      /* FRAME 05 — SYSTEM STATUS                                            */
      /* ==================================================================== */

      master
        .to(systemStatusPanel.current, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        })

        .to(".system-status-row", {
          opacity: 1,
          x: 0,
          duration: 0.45,
          stagger: 0.25,
          ease: "power2.out",
        })

        .to(
          {},
          {
            duration: 0.8,
          },
        );

      /* ==================================================================== */
      /* FRAME 06 — DESTINATION                                              */
      /* ==================================================================== */

      master
        .to(systemStatusPanel.current, {
          opacity: 0,
          x: -20,
          duration: 0.4,
          ease: "power2.in",
        })

        .to(destinationPanel.current, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        })

        .to(
          [
            destinationName.current,
            destinationCode.current,
            destinationDistance.current,
            destinationStatus.current,
          ],
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.15,
            ease: "power2.out",
          },
        )

        .to(destinationBar.current, {
          width: "100%",
          duration: 1,
          ease: "power2.inOut",
        })

        .to(
          {},
          {
            duration: 0.8,
          },
        );

      /* ==================================================================== */
      /* FRAME 07 — NAVIGATION TELEMETRY                                     */
      /* ==================================================================== */

      master
        .to(destinationPanel.current, {
          opacity: 0,
          x: 20,
          duration: 0.4,
          ease: "power2.in",
        })

        .to(gpsPanel.current, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        })

        .to(
          [
            gpsCoordinates.current,
            gpsHeading.current,
            gpsAltitude.current,
            gpsVelocity.current,
            gpsLock.current,
          ],
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.12,
            ease: "power2.out",
          },
        )

        .to(gpsScan.current, {
          width: "100%",
          duration: 1.2,
          ease: "power2.inOut",
        })

        .to(
          {},
          {
            duration: 0.8,
          },
        );

      /* ==================================================================== */
      /* FRAME 08 — NAVIGATION LIGHTS                                        */
      /* ==================================================================== */

      master
        .to(gpsPanel.current, {
          opacity: 0,
          y: 15,
          duration: 0.4,
          ease: "power2.in",
        })

        .to(".nav-light-left, .nav-light-right", {
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
        })

        .to(".ship-light", {
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        })

        .to(shipGlow.current, {
          opacity: 0.65,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        })

        .to(
          {},
          {
            duration: 0.8,
          },
        );

      /* ==================================================================== */
      /* FRAME 09 — ENGINE INITIALIZATION                                    */
      /* ==================================================================== */

      master
        .to(".engine-core", {
          backgroundColor: "#67e8f9",
          boxShadow:
            "0 0 12px rgba(103,232,249,.9), 0 0 28px rgba(59,130,246,.65)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
        })

        .to(".engine-glow", {
          opacity: 0.75,
          duration: 0.7,
          ease: "power2.out",
        })

        .to(".engine-flame", {
          opacity: 0.65,
          scaleY: 0.45,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
        })

        .to(
          {},
          {
            duration: 0.8,
          },
        );

      /* ==================================================================== */
      /* FRAME 10 — READY FOR LAUNCH                                         */
      /* ==================================================================== */

      master
        .to(".engine-flame", {
          opacity: 1,
          scaleY: 1,
          duration: 0.8,
          ease: "power2.inOut",
        })

        .to(".engine-glow", {
          opacity: 1,
          scale: 1.25,
          duration: 0.8,
          ease: "power2.inOut",
        })

        .to(horizon.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        })

        .to(
          {},
          {
            duration: 1,
          },
        );

      /* ==================================================================== */
      /* FRAME 11 — DEPARTURE                                                */
      /* ==================================================================== */

      master
        .to(".engine-flame", {
          scaleY: 1.8,
          opacity: 1,
          duration: 0.5,
          ease: "power2.in",
        })

        .to(
          ".engine-glow",
          {
            scale: 1.5,
            opacity: 1,
            duration: 0.5,
            ease: "power2.in",
          },
          "<",
        )

        .to(ship.current, {
          y: -180,
          scale: 0.62,
          duration: 1.5,
          ease: "power2.in",
        })

        .to(
          horizon.current,
          {
            scaleY: 2.5,
            opacity: 0,
            duration: 1.2,
            ease: "power2.in",
          },
          "<",
        )

        .to(ship.current, {
          y: -360,
          scale: 0.3,
          duration: 1.2,
          ease: "power2.in",
        })

        .to(ship.current, {
          y: -480,
          scale: 0.12,
          duration: 1,
          ease: "power2.in",
        })

        .to(ship.current, {
          y: -550,
          scale: 0.035,
          opacity: 0.85,
          duration: 0.9,
          ease: "power2.in",
        })

        .to(ship.current, {
          scale: 0.001,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={root}
      id="cinematic-hero"
      className="
        relative
        z-10
        h-screen
        w-full
        overflow-hidden
        bg-transparent
        text-white
      "
    >
      {/* ================================================================== */}
      {/* FRAME 01 — INITIALIZATION                                         */}
      {/* ================================================================== */}

      <div
        ref={initialization}
        className="absolute inset-0 z-[100] flex items-center justify-center bg-[#02030a]"
      >
        <div className="w-[min(420px,80vw)]">
          <div className="mb-5 flex items-center justify-between font-mono text-[9px] tracking-[0.35em] text-cyan-300/70">
            <span>SYSTEM INITIALIZATION</span>
            <span>NX-01</span>
          </div>

          <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
            <div
              ref={initializationBar}
              className="absolute inset-y-0 left-0 bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.9)]"
              style={{ width: "0%" }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between font-mono">
            <div
              ref={initializationStatus}
              className="text-[9px] tracking-[0.25em] text-white/40"
            >
              INITIALIZING CORE SYSTEM
            </div>

            <div
              ref={initializationPercent}
              className="text-sm tracking-[0.15em] text-cyan-300"
            >
              0%
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-cyan-300" />

            <span className="font-mono text-[8px] tracking-[0.3em] text-white/20">
              PLEASE WAIT
            </span>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* COCKPIT FRAME                                                      */}
      {/* ================================================================== */}

      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {/* TOP WINDOW FRAME */}
        <div className="absolute left-0 right-0 top-0 h-[90px]">
          <div className="absolute left-0 right-0 top-[54px] h-px bg-cyan-300/70 shadow-[0_0_8px_rgba(34,211,238,0.8),0_0_24px_rgba(34,211,238,0.25)]" />

          <div className="absolute left-[8%] right-[8%] top-[58px] h-px bg-violet-400/25 shadow-[0_0_10px_rgba(139,92,246,0.4)]" />

          <div className="absolute left-0 top-[54px] h-[35px] w-[14%] border-r border-t border-cyan-300/40 [clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]" />

          <div className="absolute right-0 top-[54px] h-[35px] w-[14%] border-l border-t border-cyan-300/40 [clip-path:polygon(0_0,100%_0,100%_100%,14%_100%)]" />

          <div className="absolute left-1/2 top-[48px] h-[13px] w-[110px] -translate-x-1/2 border-x border-cyan-300/50">
            <div className="absolute left-1/2 top-0 h-[2px] w-[42px] -translate-x-1/2 bg-cyan-300/80 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          </div>

          <div className="absolute left-[18%] top-[51px] flex gap-2">
            <span className="h-[7px] w-px bg-cyan-300/50" />
            <span className="h-[4px] w-px bg-cyan-300/30" />
            <span className="h-[7px] w-px bg-cyan-300/50" />
            <span className="h-[4px] w-px bg-cyan-300/30" />
          </div>

          <div className="absolute right-[18%] top-[51px] flex gap-2">
            <span className="h-[4px] w-px bg-cyan-300/30" />
            <span className="h-[7px] w-px bg-cyan-300/50" />
            <span className="h-[4px] w-px bg-cyan-300/30" />
            <span className="h-[7px] w-px bg-cyan-300/50" />
          </div>
        </div>

        {/* TOP HUD */}
        <header className="absolute left-0 right-0 top-10 z-40 px-6 py-6 md:px-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-mono text-xs tracking-[0.45em] text-cyan-300">
                RAMIL
              </div>

              <div className="mt-1 font-mono text-[8px] tracking-[0.35em] text-white/40">
                EXPLORATION SYSTEM
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAudioOn((value) => !value)}
              className="font-mono text-[9px] tracking-[0.25em] text-white/50 transition hover:text-cyan-300"
            >
              AUDIO SYSTEM // {audioOn ? "ONLINE" : "OFFLINE"}
            </button>
          </div>
        </header>

        {/* BOTTOM WINDOW FRAME */}
        <div className="absolute bottom-0 left-0 right-0 h-[120px]">
          <div className="absolute bottom-[55px] left-0 right-0 h-px bg-cyan-300/60 shadow-[0_0_10px_rgba(34,211,238,0.7),0_0_30px_rgba(34,211,238,0.2)]" />

          <div className="absolute bottom-[51px] left-[10%] right-[10%] h-px bg-violet-400/25 shadow-[0_0_12px_rgba(139,92,246,0.35)]" />

          <div className="absolute bottom-0 left-0 right-0 h-[58px] border-t border-white/5 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-[2px]" />

          <div className="absolute bottom-[55px] left-0 h-[42px] w-[18%] border-r border-b border-cyan-300/35 [clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]" />

          <div className="absolute bottom-[55px] right-0 h-[42px] w-[18%] border-l border-b border-cyan-300/35 [clip-path:polygon(0_0,100%_0,100%_100%,14%_100%)]" />

          <div className="absolute bottom-[55px] left-1/2 h-[18px] w-[180px] -translate-x-1/2 border-x border-cyan-300/30">
            <div className="absolute bottom-0 left-1/2 h-px w-[70px] -translate-x-1/2 bg-cyan-300/70 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
          </div>

          <div className="absolute bottom-[51px] left-[22%] flex gap-2">
            <span className="h-[7px] w-px bg-cyan-300/40" />
            <span className="h-[4px] w-px bg-cyan-300/25" />
            <span className="h-[7px] w-px bg-cyan-300/40" />
            <span className="h-[4px] w-px bg-cyan-300/25" />
          </div>

          <div className="absolute bottom-[51px] right-[22%] flex gap-2">
            <span className="h-[4px] w-px bg-cyan-300/25" />
            <span className="h-[7px] w-px bg-cyan-300/40" />
            <span className="h-[4px] w-px bg-cyan-300/25" />
            <span className="h-[7px] w-px bg-cyan-300/40" />
          </div>
        </div>

        {/* Glass reflection */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.025)_42%,transparent_48%,transparent_100%)] opacity-60" />
      </div>

      {/* ================================================================== */}
      {/* FRAME 07 — NAVIGATION TELEMETRY                                   */}
      {/* ================================================================== */}

      <div
        ref={gpsPanel}
        className="absolute bottom-[82px] left-1/2 z-30 hidden w-[420px] -translate-x-1/2 md:block"
      >
        <div className="relative border border-white/10 bg-black/10 p-4 backdrop-blur-sm">
          <HudCorners />

          <div className="flex items-center justify-between">
            <HudLabel>NAVIGATION TELEMETRY</HudLabel>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />

              <span className="font-mono text-[6px] tracking-[0.16em] text-cyan-300/70">
                NAV ONLINE
              </span>
            </div>
          </div>

          <div ref={gpsCoordinates} className="mt-4">
            <div className="font-mono text-[6px] tracking-[0.18em] text-white/30">
              NAVIGATION VECTOR
            </div>

            <div className="mt-1 font-mono text-[11px] tracking-[0.14em] text-cyan-200">
              NX-07&nbsp;&nbsp;/&nbsp;&nbsp;SECTOR
              04&nbsp;&nbsp;/&nbsp;&nbsp;VECTOR 284.6°
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div ref={gpsHeading} className="min-w-0">
              <div className="font-mono text-[6px] tracking-[0.16em] text-white/30">
                HEADING
              </div>

              <div className="mt-1 font-mono text-[10px] tracking-[0.1em] text-white/75">
                284.6°
              </div>
            </div>

            <div ref={gpsAltitude} className="min-w-0">
              <div className="font-mono text-[6px] tracking-[0.16em] text-white/30">
                FLIGHT LEVEL
              </div>

              <div className="mt-1 font-mono text-[10px] tracking-[0.1em] text-white/75">
                FL-184
              </div>
            </div>

            <div ref={gpsVelocity} className="min-w-0">
              <div className="font-mono text-[6px] tracking-[0.16em] text-white/30">
                VELOCITY
              </div>

              <div className="mt-1 font-mono text-[10px] tracking-[0.1em] text-white/75">
                0.00 KM/S
              </div>
            </div>
          </div>

          <div ref={gpsLock} className="mt-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-mono text-[6px] tracking-[0.18em] text-white/30">
                NAVIGATION LOCK
              </span>

              <span className="font-mono text-[6px] tracking-[0.16em] text-cyan-300">
                LOCKED
              </span>
            </div>

            <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
              <div
                ref={gpsScan}
                className="absolute inset-y-0 left-0 w-0 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-mono text-[5px] tracking-[0.18em] text-white/20">
              SAT-LINK 08
            </span>

            <span className="font-mono text-[5px] tracking-[0.18em] text-white/20">
              SIGNAL 98%
            </span>

            <span className="font-mono text-[5px] tracking-[0.18em] text-white/20">
              AUTO NAV
            </span>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* FRAME 05 — SYSTEM STATUS                                          */}
      {/* ================================================================== */}

      <div className="absolute left-6 top-1/2 z-30 hidden w-[230px] -translate-y-1/2 md:block">
        <div
          ref={systemStatusPanel}
          className="system-status-panel relative border border-white/10 bg-black/10 p-5 backdrop-blur-sm"
        >
          <HudCorners />

          <HudLabel>SYSTEM STATUS</HudLabel>

          <div className="mt-5 space-y-4">
            {systemSequence.map((system) => (
              <div key={system.name} className="system-status-row opacity-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.15em] text-white/50">
                    {system.name}
                  </span>

                  <span className="font-mono text-[9px] tracking-[0.15em] text-cyan-300">
                    {system.label}
                  </span>
                </div>

                <div className="mt-2 h-[2px] w-full bg-white/10">
                  <div
                    className="system-status-progress h-full bg-cyan-300"
                    style={{
                      width: `${system.percent}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* FRAME 06 — DESTINATION                                             */}
      {/* ================================================================== */}

      <div
        ref={destinationPanel}
        className="absolute right-6 top-1/2 z-30 hidden w-[230px] -translate-y-1/2 md:block"
      >
        <div className="relative border border-white/10 bg-black/10 p-5 backdrop-blur-sm">
          <HudCorners />

          <HudLabel>DESTINATION</HudLabel>

          <div className="mt-5">
            <div
              ref={destinationName}
              className="font-mono text-[13px] font-semibold tracking-[0.18em] text-white"
            >
              {selectedDestination.name}
            </div>

            <div
              ref={destinationCode}
              className="mt-1 font-mono text-[7px] tracking-[0.22em] text-cyan-300/60"
            >
              TARGET // {selectedDestination.code}
            </div>

            <div ref={destinationDistance} className="mt-5">
              <div className="font-mono text-[7px] tracking-[0.18em] text-white/35">
                DISTANCE
              </div>

              <div className="mt-1 font-mono text-[18px] tracking-[0.08em] text-cyan-300">
                {selectedDestination.distance}
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-mono text-[6px] tracking-[0.18em] text-white/35">
                  NAVIGATION LOCK
                </span>

                <span
                  ref={destinationStatus}
                  className="font-mono text-[6px] tracking-[0.16em] text-cyan-300"
                >
                  {selectedDestination.status}
                </span>
              </div>

              <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
                <div
                  ref={destinationBar}
                  className="absolute inset-y-0 left-0 w-0 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <div className="font-mono text-[6px] tracking-[0.15em] text-white/25">
                  VECTOR
                </div>

                <div className="mt-1 font-mono text-[7px] tracking-[0.1em] text-white/60">
                  LOCKED
                </div>
              </div>

              <div>
                <div className="font-mono text-[6px] tracking-[0.15em] text-white/25">
                  COURSE
                </div>

                <div className="mt-1 font-mono text-[7px] tracking-[0.1em] text-white/60">
                  AUTO
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* FRAME 02 — WELCOME                                                 */}
      {/* ================================================================== */}

      <div
        ref={welcomePassenger}
        className="absolute left-1/2 top-1/2 z-[36] -translate-x-1/2 -translate-y-1/2"
      >
        <WelcomePassenger />
      </div>

      {/* ================================================================== */}
      {/* FRAME 03 — PILOT                                                   */}
      {/* ================================================================== */}

      <div
        ref={pilotProfile}
        className="absolute left-1/2 top-1/2 z-[35] -translate-x-1/2 -translate-y-1/2"
      >
        <PilotProfile />
      </div>

      {/* ================================================================== */}
      {/* HORIZON                                                             */}
      {/* ================================================================== */}

      <div
        ref={horizon}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[68%]
          z-10
          h-[2px]
          w-[70vw]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-cyan-300/40
          to-transparent
          blur-[1px]
        "
      />

      {/* ================================================================== */}
      {/* SPACECRAFT                                                          */}
      {/* ================================================================== */}

      <div
        ref={ship}
        className="absolute left-1/2 top-[57%] z-20 -translate-x-1/2"
      >
        <div
          ref={shipGlow}
          className="absolute inset-0 rounded-full bg-cyan-400/10 blur-[70px]"
        />

        <Spacecraft />
      </div>

      {/* ================================================================== */}
      {/* BOTTOM HUD                                                          */}
      {/* ================================================================== */}

      <div className="absolute bottom-20 left-0 right-0 z-40 px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <HudLabel>CRAFT</HudLabel>

            <div className="mt-1 font-mono text-[10px] tracking-[0.25em] text-white/60">
              EXPLORER // NX-01
            </div>
          </div>

          <div className="mx-auto mt-5 flex w-[160px] flex-col items-center">
            <div className="font-mono text-[7px] tracking-[0.35em] text-white/25">
              SCROLL TO LAUNCH
            </div>

            <div className="mt-3 h-[1px] w-full overflow-hidden bg-white/10">
              <div
                ref={scrollProgress}
                className="h-full w-[4%] bg-cyan-300/70 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
              />
            </div>
          </div>

          <div className="text-right">
            <HudLabel violet>FLIGHT MODE</HudLabel>

            <div className="mt-1 font-mono text-[10px] tracking-[0.25em] text-white/60">
              STANDBY
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* VIGNETTE                                                            */}
      {/* ================================================================== */}

      <div className="pointer-events-none absolute inset-0 z-50 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,.55)_100%)]" />

      {/* ================================================================== */}
      {/* SCANLINES                                                           */}
      {/* ================================================================== */}

      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:100%_4px]" />
    </main>
  );
}
