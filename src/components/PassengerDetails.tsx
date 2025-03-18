import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../contexts/BookingContext";
import Webcam from "react-webcam";
import { XCircle } from "lucide-react";
import { Input } from "./ui/input";

function PassengerDetails() {
  const { setBookingData } = useContext(BookingContext);
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([
    { id: 1, firstName: "", lastName: "", email: "", faces: [] },
  ]);
  const [showCaptureModal, setShowCaptureModal] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(null);
  const [captureProgress, setCaptureProgress] = useState(0);
  const webcamRef = useRef(null);
  const captureIntervalRef = useRef(null);

  const startCapture = () => {
    let captureCount = 0;
    setCaptureProgress(0);

    captureIntervalRef.current = setInterval(() => {
      if (captureCount < 10) {
        const imageSrc = webcamRef.current.getScreenshot();
        setPassengers((prev) => {
          const updatedPassengers = [...prev];
          updatedPassengers[currentPassengerIndex].faces = [
            ...updatedPassengers[currentPassengerIndex].faces,
            imageSrc,
          ];
          return updatedPassengers;
        });

        captureCount++;
        setCaptureProgress((captureCount / 10) * 100);
      } else {
        stopCapture();
      }
    }, 500);
  };

  const stopCapture = () => {
    clearInterval(captureIntervalRef.current);
    setShowCaptureModal(false);
  };

  const deleteImage = (passengerIndex, imageIndex) => {
    setPassengers((prev) => {
      const updatedPassengers = [...prev];
      updatedPassengers[passengerIndex].faces = updatedPassengers[
        passengerIndex
      ].faces.filter((_, i) => i !== imageIndex);
      return updatedPassengers;
    });
  };

  const addPassenger = () => {
    setPassengers((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        firstName: "",
        lastName: "",
        email: "",
        faces: [],
      },
    ]);
  };

  const removePassenger = (index) => {
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePassenger = (index, key, value) => {
    setPassengers((prev) => {
      const updatedPassengers = [...prev];
      updatedPassengers[index][key] = value;
      return updatedPassengers;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingData((prev) => ({ ...prev, passengers }));
    navigate("/seat-selection");
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <h2 className="text-xl font-bold mb-4">Passenger Details</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        {passengers.map((passenger, index) => (
          <div
            key={passenger.id}
            className="flex items-center justify-stretch p-4 rounded-lg shadow-md mb-4"
          >
            <div className="flex items-center gap-4">
              <Input
                type="text"
                placeholder="First Name"
                value={passenger.firstName}
                onChange={(e) =>
                  updatePassenger(index, "firstName", e.target.value)
                }
                required
                className="p-2 border rounded w-1/4"
              />

              <Input
                type="text"
                placeholder="Last Name"
                value={passenger.lastName}
                onChange={(e) =>
                  updatePassenger(index, "lastName", e.target.value)
                }
                required
                className="p-2 border rounded w-1/4"
              />

              <Input
                type="email"
                placeholder="Email"
                value={passenger.email}
                onChange={(e) =>
                  updatePassenger(index, "email", e.target.value)
                }
                required
                className="p-2 border rounded w-1/4"
              />

              <button
                type="button"
                onMouseDown={() => {
                  setCurrentPassengerIndex(index);
                  setShowCaptureModal(true);
                }}
                className="p-2 bg-black text-white rounded w-1/4"
              >
                Capture Face
              </button>

              {passenger.faces.length > 0 && (
                <div
                  className="flex flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setCurrentPassengerIndex(index);
                    setShowImageGallery(true);
                  }}
                >
                  <img
                    src={passenger.faces[passenger.faces.length - 1]}
                    alt="Captured Face"
                    className="w-12 h-12 rounded-lg border"
                  />
                  <span className="text-gray-500 text-sm">
                    +{passenger.faces.length}
                  </span>
                </div>
              )}
            </div>

            {passengers.length > 1 && (
              <button
                type="button"
                onClick={() => removePassenger(index)}
                className="p-2 ml-3 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={addPassenger}
            className="p-2 bg-black text-white rounded"
          >
            Add Passenger
          </button>
          <button type="submit" className="p-2 bg-black text-white rounded">
            Next: Seat Selection
          </button>
        </div>
      </form>

      {showCaptureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-2">Hold to Capture Face</h3>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-64 bg-gray-200"
            />

            <div className="w-full bg-gray-200 rounded-full mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${captureProgress}%` }}
              ></div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={stopCapture}
                className="p-2 bg-black text-white rounded"
              >
                Cancel
              </button>
              <button
                onMouseDown={startCapture}
                onMouseUp={stopCapture}
                className="p-2 bg-black text-white rounded"
              >
                Hold to Capture
              </button>
            </div>
          </div>
        </div>
      )}

      {showImageGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <h3 className="text-lg font-bold mb-2">Captured Images</h3>
            <div className="grid grid-cols-3 gap-2">
              {passengers[currentPassengerIndex]?.faces.map(
                (face, imgIndex) => (
                  <div key={imgIndex} className="relative">
                    <img
                      src={face}
                      alt="Captured Face"
                      className="w-20 h-20 rounded-lg border"
                    />
                    <button
                      onClick={() =>
                        deleteImage(currentPassengerIndex, imgIndex)
                      }
                      className="absolute -top-2"
                    >
                      <XCircle size={18} className="text-red-500" />
                    </button>
                  </div>
                )
              )}
            </div>
            <button
              onClick={() => setShowImageGallery(false)}
              className="p-2 mt-4 bg-gray-500 text-white rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PassengerDetails;
