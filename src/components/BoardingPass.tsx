import React from "react";
import { QRCodeCanvas } from "qrcode.react";

function BoardingPass({ passenger, flight, onClose }) {
  if (!passenger) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white max-w-4xl mx-auto border-2 border-gray-300 rounded shadow-lg p-4">
        <button
          className="absolute top-3 right-3 text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-red-600 mb-4 text-center">
          Boarding Pass Issued{" "}
          <span className="text-sm text-gray-600">
            (Final Approval Pending)
          </span>
        </h2>

        <div className="border border-gray-300 rounded p-4 bg-white">
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <div className="font-bold text-lg">
              Boarding Pass (Web Check-In)
            </div>
            <div className="text-sm text-blue-600 font-semibold">
              Your Departure Terminal is T1
            </div>
          </div>

          <div className="grid grid-cols-[2fr_1fr]">
            <div className="border-r border-gray-300 p-3">
              <div className="border-b border-gray-300 pb-2 mb-2">
                <div className="flex justify-between">
                  <span className="text-sm font-bold">
                    {passenger.firstName} {passenger.lastName}
                  </span>
                  <span className="text-sm text-right">
                    {flight.from.split("-")[1]} (T1) To{" "}
                    {flight.to.split("-")[1]}
                  </span>
                </div>
              </div>

              <div className="border-b border-gray-300 pb-2 mb-2">
                <div className="grid grid-cols-5 gap-2">
                  <div className="border p-1 text-center">
                    <p className="text-xs text-gray-500">Flight</p>
                    <p className="font-bold text-sm">6E 6182</p>
                  </div>
                  <div className="border p-1 text-center">
                    <p className="text-xs text-gray-500">Gate</p>
                    <p className="font-bold text-sm">A21</p>
                  </div>
                  <div className="border p-1 text-center">
                    <p className="text-xs text-gray-500">Boarding Time</p>
                    <p className="font-bold text-sm">1500</p>
                  </div>
                  <div className="border p-1 text-center">
                    <p className="text-xs text-gray-500">Boarding Zone</p>
                    <p className="font-bold text-sm">Zone 1</p>
                  </div>
                  <div className="border p-1 text-center">
                    <p className="text-xs text-gray-500">Seat</p>
                    <p className="font-bold text-sm">{passenger.seat}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <QRCodeCanvas value={passenger.firstName} size={70} />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-bold text-sm">{flight.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">Departure</p>
                    <p className="font-bold text-sm">1555 Hrs</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">PNR</p>
                    <p className="font-bold text-sm">KV4FXW</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">Services</p>
                    <p className="font-bold text-sm">NIL</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3">
              <div className="border-b border-gray-300 pb-2 mb-2">
                <div className="text-sm font-bold">
                  {passenger.firstName} {passenger.lastName}
                </div>
                <div className="text-sm">
                  {flight.from.split("-")[1]} (T1) To {flight.to.split("-")[1]}
                </div>
              </div>
              <div className="mb-2">
                <p className="text-xs text-gray-500">Flight</p>
                <p className="font-bold text-sm">6E 6182</p>
              </div>
              <div className="mb-2">
                <p className="text-xs text-gray-500">Date</p>
                <p className="font-bold text-sm">{flight.date}</p>
              </div>
              <div className="mb-2">
                <p className="text-xs text-gray-500">Seat</p>
                <p className="font-bold text-sm">{passenger.seat}</p>
              </div>
              <div className="flex gap-2 items-center">
                <QRCodeCanvas value={passenger.firstName} size={70} />
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-600 border-t border-gray-300 mt-2 pt-2">
            Gate is subject to change and will close 25 minutes prior to
            departure.
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="p-2 bg-gray-400 text-white rounded"
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="p-2 bg-black text-white rounded"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardingPass;
