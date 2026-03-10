import { useEffect, useRef } from "react";

const sponsors = ["SPONSOR A", "SPONSOR B", "SPONSOR C", "SPONSOR D", "SPONSOR E", "SPONSOR F"];

export function SponsorsSection() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let pos = 0;
    const animate = () => {
      pos -= 0.5;
      if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="sponsors" className="py-24 px-6" style={{ backgroundColor: "#141414" }}>
      <div className="max-w-[1400px] mx-auto text-center">
        <h2
          className="mb-4"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: "#fff",
            fontSize: "clamp(36px, 5vw, 56px)",
          }}
        >
          POWERED <span style={{ color: "#E8FF00" }}>BY</span>
        </h2>
        <p
          className="mb-16"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#8A8A9A",
            fontSize: 16,
          }}
        >
          Brands that trust the ride
        </p>

        <div className="overflow-hidden">
          <div ref={tickerRef} className="flex whitespace-nowrap">
            {[...sponsors, ...sponsors, ...sponsors].map((s, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-4 flex items-center justify-center"
                style={{
                  width: 180,
                  height: 80,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid #1F1F2E",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    color: "#8A8A9A",
                    fontSize: 14,
                    letterSpacing: "0.15em",
                  }}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <button
            className="transition-colors duration-200 hover:text-[#E8FF00]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: "#8A8A9A",
              fontSize: 14,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Become a Sponsor →
          </button>
        </div>
      </div>
    </section>
  );
}
