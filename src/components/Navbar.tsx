import { useState, useEffect } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { useBooking } from "./BookingContext";

const navLinks = ["Home", "About", "Gallery", "Events", "Garage"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="cursor-pointer flex items-center gap-3"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#E8FF00", fontSize: 28 }}
                className="tracking-wide"
              >
                Vishnu Jith
              </span>
              <span
                className="px-1 py-0.5 text-xs flex items-center"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  backgroundColor: "#E8FF00",
                  color: "#0A0A0A",
                  fontSize: 14,
                }}
              >
                #46
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="transition-colors duration-200 tracking-widest uppercase hover:text-[#E8FF00]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#fff",
                  fontSize: 13,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                }}
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-2 transition-all duration-200 hover:bg-[#d4e600]"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                backgroundColor: "#E8FF00",
                color: "#0A0A0A",
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
              }}
            >
              BOOK ROSSI
            </button>
            <a
              href="https://www.instagram.com/rossi_xrz"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 flex items-center justify-center w-9 h-9 transition-colors duration-200 hover:text-[#E8FF00]"
              style={{ color: "#fff" }}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {mobileOpen ? <X color="#E8FF00" size={28} /> : <Menu color="#fff" size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: "rgba(10,10,10,0.97)" }}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="transition-colors hover:text-[#E8FF00]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: "#fff",
                fontSize: 32,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {link}
            </button>
          ))}
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={() => scrollTo("contact")}
              className="px-8 py-3"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                backgroundColor: "#E8FF00",
                color: "#0A0A0A",
                fontSize: 16,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
              }}
            >
              BOOK ROSSI
            </button>
            <a
              href="https://www.instagram.com/rossi_xrz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 transition-colors duration-200 hover:text-[#E8FF00]"
              style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
