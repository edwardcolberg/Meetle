import { useState, useRef, useEffect } from "react";

const MEETLE_GREEN = "#2D6A4F";
const MEETLE_LIGHT = "#B7E4C7";
const MEETLE_CREAM = "#FEFAE0";
const MEETLE_WARM = "#DDA15E";
const MEETLE_DARK = "#1B4332";
const MEETLE_RED = "#BC4749";

const BeetleIcon = ({ size = 32, color = MEETLE_GREEN }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="36" rx="18" ry="20" fill={color} />
    <ellipse cx="32" cy="36" rx="18" ry="20" fill="none" stroke={MEETLE_DARK} strokeWidth="2" />
    <line x1="32" y1="16" x2="32" y2="56" stroke={MEETLE_DARK} strokeWidth="1.5" />
    <path d="M14 32 Q32 28 50 32" fill="none" stroke={MEETLE_DARK} strokeWidth="1.5" />
    <circle cx="24" cy="22" r="4" fill={MEETLE_CREAM} stroke={MEETLE_DARK} strokeWidth="1.5" />
    <circle cx="40" cy="22" r="4" fill={MEETLE_CREAM} stroke={MEETLE_DARK} strokeWidth="1.5" />
    <circle cx="24" cy="22" r="2" fill={MEETLE_DARK} />
    <circle cx="40" cy="22" r="2" fill={MEETLE_DARK} />
    <path d="M22 14 Q20 6 16 4" fill="none" stroke={MEETLE_DARK} strokeWidth="2" strokeLinecap="round" />
    <path d="M42 14 Q44 6 48 4" fill="none" stroke={MEETLE_DARK} strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="4" r="2.5" fill={MEETLE_WARM} />
    <circle cx="48" cy="4" r="2.5" fill={MEETLE_WARM} />
    <ellipse cx="24" cy="40" rx="3" ry="4" fill={MEETLE_LIGHT} opacity="0.4" />
  </svg>
);

const PinIcon = ({ color = MEETLE_RED, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
  </svg>
);

const StarIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={MEETLE_WARM}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const CarIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h2l2-3h6l2 3h2a2 2 0 012 2v6a2 2 0 01-2 2M7 17a2 2 0 100 4 2 2 0 000-4zM17 17a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
);

const LinkIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

const LoadingDots = () => {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    return () => clearInterval(interval);
  }, []);
  return <span>{".".repeat(dots)}</span>;
};

const keyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes beetleWalk {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateX(4px) rotate(3deg); }
  75% { transform: translateX(-4px) rotate(-3deg); }
}
`;

const priceColors = {
  Free: { bg: "#E8F5E9", text: "#388E3C" },
  $: { bg: "#E8F5E9", text: "#2D6A4F" },
  $$: { bg: "#FFF8E1", text: "#F9A825" },
  $$$: { bg: "#FFF3E0", text: "#E65100" },
  $$$$: { bg: "#FCE4EC", text: "#C62828" },
};

function getSearchUrl(name, lat, lng) {
  const q = encodeURIComponent(name);
  return `https://www.google.com/maps/search/${q}/@${lat},${lng},15z`;
}

function createColoredIcon(color, label) {
  const L = window.L;
  if (!L) return null;
  return L.divIcon({
    className: "",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
    html: `<div style="position:relative;width:32px;height:40px;">
      <svg width="32" height="40" viewBox="0 0 32 40">
        <path d="M16 0C7.16 0 0 7.16 0 16c0 8.84 16 24 16 24s16-15.16 16-24C32 7.16 24.84 0 16 0z" fill="${color}"/>
        <circle cx="16" cy="14" r="7" fill="white" opacity="0.9"/>
      </svg>
      <div style="position:absolute;top:7px;left:0;width:32px;text-align:center;font-size:11px;font-weight:800;color:${color};font-family:'Nunito',sans-serif;">${label}</div>
    </div>`,
  });
}

function createSmallIcon(color, index) {
  const L = window.L;
  if (!L) return null;
  return L.divIcon({
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
    html: `<div style="width:24px;height:24px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white;font-family:'Nunito',sans-serif;">${index + 1}</div>`,
  });
}

function milesToMeters(miles) {
  return miles * 1609.34;
}

