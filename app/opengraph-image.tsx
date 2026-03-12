import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Qatar Portal — Prayer Times, Jobs & News";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #881337 0%, #4c0519 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 700, color: "#fcd34d", letterSpacing: 12, marginBottom: 24 }}>
          QATAR PORTAL
        </div>
        <div style={{ fontSize: 30, color: "#fde68a", marginBottom: 48 }}>
          Prayer Times · Jobs · News
        </div>
        <div
          style={{
            display: "flex",
            gap: 32,
            fontSize: 22,
            color: "#fff",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: "18px 40px",
          }}
        >
          <span>🕌 Doha Prayer Times</span>
          <span>💼 Qatar Jobs</span>
          <span>📰 Gulf News</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
