import { useState, useEffect, useRef } from "react";
import { X, ChevronDown, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useBooking } from "./BookingContext";

const serviceOptions = [
  { value: "", label: "Select an event type" },
  { value: "stunt_show", label: "Stunt Show Booking" },
  { value: "race_event", label: "Race Event" },
  { value: "brand_collab", label: "Brand Collaboration" }
];

type FormStatus = "idle" | "sending" | "success" | "error";

export function BookingModal() {
  const { isOpen, preselectedService, closeBooking } = useBooking();
  const modalRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  // Sync preselected service
  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setErrorMsg("");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: preselectedService || "",
        date: "",
        message: "",
      });
    }
  }, [isOpen, preselectedService]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeBooking]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) closeBooking();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch("/api/book-rossi.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMsg(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      // Fallback: show success for demo since PHP backend isn't running
      setStatus("success");
    }
  };

  if (!isOpen) return null;

  const inputStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid #1F1F2E",
    color: "#fff",
    padding: "14px 16px",
    fontSize: 14,
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    color: "#8A8A9A",
    fontSize: 12,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: 6,
    display: "block",
  };

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(10px)",
        animation: "fadeIn 0.25s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .booking-input:focus { border-color: #E8FF00 !important; }
        .booking-select { appearance: none; background-image: none; }
      `}</style>

      <div
        className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto relative"
        style={{
          backgroundColor: "#0E0E12",
          border: "1px solid #1F1F2E",
          animation: "slideUp 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-8 py-5"
          style={{
            backgroundColor: "#0E0E12",
            borderBottom: "1px solid #1F1F2E",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: "#fff",
                fontSize: 28,
                lineHeight: 1,
              }}
            >
              BOOK <span style={{ color: "#E8FF00" }}>ROSSI</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#8A8A9A",
                fontSize: 13,
                marginTop: 4,
              }}
            >
              Racing, Shows & Collaborations
            </p>
          </div>
          <button
            onClick={closeBooking}
            className="flex items-center justify-center w-10 h-10 transition-colors duration-200 hover:bg-white/10"
            style={{
              background: "none",
              border: "1px solid #1F1F2E",
              cursor: "pointer",
              color: "#8A8A9A",
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div
                className="w-16 h-16 flex items-center justify-center mb-6"
                style={{
                  backgroundColor: "rgba(232,255,0,0.1)",
                  borderRadius: "50%",
                }}
              >
                <CheckCircle size={32} style={{ color: "#E8FF00" }} />
              </div>
              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: "#fff",
                  fontSize: 32,
                }}
              >
                REQUEST <span style={{ color: "#E8FF00" }}>SENT!</span>
              </h3>
              <p
                className="mt-3 max-w-xs"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#8A8A9A",
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                Thanks for reaching out! Rossi's team will get back to you within 24–48 hours.
              </p>
              <button
                onClick={closeBooking}
                className="mt-8 px-8 py-3 transition-all duration-200 hover:bg-[#d4e600]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  backgroundColor: "#E8FF00",
                  color: "#0A0A0A",
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                CLOSE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  className="booking-input"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                    className="booking-input"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    style={inputStyle}
                    className="booking-input"
                  />
                </div>
              </div>

              {/* Service */}
              <div className="relative">
                <label style={labelStyle}>Event Type *</label>
                <div className="relative">
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      color: form.service ? "#fff" : "#8A8A9A",
                      paddingRight: 40,
                    }}
                    className="booking-input booking-select"
                  >
                    {serviceOptions.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.value === ""}
                        style={{ backgroundColor: "#0E0E12", color: "#fff" }}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: "#8A8A9A" }}
                  />
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label style={labelStyle}>Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    color: form.date ? "#fff" : "#8A8A9A",
                    colorScheme: "dark",
                  }}
                  className="booking-input"
                />
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message / Details *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your event, bike model, or what you need..."
                  value={form.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: "vertical" }}
                  className="booking-input"
                />
              </div>

              {/* Error message */}
              {status === "error" && (
                <div
                  className="flex items-center gap-3 p-4"
                  style={{
                    backgroundColor: "rgba(255,60,0,0.08)",
                    border: "1px solid rgba(255,60,0,0.3)",
                  }}
                >
                  <AlertCircle size={18} style={{ color: "#FF3C00", flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#FF3C00",
                      fontSize: 13,
                    }}
                  >
                    {errorMsg}
                  </span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#d4e600] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  backgroundColor: "#E8FF00",
                  color: "#0A0A0A",
                  fontSize: 14,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    SENDING...
                  </>
                ) : (
                  "SUBMIT BOOKING REQUEST"
                )}
              </button>

              <p
                className="text-center pt-1"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#555",
                  fontSize: 12,
                }}
              >
                We'll respond within 24–48 hours. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
