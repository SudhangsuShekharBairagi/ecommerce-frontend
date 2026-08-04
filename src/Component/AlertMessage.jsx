import React, { useEffect, useState } from "react";

function AlertMessage({ duration = 5000, message, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() =>{ setIsVisible(false); if(onClose) onClose()}, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;
  // console.log(message);
  return (
    <div className="fixed right-5 top-10 w-80 z-50 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 p-4">
      <div className="flex items-center gap-3 mb-3">
        <h1 className="font-semibold text-gray-800">{message}</h1>
      </div>

      {/* Bottom Progress Border */}
      <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full">
        <div
          className="h-full bg-indigo-600 transition-all linear"
          style={{
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}

export default AlertMessage;
