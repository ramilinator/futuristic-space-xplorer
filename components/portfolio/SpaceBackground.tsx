"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Star = {
  el: HTMLDivElement;
  x: number;
  y: number;
  z: number;
  baseZ: number;
  size: number;
  speed: number;
};

const STAR_COUNT = 220;
const MAX_DEPTH = 1800;
const MIN_DEPTH = 20;

export default function SpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const stars: Star[] = [];

    /*
    |--------------------------------------------------------------------------
    | CREATE STARFIELD
    |--------------------------------------------------------------------------
    */

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement("div");

      star.className = "absolute rounded-full bg-white pointer-events-none";

      const size = 1 + Math.random() * 2;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      container.appendChild(star);

      const starData: Star = {
        el: star,

        // Position relative to the center of the viewport
        x: (Math.random() - 0.5) * window.innerWidth * 2.5,
        y: (Math.random() - 0.5) * window.innerHeight * 2.5,

        // Initial depth
        z: MIN_DEPTH + Math.random() * MAX_DEPTH,

        baseZ: MIN_DEPTH + Math.random() * MAX_DEPTH,

        size,

        // Individual star speed
        speed: 0.7 + Math.random() * 1.8,
      };

      stars.push(starData);
    }

    starsRef.current = stars;

    /*
    |--------------------------------------------------------------------------
    | RENDER STAR
    |--------------------------------------------------------------------------
    */

    const renderStar = (star: Star) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      /*
       * Perspective projection.
       *
       * As Z becomes smaller, the star appears
       * larger and farther away from the center.
       */

      const perspective = 900;

      const scale = perspective / star.z;

      const screenX = centerX + star.x * scale;
      const screenY = centerY + star.y * scale;

      /*
       * If the star gets too close to the camera,
       * recycle it to the far distance.
       */

      if (
        screenX < -200 ||
        screenX > window.innerWidth + 200 ||
        screenY < -200 ||
        screenY > window.innerHeight + 200
      ) {
        star.z = MAX_DEPTH;
      }

      /*
       * Opacity increases as the star approaches.
       */

      const opacity = Math.min(1, Math.max(0.15, 1 - star.z / MAX_DEPTH));

      /*
       * Star size increases dramatically near camera.
       */

      const projectedSize = Math.max(1, star.size * scale);

      star.el.style.transform = `
        translate3d(
          ${screenX}px,
          ${screenY}px,
          0
        )
        translate(-50%, -50%)
      `;

      star.el.style.width = `${projectedSize}px`;
      star.el.style.height = `${projectedSize}px`;
      star.el.style.opacity = `${opacity}`;
    };

    /*
    |--------------------------------------------------------------------------
    | INITIAL RENDER
    |--------------------------------------------------------------------------
    */

    stars.forEach(renderStar);

    /*
    |--------------------------------------------------------------------------
    | ANIMATION LOOP
    |--------------------------------------------------------------------------
    */

    let animationFrame = 0;

    const animate = () => {
      stars.forEach((star) => {
        /*
         * Forward camera movement.
         *
         * Smaller Z = closer to camera.
         */

        star.z -= star.speed;

        /*
         * Recycle stars after passing the camera.
         */

        if (star.z <= MIN_DEPTH) {
          star.z = MAX_DEPTH;

          star.x = (Math.random() - 0.5) * window.innerWidth * 2.5;

          star.y = (Math.random() - 0.5) * window.innerHeight * 2.5;
        }

        renderStar(star);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    /*
    |--------------------------------------------------------------------------
    | START
    |--------------------------------------------------------------------------
    */

    animate();

    /*
    |--------------------------------------------------------------------------
    | SCROLL SPEED CONTROL
    |--------------------------------------------------------------------------
    */

    const speedController = {
      value: 1,
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=9000",
      scrub: true,

      onUpdate: (self) => {
        /*
         * 0 → 1
         */
        const progress = self.progress;

        /*
         * Ease the acceleration.
         *
         * At the beginning the stars move slowly.
         * Toward the middle they accelerate.
         */

        const targetSpeed = 0.15 + Math.pow(progress, 1.8) * 18;

        gsap.to(speedController, {
          value: targetSpeed,
          duration: 0.25,
          overwrite: true,
        });
      },
    });

    /*
    |--------------------------------------------------------------------------
    | APPLY SCROLL SPEED
    |--------------------------------------------------------------------------
    */

    const originalAnimate = animate;

    // Override the movement loop with scroll-controlled speed
    cancelAnimationFrame(animationFrame);

    const flightLoop = () => {
      stars.forEach((star) => {
        star.z -= star.speed * speedController.value;

        /*
         * Recycle star after passing camera.
         */

        if (star.z <= MIN_DEPTH) {
          star.z = MAX_DEPTH;

          star.x = (Math.random() - 0.5) * window.innerWidth * 2.5;

          star.y = (Math.random() - 0.5) * window.innerHeight * 2.5;
        }

        renderStar(star);
      });

      animationFrame = requestAnimationFrame(flightLoop);
    };

    flightLoop();

    /*
    |--------------------------------------------------------------------------
    | RESIZE
    |--------------------------------------------------------------------------
    */

    const handleResize = () => {
      stars.forEach((star) => {
        renderStar(star);
      });
    };

    window.addEventListener("resize", handleResize);

    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    return () => {
      cancelAnimationFrame(animationFrame);

      scrollTrigger.kill();

      window.removeEventListener("resize", handleResize);

      stars.forEach((star) => {
        star.el.remove();
      });

      starsRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        fixed
        inset-0
        overflow-hidden
        pointer-events-none
        bg-[#02030a]
        z-0
      "
    />
  );
}
