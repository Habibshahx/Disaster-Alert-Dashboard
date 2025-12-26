import React, { useEffect } from "react";
import {MapContainer, TileLayer, Marker, Popup, Circle, useMap} from "react-leaflet";
import L from "leaflet";

// Glowing severity marker icon
const iconForSeverity = (severity) => {
  const color =
    severity === "High"
      ? "#e53e3e"
      : severity === "Medium"
      ? "#f6c343"
      : "#3fb24a";

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div 
        style="
          background: ${color};
          width: 18px;
          height: 18px;
          border-radius: 50%;
          box-shadow: 0 0 12px ${color}88, 0 0 4px white;
          border: 2px solid white;
        "
        class="marker-dot"
      ></div>
    `,
  });
};

// MapController — zoom to selected alert
function MapController({ selectedAlert }) {
  const map = useMap();

  useEffect(() => {
    if (selectedAlert) {
      map.flyTo(selectedAlert.coords, 9, { duration: 1.2 });
    }
  }, [selectedAlert, map]);

  return null;
}

// FitMapController 
function FitMapController({ alerts, triggerFit }) {
  const map = useMap();

  useEffect(() => {
    if (!triggerFit || alerts.length === 0) return;

    const bounds = L.latLngBounds(alerts.map((a) => a.coords));
    map.fitBounds(bounds, { padding: [60, 60] });
  }, [alerts, triggerFit, map]);

  return null;
}

// Main Map View Component
export default function MapView({ alerts = [], selectedAlert, onMarkerClick, triggerFitMap }) {
  const center = [30.3753, 69.3451]; 
  const zoom = 5;

  // Fix CRA leaflet icon paths
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
  }, []);

  return (
    <div className="map-container">

      {/* Floating Legend */}
      <div className="legend">
        <div><span className="dot high"></span> High Severity</div>
        <div><span className="dot medium"></span> Medium Severity</div>
        <div><span className="dot low"></span> Low Severity</div>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: "100%", height: "100%" }}
      >
        <FitMapController alerts={alerts} triggerFit={triggerFitMap} />

        {/* Zoom To Selected Alert */}
        <MapController selectedAlert={selectedAlert} />

        {/* Auto-fit to all alerts */}
        <FitMapController alerts={alerts} triggerFit={triggerFitMap} />

        {/* Base map */}
        <TileLayer
          attribution="&copy; OpenStreetMap Contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Disaster Markers */}
        {alerts.map((alert) => (
          <Marker
            key={alert.id}
            position={alert.coords}
            icon={iconForSeverity(alert.severity)}
            eventHandlers={{
              click: (e) => {
                // Bounce animation
                const el = e.target._icon;
                el.classList.add("marker-bounce");
                setTimeout(() => el.classList.remove("marker-bounce"), 700);

                onMarkerClick(alert);
              },
            }}
          >
            <Popup>
              <div style={{ minWidth: 200 }}>
                <strong style={{ fontSize: "1rem" }}>{alert.type}</strong>
                <div style={{ fontSize: 13, color: "#6a7b89" }}>
                  {alert.location}
                </div>

                <div style={{ marginTop: 6 }}>{alert.description}</div>

                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: "#6a7b89",
                    fontWeight: 600,
                  }}
                >
                  Severity: {alert.severity}
                </div>
              </div>
            </Popup>

            {/* Affected radius */}
            {alert.affectedAreaKm2 && (
              <Circle
                center={alert.coords}
                radius={Math.sqrt(alert.affectedAreaKm2) * 1000}
                pathOptions={{
                  color:
                    alert.severity === "High"
                      ? "#e53e3e"
                      : alert.severity === "Medium"
                      ? "#f6c343"
                      : "#3fb24a",
                  fillOpacity: 0.1,
                  weight: 1.2,
                }}
              />
            )}
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}
