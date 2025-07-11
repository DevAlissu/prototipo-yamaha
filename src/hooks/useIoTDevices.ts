import { useEffect, useState } from "react";
import { useIoTDevicesStore } from "../store/iotDevices";
import { IoTDevice } from "../types/IoTDevice";

export const useIoTDevices = () => {
  const { devices, fetchDevices } = useIoTDevicesStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDevices = async () => {
      setLoading(true);
      try {
        await fetchDevices();
      } catch (error) {
        console.error("Erro ao buscar dispositivos IoT:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDevices();
  }, []);

  return { devices, loading, fetchDevices }; 
};
