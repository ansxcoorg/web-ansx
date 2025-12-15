"use client";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
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

let logoCache: string | null = null;

const loadLogoAsBase64 = async (url: string): Promise<string> => {
  if (logoCache) return logoCache;
  const res = await fetch(url);
  const blob = await res.blob();
  const base64 = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
  logoCache = base64;
  return base64;
};

const BranchMap = ({ branches, center, zoom }: BranchMapProps) => {
  const t = useTranslations("branch");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const watchIdRef = useRef<number | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  const defaultCenter = { lat: 17.9757, lng: 102.6331 };
  const defaultZoom = 10;

  useEffect(() => {
    loadLogoAsBase64(logo.src).then(setLogoBase64);
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    if (!userLocation || !isTracking) {
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
      return;
    }

    const updateCircleSize = () => {
      const zoomLevel = map.getZoom() ?? 15;
      const metersPerPixel =
        (156543.03392 * Math.cos((userLocation.lat * Math.PI) / 180)) /
        Math.pow(2, zoomLevel);
      const targetPixelRadius = 100;
      const dynamicRadius = targetPixelRadius * metersPerPixel;

      if (!circleRef.current) {
        circleRef.current = new google.maps.Circle({
          map,
          center: userLocation,
          radius: dynamicRadius,
          strokeColor: "#dc2626",
          strokeOpacity: 0.8,
          strokeWeight: 1.5,
          fillColor: "#dc2626",
          fillOpacity: 0.12,
          clickable: false,
        });
      } else {
        circleRef.current.setCenter(userLocation);
        circleRef.current.setRadius(dynamicRadius);
      }
    };

    updateCircleSize();

    const zoomListener = map.addListener("zoom_changed", updateCircleSize);

    return () => {
      google.maps.event.removeListener(zoomListener);
    };
  }, [map, userLocation, isTracking]);

  const focusMap = (lat: number, lng: number, z = 16) => {
    if (!map) return;
    map.setCenter({ lat, lng });
    map.setZoom(z);
  };

  const handleMarkerClick = (branch: Branch, lat: number, lng: number) => {
    setSelectedBranch(branch);
    focusMap(lat, lng, 15);
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
    setUserLocation(null);
    if (circleRef.current) {
      circleRef.current.setMap(null);
      circleRef.current = null;
    }
    const baseCenter = center || defaultCenter;
    const baseZoom = zoom || defaultZoom;
    focusMap(baseCenter.lat, baseCenter.lng, baseZoom);
  };

  const handleUseMyLocation = () => {
    if (isTracking) {
      stopTracking();
      return;
    }

    if (!navigator.geolocation) {
      alert(t("alert_browser_not_support"));
      return;
    }

    setIsLocating(true);

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const loc = { lat, lng };
        setUserLocation(loc);
        /* console.log("Current position (watch):", { lat, lng }); */
        if (!isTracking) {
          focusMap(lat, lng, 15);
          setIsTracking(true);
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        alert(t("alert_unable"));
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );

    watchIdRef.current = watchId;
  };

  const getSvgMarker = (logoDataUrl: string, variant: "white" | "red") => {
    const fill =
      variant === "white" ? "rgba(220, 38, 38, 0.8)" : "rgba(220, 38, 38)";
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
      scaledSize: new google.maps.Size(42, 60),
      anchor: new google.maps.Point(21, 60),
    };
  };

  const userIcon =
    typeof google !== "undefined"
      ? {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="10" fill="#dc2626"/>
              <circle cx="20" cy="20" r="6" fill="white"/>
              <circle cx="20" cy="20" r="4" fill="#dc2626"/>
            </svg>
          `)}`,
          scaledSize: new google.maps.Size(24, 24),
          anchor: new google.maps.Point(12, 12),
        }
      : undefined;

  return (
    <div className="mb-8 bg-gray-50 rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4">{t("branch_map")}</h2>

      <div className="relative w-full bg-gray-200 rounded-xl overflow-hidden h-[550px] sm:h-[650px]">
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          center={center || defaultCenter}
          zoom={zoom || defaultZoom}
          onLoad={(mapInstance) => setMap(mapInstance)}
          onClick={() => setSelectedBranch(null)}
          options={{
            gestureHandling: "greedy",  
            scrollwheel: true, 
            zoomControl: true,
            draggable: true,
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
          }}
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
                  icon={getSvgMarker(
                    logoBase64,
                    isHovered || isSelected ? "red" : "white"
                  )}
                  onClick={() => handleMarkerClick(branch, lat, lng)}
                  onMouseOver={() => setHoveredMarkerId(branch.id_branch)}
                  onMouseOut={() => setHoveredMarkerId(null)}
                />
              );
            })}

          {userLocation && <Marker position={userLocation} icon={userIcon} />}

          {selectedBranch && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedBranch.map_lat),
                lng: parseFloat(selectedBranch.map_lng),
              }}
              onCloseClick={() => setSelectedBranch(null)}
              options={{ pixelOffset: new google.maps.Size(0, -5) }}
            >
              <div className="max-w-[220px] text-xs sm:text-sm">
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
                    className="inline-flex items-center justify-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition"
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

        <div className="pointer-events-none absolute inset-0 flex items-end justify-center md:justify-start p-2 sm:p-3">
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="pointer-events-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs sm:text-sm font-semibold text-gray-800 shadow-md border border-gray-300 hover:bg-gray-100 active:scale-95 transition w-full max-w-[220px] md:w-auto"
          >
            <MapPin className="w-4 h-4 text-red-500" />
            {isLocating
              ? t("locating")
              : isTracking
              ? t("Clear_location")
              : t("Use_my_location")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchMap;