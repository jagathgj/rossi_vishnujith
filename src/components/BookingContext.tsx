import { createContext, useContext, useState, type ReactNode } from "react";

interface BookingContextType {
  isOpen: boolean;
  preselectedService: string;
  openBooking: (service?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType>({
  isOpen: false,
  preselectedService: "",
  openBooking: () => {},
  closeBooking: () => {},
});

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");

  const openBooking = (service?: string) => {
    setPreselectedService(service || "");
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeBooking = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <BookingContext.Provider value={{ isOpen, preselectedService, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
