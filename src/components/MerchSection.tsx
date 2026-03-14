import { useEffect, useRef, useState } from "react";
import {
  Wrench,
  Clock,
  MapPin,
  Phone,
  Settings,
  Zap,
  Shield,
  Gauge,
  Star,
  ChevronRight,
} from "lucide-react";
import { useBooking } from "./BookingContext";

const services = [
  {
    icon: <Settings size={24} />,
    title: "Full Engine Overhaul",
    desc: "Complete engine rebuild, tuning, and performance optimization for all bike models.",
  },
  {
    icon: <Zap size={24} />,
    title: "Performance Upgrades",
    desc: "ECU remapping, exhaust systems, suspension upgrades, and superbike-spec modifications.",
  },
  {
    icon: <Shield size={24} />,
    title: "Custom Bodywork & Paint",
    desc: "Bespoke paint jobs, livery design, and premium body kit installations.",
  },
  {
    icon: <Gauge size={24} />,
    title: "Race Bike Preparation",
    desc: "Track-ready setups, safety checks, and competition compliance tuning.",
  },
  {
    icon: <Wrench size={24} />,
    title: "General Servicing",
    desc: "Oil changes, brake service, chain & sprocket, tire fitting, and routine maintenance.",
  },
  {
    icon: <Star size={24} />,
    title: "Detailing & Restoration",
    desc: "Showroom-quality detailing, vintage restoration, and ceramic coating protection.",
  },
];

const openingHours = [
  { day: "Monday – Friday", time: "10:00 AM – 7:00 PM" },
  { day: "Saturday", time: "10:00 AM – 6:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export function MechanicShopSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="garage"
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
        <div
          className="w-full h-px mb-16"
          style={{ backgroundColor: "#E8FF00", opacity: 0.3 }}
        />

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
          <div>
            <p
              className="tracking-[0.3em] uppercase mb-3"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "#E8FF00",
                fontSize: 13,
              }}
            >
              The Garage
            </p>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: "#fff",
                fontSize: "clamp(36px, 5vw, 56px)",
                lineHeight: 1,
              }}
            >
              ROSSI's <span style={{ color: "#E8FF00" }}>THE DOCTOR MOTO GARAGE</span>
            </h2>
          <p
  className="mt-4 max-w-xl"
  style={{
    fontFamily: "'DM Sans', sans-serif",
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    lineHeight: 1.7,
  }}
>
  Every bike. Every budget. One garage.
  <br />
  Rossi Moto Works serves riders of all kinds, from daily rides to
  track-ready superbikes, with skill, speed and zero compromise.
</p>
          </div>
          {/* <button
            onClick={() => openBooking("general_service")}
            className="self-start lg:self-auto flex items-center gap-2 px-6 py-3 transition-all duration-200 hover:bg-[#d4e600]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              backgroundColor: "#E8FF00",
              color: "#0A0A0A",
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            BOOK A SERVICE <ChevronRight size={16} />
          </button> */}
        </div>

        {/* Top row: Shop image + Details card */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
          {/* Large shop image */}
          <div className="lg:col-span-3 overflow-hidden relative group">
            <img
              src={`${import.meta.env.BASE_URL}images/ws-1.webp`}
              alt="Rossi Moto Works workshop"
              className="w-full h-full object-cover min-h-[320px] transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-4"
              style={{
                background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
              }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: "#E8FF00",
                  fontSize: 20,
                }}
              >
                GARAGE FLOOR
              </span>
            </div>
          </div>

          {/* Details card */}
          <div
            className="lg:col-span-2 p-8 flex flex-col justify-between"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid #1F1F2E",
            }}
          >
            {/* Location */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={18} style={{ color: "#E8FF00" }} />
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#fff",
                      fontSize: 15,
                    }}
                  >
                    Chekkalamukku, Sreekaryam, Near IndianOil Pump
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#8A8A9A",
                      fontSize: 13,
                    }}
                  >
                    Trivandrum, Kerala 695017
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Phone size={18} style={{ color: "#E8FF00" }} />
                <a
                  href="tel:+918289917046"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(255,255,255,0.75)",
                    fontSize: 15,
                    textDecoration: "none",
                  }}
                  className="hover:text-[#E8FF00] transition-colors"
                >
                  +91 82899 17046
                </a>
              </div>

              {/* Opening hours */}
              <div className="flex items-center gap-3 mb-4">
                <Clock size={18} style={{ color: "#E8FF00" }} />
                <span
                  className="uppercase tracking-widest"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    color: "#E8FF00",
                    fontSize: 13,
                  }}
                >
                  Opening Hours
                </span>
              </div>

              <div className="space-y-2 ml-[30px]">
                {openingHours.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>
                      {h.day}
                    </span>
                    <span
                      style={{
                        color: h.time === "Closed" ? "#FF3C00" : "#E8FF00",
                      }}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tagline */}
            <p
              className="mt-8 pt-6"
              style={{
                fontFamily: "'Italiana', serif",
                color: "rgba(232,255,0,0.6)",
                fontSize: 18,
                fontStyle: "italic",
                borderTop: "1px solid #1F1F2E",
              }}
            >
              "Where bikes come to life."
            </p>
          </div>
        </div>

        {/* Two smaller images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          <div className="overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1595345263387-c01f60e7c1b9?w=900"
              alt="Workshop tools"
              className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-5 py-3"
              style={{
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#8A8A9A",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Precision Tools
              </span>
            </div>
          </div>
          <div className="overflow-hidden relative group">
           <img
  src={`${import.meta.env.BASE_URL}images/ws-3.webp`}
  alt="Motorcycle repair service"
  className="w-full h-56 object-cover object-top-left transition-transform duration-700 group-hover:scale-105"
  style={{ objectPosition: "30% 65%" }}
  
/>
            <div
              className="absolute bottom-0 left-0 right-0 px-5 py-3"
              style={{
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#8A8A9A",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Service Bay
              </span>
            </div>
          </div>
        </div>

        {/* Services grid */}
        <h3
          className="mb-10"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: "#fff",
            fontSize: "clamp(28px, 3.5vw, 40px)",
          }}
        >
          OUR <span style={{ color: "#E8FF00" }}>SERVICES</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="p-6 transition-all duration-300 hover:-translate-y-1 group"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid #1F1F2E",
              }}
            >
              <div
                className="mb-4 transition-colors duration-300 group-hover:text-[#E8FF00]"
                style={{ color: "#8A8A9A" }}
              >
                {s.icon}
              </div>
              <h4
                className="mb-2"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                {s.title}
              </h4>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#8A8A9A",
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
