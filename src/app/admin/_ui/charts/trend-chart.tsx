"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatCurrency, formatCurrencyCompact } from "@/lib/admin/format";

export interface TrendPoint {
  key: string;
  /** Etiqueta corta del eje (ej. "nov"). */
  label: string;
  /** Etiqueta completa para el tooltip (ej. "Noviembre 2026"). */
  fullLabel: string;
  value: number;
}

const PAD = { top: 14, right: 14, bottom: 26, left: 56 };

/** Máximo "redondo" y paso de ticks limpios (0 / 50 mil / 100 mil...). */
function niceScale(max: number, tickCount = 3) {
  if (max <= 0) return { max: 1, step: 1, ticks: [0] };
  const rough = max / tickCount;
  const pow = 10 ** Math.floor(Math.log10(rough));
  const step = ([1, 2, 2.5, 5, 10].find((m) => m * pow >= rough) ?? 10) * pow;
  const niceMax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= niceMax + step / 2; v += step) ticks.push(v);
  return { max: niceMax, step, ticks };
}

/**
 * Serie temporal única (ingresos por mes): línea de 2px + área al ~10%,
 * grilla hairline, punto final con anillo del color de superficie, y
 * crosshair + tooltip al pasar el puntero o con las flechas del teclado.
 * Una sola serie → sin leyenda (el título de la tarjeta la nombra).
 */
export function TrendChart({
  points,
  highlightKey,
  height = 220,
  ariaLabel,
}: {
  points: TrendPoint[];
  highlightKey?: string;
  height?: number;
  ariaLabel: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(Math.round(entry.contentRect.width));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = useMemo(
    () => niceScale(Math.max(0, ...points.map((p) => p.value))),
    [points],
  );

  const innerW = Math.max(0, width - PAD.left - PAD.right);
  const innerH = height - PAD.top - PAD.bottom;
  const stepX = points.length > 1 ? innerW / (points.length - 1) : 0;
  const x = (i: number) => PAD.left + i * stepX;
  const y = (v: number) => PAD.top + innerH - (v / scale.max) * innerH;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`)
    .join(" ");
  const areaPath =
    points.length > 0
      ? `${linePath} L${x(points.length - 1).toFixed(1)},${PAD.top + innerH} L${x(0).toFixed(1)},${PAD.top + innerH} Z`
      : "";

  const highlightIndex = points.findIndex((p) => p.key === highlightKey);
  const shown = active ?? null;
  const activePoint = shown !== null ? points[shown] : undefined;

  function indexFromClientX(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || stepX === 0) return 0;
    const i = Math.round((clientX - rect.left - PAD.left) / stepX);
    return Math.min(points.length - 1, Math.max(0, i));
  }

  // Solo se rotulan algunas etiquetas del eje X si no entran todas.
  const labelEvery =
    innerW > 0 ? Math.max(1, Math.ceil((points.length * 34) / innerW)) : 1;

  const isEmpty = points.every((p) => p.value === 0);

  return (
    <div ref={containerRef} className="relative w-full select-none" style={{ height }}>
      {isEmpty ? (
        <p className="text-foreground-muted pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-sm">
          Todavía no hay ingresos para graficar
        </p>
      ) : null}
      {width > 0 ? (
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={ariaLabel}
          tabIndex={0}
          className="block touch-pan-y rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          onPointerMove={(e) => setActive(indexFromClientX(e.clientX))}
          onPointerDown={(e) => setActive(indexFromClientX(e.clientX))}
          onPointerLeave={() => setActive(null)}
          onBlur={() => setActive(null)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault();
              const base =
                active ?? (highlightIndex >= 0 ? highlightIndex : points.length - 1);
              const next = base + (e.key === "ArrowRight" ? 1 : -1);
              setActive(Math.min(points.length - 1, Math.max(0, next)));
            }
            if (e.key === "Escape") setActive(null);
          }}
        >
          {scale.ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD.left}
                x2={width - PAD.right}
                y1={y(tick)}
                y2={y(tick)}
                stroke="var(--chart-grid)"
                strokeWidth={1}
              />
              <text
                x={PAD.left - 10}
                y={y(tick)}
                dy="0.32em"
                textAnchor="end"
                fontSize={11}
                fill="var(--foreground-muted)"
                className="tabular-nums"
              >
                {tick === 0 ? "$ 0" : formatCurrencyCompact(tick)}
              </text>
            </g>
          ))}

          {points.map((p, i) =>
            (i % labelEvery === 0 && points.length - 1 - i >= labelEvery) ||
            i === points.length - 1 ? (
              <text
                key={p.key}
                x={x(i)}
                y={height - 6}
                textAnchor={
                  i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"
                }
                fontSize={11}
                fill={
                  i === highlightIndex ? "var(--foreground)" : "var(--foreground-muted)"
                }
                fontWeight={i === highlightIndex ? 600 : 400}
              >
                {p.label}
              </text>
            ) : null,
          )}

          <path d={areaPath} fill="var(--chart-1-wash)" />
          <path
            d={linePath}
            fill="none"
            stroke="var(--chart-1)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {highlightIndex >= 0 && shown === null ? (
            <circle
              cx={x(highlightIndex)}
              cy={y(points[highlightIndex]!.value)}
              r={4.5}
              fill="var(--chart-1)"
              stroke="var(--background-subtle)"
              strokeWidth={2}
            />
          ) : null}

          {activePoint && shown !== null ? (
            <g>
              <line
                x1={x(shown)}
                x2={x(shown)}
                y1={PAD.top}
                y2={PAD.top + innerH}
                stroke="var(--foreground-muted)"
                strokeOpacity={0.35}
                strokeWidth={1}
              />
              <circle
                cx={x(shown)}
                cy={y(activePoint.value)}
                r={5}
                fill="var(--chart-1)"
                stroke="var(--background-subtle)"
                strokeWidth={2}
              />
            </g>
          ) : null}
        </svg>
      ) : null}

      {activePoint && shown !== null && width > 0 ? (
        <div
          role="status"
          className="border-border bg-background-subtle pointer-events-none absolute top-0 z-10 rounded-xl border px-3 py-2 shadow-lg"
          style={{
            left: Math.min(Math.max(x(shown) - 70, 0), width - 140),
            width: 140,
          }}
        >
          <p className="text-foreground-muted text-[11px]">{activePoint.fullLabel}</p>
          <p className="text-foreground text-sm font-semibold">
            {formatCurrency(activePoint.value)}
          </p>
        </div>
      ) : null}

      <table className="sr-only">
        <caption>{ariaLabel}</caption>
        <thead>
          <tr>
            <th scope="col">Mes</th>
            <th scope="col">Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {points.map((p) => (
            <tr key={p.key}>
              <td>{p.fullLabel}</td>
              <td>{formatCurrency(p.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
