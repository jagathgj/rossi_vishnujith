import { Instagram, Youtube, Facebook } from "lucide-react";
import { motion } from "motion/react";

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

  const socialLinks = [
    { icon: <Instagram size={18} />, label: "Instagram", url: "https://instagram.com/rossivishnujith", color: "#E1306C" },
    { icon: <Youtube size={18} />, label: "YouTube", url: "https://www.youtube.com/watch?v=zvXFvvBGH-Y", color: "#FF0000" },
    { icon: <Facebook size={18} />, label: "Facebook", url: "https://facebook.com/rossivishnujith", color: "#1877F2" },
  ];

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

          {/* Center - Nav links with speed hover */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
            {navLinks.map((link) => (
              <motion.button
                key={link}
                onClick={() => scrollTo(link)}
                className="relative cursor-pointer"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#8A8A9A",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                }}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
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
          </div>

          {/* Right - Social icons with brand color fill */}
          <div className="flex gap-3 md:justify-end">
            {socialLinks.map(({ icon, label, url, color }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="relative flex items-center justify-center w-10 h-10 overflow-hidden cursor-pointer"
                style={{
                  border: "1px solid #1F1F2E",
                  color: "#8A8A9A",
                  textDecoration: "none",
                }}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <motion.span
                  className="absolute inset-0"
                  style={{ backgroundColor: color, opacity: 0 }}
                  variants={{
                    hover: { opacity: 1, transition: { duration: 0.2 } },
                  }}
                />
                <motion.span
                  className="relative z-10"
                  variants={{
                    hover: { scale: 1.2, color: "#fff", transition: { duration: 0.2 } },
                  }}
                >
                  {icon}
                </motion.span>
              </motion.a>
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