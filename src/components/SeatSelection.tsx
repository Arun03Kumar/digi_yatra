import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../contexts/BookingContext";

const rows = 14;
const columns = ["A", "B", "C", "D", "E", "F"];
const seats = [];
for (let row = 1; row <= rows; row++) {
  columns.forEach((col) => {
    seats.push(`${row}${col}`);
  });
}

function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { bookingData, setBookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  const handleSeatClick = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSeats.length !== bookingData.passengers.length) {
      alert("Please select seats equal to the number of passengers.");
      return;
    }
    const updatedPassengers = bookingData.passengers.map(
      (passenger, index) => ({
        ...passenger,
        seat: selectedSeats[index] || "N/A",
      })
    );
    setBookingData((prev) => ({ ...prev, passengers: updatedPassengers }));
    navigate("/boarding-pass-list");
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <h2 className="text-xl font-bold mb-4">Select Your Seat</h2>

      <div className="relative flex flex-col items-center">
        <div
          style={{
            marginBottom: "-350px",
            width: "350px",
            height: "700px",
            borderWidth: "1px 1px 0px",
            borderTopStyle: "solid",
            borderRightStyle: "solid",
            borderBottomStyle: "initial",
            borderLeftStyle: "solid",
            borderColor: "black",
            borderRadius: "50% 50% 0px 0px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "200px",
              marginTop: "100px",
              backgroundColor: "rgb(128, 139, 150)",
              clipPath:
                "polygon(50% 0%, 80% 10%, 97% 34%, 100% 60%, 71% 36%, 50% 29%, 26% 37%, 0px 59%, 3% 32%, 20% 10%)",
            }}
          ></div>
        </div>

        <div className="relative flex items-center justify-center w-full">
          <div
            style={{
              position: "absolute",
              left: "-400px",
              top: "150px",
              width: "400px",
              height: "350px",
              backgroundColor: "black",
              clipPath: "polygon(100% 0px, 100% 42%, 68% 43%, 6% 59%, 9% 49%)",
              border: "1px solid black",
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              right: "-400px",
              top: "150px",
              width: "400px",
              height: "350px",
              backgroundColor: "black",
              clipPath: "polygon(87% 49%, 89% 59%, 29% 43%, 0px 43%, 0px 0px)",
              border: "1px solid black",
            }}
          ></div>
        </div>

        <div
          style={{
            width: "350px",
            height: "600px",
            backgroundColor: "white",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // borderRadius: "0px 0px 50px 50px",
          }}
        >
          <div className="grid grid-cols-7 gap-2 mx-auto p-3">
            {seats.map((seat, index) => {
              const row = Math.floor(index / 6);
              const col = index % 6;

              return (
                <>
                  {col === 3 && <div key={`gap-${row}`} className="w-6"></div>}

                  <button
                    key={seat}
                    type="button"
                    onClick={() => handleSeatClick(seat)}
                    className={`w-8 h-8 text-xs font-bold rounded ${
                      selectedSeats.includes(seat)
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-400"
                    }`}
                  >
                    {seat}
                  </button>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={selectedSeats.length === 0}
        className="mt-4 mb-4 p-2 bg-black text-white rounded"
      >
        Generate Boarding Pass
      </button>
    </div>
  );
}

export default SeatSelection;
