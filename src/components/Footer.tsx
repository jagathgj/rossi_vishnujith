import { Instagram, Youtube, Facebook } from "lucide-react";

const navLinks = [
  "Home",
  "About",
  "Gallery",
  "Events",
  "Garage",
  "Contact",
];

export function Footer() {
  const scrollTo = (id: string) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{ borderTop: "2px solid #E8FF00", backgroundColor: "#0A0A0A" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Left */}
          <div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: "#E8FF00",
                fontSize: 28,
              }}
            >
              ROSSI VISHNUJITH
            </div>
            <p
              className="mt-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#8A8A9A",
                fontSize: 14,
                fontStyle: "italic",
              }}
            >
              Born to Ride. Built to Race.
            </p>
          </div>

          {/* Center */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="transition-colors hover:text-[#E8FF00]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#8A8A9A",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex gap-3 md:justify-end">
            {[
              { icon: <Instagram size={18} />, label: "Instagram", url: "https://instagram.com/rossivishnujith" },
              { icon: <Youtube size={18} />, label: "YouTube", url: "https://youtube.com/@rossivishnujith" },
              { icon: <Facebook size={18} />, label: "Facebook", url: "https://facebook.com/rossivishnujith" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:bg-[#E8FF00] hover:text-[#0A0A0A]"
                style={{
                  border: "1px solid #1F1F2E",
                  backgroundColor: "transparent",
                  color: "#8A8A9A",
                  textDecoration: "none",
                }}
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-6 py-4 flex flex-wrap justify-between items-center gap-2"
        style={{ borderTop: "1px solid #1F1F2E" }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#8A8A9A",
            fontSize: 12,
          }}
        >
          © {new Date().getFullYear()} Rossi Vishnujith. All rights reserved.
        </span>
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: "#8A8A9A",
            fontSize: 12,
            letterSpacing: "0.1em",
          }}
        >
          Designed for Speed by{" "}
          <a target="_blank" href="https://www.hellojagath.com">
            hellojagath.com
          </a>
        </span>
      </div>
    </footer>
  );
}
