"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";

interface MapProps {
  latitude: number;
  longitude: number;
}

export const Map = ({ latitude, longitude }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const center = useMemo(() => {
    return { lat: latitude, lng: longitude };
  }, [latitude, longitude]);

  return (
    <div className="aspect-video rounded border-2 border-gray-500 bg-red-400">
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={center}
          zoom={14}
          options={{ streetViewControl: false }}
        >
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
