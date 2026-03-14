import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "motion/react";
import { useBooking } from "./BookingContext";
import HeroImage from "../assets/hero.webp";
import RacerCutout from "../assets/racer-cutout.png";

const TICKER_ITEMS = [
  "🏆 46 Championship Wins",
  "⚡ 50+ Stunt Shows",
  "🏍️ Competing Since 2010",
  "🎥 7 Movies",
  "🔥 20K+ Fans",
];

export function HeroSection() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  const racerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Ticker animation
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let pos = 0;
    const speed = 0.8;
    let id: number;
    const animate = () => {
      pos -= speed;
      if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  // Single source of truth for title offset
  const getOffset = useCallback(() => {
    if (window.innerWidth < 768) return -180;
    if (window.innerWidth < 1280) return -130;
    return -140;
  }, []);

  // Mount + resize effect
  useEffect(() => {
    const applyOffset = () => {
      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${getOffset()}px)`;
      }
    };
    applyOffset();
    window.addEventListener("resize", applyOffset);
    return () => window.removeEventListener("resize", applyOffset);
  }, [getOffset]);

  // Parallax scroll handler
  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const y = window.scrollY;
      const offset = getOffset();
      if (racerRef.current) {
        racerRef.current.style.transform = `translate(-50%, ${-y * 0.08}px)`;
      }
      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(calc(${offset}px + ${-y * 0.8}px))`;
      }
    });
  }, [getOffset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* LAYER 1: Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${HeroImage})` }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Diagonal speed lines */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 50px,
            rgba(232,255,0,0.6) 50px,
            rgba(232,255,0,0.6) 51px
          )`,
        }}
      />

      {/* Radial glow behind racer */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 1,
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: "clamp(400px, 60vw, 800px)",
          height: "clamp(400px, 70vh, 800px)",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,255,0,0.07) 0%, rgba(232,255,0,0.02) 50%, transparent 80%)",
        }}
      />

      {/* LAYER 2 (z-2): Title — BEHIND racer */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{ zIndex: 2 }}
      >
        <div className="flex flex-col items-center text-center select-none px-4">
          <div style={{ position: "relative" }}>
  <motion.p
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.3 }}
    className="uppercase mb-3 w-full text-center"
    style={{
      fontFamily: "'Barlow Condensed', sans-serif",
      color: "#E8FF00",
      fontSize: "clamp(11px, 1.5vw, 16px)",
      fontWeight: 600,
      letterSpacing: "0.35em",
      wordSpacing: "0.2em",
    }}
  >
    Professional Racer & Stunter
  </motion.p>

  {/* ROSSI outline */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.5 }}
    style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(70px, 16vw, 180px)",
      lineHeight: 0.85,
      color: "transparent",
      WebkitTextStroke: "2px rgba(255,255,255,0.35)",
      letterSpacing: "0.05em",
    }}
  >
    ROSSI
  </motion.div>
