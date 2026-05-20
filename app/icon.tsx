import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 35% 28%, #fffde7 0 16%, #fde047 26%, #f59e0b 54%, #0b1120 100%)",
          borderRadius: "14px",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "999px",
            inset: "8px",
            position: "absolute",
          }}
        />
        <span
          style={{
            color: "#271305",
            fontFamily: "Arial",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.18em",
            marginLeft: "0.18em",
            textTransform: "uppercase",
          }}
        >
          A
        </span>
      </div>
    ),
    size
  );
}
