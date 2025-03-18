import { useState, useRef, useContext, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { BookingContext } from "../contexts/BookingContext";
import { useNavigate } from "react-router-dom";

function PassengerVerification() {
  const navigate = useNavigate();
  const { bookingData } = useContext<any>(BookingContext);
  const webcamRef = useRef<any>(null);
  const [loadingModels, setLoadingModels] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadModels() {
      try {
        const MODEL_URL = "/";

        // console.log("Loading models from:", MODEL_URL);

        // console.log("Loading TinyFaceDetector...");
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        // console.log("TinyFaceDetector loaded.");

        // console.log("Loading FaceLandmark68TinyNet...");
        await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);
        // console.log("FaceLandmark68TinyNet loaded.");

        // console.log("Loading FaceRecognitionNet...");
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        // console.log("FaceRecognitionNet loaded.");

        setLoadingModels(false);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    }

    loadModels();
  }, []);

  const computeDescriptor = async (imgSrc:any) => {
    // console.log("Creating new image...");
    const img = new Image();
    img.src = imgSrc;
    await new Promise((resolve) => {
      img.onload = resolve;
    });
    // console.log("Calling face-api detection...");
    const detection = await faceapi
      .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks(true)
      .withFaceDescriptor();
    return detection ? detection.descriptor : null;
  };

  const captureAndVerify = async () => {
    console.log("Taking screenshot...");
    const screenshot = webcamRef.current.getScreenshot();
    console.log("Screenshot captured");
    if (!screenshot) {
      setMessage("No image captured, please try again.");
      return;
    }
    console.log("Computing descriptor for captured image...");
    const queryDescriptor = await computeDescriptor(screenshot);
    if (!queryDescriptor) {
      setMessage("No face detected in the captured image. Please try again.");
      return;
    }

    let bestMatch = null;
    let minDistance = Infinity;
    for (const passenger of bookingData.passengers) {
      if (!passenger.faces || passenger.faces.length === 0) continue;
      const storedDescriptor = await computeDescriptor(passenger.faces[0]);
      if (storedDescriptor) {
        const distance = faceapi.euclideanDistance(
          queryDescriptor,
          storedDescriptor
        );
        if (distance < minDistance) {
          minDistance = distance;
          bestMatch = passenger;
        }
      }
    }
    const threshold = 0.6;
    if (bestMatch && minDistance < threshold) {
      setMessage(`Happy Journey, ${bestMatch.firstName}!`);
    } else {
      setMessage("Face not recognized. Please try again.");
    }
    setShowModal(false);

    setTimeout(() => setMessage(""), 3000);
  };

  if (loadingModels) {
    return <p>Loading facial recognition models...</p>;
  }

  return (
    <div className="flex flex-col items-center mt-6">
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg shadow-md hover:bg-slate-700 transition cursor-pointer"
      >
        Verify Passenger
      </button>

      {message && (
        <div className="mt-4 p-4 bg-green-500 text-white font-bold rounded-lg">
          {message}
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer"
      >
        Book Ticket Again
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-3">Passenger Verification</h2>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-64 bg-gray-200"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={captureAndVerify}
                className="px-6 py-2 bg-black text-white rounded hover:bg-blue-600 transition"
              >
                Capture & Verify
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PassengerVerification;
