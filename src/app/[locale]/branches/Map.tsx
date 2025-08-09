"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
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

  const defaultCenter = { lat: 17.9757, lng: 102.6331 };
  const defaultZoom = 10;

  useEffect(() => {
    loadLogoAsBase64(logo.src).then(setLogoBase64);
  }, []);

  const handleMarkerClick = (lat: number, lng: number) => {
    if (!map) return;
    map.setCenter({ lat, lng });
    map.setZoom(15);
  };

  // SVG icon  (bg-white/70) 
  const getSvgMarker = (logoDataUrl: string, color: "white" | "red") => {
    const fill = color === "white" ? "rgba(255,255,255,0.7)" : "rgba(252,165,165,1)";
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="80" viewBox="0 0 60 80">
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#aaa" />
            </filter>
          </defs>
          <path
            d="M30 0C13.5 0 0 13.5 0 30c0 20 30 50 30 50s30-30 30-50C60 13.5 46.5 0 30 0z"
            fill="${fill}"
            filter="url(#shadow)"
          />
          <image href="${logoDataUrl}" x="18" y="18" width="24" height="24"/>
        </svg>
      `)}`,
      scaledSize: new google.maps.Size(48, 65),
      anchor: new google.maps.Point(24, 65),
    };
  };

  return (
    <div className="mb-8 bg-gray-100 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">{t("branch_map")}</h2>
      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center relative">
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          center={center || defaultCenter}
          zoom={zoom || defaultZoom}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          {logoBase64 &&
            branches.map((branch) => {
              const lat = parseFloat(branch.map_lat);
              const lng = parseFloat(branch.map_lng);

              if (!isNaN(lat) && !isNaN(lng)) {
                const isHovered = hoveredMarkerId === branch.id_branch;

                return (
                  <Marker
                    key={branch.id_branch}
                    position={{ lat, lng }}
                    title={branch.branch_name}
                    icon={getSvgMarker(logoBase64, isHovered ? "red" : "white")}
                    onClick={() => handleMarkerClick(lat, lng)}
                    onMouseOver={() => setHoveredMarkerId(branch.id_branch)}
                    onMouseOut={() => setHoveredMarkerId(null)}
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