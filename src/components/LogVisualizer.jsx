// src/components/LogVisualizer.jsx
import React from "react";

const activityY = {
  off_duty: 230,
  sleeper: 180,
  driving: 130,
  on_duty: 80,
};

const colors = {
  off_duty: "#6b7280", // gray
  sleeper: "#10b981",  // green
  driving: "#ef4444",  // red
  on_duty: "#3b82f6",  // blue
};

export default function LogVisualizer({ entries = [], width = 800 }) {
  const height = 280;
  const leftPad = 40;
  const usableWidth = width - leftPad - 20;

  return (
    <div className="overflow-auto">
      <svg width={width} height={height} className="bg-white border rounded">
        {/* vertical grid for hours */}
        {[...Array(25).keys()].map((h) => {
          const x = leftPad + (h / 24) * usableWidth;
          return <line key={h} x1={x} y1={50} x2={x} y2={250} stroke="#eee" />;
        })}

        {/* hour labels */}
        {[0, 6, 12, 18, 24].map((h) => {
          const x = leftPad + (h / 24) * usableWidth;
          return <text key={h} x={x - 6} y={270} fontSize="12" fill="#666">{h}</text>;
        })}

        {/* activity lines */}
        {entries.map((e, i) => {
          const x1 = leftPad + (e.start_hour / 24) * usableWidth;
          const x2 = leftPad + (e.end_hour / 24) * usableWidth;
          const y = activityY[e.activity_type] || 130;
          return (
            <g key={i}>
              <rect x={x1} y={y - 10} width={Math.max(2, x2 - x1)} height={18} fill={colors[e.activity_type]} rx="3" />
              <text x={x1 + 4} y={y + 4} fontSize="11" fill="#fff">
                {e.activity_type.replace("_", " ")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
