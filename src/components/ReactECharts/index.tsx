"use client";
import React, {
  useRef,
  useEffect,
  RefObject,
  useState,
  useCallback,
  memo,
} from "react";
import { init, getInstanceByDom } from "echarts";
import type { CSSProperties } from "react";
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";
import * as echarts from "echarts/core";
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";

echarts.use([SVGRenderer, CanvasRenderer]);
export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  withImage?: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  onChartInit?: (chartInstance: ECharts) => void;
  onRenderEnded?: (chartInstance: ECharts) => void;
}

const ReactECharts = function ReactECharts({
  option,
  style,
  settings = {
    notMerge: true,
  },
  loading = false,
  containerRef,
  onChartInit,
  onRenderEnded,
}: ReactEChartsProps): JSX.Element {
  const chartInstance = useRef<ECharts | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);

  const onFinished = useCallback(() => {
    onRenderEnded instanceof Function &&
      chartInstance.current &&
      onRenderEnded(chartInstance.current);
  }, [onRenderEnded]);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, null, { renderer: "svg" });
      chartInstance.current = chart;
      onChartInit instanceof Function && onChartInit(chart);
    }

    const ref = containerRef?.current;
    const observer = new ResizeObserver(([{ target }]) => {
      chart?.resize();
    });
    if (ref) {
      observer.observe(ref);
    }
    return () => {
      chart?.dispose();
      ref && observer.unobserve(ref);
    };
  }, [containerRef, onChartInit]);
  useEffect(() => {
    chartInstance.current?.on("finished", onFinished);
    return () => {
      chartInstance.current?.off("finished", onFinished);
    };
  }, [onFinished]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.clear();
      chart?.setOption(option, settings);
    }
  }, [option, settings]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading]);

  return (
    <>
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
          ...style,
        }}
      />
    </>
  );
};

export { ReactECharts };
