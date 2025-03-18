// import React, { createContext, useState } from "react";

// export const BookingContext = createContext();

// export const BookingProvider = ({ children }) => {
//   const [bookingData, setBookingData] = useState({
//     flight: {},
//     passengers: [],
//     selectedSeat: null,
//   });

//   return (
//     <BookingContext.Provider value={{ bookingData, setBookingData }}>
//       {children}
//     </BookingContext.Provider>
//   );
// };


import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface Passenger {
  firstName: string;
  lastName: string;
  seat: string;
}

interface Flight {
  from?: string;
  to?: string;
  date?: string;
}

interface BookingData {
  flight: Flight;
  passengers: Passenger[];
  selectedSeat: string | null;
}

interface BookingContextProps {
  bookingData: BookingData;
  setBookingData: Dispatch<SetStateAction<BookingData>>;
}

export const BookingContext = createContext<BookingContextProps | undefined>(undefined);

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    flight: {},
    passengers: [],
    selectedSeat: null,
  });

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};
