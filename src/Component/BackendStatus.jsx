import { useEffect, useState } from "react";
import { healthCheckUp } from "../api/productsApi";

const BackendStatus = () => {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const status = await healthCheckUp();

        if (status === "UP") {
          setStatus("UP");
        } else {
          setStatus("Down");
        }
      } catch {
        setStatus("Down");
      }
    };

    checkBackend();
  }, []);

  return <div>Backend: {status}</div>;
};

export default BackendStatus;
