// src/components/CoverageMap.jsx
import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import districts from "../../../public/warehouses.json";

// custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ChangeView({ coords }) {
  const map = useMap();
  if (coords) {
    map.setView(coords, 14); // zoom to selected district
  }
  return null;
}

const Coverage = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [filtered, setFiltered] = useState(districts);
  const mapRef = useRef();

  const handleSearch = (value) => {
    setSearch(value);
    if (value.trim() === "") {
      setFiltered(districts);
      setSelected(null);
      return;
    }
    const result = districts.filter(
      (d) =>
        d.district.toLowerCase().includes(value.toLowerCase()) ||
        d.city.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
    if (result.length > 0) {
      setSelected([result[0].latitude, result[0].longitude]); // first match zoom
    }
  };
  return (
    <section className="py-12 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Coverage Map (64 Districts)
        </h2>
        {/* search bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search district/city..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="input input-bordered w-1/2"
          />
        </div>

        {/* map */}
        <MapContainer
          center={[23.685, 90.3563]} // Bangladesh center
          zoom={7}
          style={{ height: "600px", width: "100%" }}
          ref={mapRef}
          className="rounded-2xl"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {filtered.map((d, i) => (
            <Marker
              key={i}
              position={[d.latitude, d.longitude]}
              icon={markerIcon}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{d.district}</h3>
                  <p>
                    <b>City:</b> {d.city}
                  </p>
                  <p>
                    <b>Covered Areas:</b> {d.covered_area.join(", ")}
                  </p>
                  <img
                    src={d.flowchart}
                    alt={d.district}
                    className="mt-2 w-40"
                  />
                </div>
              </Popup>
            </Marker>
          ))}
          <ChangeView coords={selected} />
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;
