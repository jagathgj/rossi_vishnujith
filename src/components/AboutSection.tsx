import { useEffect, useRef, useState } from "react";
import RossiPortrait from "../assets/trophy1.jpeg";

const stats = [
  { value: "16+", label: "Years" },
  { value: "50+", label: "Shows" },
  { value: "45", label: "Trophies" },
  { value: "4", label: "States" },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-6"
      style={{ backgroundColor: "#111318" }}
    >
      <div
        className="max-w-[1400px] mx-auto transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <h2
          className="mb-16"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: "#fff",
            fontSize: "clamp(36px, 5vw, 56px)",
          }}
        >
          ABOUT <span style={{ color: "#E8FF00" }}>ROSSI</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Photo */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            <div
              className="absolute -top-8 -left-4 select-none pointer-events-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(80px, 15vw, 200px)",
                color: "rgba(232,255,0,0.06)",
                lineHeight: 1,
              }}
            >
              #46
            </div>
            <div
              className="relative z-10 overflow-hidden w-full"
              style={{
                border: "3px solid #E8FF00",
                transform: "rotate(-2deg)",
              }}
            >
              <img
                src={RossiPortrait}
                alt="Rossi Vishnujith portrait"
                className="w-full h-auto block object-cover"
                style={{
                  transform: "rotate(2deg) scale(1.05)",
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>

          {/* Right - Bio */}
          <div>
            <p
              className="mb-5"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.75)",
                fontSize: 16,
                lineHeight: 1.8,
              }}
            >
              Rossi Vishnujith is Kerala's own professional bike racer, stunt
              performer, and show rider. From tearing through race circuits to
              commanding a crowd at live stunt shows, Rossi does it all on two
              wheels.
            </p>
            <p
              className="mb-5"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.75)",
                fontSize: 16,
                lineHeight: 1.8,
              }}
            >
              On screen, he is the stunt rider behind some of Malayalam cinema's
              biggest action sequences, with credits in Kaappa, Kannur Squad, Bazooka,
              Rifle Club, Cut Mango tree, Cosmic Samson and Kollam Kott Company. On track, he has competed in nearly every race
              circuit across Kerala, building a reputation as one of the state's
              most fearless and consistent riders.
            </p>
            <p
              className="mb-5"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.75)",
                fontSize: 16,
                lineHeight: 1.8,
              }}
            >
              Off the track and screen, Rossi takes his craft to live audiences
              through high-energy stunt performances and shows, delivering the
              kind of riding that leaves crowds on their feet.
            </p>

            <p
              className="mb-5"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.75)",
                fontSize: 16,
                lineHeight: 1.8,
              }}
            >
              Born and raised in Kerala, he is not just a rider. He is the guy
              the industry calls when the stunt has to be real, the race has to
              be won, and the crowd has to be wowed.
            </p>

            <p
              className="mb-10 mt-8"
              style={{
                fontFamily: "'Italiana', serif",
                color: "rgba(232,255,0,0.7)",
                fontSize: 20,
                fontStyle: "italic",
              }}
            >
              "My biggest rival rides in my mirror."
            </p>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center py-5 px-3"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid #1F1F2E",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      color: "#E8FF00",
                      fontSize: 36,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: "#8A8A9A",
                      fontSize: 13,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
