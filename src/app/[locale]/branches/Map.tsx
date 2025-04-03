"use client";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import {  useState } from "react";
import logo from "../../[locale]/../../img/ans-logo.png";
import { useTranslations } from "next-intl";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface Branch {
  id_branch: number;
  map_lat: string;
  map_lng: string;
  branch_name: string;
}

interface BranchMapProps {
  branches: Branch[];
  center: { lat: number; lng: number };
  zoom: number;
}

const BranchMap = ({ branches , center, zoom}: BranchMapProps) => {
   const t = useTranslations("branch");
  // const center = { lat: 17.9757, lng: 102.6331 };
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBEYR4WPB2KnYBJxue4s9TuK4qlL3VYg9s",
    libraries: ["places"],
  });


  const handleMarkerClick = (lat: number, lng: number) => {
    if (!map) return;
  
    map.setCenter({ lat, lng });
    map.setZoom(15);
  };

  if (loadError) return <p>{t("map_error")}</p>;
  if (!isLoaded) return <p>{t("loading")}</p>;

  return (
    <div className="mb-8 bg-gray-100 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">{t("branch_map")}</h2>
      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center relative">
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          {branches.map((branch) => {
            const lat = parseFloat(branch.map_lat);
            const lng = parseFloat(branch.map_lng);

            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker
                  key={branch.id_branch}
                  position={{ lat, lng }}
                  title={branch.branch_name} 
                  label={{
                    text: ".",
                    color: "black",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                  icon={{
                    url: logo.src,
                    scaledSize: new google.maps.Size(40, 40),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(20, 20),
                  }}
                  onClick={() => handleMarkerClick(lat, lng)}
                />
              );
            }
            return null;
          })}
        </GoogleMap>
      </div>
    </div>
  );
};

export default BranchMap;
