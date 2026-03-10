import { useEffect, useRef, useState } from "react";
import { MapPin, Clock } from "lucide-react";

interface Event {
  date: string;
  year: string;
  name: string;
  location: string;
  time: string;
}

export function EventsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // Use base path in development, root path in production
    const basePath = import.meta.env.DEV ? '/carbon-react-template-v11' : '';
    fetch(`${basePath}/data/events.json`)
      .then(res => res.json())
      .then(data => setEvents(data.events))
      .catch(err => console.error('Failed to load events:', err));
  }, []);

  return (
    <section id="events" ref={ref} className="py-24 px-6" style={{ backgroundColor: "#0A0A0A" }}>
      <div
        className="max-w-[1400px] mx-auto transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <div className="w-full h-px mb-16" style={{ backgroundColor: "#E8FF00", opacity: 0.3 }} />
        <h2
          className="mb-16"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: "#fff",
            fontSize: "clamp(36px, 5vw, 56px)",
          }}
        >
          UPCOMING <span style={{ color: "#E8FF00" }}>EVENTS</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((ev) => (
            <div
              key={ev.name}
              className="p-6 transition-all duration-300 hover:-translate-y-1 group"
              style={{
                backgroundColor: "#111318",
                border: "1px solid #1F1F2E",
              }}
            >
              <div
                className="mb-4"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: "#E8FF00",
                  fontSize: 42,
                  lineHeight: 1,
                }}
              >
                {ev.date}
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#8A8A9A",
                  fontSize: 13,
                  letterSpacing: "0.05em",
                }}
              >
                {ev.year}
              </div>
              <h3
                className="mt-4 mb-3"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                {ev.name}
              </h3>
              <div className="flex items-center gap-2 mb-2" style={{ color: "#8A8A9A", fontSize: 13 }}>
                <MapPin size={14} />
                <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{ev.location}</span>
              </div>
              <div className="flex items-center gap-2 mb-6" style={{ color: "#8A8A9A", fontSize: 13 }}>
                <Clock size={14} />
                <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{ev.time}</span>
              </div>
              <button
                className="w-full py-2.5 transition-all duration-200 hover:bg-[#E8FF00] hover:text-[#0A0A0A]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#E8FF00",
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  border: "1px solid #E8FF00",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                GET TICKETS
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
