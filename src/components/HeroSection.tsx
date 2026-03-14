import { useEffect, useRef } from "react";
import { useBooking } from "./BookingContext";
import HeroImage from "../assets/hero.jpeg";

export function HeroSection() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let pos = 0;
    const speed = 1;
    const animate = () => {
      pos -= speed;
      if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full flex flex-col justify-center"
      style={{ minHeight: "100vh" }}
    >
      {/* BG Image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${HeroImage})`,
          filter: "blur(4px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(10,10,10,1) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-24 md:pt-40">
        <p
          className="tracking-[0.3em] uppercase mb-4"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: "#E8FF00",
            fontSize: 14,
          }}
        >
          Professional Racer & Stunter
        </p>
        <h1
          className="leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(50px, 8vw, 100px)",
            lineHeight: 0.95,
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.5)",
          }}
        >
          ROSSI
        </h1>
        <h2
          className="leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: "#fff",
            fontSize: "clamp(80px, 12vw, 160px)",
            lineHeight: 0.9,
          }}
        >
          VISHNU JITH
        </h2>
        <p
          className="mt-6 max-w-md"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.6)",
            fontSize: 18,
            fontStyle: "italic",
          }}
        >
          Born to Ride. Built to Race.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() => scrollTo("gallery")}
            className="px-8 py-3 transition-all duration-200 hover:bg-[#d4e600]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              backgroundColor: "#E8FF00",
              color: "#0A0A0A",
              fontSize: 14,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
            }}
          >
            SEE MY WORK
          </button>
          <button
            onClick={() => openBooking()}
            className="px-8 py-3 transition-all duration-200 hover:bg-white/10"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              backgroundColor: "transparent",
              color: "#fff",
              fontSize: 14,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.4)",
              cursor: "pointer",
            }}
          >
            BOOK AN APPEARANCE
          </button>
        </div>
      </div>

      {/* Bottom ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden py-4"
        style={{
          backgroundColor: "rgba(10,10,10,0.85)",
          borderTop: "1px solid #1F1F2E",
        }}
      >
        <div ref={tickerRef} className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="mx-8"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "#8A8A9A",
                fontSize: 14,
                letterSpacing: "0.1em",
              }}
            >
              🏆 46 Championship Wins &nbsp;&nbsp;·&nbsp;&nbsp; ⚡ 50+ Stunt
              Shows &nbsp;&nbsp;·&nbsp;&nbsp; 🏍️ Competing Since 2010
              &nbsp;&nbsp;·&nbsp;&nbsp; 🎥 7 Movies &nbsp;&nbsp;·&nbsp;&nbsp; 🔥
              20K+ Fans &nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
