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
      setSelected([result[0].latitude, result[0].longitude]);
    }
  };
  return (
    <div className="py-12 px-4 flex flex-col-reverse md:flex-row">
      <div className="w-full md:w-1/2">
      <h2 className="text-3xl font-bold text-center mb-6 underline">
        Coverage Map (64 Districts)
      </h2>
      <div>
        <h3 className="font-bold text-xl mb-6">All Locations:</h3>
        <div className="grid grid-cols-2 gap-2">
          {
            districts.map((dist) =><div className="p-4">
              <p className="font-bold flex items-center gap-2">District: <span className="text-sm">{dist.district}</span></p>
              <p className="font-bold flex items-center gap-2">Region: <span className="text-sm">{dist.region}</span></p>
              <p className="font-bold flex items-center gap-2">City: <span className="text-sm">{dist.city}</span></p>
              <p className="font-bold">Covered_Area: <span className="text-sm">{dist.covered_area.map(cv=><li className="pl-6">{cv}</li>)}</span></p>
              <p className="font-bold flex items-center gap-2">Status: <span className="text-sm text-green-500">{dist.status}</span></p>

            </div>)
          }
        </div>
      </div>
      </div>
      <div className="px-4 w-full md:w-1/2">
        {/* search bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search district/city..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="input input-bordered w-full"
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
    </div>
  );
};

export default Coverage;
