//eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useMemo, useRef, useState } from "react";
import { Bump } from "@nivo/bump";
import type { BumpCustomLayerProps } from "@nivo/bump";
import type { BumpChartData } from "../utils/helpers/nivo";
import { profileColorChoices } from "../utils/constants";

type Datum = BumpChartData[number]["data"][number];

// Spread players evenly across the palette, ordered by latest rank
const buildColorMap = (data: BumpChartData) => {
  const byFinalRank = [...data].sort(
    (a, b) => (a.data.at(-1)?.y ?? 0) - (b.data.at(-1)?.y ?? 0),
  );
  const map: Record<string, string> = {};
  byFinalRank.forEach((serie, i) => {
    const idx = Math.floor(
      (i * profileColorChoices.length) / byFinalRank.length,
    );
    map[serie.id] = profileColorChoices[idx];
  });
  return { map, legendOrder: byFinalRank.map((s) => s.id) };
};

const CHART_MARGIN = { top: 40, bottom: 50, left: 50, right: 90 };
// Approx. tooltip height plus a gap; points closer to the top than this flip
const TOOLTIP_FLIP_Y = 110;

const tooltipClass =
  "rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow";

export const BumpChart = ({ data }: { data: BumpChartData }) => {
  const { map: colorMap, legendOrder } = useMemo(
    () => buildColorMap(data),
    [data],
  );
  const [selected, setSelected] = useState<string | null>(null);

  // Nivo only exposes setActiveSerieIds to custom layers, so capture it here
  const setActiveRef = useRef<((ids: string[]) => void) | null>(null);
  const CaptureLayer = useMemo(
    () =>
      ({ setActiveSerieIds }: BumpCustomLayerProps<Datum>) => {
        setActiveRef.current = setActiveSerieIds;
        return null;
      },
    [],
  );

  const select = (id: string) => {
    const next = selected === id ? null : id;
    setSelected(next);
    setActiveRef.current?.(next ? [next] : []);
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold my-5 text-purple-600">Bump Chart</h1>
      <div className="w-full overflow-x-auto">
        <Bump
          data={data}
          lineWidth={3}
          activeLineWidth={6}
          inactiveLineWidth={3}
          inactiveOpacity={0.25}
          width={800}
          height={400}
          useMesh
          colors={({ id }) => colorMap[id] ?? "#999"}
          pointBorderWidth={3}
          activePointBorderWidth={3}
          pointBorderColor={{ from: "serie.color" }}
          axisLeft={{ legend: "ranking", legendOffset: -40 }}
          axisBottom={{ legend: "week", legendOffset: 32 }}
          margin={CHART_MARGIN}
          layers={[
            "grid",
            "axes",
            "labels",
            "lines",
            "points",
            "mesh",
            CaptureLayer,
          ]}
          pointTooltip={({ point }) => (
            <div
              className={tooltipClass}
              // Nivo anchors the tooltip above the cursor; near the top of the
              // chart that gets clipped, so push it below the node instead
              style={
                point.y !== null && point.y + CHART_MARGIN.top < TOOLTIP_FLIP_Y
                  ? { transform: "translateY(calc(100% + 32px))" }
                  : undefined
              }
            >
              <strong style={{ color: point.serie.color }}>
                {point.serie.id}
              </strong>
              <div>Week {point.data.x}</div>
              <div>Rank {point.data.y}</div>
            </div>
          )}
          lineTooltip={({ serie }) => (
            <div className={tooltipClass}>
              <strong style={{ color: serie.color }}>{serie.id}</strong>
            </div>
          )}
        />
      </div>

      <ul className="mt-3 flex flex-wrap gap-2">
        {legendOrder.map((id) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => select(id)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${
                selected === id
                  ? "border-black font-semibold"
                  : "border-gray-300"
              }`}
            >
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ background: colorMap[id] }}
              />
              {id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
