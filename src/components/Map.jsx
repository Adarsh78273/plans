import { MapContainer, TileLayer, Marker, useMap, useMapEvents, Polyline } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet default icon fix
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Map ko center par laane ke liye ---
function RecenterMap({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], map.getZoom());
    }
  }, [lat, lon, map]);
  return null;
}

// --- Click handling ---
function ClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const Map = ({ lat, lon, onMapClick, fromCoords, toCoords }) => {
  
  // Route line logic: Array tabhi banega jab coordinates valid honge
  const polylineCoords = [];
  if (fromCoords?.lat && fromCoords?.lon) polylineCoords.push([fromCoords.lat, fromCoords.lon]);
  if (toCoords?.lat && toCoords?.lon) polylineCoords.push([toCoords.lat, toCoords.lon]);

  return (
    <div className="h-full w-full rounded-3xl overflow-hidden shadow-inner">
      <MapContainer 
        center={[lat, lon]} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* 📍 Start Point Marker */}
        {fromCoords?.lat && (
          <Marker position={[fromCoords.lat, fromCoords.lon]} />
        )}

        {/* 🏁 End Point Marker */}
        {toCoords?.lat && (
          <Marker position={[toCoords.lat, toCoords.lon]} />
        )}

        {/* 🛣️ Route Line: Tabhi dikhegi jab dono points honge */}
        {polylineCoords.length === 2 && (
          <Polyline 
            positions={polylineCoords} 
            pathOptions={{ color: '#3b82f6', weight: 5, dashArray: '10, 10' }} 
          />
        )}
        
        <RecenterMap lat={lat} lon={lon} />
        <ClickHandler onMapClick={onMapClick} />
      </MapContainer>
    </div>
  );
};

export default Map;