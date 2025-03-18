import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../contexts/BookingContext";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CalendarIcon, SearchIcon, RefreshCw } from "lucide-react";
import FlightCard from "./FlightCard";

const sampleFlights = [
  {
    airlineLogo:
      "https://brandeps.com/logo-download/S/SpiceJet-logo-vector-01.svg",
    airlineName: "Spice Jet",
    departureTime: "20:08",
    arrivalTime: "22:08",
    duration: "2hr 15min",
    stops: "Non Stop",
    price: "7,350",
  },
  {
    airlineLogo:
      "https://www.goindigo.in/content/dam/s6web/in/en/assets/logo/IndiGo_logo_2x.png",
    airlineName: "IndiGo",
    departureTime: "10:30",
    arrivalTime: "12:45",
    duration: "2hr 15min",
    stops: "Non Stop",
    price: "7,650",
  },
  {
    airlineLogo:
      "https://assets.akasaair.com/f/159922/179x46/5114cb7302/akasa-home-logo.svg",
    airlineName: "IndiGo",
    departureTime: "10:30",
    arrivalTime: "12:45",
    duration: "2hr 15min",
    stops: "Non Stop",
    price: "8,180",
  },
  {
    airlineLogo:
      "https://www.goindigo.in/content/dam/s6web/in/en/assets/logo/IndiGo_logo_2x.png",
    airlineName: "IndiGo",
    departureTime: "10:30",
    arrivalTime: "12:45",
    duration: "2hr 15min",
    stops: "Non Stop",
    price: "8,380",
  },
];

const airports = [
  {
    code: "DEL",
    city: "New Delhi",
    airport: "Indira Gandhi International Airport",
  },
  {
    code: "HYD",
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
  },
  {
    code: "BOM",
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
  },
  {
    code: "BLR",
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
  },
  { code: "MAA", city: "Chennai", airport: "Chennai International Airport" },
  {
    code: "CCU",
    city: "Kolkata",
    airport: "Netaji Subhash Chandra bose International Airport",
  },
  { code: "COK", city: "Kochi", airport: "Coachin International Airport" },
  { code: "GOI", city: "GOA", airport: "Dabolim Airport" },
  { code: "PNQ", city: "Pune", airport: "Pune Airport" },
];

function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("2025-03-16");
  const [dropdownType, setDropdownType] = useState(null);
  const [showFlight, setShowFlight] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isFocusedFrom, setIsFocusedFrom] = useState(false);
  const [isFocusedTo, setIsFocusedTo] = useState(false);

  const { setBookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingData((prev) => ({ ...prev, flight: { from, to, date } }));
    // navigate("/flight-options");
    setShowFlight(true);
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const selectAirport = (type, code, city) => {
    if (type === "from") {
      setFrom(`${code} - ${city}`);
      setIsFocusedFrom(true);
    } else {
      setTo(`${code} - ${city}`);
      setIsFocusedTo(true);
    }
    setDropdownType(null);
  };

  const filteredAirports = airports.filter(
    (airport) =>
      airport.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownType(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center m-16">
      <Card className="w-full max-w-5xl p-6 shadow-xl bg-white">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <div className="relative flex-1 dropdown-container">
              <label
                className={`absolute left-3 bg-white px-1 transition-all ${
                  isFocusedFrom || from
                    ? "-top-3 text-gray-500 text-sm"
                    : "top-1/2 transform -translate-y-1/2 text-lg"
                }`}
              >
                From
              </label>
              <div
                className="flex items-center bg-white border rounded-xl shadow-sm w-full cursor-pointer"
                onClick={() => {
                  setDropdownType("from");
                  setIsFocusedFrom(true);
                }}
                onBlur={() => {
                  if (!from) setIsFocusedFrom(false);
                }}
              >
                <Input
                  type="text"
                  value={from}
                  readOnly
                  className="h-14 border-none focus:ring-0 focus:outline-none font-bold w-full bg-transparent cursor-pointer"
                />
              </div>

              {dropdownType === "from" && (
                <div className="absolute top-full left-0 w-full bg-white border shadow-lg mt-1 rounded-xl max-h-60 overflow-y-auto z-50">
                  {filteredAirports.map((airport) => (
                    <div
                      key={airport.code}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex flex-col"
                      onClick={() =>
                        selectAirport("from", airport.code, airport.city)
                      }
                    >
                      <span className="font-bold">
                        {airport.code} - {airport.city}
                      </span>
                      <span className="text-sm text-gray-500">
                        {airport.airport}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={swapLocations}
              className="bg-black p-2 rounded-full hover:bg-slate-800 transition duration-200 shadow-md"
            >
              <RefreshCw className="text-white" size={18} />
            </button>

            <div className="relative flex-1 dropdown-container">
              <label
                className={`absolute left-3 bg-white px-1 transition-all ${
                  isFocusedTo || to
                    ? "-top-3 text-gray-500 text-sm"
                    : "top-1/2 transform -translate-y-1/2 text-lg"
                }`}
              >
                To
              </label>
              <div
                className="flex items-center bg-white border rounded-xl shadow-sm w-full cursor-pointer"
                onClick={() => {
                  setDropdownType("to");
                  setIsFocusedTo(true);
                }}
                onBlur={() => {
                  if (!to) setIsFocusedTo(false);
                }}
              >
                <Input
                  type="text"
                  value={to}
                  readOnly
                  className="h-14 border-none focus:ring-0 focus:outline-none font-bold w-full bg-transparent cursor-pointer"
                />
              </div>

              {dropdownType === "to" && (
                <div className="absolute top-full left-0 w-full bg-white border shadow-lg mt-1 rounded-xl max-h-60 overflow-y-auto z-50">
                  {filteredAirports.map((airport) => (
                    <div
                      key={airport.code}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex flex-col"
                      onClick={() =>
                        selectAirport("to", airport.code, airport.city)
                      }
                    >
                      <span className="font-bold">
                        {airport.code} - {airport.city}
                      </span>
                      <span className="text-sm text-gray-500">
                        {airport.airport}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex-1">
              <label className="absolute left-3 -top-3 bg-white px-1 text-sm text-gray-500">
                Date
              </label>
              <div className="flex items-center bg-white border rounded-xl shadow-sm w-full">
                {/* <CalendarIcon className="text-gray-500 ml-4" size={18} /> */}
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="border-none focus:ring-0 font-bold w-full bg-transparent h-14"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="p-6 w-14 size-xl bg-black hover:bg-slate-800 text-white shadow-lg transition duration-200 cursor-pointer"
            >
              <SearchIcon size={24} />
            </Button>
          </form>
        </CardContent>
      </Card>

      {showFlight && from !== "" && to !== "" && (
        <div className="w-full max-w-5xl mt-6">
          {sampleFlights.length > 0 &&
            sampleFlights.map((flight, index) => (
              <FlightCard
                key={index}
                {...flight}
                from={from.split(" - ")[0]}
                to={to.split(" - ")[0]}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default FlightSearch;