function MeetleMap({ results, locationAName, locationBName }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const L = window.L;
    if (!L || !results || !mapRef.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
    });
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    const markers = [];

    // Calculate radius for Venn diagram circles
    const radiusMiles = results.radius_miles || 6;
    const radiusMeters = milesToMeters(radiusMiles);

    // Draw Venn diagram circles FIRST (behind everything)
    if (results.location_a) {
      L.circle([results.location_a.lat, results.location_a.lng], {
        radius: radiusMeters,
        color: MEETLE_GREEN,
        fillColor: MEETLE_GREEN,
        fillOpacity: 0.08,
        weight: 2,
        opacity: 0.4,
        dashArray: "8, 6",
      }).addTo(map);
    }

    if (results.location_b) {
      L.circle([results.location_b.lat, results.location_b.lng], {
        radius: radiusMeters,
        color: MEETLE_WARM,
        fillColor: MEETLE_WARM,
        fillOpacity: 0.08,
        weight: 2,
        opacity: 0.4,
        dashArray: "8, 6",
      }).addTo(map);
    }

    // Markers for A and B
    if (results.location_a) {
      const iconA = createColoredIcon(MEETLE_GREEN, "A");
      const m = L.marker([results.location_a.lat, results.location_a.lng], { icon: iconA })
        .addTo(map)
        .bindPopup(`<b style="font-family:'Nunito',sans-serif;">${locationAName}</b>`);
      markers.push(m);
    }

    if (results.location_b) {
      const iconB = createColoredIcon(MEETLE_WARM, "B");
      const m = L.marker([results.location_b.lat, results.location_b.lng], { icon: iconB })
        .addTo(map)
        .bindPopup(`<b style="font-family:'Nunito',sans-serif;">${locationBName}</b>`);
      markers.push(m);
    }

    // Midpoint marker
    if (results.midpoint) {
      const iconM = createColoredIcon(MEETLE_RED, "★");
      const m = L.marker([results.midpoint.lat, results.midpoint.lng], { icon: iconM })
        .addTo(map)
        .bindPopup(`<b style="font-family:'Nunito',sans-serif;">Meetle Point: ${results.midpoint_area}</b>`);
      markers.push(m);
    }

    // Suggestion markers with clickable popups
    if (results.suggestions) {
      results.suggestions.forEach((place, i) => {
        if (place.lat && place.lng) {
          const icon = createSmallIcon(MEETLE_DARK, i);
          const searchUrl = getSearchUrl(place.name, place.lat, place.lng);
          const m = L.marker([place.lat, place.lng], { icon: icon })
            .addTo(map)
            .bindPopup(
              `<div style="font-family:'Nunito',sans-serif;">
                <b>${place.name}</b><br/>
                <span style="color:#666;">${place.vibe}</span><br/>
                <a href="${searchUrl}" target="_blank" rel="noopener" style="color:${MEETLE_GREEN};font-weight:700;text-decoration:none;">View on Google Maps →</a>
              </div>`
            );
          markers.push(m);
        }
      });
    }

    // Dashed lines from A and B to midpoint
    if (results.location_a && results.midpoint) {
      L.polyline(
        [[results.location_a.lat, results.location_a.lng], [results.midpoint.lat, results.midpoint.lng]],
        { color: MEETLE_GREEN, weight: 2, dashArray: "8, 8", opacity: 0.5 }
      ).addTo(map);
    }
    if (results.location_b && results.midpoint) {
      L.polyline(
        [[results.location_b.lat, results.location_b.lng], [results.midpoint.lat, results.midpoint.lng]],
        { color: MEETLE_WARM, weight: 2, dashArray: "8, 8", opacity: 0.5 }
      ).addTo(map);
    }

    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.2));
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [results, locationAName, locationBName]);

  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        border: `2px solid ${MEETLE_LIGHT}`,
        marginBottom: 16,
        animation: "fadeInUp 0.5s ease-out",
      }}
    >
      <div ref={mapRef} style={{ width: "100%", height: 340 }} />
      <div
        style={{
          background: "white",
          padding: "10px 16px",
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
          fontSize: 12,
          fontFamily: "'Quicksand', sans-serif",
          fontWeight: 600,
          color: "#666",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: MEETLE_GREEN }} />
          You
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: MEETLE_WARM }} />
          Friend
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: MEETLE_RED }} />
          Meetle Point
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px dashed ${MEETLE_GREEN}`, background: `${MEETLE_GREEN}15` }} />
          Overlap = sweet spot
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [locationA, setLocationA] = useState("");
  const [locationB, setLocationB] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const resultsRef = useRef(null);

  const findMiddle = async () => {
    if (!locationA.trim() || !locationB.trim()) {
      setError("Please enter both locations!");
      return;
    }
    setError(null);
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch("/api/meetle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locationA: locationA.trim(),
          locationB: locationB.trim(),
        }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      setResults(data);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong finding your midpoint. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const typeColors = {
    restaurant: { bg: "#FFECD2", text: "#BC6C25", label: "Restaurant" },
    cafe: { bg: "#D8F3DC", text: "#2D6A4F", label: "Café" },
    activity: { bg: "#D4E4FF", text: "#2B4C7E", label: "Activity" },
    park: { bg: "#E8F5E9", text: "#388E3C", label: "Park" },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(170deg, ${MEETLE_CREAM} 0%, #FFF8E7 40%, #F0F7F0 100%)`,
        fontFamily: "'Nunito', 'Quicksand', 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{keyframes}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, ${MEETLE_LIGHT}33 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, ${MEETLE_WARM}22 0%, transparent 50%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "40px 20px 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ animation: loading ? "beetleWalk 0.5s ease-in-out infinite" : "none" }}>
              <BeetleIcon size={48} />
            </div>
            <h1
              style={{
                fontSize: 44,
                fontWeight: 900,
                color: MEETLE_DARK,
                margin: 0,
                letterSpacing: "-1px",
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              meetle
            </h1>
          </div>
          <p
            style={{
              fontSize: 16,
              color: "#666",
              margin: 0,
              fontWeight: 500,
              fontFamily: "'Quicksand', sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            meet in the middle — every time
          </p>
        </div>

        {/* Input Card */}
        <div
          style={{
            background: "white",
            borderRadius: 24,
            padding: "32px 28px",
            boxShadow: "0 4px 24px rgba(45,106,79,0.08), 0 1px 3px rgba(0,0,0,0.04)",
            border: `1px solid ${MEETLE_LIGHT}`,
            marginBottom: 24,
          }}
        >
          {/* Location A */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div
                style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: MEETLE_GREEN,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontSize: 13, fontWeight: 800,
                }}
              >
                A
              </div>
              <label style={{ fontSize: 14, fontWeight: 700, color: MEETLE_DARK, fontFamily: "'Quicksand', sans-serif" }}>
                Your location
              </label>
            </div>
            <input
              type="text"
              placeholder="e.g. Riverside, IL"
              value={locationA}
              onChange={(e) => setLocationA(e.target.value)}
              style={{
                width: "100%", padding: "14px 16px", borderRadius: 14,
                border: `2px solid ${MEETLE_LIGHT}`, fontSize: 16,
                fontFamily: "'Nunito', sans-serif", outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxSizing: "border-box", background: "#FAFFF8",
              }}
              onFocus={(e) => { e.target.style.borderColor = MEETLE_GREEN; e.target.style.boxShadow = `0 0 0 3px ${MEETLE_GREEN}22`; }}
              onBlur={(e) => { e.target.style.borderColor = MEETLE_LIGHT; e.target.style.boxShadow = "none"; }}
              onKeyDown={(e) => e.key === "Enter" && findMiddle()}
            />
          </div>

          {/* Road connector */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "4px 0" }}>
            <div
              style={{
                width: 2, height: 24,
                background: `repeating-linear-gradient(to bottom, ${MEETLE_GREEN} 0px, ${MEETLE_GREEN} 4px, transparent 4px, transparent 8px)`,
                marginLeft: 13,
              }}
            />
          </div>

          {/* Location B */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div
                style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: MEETLE_WARM,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontSize: 13, fontWeight: 800,
                }}
              >
                B
              </div>
              <label style={{ fontSize: 14, fontWeight: 700, color: MEETLE_DARK, fontFamily: "'Quicksand', sans-serif" }}>
                Friend's location
              </label>
            </div>
            <input
              type="text"
              placeholder="e.g. Irving Park, Chicago"
              value={locationB}
              onChange={(e) => setLocationB(e.target.value)}
              style={{
                width: "100%", padding: "14px 16px", borderRadius: 14,
                border: `2px solid ${MEETLE_LIGHT}`, fontSize: 16,
                fontFamily: "'Nunito', sans-serif", outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxSizing: "border-box", background: "#FAFFF8",
              }}
              onFocus={(e) => { e.target.style.borderColor = MEETLE_WARM; e.target.style.boxShadow = `0 0 0 3px ${MEETLE_WARM}22`; }}
              onBlur={(e) => { e.target.style.borderColor = MEETLE_LIGHT; e.target.style.boxShadow = "none"; }}
              onKeyDown={(e) => e.key === "Enter" && findMiddle()}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "#FFF0F0", color: MEETLE_RED,
                padding: "10px 14px", borderRadius: 10,
                fontSize: 14, fontWeight: 600, marginBottom: 16, textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          {/* Button */}
          <button
            onClick={findMiddle}
            disabled={loading}
            style={{
              width: "100%", padding: "16px",
              background: loading ? MEETLE_LIGHT : `linear-gradient(135deg, ${MEETLE_GREEN}, ${MEETLE_DARK})`,
              color: loading ? MEETLE_GREEN : "white",
              border: "none", borderRadius: 16, fontSize: 17, fontWeight: 800,
              cursor: loading ? "wait" : "pointer",
              fontFamily: "'Nunito', sans-serif",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 10, letterSpacing: "0.3px",
            }}
          >
            {loading ? (
              <>
                <div style={{ animation: "beetleWalk 0.5s ease-in-out infinite" }}>
                  <BeetleIcon size={22} color={MEETLE_GREEN} />
                </div>
                Finding your middle
                <LoadingDots />
              </>
            ) : (
              <>
                <BeetleIcon size={22} color="white" />
                Find the Middle
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {results && (
          <div ref={resultsRef} style={{ animation: "fadeInUp 0.5s ease-out" }}>
            {/* Midpoint Banner */}
            <div
              style={{
                background: `linear-gradient(135deg, ${MEETLE_DARK}, ${MEETLE_GREEN})`,
                borderRadius: 20, padding: "24px", marginBottom: 16,
                color: "white", textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 12, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "2px", opacity: 0.7, marginBottom: 6,
                  fontFamily: "'Quicksand', sans-serif",
                }}
              >
                Your Meetle Point
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <PinIcon color="white" size={24} />
                <div style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Nunito', sans-serif" }}>
                  {results.midpoint_area}
                </div>
              </div>
              <div
                style={{
                  fontSize: 14, opacity: 0.8, marginTop: 8,
                  fontFamily: "'Quicksand', sans-serif", fontWeight: 500,
                }}
              >
                {results.midpoint_note}
              </div>
            </div>

            {/* MAP */}
            <MeetleMap results={results} locationAName={locationA} locationBName={locationB} />

            {/* Suggestion Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {results.suggestions?.map((place, i) => {
                const typeStyle = typeColors[place.type] || typeColors.restaurant;
                const isHovered = hoveredCard === i;
                const searchUrl = getSearchUrl(place.name, place.lat, place.lng);
                const pc = priceColors[place.price] || priceColors["$$"];
                return (
                  <div
                    key={i}
                    style={{
                      background: "white",
                      borderRadius: 18, padding: "20px",
                      boxShadow: isHovered
                        ? "0 8px 24px rgba(0,0,0,0.08)"
                        : "0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
                      border: "1px solid #f0f0f0",
                      animation: `slideIn 0.4s ease-out ${i * 0.1}s both`,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                    }}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <div
                            style={{
                              width: 22, height: 22, borderRadius: "50%",
                              background: MEETLE_DARK, color: "white",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 11, fontWeight: 800, flexShrink: 0,
                            }}
                          >
                            {i + 1}
                          </div>
                          <a
                            href={searchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: 18, fontWeight: 800, color: MEETLE_DARK,
                              fontFamily: "'Nunito', sans-serif",
                              textDecoration: "none",
                              display: "flex", alignItems: "center", gap: 6,
                              transition: "color 0.15s",
                            }}
                            onMouseEnter={(e) => e.target.style.color = MEETLE_GREEN}
                            onMouseLeave={(e) => e.target.style.color = MEETLE_DARK}
                          >
                            {place.name}
                            <LinkIcon size={13} />
                          </a>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 30, flexWrap: "wrap" }}>
                          <span
                            style={{
                              background: typeStyle.bg, color: typeStyle.text,
                              padding: "3px 10px", borderRadius: 8,
                              fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                              letterSpacing: "0.5px", fontFamily: "'Quicksand', sans-serif",
                            }}
                          >
                            {typeStyle.label}
                          </span>
                          <span
                            style={{
                              fontSize: 13, color: "#888", fontStyle: "italic",
                              fontFamily: "'Quicksand', sans-serif",
                            }}
                          >
                            {place.vibe}
                          </span>
                        </div>
                      </div>
                      {/* Rating + Price */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end", flexShrink: 0 }}>
                        {place.rating && (
                          <div
                            style={{
                              display: "flex", alignItems: "center", gap: 3,
                              background: "#FFF8E7", padding: "4px 8px", borderRadius: 8,
                            }}
                          >
                            <StarIcon />
                            <span style={{ fontSize: 13, fontWeight: 700, color: MEETLE_WARM }}>
                              {place.rating}
                            </span>
                          </div>
                        )}
                        {place.price && (
                          <div
                            style={{
                              background: pc.bg, color: pc.text,
                              padding: "4px 8px", borderRadius: 8,
                              fontSize: 12, fontWeight: 800,
                              fontFamily: "'Nunito', sans-serif",
                              letterSpacing: place.price === "Free" ? "0" : "1px",
                            }}
                          >
                            {place.price}
                          </div>
                        )}
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: 14, color: "#555",
                        margin: "8px 0 12px", marginLeft: 30,
                        lineHeight: 1.5,
                        fontFamily: "'Quicksand', sans-serif", fontWeight: 500,
                      }}
                    >
                      {place.why}
                    </p>

                    {/* Drive times */}
                    <div style={{ display: "flex", gap: 12, marginLeft: 30, flexWrap: "wrap" }}>
                      <div
                        style={{
                          display: "flex", alignItems: "center", gap: 6,
                          background: `${MEETLE_GREEN}0D`, padding: "6px 12px",
                          borderRadius: 10, fontSize: 12, fontWeight: 700,
                          color: MEETLE_GREEN, fontFamily: "'Quicksand', sans-serif",
                        }}
                      >
                        <CarIcon size={14} />
                        <span style={{ fontWeight: 800 }}>A</span> {place.drive_a}
                      </div>
                      <div
                        style={{
                          display: "flex", alignItems: "center", gap: 6,
                          background: `${MEETLE_WARM}15`, padding: "6px 12px",
                          borderRadius: 10, fontSize: 12, fontWeight: 700,
                          color: "#A67C52", fontFamily: "'Quicksand', sans-serif",
                        }}
                      >
                        <CarIcon size={14} />
                        <span style={{ fontWeight: 800 }}>B</span> {place.drive_b}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Try again */}
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button
                onClick={() => {
                  setResults(null);
                  setLocationA("");
                  setLocationB("");
                  setHoveredCard(null);
                }}
                style={{
                  background: "transparent",
                  border: `2px solid ${MEETLE_LIGHT}`,
                  borderRadius: 14, padding: "12px 28px",
                  fontSize: 15, fontWeight: 700, color: MEETLE_GREEN,
                  cursor: "pointer", fontFamily: "'Nunito', sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.target.style.background = MEETLE_LIGHT; e.target.style.color = MEETLE_DARK; }}
                onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = MEETLE_GREEN; }}
              >
                Start a new Meetle
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            textAlign: "center", marginTop: 48,
            fontSize: 12, color: "#aaa",
            fontFamily: "'Quicksand', sans-serif",
          }}
        >
          <BeetleIcon size={20} color="#ccc" />
          <div style={{ marginTop: 4 }}>meetle.us — find the fair middle ground</div>
        </div>
      </div>
    </div>
  );
}
