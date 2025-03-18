// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BookingContext } from "../contexts/BookingContext";
// import BoardingPass from "./BoardingPass";

// function BoardingPassList() {
//   const { bookingData } = useContext(BookingContext);
//   const [selectedPassenger, setSelectedPassenger] = useState(null);
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Your Boarding Passes
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-4xl mx-auto justify-items-center">
//         {bookingData.passengers.map((passenger, index) => (
//           <div
//             key={index}
//             onClick={() => setSelectedPassenger(passenger)}
//             className="border border-gray-300 p-5 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-100 transition transform hover:scale-105 w-full max-w-xs"
//           >
//             <p className="text-sm text-gray-600 mt-1 text-center">
//               Passenger {index + 1}:{" "}
//               <span className="font-bold text-gray-900">
//                 {passenger.firstName} {passenger.lastName}
//               </span>
//             </p>
//             <p className="text-sm text-gray-600 mt-1 text-center">
//               Seat:{" "}
//               <span className="font-bold text-gray-900">{passenger.seat}</span>
//             </p>
//           </div>
//         ))}
//       </div>

//       {selectedPassenger && (
//         <BoardingPass
//           passenger={selectedPassenger}
//           flight={bookingData.flight}
//           onClose={() => setSelectedPassenger(null)}
//         />
//       )}

//       <button
//         onClick={() => navigate("/verification")}
//         className="mt-8 px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg shadow-md hover:bg-slate-700 transition cursor-pointer"
//       >
//         Proceed to Check-in
//       </button>
//     </div>
//   );
// }

// export default BoardingPassList;


import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../contexts/BookingContext";
import BoardingPass from "./BoardingPass";

interface Passenger {
  firstName: string;
  lastName: string;
  seat: string;
}


const BoardingPassList: React.FC = () => {
  const bookingContext = useContext(BookingContext);

  if (!bookingContext) {
    throw new Error("BoardingPassList must be used within a BookingProvider");
  }

  const { bookingData } = bookingContext;
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(null);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Boarding Passes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-4xl mx-auto justify-items-center">
        {bookingData.passengers.map((passenger, index) => (
          <div
            key={index}
            onClick={() => setSelectedPassenger(passenger)}
            className="border border-gray-300 p-5 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-100 transition transform hover:scale-105 w-full max-w-xs"
          >
            <p className="text-sm text-gray-600 mt-1 text-center">
              Passenger {index + 1}:{" "}
              <span className="font-bold text-gray-900">
                {passenger.firstName} {passenger.lastName}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1 text-center">
              Seat: <span className="font-bold text-gray-900">{passenger.seat}</span>
            </p>
          </div>
        ))}
      </div>

      {selectedPassenger && (
        <BoardingPass
          passenger={selectedPassenger}
          flight={bookingData.flight}
          onClose={() => setSelectedPassenger(null)}
        />
      )}

      <button
        onClick={() => navigate("/verification")}
        className="mt-8 px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg shadow-md hover:bg-slate-700 transition cursor-pointer"
      >
        Proceed to Check-in
      </button>
    </div>
  );
};

export default BoardingPassList;


