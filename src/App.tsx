import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { GallerySection } from "./components/GallerySection";
import { EventsSection } from "./components/EventsSection";
// import { SponsorsSection } from "./components/SponsorsSection";
import { MechanicShopSection } from "./components/MerchSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { BookingProvider } from "./components/BookingContext";
import { BookingModal } from "./components/BookingModal";

export default function App() {
  return (
    <BookingProvider>
      <div
        className="w-full min-h-screen"
        style={{
          backgroundColor: "#0A0A0A",
          color: "#FFFFFF",
          fontFamily: "'DM Sans', sans-serif",
          scrollBehavior: "smooth",
        }}
      >
        <Navbar />
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <EventsSection />
        {/* <SponsorsSection /> */}
        <MechanicShopSection />
        <ContactSection />
        <Footer />
        <BookingModal />
      </div>
    </BookingProvider>
  );
}
