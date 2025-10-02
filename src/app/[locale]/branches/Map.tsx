"use client";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import logo from "../../[locale]/../../img/ans-logo.png";
import { useTranslations } from "next-intl";
import { Navigation, ZoomIn, MapPin } from "lucide-react";

const containerStyle = { width: "100%", height: "100%" };

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

const loadLogoAsBase64 = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const blob = await res.blob();
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

const BranchMap = ({ branches, center, zoom }: BranchMapProps) => {
  const t = useTranslations("branch");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const defaultCenter = { lat: 17.9757, lng: 102.6331 };
  const defaultZoom = 10;

  useEffect(() => {
    loadLogoAsBase64(logo.src).then(setLogoBase64);
  }, []);

  const focusMap = (lat: number, lng: number, z = 16) => {
    if (!map) return;
    map.setCenter({ lat, lng });
    map.setZoom(z);
  };

  const handleMarkerClick = (branch: Branch, lat: number, lng: number) => {
    setSelectedBranch(branch);
    focusMap(lat, lng, 15);
  };

  // SVG icon (white default, red on hover/selected)
  const getSvgMarker = (logoDataUrl: string, variant: "white" | "red") => {
    const fill =
      variant === "white" ? "rgba(255,255,255,0.7)" : "rgba(220, 38, 38, 0.9)"; // red-600/70
    return {
  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="80" viewBox="0 0 60 80">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#aaa" />
        </filter>
      </defs>

      <!-- Pin Shape with white border -->
      <path d="M30 0C13.5 0 0 13.5 0 30c0 20 30 50 30 50s30-30 30-50C60 13.5 46.5 0 30 0z"
        fill="${fill}" 
        stroke="white" 
        stroke-width="1"
        filter="url(#shadow)"/>

      <!-- Circle background inside -->
      <circle 
        cx="30" cy="30" r="19" 
        fill="#f9fafb" 
        stroke="white" 
        stroke-width="2"
      /> 

      <!-- Logo in center -->
      <image href="${logoDataUrl}" x="18" y="18" width="24" height="24"/>
    </svg>
  `)}`,
  scaledSize: new google.maps.Size(48, 65),
  anchor: new google.maps.Point(24, 65),
};
  };

  return (
    <div className="mb-8 bg-gray-50 rounded-lg p-4 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{t("branch_map")}</h2>
      <div className="aspect-video bg-gray-200 rounded-lg relative">
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          center={center || defaultCenter}
          zoom={zoom || defaultZoom}
          onLoad={(mapInstance) => setMap(mapInstance)}
          onClick={() => setSelectedBranch(null)} // click map to close info window
        >
          {logoBase64 &&
            branches.map((branch) => {
              const lat = parseFloat(branch.map_lat);
              const lng = parseFloat(branch.map_lng);
              if (isNaN(lat) || isNaN(lng)) return null;

              const isHovered = hoveredMarkerId === branch.id_branch;
              const isSelected = selectedBranch?.id_branch === branch.id_branch;

              return (
                <Marker
                  key={branch.id_branch}
                  position={{ lat, lng }}
                  title={branch.branch_name}
                  icon={getSvgMarker(logoBase64, isHovered || isSelected ? "red" : "white")}
                  onClick={() => handleMarkerClick(branch, lat, lng)}
                  onMouseOver={() => setHoveredMarkerId(branch.id_branch)}
                  onMouseOut={() => setHoveredMarkerId(null)}
                />
              );
            })}

          {/* InfoWindow*/}
          {selectedBranch && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedBranch.map_lat),
                lng: parseFloat(selectedBranch.map_lng),
              }}
              onCloseClick={() => setSelectedBranch(null)}
              options={{ pixelOffset: new google.maps.Size(0, -5) }}
            >
              <div className="max-w-[220px]">
                <div className="flex items-start gap-2 mb-2">
                  <div className="shrink-0 rounded-full bg-red-100 p-1.5">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 leading-snug">
                      {selectedBranch.branch_name}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedBranch.map_lat},${selectedBranch.map_lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <Navigation className="w-4 h-4" />
                    {t("Navigate")}
                  </a>
                  <button
                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 transition"
                    onClick={() =>
                      focusMap(
                        parseFloat(selectedBranch.map_lat),
                        parseFloat(selectedBranch.map_lng),
                        17
                      )
                    }
                  >
                    <ZoomIn className="w-4 h-4" />
                    {t("zoom_in")}
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default BranchMap;