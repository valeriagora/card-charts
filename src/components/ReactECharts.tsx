"use client";
import React, { useRef, useEffect, RefObject, useState } from "react";
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
  //
  containerRef: RefObject<HTMLDivElement | null>;
  onChartInit?: (chartInstance: ECharts) => void;
  onRenderEnded?: () => void;
}

export function ReactECharts({
  option,
  style,
  settings,
  loading = false,
  containerRef,
  onChartInit,
  onRenderEnded,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, null, { renderer: "svg" });
      onChartInit instanceof Function && onChartInit(chart);
      // setChart(chart);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    // function resizeChart() {
    //   chart?.resize();
    // }

    const ref = containerRef?.current;
    const observer = new ResizeObserver(([{ target }]) => {
      // const boundingClientRect = target.getBoundingClientRect();
      // console.log(target, boundingClientRect);
      chart?.resize();
    });
    if (ref) {
      observer.observe(ref);
    }
    //
    // window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      // window.removeEventListener("resize", resizeChart);
      ref && observer.unobserve(ref);
    };
  }, [containerRef]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
      onRenderEnded instanceof Function && onRenderEnded();
    }
  }, [option, settings, onRenderEnded]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading]);

  return (
    <>
      <div
        // id="capture"
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
          // border: "1px solid slateblue",
          // borderRadius: 16,
          // overflow: "hidden",
          ...style,
        }}
      />
    </>
  );
}
