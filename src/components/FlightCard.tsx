import React from "react";
import { useNavigate } from "react-router-dom";

function FlightCard({
  airlineLogo,
  airlineName,
  departureTime,
  arrivalTime,
  from,
  to,
  duration,
  stops,
  price,
}) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 my-3 w-full max-w-5xl">
      <div className="flex items-center w-1/5">
        <img src={airlineLogo} alt={airlineName} className="w-30 h-auto mr-3" />
      </div>

      <div className="flex flex-1 justify-center items-center">
        <div className="flex flex-col items-center w-1/3">
          <div className="text-lg font-bold">{departureTime}</div>
          <div className="text-gray-600">{from}</div>
        </div>

        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center text-gray-600">
            <div className="border-t border-gray-400 w-12 mx-2"></div>
            <span className="text-sm">{duration}</span>
            <div className="border-t border-gray-400 w-12 mx-2"></div>
          </div>
          <div className="text-sm text-gray-500">{stops}</div>
        </div>

        <div className="flex flex-col items-center w-1/3">
          <div className="text-lg font-bold">{arrivalTime}</div>
          <div className="text-gray-600">{to}</div>
        </div>
      </div>

      <div className="flex flex-col items-end w-1/5">
        <div className="text-xl font-bold mr-3">₹ {price}</div>
        <button
          className="bg-black text-white px-5 py-2 rounded-lg mt-2 shadow-md cursor-pointer"
          onClick={() => navigate("/passenger-details")}
        >
          SELECT
        </button>
      </div>
    </div>
  );
}

export default FlightCard;
