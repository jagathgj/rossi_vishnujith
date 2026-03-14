import { useState, useEffect } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { useBooking } from "./BookingContext";
import { motion } from "motion/react";

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
                className="px-1 py-0.5 text-xs flex items-center mb-1"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  backgroundColor: "#E8FF00",
                  color: "#0A0A0A",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                #46
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
  <motion.button
    key={link}
    onClick={() => scrollTo(link)}
    className="relative tracking-widest uppercase cursor-pointer"
    style={{
      fontFamily: "'Barlow Condensed', sans-serif",
      color: "#fff",
      fontSize: 13,
      background: "none",
      border: "none",
      letterSpacing: "0.1em",
    }}
    whileHover="hover"
    whileTap={{ scale: 0.95 }}
    animate={{ color: "#fff" }}
  >
    <motion.span
      className="block"
      variants={{
        hover: {
          color: "#E8FF00",
          skewX: -6,
          x: 2,
          transition: { duration: 0.15 },
        },
      }}
    >
      {link}
    </motion.span>
  </motion.button>
))}
            <motion.button
  onClick={() => scrollTo("contact")}
  className="relative overflow-hidden px-6 py-2 cursor-pointer"
  style={{
    fontFamily: "'Barlow Condensed', sans-serif",
    backgroundColor: "#E8FF00",
    color: "#0A0A0A",
    fontSize: 13,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    border: "none",
  }}
  whileHover="hover"
  whileTap={{ scale: 0.95 }}
>
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
    BOOK ROSSI
  </motion.span>
</motion.button>
            <a
              href="https://www.instagram.com/rossi_xrz"
              target="_blank"
              rel="noopener noreferrer"
              className="-ml-4 flex items-center justify-center w-9 h-9 transition-colors duration-200 hover:text-[#E8FF00]"
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
            <motion.button
              onClick={() => scrollTo("contact")}
              className="relative overflow-hidden cursor-pointer"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                backgroundColor: "#E8FF00",
                color: "#0A0A0A",
                fontSize: 16,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                padding: "12px 32px",
              }}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0"
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
                BOOK ROSSI
              </motion.span>
            </motion.button>
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
