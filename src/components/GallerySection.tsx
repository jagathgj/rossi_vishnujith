import { useEffect, useRef, useState, useCallback } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const allImages = [
  // Initial 8
  { src: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900", alt: "Stunt action 1" },
  { src: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900", alt: "Stunt action 2" },
  { src: "https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?w=900", alt: "Racing track" },
  { src: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800", alt: "Bike close-up 1" },
  { src: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800", alt: "Bike close-up 2" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200", alt: "Event crowd" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800", alt: "Racing shot" },
  { src: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=1400", alt: "Speed shot" },
  // Extra 10 for "SEE MORE"
  { src: "https://images.unsplash.com/photo-1758887698831-a230bdb98487?w=900", alt: "Racing track action" },
  { src: "https://images.unsplash.com/photo-1764605513250-aa9214010eab?w=900", alt: "Motorcycle stunt wheelie" },
  { src: "https://images.unsplash.com/photo-1708579449068-1e886fed6550?w=900", alt: "Sport bike engine closeup" },
  { src: "https://images.unsplash.com/photo-1719535218488-90a2e2248db5?w=900", alt: "Motorcycle rider helmet" },
  { src: "https://images.unsplash.com/photo-1760555961082-9bc058f9c4e2?w=900", alt: "Biker night ride" },
  { src: "https://images.unsplash.com/photo-1771402629441-95e637743f93?w=900", alt: "Motorcycle garage" },
  { src: "https://images.unsplash.com/photo-1595345263387-c01f60e7c1b9?w=900", alt: "Mechanic tools" },
  { src: "https://images.unsplash.com/photo-1762604462465-76720d039e9f?w=900", alt: "Motorcycle repair" },
  { src: "https://images.unsplash.com/photo-1633120851371-403ecc2d81ec?w=900", alt: "Motorbike speedway" },
  { src: "https://images.unsplash.com/photo-1600369671373-1e8571e7e95f?w=800", alt: "Rider portrait" },
];

const INITIAL_COUNT = 8;
const LOAD_MORE_COUNT = 10;

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
              <button
                onClick={handleSeeMore}
                className="px-8 py-3 transition-all duration-200 hover:bg-[#E8FF00] hover:text-[#0A0A0A]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "#E8FF00",
                  fontSize: 14,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  border: "1px solid #E8FF00",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                SEE MORE
              </button>
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
                You've seen all the photos
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
