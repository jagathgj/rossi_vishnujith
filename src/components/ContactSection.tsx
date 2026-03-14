import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook } from "lucide-react";
import { motion } from "motion/react";

type ContactItem = {
  icon: React.ReactNode;
  text: React.ReactNode;
};

type SocialLink = {
  icon: React.ReactNode;
  label: string;
  url: string;
  color: string;
};

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const inputStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid #1F1F2E",
    color: "#fff",
    padding: "12px 16px",
    fontSize: 14,
    width: "100%",
    outline: "none",
  };

  const contactItems: ContactItem[] = [
    {
      icon: <Mail size={18} />,
      text: (
        <a
          href="mailto:rossi@rossirides.com"
          style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}
          className="hover:text-[#E8FF00] transition-colors"
        >
          rossi@rossirides.com
        </a>
      ),
    },
    {
      icon: <Phone size={18} />,
      text: (
        <a
          href="tel:+918289917046"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}
          className="hover:text-[#E8FF00] transition-colors"
        >
          +91 82899 17046
        </a>
      ),
    },
    {
      icon: <Instagram size={18} />,
      text: (
        <a
          href="https://www.instagram.com/rossi_xrz"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}
          className="hover:text-[#E8FF00] transition-colors"
        >
          @rossi_xrz
        </a>
      ),
    },
    {
      icon: <MapPin size={18} />,
      text: (
        <span style={{ color: "rgba(255,255,255,0.75)" }}>
          Kerala, India
        </span>
      ),
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: <Instagram size={20} />,
      label: "Instagram",
      url: "https://www.instagram.com/rossi_xrz?igsh=cWl5bHhlZDB1cDAx",
      color: "#E1306C",
    },
    {
      icon: <Youtube size={20} />,
      label: "YouTube",
      url: "https://www.youtube.com/watch?v=zvXFvvBGH-Y",
      color: "#FF0000",
    },
    {
      icon: <Facebook size={20} />,
      label: "Facebook",
      url: "https://facebook.com/rossivishnujith",
      color: "#1877F2",
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-24 px-6" style={{ backgroundColor: "#0F0F0F" }}>
      <div
        className="max-w-[1400px] mx-auto transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <div className="w-full h-px mb-16" style={{ backgroundColor: "#E8FF00", opacity: 0.3 }} />
        <h2
          className="mb-2"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: "#fff",
            fontSize: "clamp(36px, 5vw, 56px)",
          }}
        >
          BOOK <span style={{ color: "#E8FF00" }}>ROSSI</span>
        </h2>
        <p
          className="mb-16"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#8A8A9A",
            fontSize: 16,
          }}
        >
          For racing, shows, sponsorships, and appearances
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Contact info */}
          <div>
            <div className="space-y-6">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div style={{ color: "#E8FF00" }}>{item.icon}</div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social icons with brand color fill */}
            <div className="flex gap-4 mt-10">
              {socialLinks.map(({ icon, label, url, color }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="relative flex items-center justify-center w-11 h-11 overflow-hidden cursor-pointer"
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

          {/* Right - Form */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://hellojagath.com/api/book-rossi.php";

              if (import.meta.env.DEV) {
                alert("📧 Form submission in development mode.\n\nWill send to: " + backendUrl + "\n\nForm data:\n" +
                  JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.eventType,
                    message: formData.message,
                  }, null, 2));
                setFormData({ name: "", email: "", phone: "", eventType: "", message: "" });
                return;
              }

              try {
                const response = await fetch(backendUrl, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.eventType,
                    date: "",
                    message: formData.message,
                  }),
                });
                const result = await response.json();
                if (result.success) {
                  alert("✅ " + result.message);
                  setFormData({ name: "", email: "", phone: "", eventType: "", message: "" });
                } else {
                  alert("❌ " + result.message);
                }
              } catch (error) {
                console.error("Form submission error:", error);
                alert("❌ Failed to send request. Please try again or contact us directly at rossi@rossirides.com");
              }
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
              required
            />
            <input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={inputStyle}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={inputStyle}
              required
            />
            <select
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              style={{
                ...inputStyle,
                appearance: "none",
                color: formData.eventType ? "#fff" : "#8A8A9A",
              }}
              required
            >
              <option value="" disabled>Select Event Type *</option>
              <option value="stunt_show">Stunt Show</option>
              <option value="race_event">Race Event</option>
              <option value="brand_collab">Brand Collaboration</option>
              <option value="other">Other</option>
            </select>
            <textarea
              placeholder="Your Message *"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ ...inputStyle, resize: "vertical" }}
              required
            />
            <motion.button
              type="submit"
              className="relative overflow-hidden w-full py-3 cursor-pointer"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                backgroundColor: "#E8FF00",
                color: "#0A0A0A",
                fontSize: 14,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "none",
              }}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
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
                SEND REQUEST
              </motion.span>
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}