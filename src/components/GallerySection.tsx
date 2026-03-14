import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "motion/react";

const INITIAL_COUNT = 8;
const LOAD_MORE_COUNT = 10;

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

const allImages = useMemo(() => {
  const first = { src: `${import.meta.env.BASE_URL}images/0.webp`, alt: "Stunt action 1" };
  const rest = [
    { src: `${import.meta.env.BASE_URL}images/1.webp`, alt: "Stunt action 1" },
    { src: `${import.meta.env.BASE_URL}images/2.webp`, alt: "Stunt action 2" },
    { src: `${import.meta.env.BASE_URL}images/3.webp`, alt: "Racing track" },
    { src: `${import.meta.env.BASE_URL}images/4.webp`, alt: "Bike close-up 1" },
    { src: `${import.meta.env.BASE_URL}images/5.webp`, alt: "Bike close-up 2" },
    { src: `${import.meta.env.BASE_URL}images/6.webp`, alt: "Event crowd" },
    { src: `${import.meta.env.BASE_URL}images/7.webp`, alt: "Racing shot" },
    { src: `${import.meta.env.BASE_URL}images/8.webp`, alt: "Speed shot" },
    { src: `${import.meta.env.BASE_URL}images/9.webp`, alt: "Racing track action" },
    { src: `${import.meta.env.BASE_URL}images/10.webp`, alt: "Motorcycle stunt" },
    { src: `${import.meta.env.BASE_URL}images/11.webp`, alt: "Sport bike" },
    { src: `${import.meta.env.BASE_URL}images/12.webp`, alt: "Sport bike" },
    { src: `${import.meta.env.BASE_URL}images/13.webp`, alt: "Sport bike" },
    { src: `${import.meta.env.BASE_URL}images/14.webp`, alt: "Sport bike" },
  ].sort(() => Math.random() - 0.5);
  return [first, ...rest];
}, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const displayedImages = allImages.slice(0, visibleCount);
  const hasMore = visibleCount < allImages.length;

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, allImages.length));
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % displayedImages.length);
  }, [lightboxIndex, displayedImages.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + displayedImages.length) % displayedImages.length
    );
  }, [lightboxIndex, displayedImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <>
      <section
        id="gallery"
        ref={ref}
        className="py-24 px-6"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div
          className="max-w-[1400px] mx-auto transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          {/* Divider */}
          <div
            className="w-full h-px mb-16"
            style={{ backgroundColor: "#E8FF00", opacity: 0.3 }}
          />

          <h2
            className="mb-16"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: "#fff",
              fontSize: "clamp(36px, 5vw, 56px)",
            }}
          >
            IN <span style={{ color: "#E8FF00" }}>ACTION</span>
          </h2>

          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}
          >
            <Masonry gutter="16px">
              {displayedImages.map((img, i) => (
                <div
                  key={`${img.src}-${i}`}
                  className="relative overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full block transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: "rgba(232,255,0,0.15)" }}
                  >
                    <Maximize2 color="#E8FF00" size={28} />
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>

          {/* SEE MORE button */}
          {hasMore && (
  <div className="text-center mt-12">
    <motion.button
      onClick={handleSeeMore}
      className="relative overflow-hidden px-8 py-3 cursor-pointer"
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        color: "#E8FF00",
        fontSize: 14,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        border: "1px solid #E8FF00",
        backgroundColor: "transparent",
      }}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 30%, rgba(232,255,0,0.3) 50%, transparent 70%)",
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
        className="absolute inset-0 pointer-events-none"
        style={{ border: "1px solid transparent" }}
        variants={{
          hover: {
            border: "1px solid #E8FF00",
            transition: { duration: 0.2 },
          },
        }}
      />
      <motion.span
        className="relative z-10 block"
        variants={{
          hover: {
            skewX: -8,
            x: 4,
            color: "#E8FF00",
            transition: { duration: 0.2 },
          },
        }}
      >
        SEE MORE
      </motion.span>
    </motion.button>
  </div>
)}

          {!hasMore && (
            <div className="text-center mt-10">
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#8A8A9A",
                  fontSize: 14,
                }}
              >
                You've seen few photos. Follow Instagram for more.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 w-11 h-11 flex items-center justify-center transition-colors hover:bg-white/10"
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
              color: "#fff",
            }}
            aria-label="Close"
          >
            <X size={22} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 md:left-6 z-10 w-12 h-12 flex items-center justify-center transition-colors hover:bg-white/10"
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              color: "#fff",
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={displayedImages[lightboxIndex].src}
              alt={displayedImages[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain select-none"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 md:right-6 z-10 w-12 h-12 flex items-center justify-center transition-colors hover:bg-white/10"
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              color: "#fff",
            }}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

          {/* Counter */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: "#8A8A9A",
              fontSize: 14,
              letterSpacing: "0.1em",
            }}
          >
            {lightboxIndex + 1} / {displayedImages.length}
          </div>
        </div>
      )}
    </>
  );
}