</div>

          {/* VISHNU JITH */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="leading-none whitespace-nowrap"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(80px, 20vw, 220px)",
              lineHeight: 0.85,
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ color: "#ffffff" }}>VISHNU </span>
            <span style={{ color: "#E8FF00" }}>JITH</span>
          </motion.div>
        </div>
      </div>

      {/* LAYER 3 (z-3): Racer cutout — IN FRONT of title */}
      <div
        ref={racerRef}
        className="absolute pointer-events-none will-change-transform bottom-0 md:bottom-[48px]"
        style={{
          zIndex: 3,
          left: "50%",
          transform: "translateX(-50%)",
          width: "max-content",
        }}
      >
        <motion.img
          src={RacerCutout}
          alt="Vishnu Jith — Professional Racer & Stunter"
          className="select-none object-contain block mx-auto"
          style={{
            height: "clamp(780px, 50vmax, 700px)",
            minHeight: "480px",
            minWidth: "380px",
            width: "auto",
            maxWidth: "none",
            mixBlendMode: "luminosity",
            filter:
              "drop-shadow(0 25px 80px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(0,0,0,0.5))",
          }}
          initial={{ opacity: 0, scale: 0.9, y: 60 }}
          animate={{
            opacity: imageLoaded ? 1 : 0,
            scale: imageLoaded ? 1 : 0.9,
            y: imageLoaded ? 0 : 60,
          }}
          transition={{ duration: 1.3, delay: 0.1, ease: "easeOut" }}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* LAYER 4 (z-4): Bottom fade */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          zIndex: 4,
          bottom: "44px",
          height: "25vh",
          background:
            "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.85) 30%, rgba(10,10,10,0.4) 60%, transparent 100%)",
        }}
      />

      {/* LAYER 5 (z-5): Tagline + CTAs */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center pointer-events-none"
        style={{
          zIndex: 5,
          bottom: "clamp(70px, 10vh, 120px)",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mb-5 md:mb-6 text-center px-4"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.6)",
            fontSize: "clamp(13px, 1.4vw, 17px)",
            fontStyle: "italic",
            lineHeight: 1.6,
          }}
        >
          Born to Ride. Built to Race.
        </motion.p>

        <motion.div
  className="flex flex-wrap justify-center gap-3 md:gap-4 pointer-events-auto"
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1.2 }}
>
  {/* SEE MY WORK — primary */}
  <motion.button
    onClick={() => scrollTo("gallery")}
    className="relative overflow-hidden cursor-pointer active:scale-95"
    style={{
      fontFamily: "'Barlow Condensed', sans-serif",
      backgroundColor: "#E8FF00",
      color: "#0A0A0A",
      fontSize: "clamp(12px, 1.1vw, 14px)",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      border: "none",
      fontWeight: 600,
      padding: "12px 28px",
    }}
    whileHover="hover"
    whileTap={{ scale: 0.95 }}
  >
    {/* Speed streak overlay */}
    <motion.span
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
        x: "-100%",
      }}
      variants={{
        hover: {
          x: "200%",
          transition: { duration: 0.4, ease: "easeIn" },
        },
      }}
    />
    {/* Skew text on hover */}
    <motion.span
      className="relative z-10 block"
      variants={{
        hover: {
          skewX: -8,
          x: 4,
          transition: { duration: 0.2 },
        },
      }}
    >
      SEE MY WORK
    </motion.span>
  </motion.button>

  {/* BOOK AN APPEARANCE — secondary */}
  <motion.button
    onClick={() => openBooking()}
    className="relative overflow-hidden cursor-pointer active:scale-95"
    style={{
      fontFamily: "'Barlow Condensed', sans-serif",
      backgroundColor: "transparent",
      color: "#fff",
      fontSize: "clamp(12px, 1.1vw, 14px)",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      border: "1px solid rgba(255,255,255,0.4)",
      fontWeight: 600,
      padding: "12px 28px",
    }}
    whileHover="hover"
    whileTap={{ scale: 0.95 }}
  >
    {/* Speed streak overlay */}
    <motion.span
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "linear-gradient(105deg, transparent 30%, rgba(232,255,0,0.2) 50%, transparent 70%)",
        x: "-100%",
      }}
      variants={{
        hover: {
          x: "200%",
          transition: { duration: 0.4, ease: "easeIn" },
        },
      }}
    />
    {/* Border flash on hover */}
    <motion.span
      className="absolute inset-0 pointer-events-none"
      style={{ border: "1px solid transparent" }}
      variants={{
        hover: {
          border: "1px solid #E8FF00",
          transition: { duration: 0.2 },
        },
      }}
    />
    {/* Skew text on hover */}
    <motion.span
      className="relative z-10 block"
      variants={{
        hover: {
          skewX: -8,
          x: 4,
          transition: { duration: 0.2 },
        },
      }}
    >
      BOOK AN APPEARANCE
    </motion.span>
  </motion.button>
</motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ zIndex: 6, bottom: "clamp(56px, 7vh, 80px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: "rgba(255,255,255,0.3)",
              fontSize: 9,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div className="w-[1px] h-5 relative overflow-hidden">
            <motion.div
              className="w-full h-full"
              style={{ backgroundColor: "#E8FF00" }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* LAYER 6: Bottom ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden py-3 md:py-3.5"
        style={{
          zIndex: 8,
          backgroundColor: "rgba(10,10,10,0.95)",
          borderTop: "1px solid rgba(232,255,0,0.08)",
        }}
      >
        <div ref={tickerRef} className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="mx-6 md:mx-8"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "#8A8A9A",
                fontSize: "clamp(11px, 1.2vw, 14px)",
                letterSpacing: "0.1em",
              }}
            >
              {TICKER_ITEMS.map((item, j) => (
                <span key={j}>
                  {item}&nbsp;&nbsp;·&nbsp;&nbsp;
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}