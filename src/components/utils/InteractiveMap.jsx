// // src/components/utils/InteractiveMap.jsx
// "use client";

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";

// /**
//  * Placeholder logo pin — swap the inner content for an actual
//  * <img src="/logo.png" /> once brand assets are ready. Keeping
//  * this as a divIcon (not a default Leaflet marker) is what lets
//  * us drop the logo shape in directly.
//  */
// const logoIcon = L.icon({
//   iconUrl: "/images/logo/latest-logo.png", // put the file in /public
//   iconSize: [48, 48], // match your actual image dimensions
//   iconAnchor: [24, 48], // bottom-center of image = the actual pin point
//   popupAnchor: [0, -48],
// });

// export default function InteractiveMap({ latitude, longitude, name, address }) {
//   return (
//     <MapContainer
//       center={[latitude, longitude]}
//       zoom={16}
//       scrollWheelZoom={false}
//       style={{ height: "100%", width: "100%" }}
//     >
//       {/* Dark tiles to match the site's black theme.
//           No API key needed, but keep the attribution. */}
//       <TileLayer
//         url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
//       />
//       <Marker position={[latitude, longitude]} icon={logoIcon}>
//         <Popup>
//           <strong>{name}</strong>
//           <br />
//           {address}
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/**
 * Fallback pin — CSS only, no image file required. Safe to ship
 * before the real logo asset is cropped/ready. Swap `iconUrl`-based
 * L.icon() in once you have a transparent PNG (see comment below).
 */

// const logoIcon = L.divIcon({
//   className: "",
//   html: `
//     <div style="display:flex;flex-direction:column;align-items:center;">
//       <div style="
//         display:flex;
//         align-items:center;
//         justify-content:center;
//         background:#0a0a0a;
//         border:2px solid #7f922a;
//         border-radius:4px;
//         padding:6px 10px;
//         box-shadow:0 2px 8px rgba(0,0,0,0.5);
//       ">
//         <span style="
//           font-family:var(--font-heading, sans-serif);
//           font-weight:900;
//           font-size:10px;
//           letter-spacing:0.05em;
//           text-transform:uppercase;
//           color:#fff;
//           white-space:nowrap;
//         ">HOME</span>
//       </div>
//       <div style="
//         width:10px;
//         height:10px;
//         margin-top:-5px;
//         background:#0a0a0a;
//         border-right:2px solid #7f922a;
//         border-bottom:2px solid #7f922a;
//         transform:rotate(45deg);
//       "></div>
//     </div>
//   `,
//   iconSize: [64, 56],
//   iconAnchor: [32, 56],
//   popupAnchor: [0, -56],
// });

const logoIcon = L.icon({
  iconUrl: "/images/logo/latest-logo.png", // put the file in /public
  iconSize: [48, 48], // match your actual image dimensions
  iconAnchor: [24, 48], // bottom-center of image = the actual pin point
  popupAnchor: [0, -48],
});

/*
  Once the real logo image is ready (transparent PNG, cropped tight,
  dropped in /public):

  const logoIcon = L.icon({
    iconUrl: "/logo-pin.png",
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });
*/

/**
 * Forces Leaflet to recalculate tile layout after the container's
 * real size settles. Without this, the map can render as broken /
 * partial tiles when it initializes inside a dynamically-loaded or
 * responsive container (the size at mount time isn't the final size).
 */
function InvalidateSizeOnMount() {
  const map = useMap();

  useEffect(() => {
    // Run once after mount, then again on any container resize
    const container = map.getContainer();

    map.invalidateSize();

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [map]);

  return null;
}

export default function InteractiveMap({ latitude, longitude, name, address }) {
  const mapRef = useRef(null);

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      ref={mapRef}
    >
      <InvalidateSizeOnMount />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Marker position={[latitude, longitude]} icon={logoIcon} />
    </MapContainer>
  );
}
