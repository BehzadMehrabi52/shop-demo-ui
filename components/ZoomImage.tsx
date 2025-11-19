"use client";

import { useState, useRef } from "react";
import { useGlobal } from "../context/GlobalContext";

export default function ZoomImage({
  src,
  mainWidth = 400,
  mainHeight = 400,
  zoomWidth = 700,
  zoomHeight = 700,
  zoomScale = 4,
}:{src: string, mainWidth: number, mainHeight: number, zoomWidth: number, zoomHeight: number, zoomScale: number }) {
  const { lang } = useGlobal();
  const isRTL = lang === "fa";

  const imgRef = useRef<HTMLImageElement>(null);
  const [isZoomVisible, setIsZoomVisible] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });

  const lensSize = {
    width: zoomWidth / zoomScale,
    height: zoomHeight / zoomScale,
  };

  const handleMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    x = Math.max(lensSize.width / 2, Math.min(x, rect.width - lensSize.width / 2));
    y = Math.max(lensSize.height / 2, Math.min(y, rect.height - lensSize.height / 2));

    const zoomX = (x - lensSize.width / 2) * zoomScale;
    const zoomY = (y - lensSize.height / 2) * zoomScale;

    setLensPos({
      x: x - lensSize.width / 2,
      y: y - lensSize.height / 2,
    });

    setZoomPos({ x: zoomX, y: zoomY });
  };

  return (
    <div
      style={{ position: "relative", width: mainWidth, height: mainHeight }}
      onMouseEnter={() => setIsZoomVisible(true)}
      onMouseLeave={() => setIsZoomVisible(false)}
    >
      {/* تصویر اصلی */}
      <img
        ref={imgRef}
        src={src}
        onMouseMove={handleMove}
        style={{
          width: mainWidth,
          height: mainHeight,
          objectFit: "cover",
          borderRadius: 8,
        }}
      />

      {/* لنز کوچک روی تصویر اصلی */}
      {isZoomVisible && (
        <div
          style={{
            position: "absolute",
            top: lensPos.y,
            left: lensPos.x,
            width: lensSize.width,
            height: lensSize.height,
            border: "2px solid #1976d2",
            background: "rgba(255,255,255,0.3)",
            borderRadius: 4,
            pointerEvents: "none",
            zIndex: 5,
          }}
        ></div>
      )}

      {/* باکس زوم */}
      {isZoomVisible && (
        <div
          style={{
            position: "absolute",
            top: 0,
            [isRTL ? "right" : "left"]: mainWidth + 16,
            width: zoomWidth,
            height: zoomHeight,
            border: "1px solid #999",
            overflow: "hidden",
            background: "#fff",
            borderRadius: 8,
            zIndex: 10,
          }}
        >
          <img
            src={src}
            style={{
              position: "absolute",
              width: mainWidth * zoomScale,
              height: mainHeight * zoomScale,
              top: -zoomPos.y,
              left: -zoomPos.x,
              maxHeight: mainHeight * zoomScale,
              maxWidth: mainWidth * zoomScale,
            }}
          />
        </div>
      )}
    </div>
  );
}
