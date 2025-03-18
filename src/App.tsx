import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { BookingProvider } from "./contexts/BookingContext";
import FlightSearch from "./components/FlightSearch";
import PassengerDetails from "./components/PassengerDetails";
import SeatSelection from "./components/SeatSelection";
import BoardingPass from "./components/BoardingPass";
import PassengerVerification from "./components/PassengerVerification";
import BoardingPassList from "./components/BoardingPassList";

function App() {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FlightSearch />} />
          <Route path="/passenger-details" element={<PassengerDetails />} />
          <Route path="/boarding-pass-list" element={<BoardingPassList />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
          <Route path="/boarding-pass" element={<BoardingPass />} />
          <Route path="/verification" element={<PassengerVerification />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;
